const express = require('express');
const router = express.Router();
const {AnswerModel} = require('../model/answer.js');
const {DoubtModel}=require('../model/doubt.js');
router.post('/addAnswer', async (req, res) => {
    try {
        const { answer, id } = req.body;
        
        const newAnswer = new AnswerModel({
            answerText: answer,
            doubtId: id
        })
        await newAnswer.save();
    
        const existingDoubt = await DoubtModel.findById(id);
        if (!existingDoubt) {
            return res.status(404).json({ success:false,message: "Doubt not found" });
        }
        existingDoubt.answers.push(newAnswer._id);
        await existingDoubt.save();
        res.status(200).json({ success:true,message: "Answer added" });
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
})

module.exports=router;