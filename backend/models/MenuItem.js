const mongoose = require("mongoose");

const tailleSchema = new mongoose.Schema({
  nom: String,       // ex: "Petite", "Moyenne", "Grande"
  prix: Number       // prix correspondant
});

const menuSchema = new mongoose.Schema({
  _id:String,
  nom: String,
  description: String,
  image: String,
  prix: Number,             // 👈 utilisé pour les plats simples
  categorie: String,
  disponible: Boolean,
  tailles: [tailleSchema]   // 👈 utilisé pour les pizzas (si applicable)
}, { collection: "item" });

module.exports = mongoose.model("Menu", menuSchema);
