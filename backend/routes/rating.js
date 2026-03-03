// routes/rating.js
const express = require("express");
const router = express.Router();
const Rate = require("../models/RatingItem");

// Route GET existante
router.get("/", async (req, res) => {
  try {
    const ratings = await Rate.find().sort({ rating: -1 }); // Option: trier par note
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🚨 Nouvelle route POST pour recevoir un avis
router.post("/", async (req, res) => {
  const { name, role, rating, message } = req.body;

  if (!name || !rating || !message) {
    return res.status(400).json({ message: "Champs requis manquants" });
  }

  try {
    const newRate = new Rate({ name, role, rating, message });
    const savedRate = await newRate.save();
    res.status(201).json(savedRate);
  } catch (err) {
    console.error("Erreur enregistrement rating:", err);
    res.status(500).json({ message: "Erreur serveur lors de l’ajout de l’avis" });
  }
});

module.exports = router;
