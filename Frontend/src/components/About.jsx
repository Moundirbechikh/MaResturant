import React from 'react';
import Feedbackform from './Feedbackform';

const About = () => {
  return (
    <div 
      className="min-h-screen bg-center bg-no-repeat bg-cover flex flex-col items-center px-4 md:px-24 bg-black py-10"
      id="about"
    >
      {/* Formulaire Feedback */}
      <div className="w-full flex justify-center mb-8">
        <Feedbackform />
      </div>  

      {/* Bloc texte de présentation */}
      <div className="w-full max-w-4xl bg-black bg-opacity-80 rounded-xl p-6 md:p-3  shadow-lg">
        <p className="text-white text-base sm:text-lg md:text-xl font-cursive leading-relaxed text-center md:text-center">
          Bienvenue chez <span className="text-red-600">Ma Resturant à Oran</span>, ouvert depuis le 12 juin 2024 pour régaler vos papilles 🍽️🔥.  
          Retrouvez-nous au Boulevard Emir Abdelkader, <span className="text-red-600">tous les jours de 11h à 23h sans interruption</span>.  
          Plats maison, burgers fondants, tacos XXL et desserts gourmands vous attendent dans une ambiance conviviale ! 😋
        </p>
      </div>
    </div>
  );
};

export default About;
