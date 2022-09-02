const express = require('express');
//.Router() permet de créer des routeurs séparés pour chaque route principale de votre application – vous y enregistrez ensuite les routes individuelles.
const router = express.Router();

//Import du middleware pour l'authentification
const auth = require('../middleware/auth');
//Import de multer
const multer = require('../middleware/multer-config');
//On importe le controller Sauce necessaire aux routes
const sauceControllers = require('../controllers/sauce');



// Route pour get toutes les sauces
router.get('/', auth, sauceControllers.getAllSauces);

// Route CRUD pour creer une sauce
router.post('/', auth, multer, sauceControllers.createSauce);

// Route CRUD pour get une sauce avec l'ID
router.get('/:id', auth, sauceControllers.getOneSauce);

//Route CRUD pour modifier une sauce 
router.put('/:id', auth, multer, sauceControllers.modifyOneSauce);

//Route pour supprimer une sauce
router.delete('/:id', auth, sauceControllers.deleteOneSauce);

//Route pour liker une sauce
router.post('/:id/like', auth, sauceControllers.likeSauce);

//Route pour disliker une sauce
// router.post('/:id/like', auth, sauceControllers.dislikeSauce);





 
// On exporte notre router avec les differentes routes
module.exports = router;