const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')
require('dotenv').config({ path: '.env' })
const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["follow-request"] },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "name field must not empty"]
    },
    email: {
        type: String,
        required: [true, "email field must be filled"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        enum: ["student", "educator"],
        required: true
    },
    notifications: [notificationSchema],
    bio: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    solvedDoubts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doubt",
        }
    ],
    postedDoubts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doubt",
        }
    ],
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
})
UserSchema.pre("save", async function (next) {
     if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

UserSchema.methods.isPasswordCorrect = async function(password) {
    
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,

    },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRE
        })
}


module.exports = { UserSchema };