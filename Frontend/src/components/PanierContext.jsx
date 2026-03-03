import { createContext, useState, useContext } from 'react';

const PanierContext = createContext();

export function PanierProvider({ children }) {
  const [panier, setPanier] = useState([]);

  const ajouterItem = (item) => {
    setPanier((prev) => [...prev, item]);
  };

  const retirerItem = (index) => {
    setPanier((prev) => prev.filter((_, i) => i !== index));
  };

  const viderPanier = () => setPanier([]);

  return (
    <PanierContext.Provider value={{ panier, ajouterItem, retirerItem, viderPanier }}>
      {children}
    </PanierContext.Provider>
  );
}

export function usePanier() {
  return useContext(PanierContext);
}
