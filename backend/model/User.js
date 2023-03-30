const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({


})

const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;