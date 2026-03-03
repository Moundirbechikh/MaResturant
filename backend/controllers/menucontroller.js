const Menu = require("../models/MenuItem");

const toggleDisponibilite = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Plat introuvable" });

    menu.disponible = !menu.disponible;
    const updated = await menu.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

module.exports = { toggleDisponibilite };
