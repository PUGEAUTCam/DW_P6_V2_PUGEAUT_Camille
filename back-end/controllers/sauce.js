const Sauce = require('../models/Sauce');

//On exporte la fonction/logique metier/ methode qui va etre attribuee aux routes

//Pour creer une sauce
exports.createSauce = (req, res, next) => {
    const sauceBody = JSON.parse(req.body.sauce);
    delete sauceBody._id;
    delete sauceBody._userId;
    const sauce = new Sauce({
        ...sauceBody,
        userId: req.auth.userId, // On remplace l'Id de la req par celui du token
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [' '],
        usersdisLiked: [' '],
    });
  
    sauce.save()
    .then(() => { res.status(201).json({message: 'Sauce enregistrée'})})
    .catch(error => { res.status(400).json( { error })})
 };

//Pour recup toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };

//Pour recup une sauce 
  exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };
















// //Pour modifier les infos sur une sauce 
//   exports.modifyOneSauce = (req, res, next) => {
//     const sauceBody = req.file ? {
//         ...JSON.parse(req.body.sauce),
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : { ...req.body };
  
//     delete sauceBody._userId;
//     Sauce.findOne({_id: req.params.id})
//         .then((sauce) => {
//             if (sauce.userId != req.auth.userId) {
//                 res.status(401).json({ message : 'Not authorized'});
//             } else {
//                 Sauce.updateOne({ _id: req.params.id}, { ...sauceBody, _id: req.params.id})
//                 .then(() => res.status(200).json({message : 'Sauce parfaitement modifiée'}))
//                 .catch(error => res.status(401).json({ error }));
//             }
//         })
//         .catch((error) => {
//             res.status(400).json({ error });
//         });
//  };


// //Pour supprimer une sauce
//   exports.deleteOneSauce = (req, res, next) => {
//     Sauce.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Sauce correctement supprimée !'}))
//       .catch(error => res.status(400).json({ error }));
//   };





