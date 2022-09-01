//Import Express et mise en oeuvre
const express = require('express');
const app = express();
//Package Helmet pour configurer les en-tetes HTTP
const helmet = require('helmet');
// Import the mongoose module
const mongoose = require('mongoose');
//Impot pour acceder au path du serveur
const path = require('path');

//Import des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce')

//Utilisation de Helmet pour la securite
app.use(helmet());

//Middleware qui gere les requete POST venant du front en extrayant le corps JSON
app.use(express.json());

//DOTENV  pour les variables d'environnement
const dotenv = require("dotenv");
require('dotenv').config();

//Connexion a MongoDB par le module mongoose.connect
mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(() => console.log('Connexion à MongoDB échouée'));

//Middleware CORS pour autoriser l'acces 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

//On relie API avec nos routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

//Export de app
module.exports = app;



