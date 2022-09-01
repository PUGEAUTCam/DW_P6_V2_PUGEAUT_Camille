//Import de JWT
const jwt = require('jsonwebtoken');
const app = require('../app');
 
module.exports = (req, res, next) => {
   try {
    //On recupere le token du header authorization et on le split de bearer 
       const token = req.headers.authorization.split(' ')[1];
       //On verifie
       const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
       //On recup l'ID de l'utilisateur dans notre token 
       const userId = decodedToken.userId;
       //On rajoute cet ID a req pour les routes
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};

