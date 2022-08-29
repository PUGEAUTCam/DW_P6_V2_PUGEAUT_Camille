const express = require('express');
const app = express();
//DOTENV  pour les variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

// Import the mongoose module
const mongoose = require('mongoose');

//Connexion a MongoDB par le module mongoose
mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })

  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });

// app.use((req, res, next)=>{
//     res.json();
// });


module.exports = app;

