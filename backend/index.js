require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// 📁 Servir les fichiers statiques (images)
app.use("/images", express.static(path.join(__dirname, "..", "Frontend", "public", "images")));



// 🔗 Importer les routes du menu
const menuRoutes = require("./routes/menu");
app.use("/api/menu", menuRoutes);

// 🔗 Importer les routes de commande
const commandeRoutes = require("./routes/Commande");
app.use("/api/commande", commandeRoutes);
console.log("✅ Route Commande importée et utilisée");

// 🔗 Importer les routes de rating
const rateRoutes = require("./routes/rating");
app.use("/api/Rate", rateRoutes);

// 🌍 Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ Connexion à MongoDB réussie");

  // 🔍 DEBUG : Afficher les collections
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log("📁 Collections disponibles :", collections.map(c => c.name));

  // 🔍 Compter les documents dans Menu
  const Menu = require('./models/MenuItem');
  const countMenu = await Menu.countDocuments();
  console.log(`🍔 ${countMenu} items dans le menu`);

  // 🔍 Compter les commandes enregistrées
  const Commande = require('./models/Commande');
  const countCommandes = await Commande.countDocuments();
  console.log(`🧾 ${countCommandes} commandes dans la collection`);

  // 📡 Lancer le serveur
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 Serveur backend lancé sur http://localhost:${port}`);
  });
})
.catch(err => {
  console.error("❌ Erreur MongoDB :", err.message);
  process.exit(1);
});
