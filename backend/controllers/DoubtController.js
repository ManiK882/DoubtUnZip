const { DoubtModel } = require('../model/doubt.js');

const newDoubtAdd = async(req,res)=>{
     try {
            const {doubt} = req.body;            
            const newDoubt = new DoubtModel({doubt,postedBy:req.user});
            await newDoubt.save();
            res.status(200).json({ message: "successfully done" });

        } catch (error) {
            res.status(500).json(error.message)
        }
}

const fetchAllDoubts = async(req,res)=>{
     try {
        const existingDoubt = await DoubtModel.find();
        console.log(existingDoubt);
        res.status(200).json(existingDoubt);
    } catch (error) {
        res.status(404).json(error.message);
    }
}

const fetchDoubt = async(req,res)=>{
     try {
        const { id } = req.params;
        const existingDoubt = await DoubtModel.findById(id).populate({
            path: "answers",
            populate: {
                path: "answerText",
            }
        });
        console.log(existingDoubt);
        res.status(200).json(existingDoubt);
    } catch (error) {
        res.status(404).json(error.message);
    }
}
module.exports={
    newDoubtAdd,
    fetchDoubt,
    fetchAllDoubts
}