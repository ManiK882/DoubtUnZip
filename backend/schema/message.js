const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const MessageSchema = new Schema({
    roomId: { type: String},
    text:{
        type:String,
    },
    image:{
        type:String
    },
    messageTo:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    messageFrom:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt: { type: Date, default: Date.now, expires: '2d' },
},{timestamps:true})

module.exports={MessageSchema};