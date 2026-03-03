import React from 'react';

const Ratecard = ({ name = "Client", role = "Visiteur", rating = 0, message = "Aucun avis." }) => {
  const initials = typeof name === "string"
    ? name.split(' ').map((word) => word[0]).join('').toUpperCase()
    : "C";

  const safeRating = Math.max(0, Math.min(rating, 5));

  return (
    <div className="w-full sm:w-[20rem] min-h-[250px] border border-gray-300 rounded-lg shadow-lg bg-white p-6 space-y-4 h-fit">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 flex items-center justify-center bg-red-500 text-white text-lg font-semibold rounded-full">
          {initials}
        </div>
        <div>
          <div className="text-gray-900 font-medium text-xl">{name || "Client"}</div>
          <div className="text-gray-600 text-lg font-cursive">{role}</div>
        </div>
      </div>

      <div className="flex text-red-500 text-2xl">
        {'★'.repeat(safeRating)}{'☆'.repeat(5 - safeRating)}
      </div>

      <p className="text-gray-700 text-lg font-cursive">{message}</p>
    </div>
  );
};

export default Ratecard;
