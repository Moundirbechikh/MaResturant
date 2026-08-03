import React, { useState, useEffect } from 'react';
import Logo from './logo'; // Assure-toi que le chemin vers ton logo est correct

const Loader = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Le texte que tu veux afficher (tu peux corriger l'orthographe si tu le souhaites)
  const fullText = "Ma Resturent"; 
  
  // Vitesses de l'animation en millisecondes
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const delayBetween = 1000; // Pause quand le mot est complet ou vide

  useEffect(() => {
    let timeout;

    if (!isDeleting && text === fullText) {
      // Le texte est complet, on fait une pause puis on commence à effacer
      timeout = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && text === '') {
      // Le texte est effacé, on fait une pause puis on recommence à écrire
      timeout = setTimeout(() => setIsDeleting(false), delayBetween / 2);
    } else {
      // Logique d'écriture et d'effacement
      timeout = setTimeout(() => {
        setText(fullText.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting]);

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center z-[9999] fixed top-0 left-0">
      {/* Ton composant Logo */}
      <Logo />
      
      {/* Le texte animé */}
      <h1 className="text-white text-3xl md:text-5xl font-cursive mt-8 h-12 flex items-center">
        {text}
        {/* Curseur clignotant style machine à écrire */}
        <span className="inline-block w-[3px] h-8 md:h-10 bg-red-600 ml-1 animate-pulse"></span>
      </h1>
    </div>
  );
};

export default Loader;
