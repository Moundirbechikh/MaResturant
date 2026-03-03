import React, { useEffect, useState } from "react";
import ItemRow from "./ItemRow";

export default function MenuTable() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/menu");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setMenus(data);
      } catch (err) {
        console.error("Erreur :", err);
        setError("Échec du chargement des menus");
      } finally {
        setLoading(false);
      }
    };
    fetchMenus();
  }, []);

  const toggleDisponibilite = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${id}/disponible`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Statut ${res.status} → ${text}`);
      }

      await res.json();
      const refresh = await fetch("http://localhost:5000/api/menu");
      const refreshedMenus = await refresh.json();
      setMenus(refreshedMenus);
    } catch (err) {
      console.error("🔴 Erreur PATCH :", err.message);
      alert("Une erreur est survenue 😢\n" + err.message);
    }
  };

  if (loading) {
    return <p className="text-white text-xl text-center">Chargement du menu...</p>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-xl text-center">
        {error} ❌
        <button
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="md:p-5 p-1 w-full bg-white bg-opacity-5 rounded-xl overflow-x-auto">
      <h2 className="font-cursive text-3xl sm:text-4xl md:text-6xl text-white mb-6 text-center">
        <span className="text-red-600">Tous</span> Nos Plats 🍕🍔
      </h2>
      {menus.length === 0 ? (
        <p className="text-white text-lg sm:text-xl text-center">Aucun plat disponible pour le moment</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left bg-gray-900 text-white rounded-md text-sm sm:text-base">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nom</th>
                <th className="p-3">Catégorie</th>
                <th className="p-3">Description</th>
                <th className="p-3">Prix / Tailles</th>
                <th className="p-3">Disponibilité</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((item) => (
                <ItemRow key={item._id} item={item} onToggle={toggleDisponibilite} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
