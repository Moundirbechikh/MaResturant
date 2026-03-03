import React, { useState } from "react";
import Menu from "./Menu";
import Menuorder from "./menuorder";
import { PanierProvider } from "./PanierContext";
import Panier from "./Panier";

function Appmenu() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <PanierProvider>
      <div className="sm:p-5 p-0" id="menu">
        {!selectedCategory ? (
          <Menu onCategorySelect={setSelectedCategory} />
        ) : (
          <>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-5 px-4 py-2 bg-red-600 text-white font-cursive rounded-xl hover:bg-red-700 transition"
            >
              ⬅️ Retour au menu principal
            </button>

            <Menuorder titre={selectedCategory} />
          </>
        )}

        {/* 🛒 Le panier s'affiche toujours */}
        <Panier />
      </div>
    </PanierProvider>
  );
}

export default Appmenu;
