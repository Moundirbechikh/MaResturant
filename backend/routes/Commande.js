const express = require('express');
const Commande = require('../models/Commande');

const router = express.Router();

// 📩 Enregistrer une commande
router.post('/', async (req, res) => {
  try {
    const { nomClient, numeroClient, elementsCommandes, prixTotal, date, heure } = req.body;

    // 🕵️‍♂️ Vérifier si une commande existe déjà avec ce numéro
    const exist = await Commande.findOne({ numeroClient });

    if (exist) {
      return res.status(400).json({
        message: "Ce numéro a déjà été utilisé pour une commande ❌",
      });
    }

    const nouvelleCommande = new Commande({
      nomClient,
      numeroClient,
      elementsCommandes,
      prixTotal,
      date,
      heure,
    });

    await nouvelleCommande.save();

    res.status(200).json({ message: 'Commande enregistrée avec succès ✅' });
  } catch (error) {
    console.error('Erreur lors de l’enregistrement de la commande :', error);
    res.status(500).json({ message: 'Erreur serveur ❌' });
  }
});

router.get("/", async (req, res) => {
  try {
    const commandes = await Commande.find().sort({ date: -1 });
    res.json(commandes);
  } catch (error) {
    console.error("❌ Erreur GET commandes :", error.message);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des commandes" });
  }
});

// 🗑️ Supprimer une commande par son numéro
router.delete("/:numeroClient", async (req, res) => {
  try {
    const deleted = await Commande.findOneAndDelete({ numeroClient: req.params.numeroClient });
    if (!deleted) {
      return res.status(404).json({ message: "Commande introuvable ❌" });
    }
    res.json({ message: "Commande supprimée avec succès ✅" });
  } catch (error) {
    console.error("❌ Erreur suppression par numéro :", error.message);
    res.status(500).json({ message: "Erreur serveur ❌" });
  }
});

module.exports = router;
