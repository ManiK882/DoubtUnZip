const { UserModel } = require('../model/user.js');

const educatorList = async (req, res) => {

    try {
        const educator = await UserModel.find({ role: "educator" });
        res.status(200).json(educator);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message)
    }

}

const educatorProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const educator = await UserModel.findById(id);

        if (!educator) {
            return res.status(401).json({ success: false, message: "educator not found" });
        }
        res.status(200).json({ success: true, educator });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const sentRequest = async (req, res) => {
    try {

        const educator = await UserModel.findById(req.body.educatorId);

        if (!educator) {
            return res.status(400).json({ message: "Educator doesnot exist" })
        }

        educator.notifications.push({
            sender: req.user._id,
            type: "follow-request",
            status: "pending",
        });

        await educator.save();

        res.status(200).json({ success: true, message: "Request sent successfully"});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const acceptFollowRequest = async (req, res) => {

    try {

        const studentId = req.body.studentId;
        const educatorId = req.user._id;

        console.log("student id",studentId);
        console.log("educator id",educatorId);
        await UserModel.updateOne(
            { _id: educatorId, "notifications.sender": studentId },
            { $set: { "notifications.$.status": "accepted" } }
        );

        await UserModel.findByIdAndUpdate(educatorId, {
            $push: { followers: studentId },
        },{
            new:true
        });

        await UserModel.findByIdAndUpdate(studentId, {
            $push: { following: educatorId },
        },{
            new:true
        });
        

        // const updatedStudent = await UserModel.findByIdAndUpdate(req.user._id, {
        //     status: "pending",
        //     $push: { following: req.body.educatorId }
        // }, {
        //     new: true
        // })

        res.status(200).json({
            success: true,
            message: "accepted by educator",
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const rejectRequest = async(req,res)=>{
  const  studentId  = req.body.studentId;
  const educatorId = req.user._id;

  try {
    await UserModel.updateOne(
      { _id: educatorId, "notifications.sender": studentId },
      { $set: { "notifications.$.status": "rejected" } }
    );
     await UserModel.findByIdAndUpdate(educatorId, {
            $pull: { followers: studentId },
        },{
            new:true
        });

        await UserModel.findByIdAndUpdate(studentId, {
            $pull: { following: educatorId },
        },{
            new:true
        });
    res.status(200).json({ success: true, message: "Follow request rejected" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const requestList = async(req,res)=>{
    
    try {

       if(req.user.role !== "educator"){
        return res.status(402).json({sucess:false,message:"Only educator have access"})
       }

       const educator = await UserModel.findById(req.user._id)
       .populate('notifications.sender',"name")
       .exec();

       console.log("educator",educator);
       res.status(200).json(
        {
            success:true,
            notifications:educator.notifications
        }
    )
    } catch (error) {
        console.log("error")
        res.status(500).json({success:false,message:error.message})
    }
}

const followingList = async(req,res)=>{
    try {
       const educators = await UserModel.findById(req.user._id)
        .populate("following","name");
        console.log("following list",educators.following);
        res.status(200).json({success:true,message:"successfully fetched",educators})
    } catch (error) {
        console.log(error.message);
    }
}

const followerList = async(req,res)=>{
try {
    const educator = await UserModel.findById(req.user._id)
    .populate("followers","name");

    res.status(200).json({success:true,followers:educator.followers})
} catch (error) {
    res.status(500).json({success:false,message:error.message})
}
}

const unFollowEducator = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(req.body.educatorId, {
            $pull: { followers: req.user._id }
        }, {
            new: true
        })

        await UserModel.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.educatorId}
        }, {
            new: true
        })

        res.stats(200).json({sucess:true,message:"successfully unfollow"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    educatorList,
    educatorProfile,
    sentRequest,
    acceptFollowRequest,
    rejectRequest,
    unFollowEducator,
    requestList,
    followingList,
    followerList
};