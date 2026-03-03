const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: String,
  role: String,
  rating: Number,
  message: String,
}, { collection: "rating" }); // Spécification explicite du nom de collection

module.exports = mongoose.model("Rate", menuSchema);