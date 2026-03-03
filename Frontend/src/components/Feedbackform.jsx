import React, { useState } from 'react';

const Feedbackform = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rating: 0,
    comment: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    try {
      const response = await fetch('https://maresturant.onrender.com/api/Rate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          role: 'Client',
          rating: formData.rating,
          message: formData.comment,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi de l'avis");

      const result = await response.json();
      console.log("✅ Avis enregistré :", result);

      setFormData({
        firstName: '',
        lastName: '',
        rating: 0,
        comment: '',
      });
      setSuccess(true);
    } catch (error) {
      console.error("❌ Erreur:", error);
      alert("Impossible d’envoyer votre avis. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex justify-center items-center px-4" id="contact">
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-black bg-opacity-80 rounded-xl p-6 sm:p-8 border border-red-600 w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white font-cursive text-center">
          Donnez votre avis 📝
        </h2>

        {success && (
          <p className="bg-green-900 bg-opacity-30 text-green-400 text-lg mb-4 font-cursive p-2 rounded text-center">
            Merci pour votre avis ! 🙌
          </p>
        )}

        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded font-cursive bg-black text-white focus:outline-none focus:border-red-600"
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded font-cursive bg-black text-white focus:outline-none focus:border-red-600"
          required
        />

        <div className="mb-4">
          <label className="block mb-2 font-cursive text-white">Note :</label>
          <div className="flex gap-2 justify-center sm:justify-start">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                className={`cursor-pointer text-2xl sm:text-3xl ${
                  formData.rating >= star ? 'text-yellow-500' : 'text-gray-400'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <textarea
          name="comment"
          placeholder="Votre remarque..."
          value={formData.comment}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded h-28 font-cursive bg-black text-white focus:outline-none focus:border-red-600"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 font-cursive text-lg transition"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Feedbackform;
