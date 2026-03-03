import React from 'react';
import Card from './Card';
import Burger from '../assets/burger.png';
import Pizza from '../assets/pizza.png';
import Dessert from '../assets/dessert.png';
import Boisson from '../assets/boisson.png';
import Plats from '../assets/plats.png';
import sandwich from '../assets/sandwich.png';
import Tacos from '../assets/tacos.png';
import Dynamiccard from './Dynamiccard';

const Menu = ({ onCategorySelect }) => {
  return (   
    <div className="w-full bg-black h-fit mt-10 p-6 sm:p-10" id="menu">
      {/* Titre */}
      <h1 className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cursive text-white mb-10">
        Notre <span className="text-red-600">Menu</span>
      </h1>

      {/* Grille responsive : 2 colonnes sur mobile/tablette */}
      <div className="w-full h-full rounded-xl bg-white bg-opacity-5 p-3 sm:p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card image={Burger} text="Nos Burger 🍔" onClick={() => onCategorySelect("burgers")} />
        <Card image={Pizza} text="Nos Pizza 🍕" onClick={() => onCategorySelect("pizza")} />
        <Card image={Boisson} text="Nos Boisson 🍹" onClick={() => onCategorySelect("boissons")} />
        <Card image={Dessert} text="Nos Dessert 🍰" onClick={() => onCategorySelect("dessert")} />
        <Card image={Plats} text="Nos plats 🍽" onClick={() => onCategorySelect("plat")} />
        <Card image={sandwich} text="Nos Sandwich 🥪" onClick={() => onCategorySelect("Sandwich")} />
        <Card image={Tacos} text="Nos Tacos 🌮" onClick={() => onCategorySelect("tacos")} />
        <Dynamiccard text="Nos promo et menu spécial" onClick={() => onCategorySelect("special")}/>
      </div>
    </div>
  );
};

export default Menu;
