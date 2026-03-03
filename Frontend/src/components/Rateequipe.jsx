import React, { useEffect, useState } from "react";
import Ratecard from "./Ratecard";

export default function RateEquipe() {
  const [avis, setAvis] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(null);

  const fetchRatings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/rate");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAvis(data);
    } catch (err) {
      console.error("Erreur :", err);
      setError("Impossible de charger les avis ❌");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const handlePrevious = () => {
    setIndex((prev) => (prev === 0 ? avis.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === avis.length - 1 ? 0 : prev + 1));
  };

  if (error) return <p className="text-red-500 text-lg sm:text-xl">{error}</p>;
  if (avis.length === 0) return <p className="text-white text-lg sm:text-xl">Aucun avis pour le moment</p>;

  return (
    <div className="flex flex-col items-center space-y-6 mt-10 px-4 sm:px-6 md:px-10 w-full">
      <h2 className="text-white font-cursive text-2xl sm:text-3xl md:text-4xl mb-4 text-center">
        Témoignages clients
      </h2>

      <div className="flex items-center space-x-4 sm:space-x-6 w-full justify-center">
        {/* Bouton précédent */}
        <button
          onClick={handlePrevious}
          className="text-white bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-2 rounded-full text-lg sm:text-xl md:text-2xl transition"
        >
          ←
        </button>

        {/* Carte avis */}
        <div className="max-w-sm sm:max-w-md md:max-w-lg">
          <Ratecard
            name={avis[index].name}
            role={avis[index].role}
            rating={avis[index].rating}
            message={avis[index].message}
          />
        </div>

        {/* Bouton suivant */}
        <button
          onClick={handleNext}
          className="text-white bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-2 rounded-full text-lg sm:text-xl md:text-2xl transition"
        >
          →
        </button>
      </div>
    </div>
  );
}
