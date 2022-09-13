const express = require('express');
//.Router() permet de créer des routeurs séparés pour chaque route principale de l'application 
const router = express.Router();

//Import du middleware pour l'authentification
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

// import controller Sauce avec les middleware pour chaque route
const sauceControllers = require('../controllers/sauce');



// Routes CRUD
router.get('/', auth, sauceControllers.getAllSauces);

router.post('/', auth, multer, sauceControllers.createSauce);

router.get('/:id', auth, sauceControllers.getOneSauce);

router.put('/:id', auth, multer, sauceControllers.modifyOneSauce);

router.delete('/:id', auth, sauceControllers.deleteOneSauce);

router.post('/:id/like', auth, sauceControllers.likeSauce);



module.exports = router;