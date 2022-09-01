//Import mongoose
const mongoose = require('mongoose');

// Creation du schema pour les sauces
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true},
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true},
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true},
  likes: { type: Number, default: 0},
  dislikes: { type: Number, default: 0},
  usersLiked : { type: Array},
  usersDisliked : { type: Array},
});


//On exporte le model pour enregistrer nos sauces selon le shema cree
module.exports = mongoose.model('Sauce', sauceSchema);


