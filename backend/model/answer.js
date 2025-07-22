const {model} = require('mongoose');
const {AnswerSchema} = require('../schema/answer.js');

const AnswerModel = new model("Answer",AnswerSchema);
module.exports={AnswerModel};