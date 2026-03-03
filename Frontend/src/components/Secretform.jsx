import { useState } from "react";
import Secret from "./Secret";


export default function Secretform() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "admin") {
      setIsAuthenticated(true);
      setPassword(""); // reset input
    } else {
      alert("Mot de passe incorrect ❌");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="flex flex-col h-fit justify-between bg-black text-white border-red-700 border my-2 mx-1 p-1 md:p-3 md:m-6  rounded-xl"id="equipage">
     <div className="font-cursive text-center text-2xl">juste pour l'equipage du resturant</div>
      {!isAuthenticated && (
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mt-8">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe 🔒"
            className="px-6 font-cursive py-3 md:w-72 w-64 rounded-full border border-red-600 bg-black text-white placeholder:text-red-700 outline-none focus:ring-2 focus:ring-red-600 transition duration-300 hover:shadow-lg shadow-red-600"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-black rounded-full font-bold hover:bg-red-700 hover:scale-105 transition duration-300"
          >
            Valider
          </button>
        </form>
      )}

      {/* 🌟 Zone affichée juste avant le footer */}
      {isAuthenticated && <Secret onLogout={handleLogout} />}
    </div>
  );
}
