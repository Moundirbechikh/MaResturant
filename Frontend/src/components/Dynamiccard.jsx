import React, { useState, useEffect } from "react";
import ven from '../assets/50.jpg';
import menu from '../assets/menu.png';
import menu2 from '../assets/menu2.png';
import menu3 from '../assets/menu3.png';

const Dynamiccard = ({ text, onClick }) => {
  const backgrounds = [menu, ven, menu2, menu3];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden w-full h-48 sm:h-64 md:w-60 md:h-80 rounded-3xl cursor-pointer text-lg sm:text-xl md:text-2xl font-cursive bg-center bg-no-repeat bg-cover shadow-lg hover:scale-105 transition-transform duration-300"
      style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
    >
      <div className="z-10 absolute w-full h-full peer"></div>

      {/* Cercle haut */}
      <div className="absolute peer-hover:-top-20 peer-hover:-left-16 peer-hover:w-[140%] peer-hover:h-[140%] -top-32 -left-16 w-24 h-32 sm:w-32 sm:h-44 rounded-full bg-red-800 transition-all duration-500"></div>

      {/* Cercle bas avec texte */}
      <div className="absolute flex text-center items-end justify-end peer-hover:right-0 peer-hover:rounded-b-none peer-hover:bottom-0 peer-hover:items-center peer-hover:justify-center peer-hover:w-full peer-hover:h-full -bottom-24 -right-10 w-28 h-36 sm:w-36 sm:h-44 rounded-full bg-red-800 transition-all duration-500 text-white">
        {text}
      </div>
    </div>
  );
};

export default Dynamiccard;
