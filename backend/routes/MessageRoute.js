const express = require('express');
const router = express.Router();
const {getMessage,sendMessage} = require('../controllers/MessageController.js');

router.get('/getMessage',getMessage);
router.post('/sendMessage',sendMessage);

module.exports=router;