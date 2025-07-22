const {model} = require('mongoose');
const { DoubtSchema} = require('../schema/doubt.js');
const DoubtModel = new model("Doubt",DoubtSchema);
module.exports={DoubtModel};