import { useEffect, useState } from "react";
import CommandeRow from "./CommandeRow";

export default function CommandeTable() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmation, setConfirmation] = useState("");

  const fetchCommandes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/commande");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCommandes(data);
    } catch (err) {
      console.error("Erreur :", err);
      setError("Impossible de charger les commandes ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (numeroClient) => {
    try {
      const res = await fetch(`http://localhost:5000/api/commande/${numeroClient}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression ❌");

      setCommandes((prev) => prev.filter((c) => c.numeroClient !== numeroClient));
      setConfirmation("✅ Commande validée !");
      setTimeout(() => setConfirmation(""), 3000);
    } catch (err) {
      console.error(err.message);
      alert("Échec de la validation ❌");
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, []);

  if (loading) return <p className="text-white text-center">Chargement...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="md:p-5 p-1 bg-white bg-opacity-5 rounded-xl overflow-x-auto w-full">
      <h2 className="font-cursive text-3xl sm:text-4xl md:text-5xl text-white mb-6 text-center">
        <span className="text-green-400">📋 Commandes</span> en attente
      </h2>

      {confirmation && (
        <div className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md text-center transition-opacity duration-300">
          {confirmation}
        </div>
      )}

      {commandes.length === 0 ? (
        <p className="text-white text-lg sm:text-xl text-center">Aucune commande 😎</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left bg-black text-white rounded-md text-sm sm:text-base">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-2 sm:p-4">Nom</th>
                <th className="p-2 sm:p-4">Numéro</th>
                <th className="p-2 sm:p-4">Date & Heure</th>
                <th className="p-2 sm:p-4">Éléments</th>
                <th className="p-2 sm:p-4">Prix Total</th>
                <th className="p-2 sm:p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande) => (
                <CommandeRow key={commande._id} commande={commande} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
