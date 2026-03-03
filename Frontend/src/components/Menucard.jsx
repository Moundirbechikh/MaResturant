import React, { useState } from "react";
import { usePanier } from "./PanierContext";

const Menucard = ({ titre, prix, ingridient, image }) => {
  titre = titre || "Plat sans nom";
  prix = prix ?? 0;
  ingridient = ingridient || "Description non disponible";

  const { ajouterItem } = usePanier();
  const [ajoute, setAjoute] = useState(false);

  const handleAjout = () => {
    ajouterItem({ titre, prix });
    setAjoute(true);
    setTimeout(() => setAjoute(false), 2000);
  };

  return (
    <div className="flex flex-col bg-white bg-opacity-5 rounded-xl p-4 w-full sm:w-72 min-h-[350px] shadow-md hover:scale-105 transition-transform duration-300">
      {image ? (
        <img 
          src={`${process.env.PUBLIC_URL}${image}`} 
          alt={titre} 
          className="w-full object-cover rounded-md mb-3 h-48" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
          }}
        />
      ) : (
        <div className="border-2 border-dashed rounded-xl w-full h-48 mb-3 flex items-center justify-center">
          <span className="text-gray-800">Pas d'image</span>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h2 className="text-white text-xl font-cursive font-bold">{titre}</h2>
        <p className="text-white font-cursive text-sm">{ingridient}</p>
        <p className="text-red-600 font-semibold text-lg">
          {typeof prix === 'number' ? prix.toFixed(2) : "0.00"} DA
        </p>
        <button 
          onClick={handleAjout}
          className="mt-2 px-4 py-2 bg-red-600 text-white font-cursive rounded-lg hover:bg-red-700 transition"
        >
          Ajouter au panier 
        </button>

        {ajoute && (
          <div className="mt-2 text-green-400 text-sm font-cursive animate-pulse">
            ✅ Ajouté au panier
          </div>
        )}
      </div>
    </div>
  );
};

export default Menucard;
