const { MessageModel } = require('../model/message.js');

const getMessage =async(req,res)=>{
    try {
        const { roomId } = req.query;
        const existingMessage = await MessageModel.find({ roomId }).sort({createdAt:1}).select("text messageTo messageFrom -_id")
        console.log("get api call :",existingMessage);
        res.status(200).json({success:true,message:"successfully fetched",existingMessage})
    } catch (error) {
       res.status(500).json({success:false,message:error.message}) 
    }
}

const sendMessage = async(req,res)=>{
    try {
        const {sender,receiver,message,roomId} = req.body;

        const newMessage = await MessageModel.create({
            roomId,
            messageTo:receiver,
            messageFrom:sender,
            text:message
        })

        res.status(200).json(newMessage);
    } catch (error) {
      res.status(500).json({success:false,message:error.message})   
    }
}

module.exports={
    getMessage,
    sendMessage
}