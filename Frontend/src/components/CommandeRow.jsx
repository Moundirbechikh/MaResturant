export default function CommandeRow({ commande, onDelete }) {
  return (
    <tr className="border-b border-gray-900 bg-black text-white hover:bg-red-800 font-cursive transition-all duration-150 text-sm sm:text-base">
      <td className="p-2 sm:p-4 break-words">{commande.nomClient}</td>
      <td className="p-2 sm:p-4 break-words">{commande.numeroClient}</td>
      <td className="p-2 sm:p-4 break-words">
        {commande.date} à {commande.heure}
      </td>
      <td className="p-2 sm:p-4">
        <ul className="list-disc list-inside space-y-1">
          {commande.elementsCommandes.map((element, i) => (
            <li key={i} className="text-xs sm:text-sm md:text-base">
              <span className="text-yellow-400 font-bold">{element.titre}</span> — 
              <span className="text-green-400">{element.prix?.toFixed(2)} DA</span>
            </li>
          ))}
        </ul>
      </td>
      <td className="p-2 sm:p-4 font-bold text-green-400">
        {commande.prixTotal?.toFixed(2)} DA
      </td>
      <td className="p-2 sm:p-4">
        <button
          onClick={() => onDelete(commande.numeroClient)}
          className="px-2 sm:px-4 py-1 sm:py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-150 text-xs sm:text-sm md:text-base"
        >
          ✅ Valider
        </button>
      </td>
    </tr>
  );
}
