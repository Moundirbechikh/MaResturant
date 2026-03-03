import React from 'react';

const Citation = () => {
  return (
    <>
      {/* Titre principal : inchangé sur desktop, centré et plus grand sur mobile/tablette */}
      <h1 className="flex md:justify-start px-10 pt-1 pb-3 
                      text-white font-cursive font-bold md:font-extrabold
                     sm:text-center text-7xl sm:text-7xl md:text-7xl lg:text-9xl flex-col md:flex-row">
        <span className="text-red-600 text-7xl md:text-7xl lg:text-9xl">Ma</span> <span>Resturant</span>
      </h1>

      {/* Bloc citation : prend toute la largeur sur mobile */}
      <div className="flex justify-start px-5 sm:px-10 md:px-14">  
        <div className="w-full md:max-w-md bg-black bg-opacity-80 rounded-xl  p-4 py-6 md:py-10">
          <p className="text-white text-2xl md:text-3xl 
                        font-cursive leading-relaxed text-center md:text-left">
            "Le régime peut commencer demain… 
            <span className="text-red-600"> aujourd’hui</span>, 
            c’est burger, frites et bonheur. 
            <span className="text-red-600"> Surtout à -50%, ce serait un crime de résister.</span>"
          </p>
        </div>
      </div>

      {/* Boutons : en colonne sur mobile, marges latérales */}
      <div className="flex flex-col md:flex-row gap-3 mt-4 px-6 sm:px-10 md:px-20">
        <button
          onClick={() => {
            const section = document.getElementById('about');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="bg-red-800 hover:bg-black text-white 
                     text-xl md:text-2xl hover:text-red-600 
                     px-6 md:px-10 py-4 md:py-5 
                     font-cursive rounded-xl flex justify-center w-full md:w-auto"
        >
          About us
        </button>

        <button 
          onClick={() => {
            const section = document.getElementById('menu');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="bg-black hover:bg-red-800 text-red-800 
                     text-xl md:text-2xl hover:text-white 
                     px-6 md:px-10 py-4 md:py-5 
                     font-cursive rounded-xl flex justify-center w-full md:w-auto"
        >
          Order now
        </button>
      </div>
    </>
  );
};

export default Citation;
