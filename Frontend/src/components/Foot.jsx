import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp,FaMapMarkerAlt } from 'react-icons/fa';
import logoBurger from '../assets/logo1.jpg'; // adapte le chemin si besoin



const Foot = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 flex flex-col items-center justify-center text-center w-full"id="about">
      
      {/* Réseaux sociaux */}
      <div className="flex space-x-6 pb-3">
        <a href="https://www.instagram.com/votrecompte" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-2xl hover:text-red-500 transition" />
        </a>
        <a href="https://www.facebook.com/votrepage" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-2xl hover:text-red-500 transition" />
        </a>
        <a href="https://wa.me/213XXXXXXXXX" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="text-2xl hover:text-red-500 transition" />
        </a>
        <a
  href="https://www.google.com/maps?q=Place+du+1er+Novembre,+Oran"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-white hover:text-red-500 transition"
>
  <FaMapMarkerAlt className="text-xl" />
</a>

      </div>

      {/* Logo centré */}
      <img src={logoBurger} alt="Logo Burger" className="h-20 w-20 " />

      {/* Horaires */}
      <div className="text-center text-lg font-cursive">
        Ouvert tous les jours de <span className="text-red-500">11h à 23h</span>  
      </div>
      <div className="text-center text-lg font-cursive">
        Notre num :<span className="text-red-500 text-base text-bold">0777777777</span>  
      </div>

      {/* Droits */}
      <div className="text-sm text-gray-400 text-center">
        © {new Date().getFullYear()} Ma Resturant — Tous droits réservés
      </div>
    </footer>
  );
};

export default Foot;