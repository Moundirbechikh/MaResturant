import React, { useEffect, useState } from "react";
import Menucard from "./Menucard";
import Menucardpizza from "./Menucardpizza";

const Menuorder = ({ titre }) => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const categorieUrl = titre.toLowerCase().trim(); // nettoyage du titre
        const response = await fetch(`https://maresturant.onrender.com/api/menu/${categorieUrl}`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        setMenus(data); // les plats sont déjà filtrés par la route
      } catch (err) {
        console.error("Erreur menu:", err);
        setError("Échec du chargement des menus");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [titre]);

  if (loading) {
    return (
      <div className="p-5 rounded-xl bg-white bg-opacity-5 flex justify-center items-center h-64">
        <p className="text-white text-xl">Chargement en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 rounded-xl bg-white bg-opacity-5 flex flex-col items-center">
        <div className="font-cursive text-6xl text-white text-center w-full mb-10">
          <span className="text-red-600">Nos</span><br />{titre}
        </div>
        <p className="text-red-500 text-xl">{error} ❌</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl bg-white bg-opacity-5 h-fit w-full flex flex-wrap gap-16 justify-evenly ">
      <div className="font-cursive md:text-8xl text-6xl text-white mt-10">
        <span className="text-red-600">Nos</span><br />{titre}
      </div>

      {menus.length === 0 ? (
        <p className="text-white text-xl">Aucun plat disponible pour le moment 🍽️</p>
      ) : (
        menus.map(item =>
          item.categorie === "pizza" ? (
            <Menucardpizza
              key={item.id}
              nom={item.nom}
              description={item.description}
              tailles={item.tailles}
              image={item.image}
            />
          ) : (
            <Menucard
              key={item.id}
              titre={item.nom}
              prix={item.prix}
              ingridient={item.description}
              image={item.image}
            />
          )
        )
      )}
    </div>
  );
};

export default Menuorder;
