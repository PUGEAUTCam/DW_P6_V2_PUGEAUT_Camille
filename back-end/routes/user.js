//Import Express
const express = require('express');
//Creation du router avec la fonction de Express
const router = express.Router();


//Import du controller
const userCtrl = require('../controllers/user');


//Creation des routes pour inscription et connexion
router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);


//Export de la route
module.exports = router;