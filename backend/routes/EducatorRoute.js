const express = require('express');
const router = express.Router();

const {educatorList, acceptFollowRequest, 
    unFollowEducator, educatorProfile,sentRequest, 
    rejectRequest, requestList ,followingList,
    followerList}=require('../controllers/EducatorController')
const {verifyJWT,verifyFollowing_Educator}=require('../middleware/authMiddleware');

router.get('/getList',educatorList);
router.get('/getProfile/:id',educatorProfile)
router.put('/sentrequest',verifyJWT,verifyFollowing_Educator,sentRequest);
router.put('/accept',verifyJWT,acceptFollowRequest);
router.put('/reject',verifyJWT,rejectRequest);
router.put('/unfollow',verifyJWT,unFollowEducator);
router.get('/requestlist',verifyJWT,requestList);
router.get('/followingList',verifyJWT,followingList);
router.get('/followerList',verifyJWT,followerList)
module.exports = router;