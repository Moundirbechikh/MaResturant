import { useState } from "react";

export default function ItemRow({ item, onToggle }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const handleToggle = async () => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      await onToggle(item._id);
    } catch (err) {
      console.error("Erreur locale :", err);
      setUpdateError("Échec de la mise à jour");
    } finally {
      setIsUpdating(false);
    }
  };

  const renderPrix = () => {
    if (item.tailles?.length > 0) {
      return item.tailles.map((taille, i) => (
        <div key={i} className="text-sm sm:text-base">
          {taille.nom} : <span className="font-semibold">{taille.prix.toFixed(2)} DA</span>
        </div>
      ));
    }
    return (
      <span className="font-semibold text-sm sm:text-base">
        {item.prix?.toFixed(2) || "0.00"} DA
      </span>
    );
  };

  return (
    <tr className="border-b border-gray-900 bg-black text-white hover:bg-red-800 font-cursive transition-all duration-150 text-sm sm:text-base">
      <td className="p-2 sm:p-4 break-words">{item._id}</td>
      <td className="p-2 sm:p-4 break-words">{item.nom}</td>
      <td className="p-2 sm:p-4 break-words">{item.categorie}</td>
      <td className="p-2 sm:p-4 break-words max-w-xs sm:max-w-md">{item.description}</td>
      <td className="p-2 sm:p-4">{renderPrix()}</td>
      <td className="p-2 sm:p-4">
        <span className={item.disponible ? "text-green-400" : "text-red-400"}>
          {item.disponible ? "✅ Disponible" : "❌ Indisponible"}
        </span>
      </td>
      <td className="p-2 sm:p-4">
        <button
          onClick={handleToggle}
          disabled={isUpdating}
          className={`px-2 sm:px-3 py-1 rounded-lg font-semibold flex items-center gap-2 transition duration-200 text-xs sm:text-sm ${
            item.disponible
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isUpdating ? "⏳ Mise à jour..." : item.disponible ? "Indisponible" : "Disponible"}
        </button>
        {updateError && (
          <div className="mt-2 text-red-400 text-xs sm:text-sm">{updateError}</div>
        )}
      </td>
    </tr>
  );
}
