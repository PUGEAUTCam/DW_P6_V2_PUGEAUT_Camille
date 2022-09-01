//Import bcrypt pour hash le MDP
const bcrypt = require('bcrypt');
//Import JWT pour creer et verifier les tokens d'authentification
const jwt = require('jsonwebtoken');
//DOTENV pour la cle secrete du token
require('dotenv').config();
//Impot du modele User pour creer un nouvel user
const User = require('../models/User');


//Pour les inscriptions, nouveaux utilisateurs 
exports.signup = (req, res, next) => {
    //Je hash le MDP 
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: `'L'utilisateur a bien été enregistré` }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };



//Pour les utilisateurs deja enregistres
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Email ou mot de passe incorrect'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        //Mise en place des tokens grace a la fonction sign de JWT 
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.ACCESS_TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

