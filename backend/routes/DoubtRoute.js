const express = require('express');
const { verifyJWT } = require('../middleware/authMiddleware');
const { newDoubtAdd, fetchDoubt, fetchAllDoubts } = require('../controllers/DoubtController');
const router = express.Router();

router.post('/newDoubt',verifyJWT,newDoubtAdd);
router.get('/allDoubts',verifyJWT,fetchAllDoubts);
router.get('/:id',verifyJWT,fetchDoubt);

module.exports=router;