import React, { useState } from 'react';
import { usePanier } from './PanierContext';

function Panier() {
  const { panier, retirerItem, viderPanier } = usePanier();
  const [nomClient, setNomClient] = useState('');
  const [numeroClient, setNumeroClient] = useState('');

  const prixTotal = panier.reduce((total, item) => total + item.prix, 0);

  const passerCommande = async () => {
    if (!nomClient.trim() || !numeroClient.trim()) {
      alert("Veuillez remplir le nom et le numéro de téléphone ❌");
      return;
    }

    const commande = {
      nomClient,
      numeroClient,
      elementsCommandes: panier,
      prixTotal,
      date: new Date().toLocaleDateString(),
      heure: new Date().toLocaleTimeString(),
    };

    try {
      const res = await fetch('https://maresturant.onrender.com/api/commande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commande),
      });

      const data = await res.json();
      alert(data.message || "Commande envoyée ✅");
      viderPanier();
      setNomClient("");
      setNumeroClient("");
    } catch (err) {
      console.error("Erreur:", err);
      alert("Échec de la commande ❌");
    }
  };

  return (
    <div className="bg-white bg-opacity-5 p-5 rounded-xl mt-10 w-full max-w-3xl mx-auto">
      <h2 className="text-white text-3xl sm:text-4xl md:text-6xl font-cursive mb-5 text-center">
        Votre <span className="text-red-700">Panier</span>
      </h2>

      {panier.length === 0 ? (
        <p className="text-white text-center">Aucun article ajouté</p>
      ) : (
        <>
          <ul className="text-white font-cursive mb-4 text-lg sm:text-xl space-y-2">
            {panier.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item.titre} - {item.prix} DA</span>
                <button 
                  className="ml-3 text-red-600 hover:text-red-800 transition"
                  onClick={() => retirerItem(index)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>

          <div className="text-white font-cursive mb-4 text-lg sm:text-xl text-center sm:text-left">
            💰 Total: {prixTotal} DA
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <input 
              type="text"
              placeholder="Nom du client"
              required
              value={nomClient}
              onChange={(e) => setNomClient(e.target.value)}
              className="px-4 py-2 rounded w-full"
            />
            <input 
              type="text"
              placeholder="Numéro de téléphone"
              required
              value={numeroClient}
              onChange={(e) => setNumeroClient(e.target.value)}
              className="px-4 py-2 rounded w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <button
              onClick={passerCommande}
              className="px-4 py-2 text-lg bg-red-600 font-cursive text-white rounded-xl hover:bg-red-700 transition w-full md:w-auto"
            >
              Commander ✅
            </button>

            <button
              onClick={viderPanier}
              className="px-4 py-2 text-lg bg-red-600 font-cursive text-white rounded-xl hover:bg-red-700 transition w-full md:w-auto"
            >
              Vider ❌
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Panier;
