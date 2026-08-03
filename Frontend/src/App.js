import React, { useState, useEffect } from 'react';
import Homepage from "./pages/homepage";
import Loader from "./components/Loader"; // Ajuste le chemin selon ton architecture

function App() {
  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        // On fait une requête vers l'API des avis pour réveiller le serveur.
        // N'oublie pas de changer localhost par l'URL de ton backend Render en production !
        // Exemple : "https://ton-backend.onrender.com/api/Rate"
        await fetch("https://maresturant.onrender.com/keep-alive");
        
        // Dès qu'on a une réponse (même si c'est une erreur 404/500, ça veut dire que le serveur est réveillé)
        setIsBackendReady(true);
      } catch (error) {
        console.error("Erreur de connexion au backend:", error);
        // On affiche quand même l'appli en cas d'erreur réseau pour que le composant Rate gère et affiche l'erreur proprement
        setIsBackendReady(true);
      }
    };

    wakeUpBackend();
  }, []);

  return (
    <div className="App">
      {/* Si le backend n'est pas prêt, on affiche ton animation. Sinon, on affiche le site */}
      {!isBackendReady ? (
        <Loader />
      ) : (
        <>
          <header className="App-header"></header>
          <Homepage />
        </>
      )}
    </div>
  );
}

export default App;
