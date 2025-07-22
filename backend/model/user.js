const {model} = require('mongoose');
const {UserSchema} = require('../schema/user');
const UserModel = new model("User",UserSchema);
module.exports={UserModel};