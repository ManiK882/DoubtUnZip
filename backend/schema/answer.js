const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const AnswerSchema = new Schema({
    
    doubtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doubt",
    },
    answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    answerText: {
        type: String,
        required: true,
    },
    answerPic: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});
module.exports = { AnswerSchema };