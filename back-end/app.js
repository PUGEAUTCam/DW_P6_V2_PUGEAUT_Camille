const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Connexion a MongoDB par le module mongoose
mongoose.connect('mongodb+srv://CamillePugeaut:KItchy1702@cluster0.g6c1q35.mongodb.net/?retryWrites=true&w=majority',
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

