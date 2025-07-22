const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const DoubtSchema = new Schema({
    title: String,
    description: String,
    image: String,
    tags: [String],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }
    ],
    isSolved: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
module.exports = { DoubtSchema };