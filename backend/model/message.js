
const { model } = require('mongoose');
const { MessageSchema } = require('../schema/message.js');
const MessageModel = new model("message",MessageSchema);
module.exports = { MessageModel };