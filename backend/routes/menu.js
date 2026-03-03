const express = require("express");
const router = express.Router();
const Menu = require("../models/MenuItem");
const multer = require("multer");
const path = require("path");

// 📁 Chemin absolu vers Frontend/public/images
const imagePath = path.join(__dirname, "..", "..", "Frontend", "public", "images");

// 📦 Configuration du stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, imagePath),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// ✅ Route POST pour ajouter un nouvel item
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { _id, nom, description, prix, categorie, disponible, tailles } = req.body;

    const newItem = new Menu({
      _id,
      nom,
      description,
      categorie,
      disponible: disponible === "true",
      image: req.file ? `/images/${req.file.filename}` : null, // Chemin relatif pour React
    });

    if (categorie === "pizza" && tailles) {
      newItem.tailles = JSON.parse(tailles); // tableau [{ nom, prix }]
    } else {
      newItem.prix = parseFloat(prix);
    }

    await newItem.save();
    console.log(`✅ Item ajouté : ${newItem.nom}`);
    res.status(201).json({ message: "Article ajouté avec succès", item: newItem });
  } catch (err) {
    console.error("❌ Erreur ajout item :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// 🔄 PATCH pour inverser disponibilité
router.patch("/:id/disponible", async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) {
      console.log("❌ Plat introuvable");
      return res.status(404).json({ message: "Plat introuvable" });
    }

    menu.disponible = !menu.disponible;
    await menu.save();

    console.log(`✅ Disponibilité modifiée pour "${menu.nom}" → ${menu.disponible ? "Disponible" : "Indisponible"}`);
    res.json(menu);
  } catch (err) {
    console.error("🔥 Erreur PATCH :", err.message);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// 📂 Route pour toutes les catégories
router.get("/", async (req, res) => {
  try {
    const menus = await Menu.find().sort({ categorie: 1 });
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📂 Route dynamique pour une catégorie spécifique
router.get("/:categorie", async (req, res) => {
  try {
    const requestedCat = req.params.categorie.trim().toLowerCase();
    const menus = await Menu.find({
      categorie: { $regex: new RegExp(`^${requestedCat}$`, "i") },
      disponible: true,
    });
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
