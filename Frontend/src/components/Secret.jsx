import AjoutItemForm from "./Ajoutitemform";
import CommandeTable from "./CommandeTable";
import MenuTable from "./MenuTable";
import RateEquipe from "./Rateequipe";

export default function Secret({ onLogout }) {
  return (
    <div className="mt-10 mb-6 flex flex-col items-center space-y-6 px-1 sm:px-6 md:px-10 w-full">
      
      {/* Bloc de bienvenue */}
      <div className="bg-red-700 text-white  p-6 rounded-xl shadow-lg w-full max-w-2xl text-center font-cursive">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          Bienvenue Chef 👨‍🍳
        </h2>
        <p className="text-sm sm:text-base md:text-lg">
          Voici ton accès spécial : commandes, stats ou tout autre contenu secret 🔥
        </p>
      </div>

      {/* Bouton déconnexion */}
      <button
        onClick={onLogout}
        className="px-6 py-3 bg-gray-800 text-red-400 rounded-lg font-semibold hover:bg-gray-900 transition duration-300 w-full sm:w-auto"
      >
        Se déconnecter ⛔
      </button>

      {/* Tables et formulaires */}
      <div className="w-full md:max-w-6xl  space-y-6">
        <div className="bg-black bg-opacity-70 p-1 rounded-lg shadow-md overflow-x-auto">
          <CommandeTable />
        </div>

        <div className="bg-black bg-opacity-70 p-1 rounded-lg shadow-md overflow-x-auto">
          <MenuTable />
        </div>

        <div className="bg-black bg-opacity-70 p-4 rounded-lg shadow-md">
          <AjoutItemForm />
        </div>

        <div className="bg-black bg-opacity-70 p-4 rounded-lg shadow-md">
          <RateEquipe />
        </div>
      </div>
    </div>
  );
}
