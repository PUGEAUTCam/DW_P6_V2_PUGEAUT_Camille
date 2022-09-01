const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//Pour s'assurer que 2 utilisateurs n'utilisent pas le meme mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

