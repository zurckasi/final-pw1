const mongoose = require("../db");
const favorito = new mongoose.Schema({
  titulo: { type: String},
  detalhes: { type: String},
  categoria: { type: String},
  link: { type: String},
});
const Favorito = mongoose.model("favorito", favorito);
module.exports = Favorito;
