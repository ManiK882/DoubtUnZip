const express = require('express');
const router = express.Router();
const {signup,login,logout, verify}= require('../controllers/AuthControllers.js');
const {verifyJWT} = require('../middleware/authMiddleware.js');


router.post('/login', login)

router.post('/signup', signup );

router.post('/logout',verifyJWT,logout);

router.get('/verify',verifyJWT,verify);

module.exports = router;