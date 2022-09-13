const express = require('express');
//Creation du router avec la fonction de Express
const router = express.Router();

const userCtrl = require('../controllers/user');

const passwordValidator = require('../middleware/password-config')


//Creation des routes pour inscription et connexion
router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;