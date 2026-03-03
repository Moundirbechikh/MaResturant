import { useState } from "react";

export default function AjoutItemForm() {
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState("pizza");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [prix, setPrix] = useState("");
  const [tailles, setTailles] = useState({
    Petite: "", Moyenne: "", Grande: "",
  });

  const categories = [
    "pizza", "burgers", "boissons", "dessert", "plat", "Sandwich", "tacos","special"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const generatedId = Date.now().toString();
    formData.append("_id", generatedId);
    formData.append("nom", nom);
    formData.append("categorie", categorie);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("disponible", true);

    if (categorie === "pizza") {
      const taillesFormatted = Object.entries(tailles).map(([nom, prix]) => ({
        nom,
        prix: parseFloat(prix)
      }));
      formData.append("tailles", JSON.stringify(taillesFormatted));
    } else {
      formData.append("prix", parseFloat(prix));
    }

    try {
      const res = await fetch("http://localhost:5000/api/menu", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout");

      alert("✅ Article ajouté !");
      setNom("");
      setCategorie("pizza");
      setDescription("");
      setImage(null);
      setPrix("");
      setTailles({ Petite: "", Moyenne: "", Grande: "" });
      setShowForm(false);
    } catch (err) {
      console.error("🔥 Erreur réseau :", err);
      alert("🔥 Erreur réseau : " + err.message);
    }
  };

  return (
    <div className="text-white font-cursive">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-xl"
        >
          Ajouter article
        </button>
      )}

      {showForm && (
        <div className="relative">
          {/* Bouton X pour fermer */}
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-2xl font-bold"
            type="button"
          >
            ✖
          </button>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white bg-opacity-5 p-6 rounded-xl shadow max-w-lg mx-auto mt-6"
          >
            <h2 className="text-3xl font-bold mb-4">Ajouter un nouvel article</h2>

            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="w-full p-2 border rounded bg-black text-white"
            />

            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              className="w-full p-2 border rounded bg-black text-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded bg-black text-white"
            />

            {categorie === "pizza" ? (
              <div>
                <p className="font-semibold mb-2">Tailles & Prix 🍕</p>
                {["Petite", "Moyenne", "Grande"].map((taille) => (
                  <div key={taille} className="mb-2">
                    <label className="block">{taille}</label>
                    <input
                      type="number"
                      value={tailles[taille]}
                      onChange={(e) => setTailles({ ...tailles, [taille]: e.target.value })}
                      className="w-full p-2 border rounded bg-black text-white"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <label className="font-semibold">Prix (DA)</label>
                <input
                  type="number"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  className="w-full p-2 border rounded bg-black text-white"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border rounded bg-black text-white"
            />

            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Ajouter l'article
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
