import React, { useState } from "react";
import { usePanier } from "./PanierContext";

const Menucardpizza = ({ nom, description, tailles, image }) => {
  const { ajouterItem } = usePanier();
  const [tailleChoisie, setTailleChoisie] = useState(tailles?.[0]);
  const [ajoute, setAjoute] = useState(false);

  const handleAjout = () => {
    if (!tailleChoisie) return;

    ajouterItem({
      titre: `${nom} (${tailleChoisie.nom})`,
      prix: tailleChoisie.prix
    });

    setAjoute(true);
    setTimeout(() => setAjoute(false), 2000);
  };

  return (
    <div className="flex flex-row h-fit flex-wrap justify-around bg-white bg-opacity-5 rounded-xl p-3 w-72 shadow-md hover:scale-105 transition-transform duration-300">
      {image ? (
        <img 
          src={`${process.env.PUBLIC_URL}${image}`} 
          alt={nom} 
          className="w-full object-cover rounded-md mb-3 h-2/3" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
          }}
        />
      ) : (
        <div className="border-2 border-dashed rounded-xl w-full h-2/3 mb-1 flex items-center justify-center">
          <span className="text-gray-800">Pas d'image</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h2 className="text-white text-2xl font-cursive font-bold">{nom}</h2>
        <p className="text-white font-cursive">{description}</p>

        {/* Sélection de la taille */}
        <select
          value={tailleChoisie?.nom}
          onChange={(e) =>
            setTailleChoisie(tailles.find(t => t.nom === e.target.value))
          }
          className="px-4 py-2 bg-white rounded-lg font-cursive text-black text-sm focus:outline-none"
        >
          {tailles.map((t) => (
            <option key={t.nom} value={t.nom}>
              {t.nom} - {t.prix} DA
            </option>
          ))}
        </select>

        <button
          onClick={handleAjout}
          className="mt-2 px-4 py-2 bg-red-600 text-white font-cursive rounded-lg hover:bg-red-700 transition"
        >
          Ajouter au panier
        </button>

        {ajoute && (
          <div className="mt-2 text-green-400 text-sm font-cursive animate-pulse">
            ✅ Pizza ajoutée
          </div>
        )}
      </div>
    </div>
  );
};

export default Menucardpizza;
