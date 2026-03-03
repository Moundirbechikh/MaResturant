import React, { useState, useEffect } from 'react';
import Ratecard from './Ratecard';

const Rate = () => {
  const [ratings, setRatings] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch("https://maresturant.onrender.com/api/Rate");
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setRatings(data);
      } catch (err) {
        console.error("Erreur ratings:", err);
        setError("Impossible de charger les avis");
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, []);

  useEffect(() => {
    if (ratings.length > 0) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % ratings.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [ratings.length]);

  const getPosition = (i) => {
    if (i === index) return 'center';
    if (i === (index - 1 + ratings.length) % ratings.length) return 'left';
    if (i === (index + 1) % ratings.length) return 'right';
    return 'hidden';
  };

  if (loading) {
    return <p className="text-white text-xl text-center">Chargement des avis...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl text-center">{error} ❌</p>;
  }

  return (
    <div
      className="min-h-screen bg-center bg-no-repeat bg-cover px-6 md:px-24 flex flex-col items-center justify-center relative"
      style={{ backgroundImage: "url('../back2.png')" }}
      id="rating"
    >
      <div className="absolute top-10 text-center w-full">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-cursive text-white">
          Les <span className="text-red-600">avis</span> de nos clients
        </h1>
      </div>

      {/* Carrousel responsive */}
      <div className="relative w-full max-w-4xl flex justify-center items-center mt-20">
        {ratings.map((card, i) => {
          const position = getPosition(i);
          return (
            <div
              key={card._id || i}
              className={`absolute transition-all duration-700 w-full sm:w-auto ${
                position === 'center'
                  ? 'scale-100 z-10 opacity-100'
                  : position === 'left'
                  ? 'translate-x-[-150px] scale-90 z-0 opacity-50 hidden sm:block'
                  : position === 'right'
                  ? 'translate-x-[150px] scale-90 z-0 opacity-50 hidden sm:block'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <Ratecard
                name={card.name}
                role={card.role}
                rating={card.rating}
                message={card.message}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rate;
