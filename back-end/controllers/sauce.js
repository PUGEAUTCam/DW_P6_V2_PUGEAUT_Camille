const Sauce = require('../models/Sauce');
const fs = require('fs');
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
        usersLiked: [],
        usersDisliked: [],
    });

    sauce.save()
        .then(() => { res.status(201).json({ message: 'Sauce enregistrée' }) })
        .catch(error => { res.status(400).json({ error }) })
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



//Pour modifier 
exports.modifyOneSauce = (req, res, next) => {
    // File in request ?
    const sauceBody = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete sauceBody._userId;

    Sauce.findOne({ _id: req.params.id })

        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({ message: 'Not authorized' });
            } else {
                //It's the same 
                Sauce.updateOne({ _id: req.params.id }, { ...sauceBody, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce parfaitement modifiée' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })

        .catch((error) => {
            res.status(400).json({ error });
        });
};


//Pour supprimer 
exports.deleteOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })

        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({ message: 'Not authorized' });
            } else {
                //it's the same 
                const filename = sauce.imageUrl.split('/images/')[1];
                //Pour supp du dossier img le fichier
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Sauce supprimée' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })

        .catch(error => {
            res.status(500).json({ error });
        });
};



//Pour liker/disliker une sauce 

exports.likeSauce = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;

    Sauce.findOne({ _id: req.params.id })

        .then((sauce) => {

            if (like === 1) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $addToSet: { usersLiked: userId } })
                    .then(() => res.status(200).json({ message: 'User et like pris en compte et ajoutee a la BDD' }))
                    .catch(error => res.status(500).json({ message: 'erreur' }))
            }

            else if (like === -1) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $addToSet: { usersDisliked: userId } })
                    .then(() => res.status(200).json({ message: 'User et dislike pris en compte et ajoutee a la BDD' }))
                    .catch(error => res.status(500).json({ message: 'erreur' }))
            }

            else if (like === 0 && sauce.usersLiked.includes(userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: userId } })
                    .then(() => res.status(200).json({ message: 'User supprime du tableau like et like supprime de la BDD' }))
                    .catch(error => res.status(500).json({ message: 'erreur' }))

            }

            else if (like === 0 && sauce.usersDisliked.includes(userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } })
                    .then(() => res.status(200).json({ message: 'User supprime du tableau dislike et dislike supprime de la BDD' }))
                    .catch(error => res.status(500).json({ message: 'erreur' }))
            }
        })

        .catch((error) => {
            res.status(500).json({ message: 'erreur' });
        });
};






