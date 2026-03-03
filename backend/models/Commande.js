const mongoose = require('mongoose');

const elementsCommandesshema = new mongoose.Schema({
  titre: String,       // ex: "Petite", "Moyenne", "Grande"
  prix: Number       // prix correspondant
});
const commandeSchema = new mongoose.Schema({
  nomClient: String,
  numeroClient: String,
  elementsCommandes: [elementsCommandesshema],
  prixTotal: Number,
  date: String,
  heure: String
},{ collection: "commandes" });

module.exports = mongoose.model('Commande', commandeSchema);
