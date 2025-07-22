require('dotenv').config({ path: '.env' })
const express = require('express');
const cors = require('cors');
const { PORT } = process.env;
const { users } = require('./data/user');
const { UserModel } = require('./model/user');
const { DoubtModel } = require('./model/doubt');
const { doubts } = require('./data/doubt')
const { AnswerModel } = require('./model/answer');
const { answers } = require('./data/answer');
const { connectDB } = require('./config/mongoDB');
const AuthRoute = require('./routes/AuthRoute');
const AnswerRoute = require('./routes/AnswerRoute.js');
const EducatorRoute=require('./routes/EducatorRoute.js');
const MessageRoute = require('./routes/MessageRoute.js')
const cookieParser = require('cookie-parser');
const initSocket = require('./config/socket.js')
const app = express();

const { createServer } = require('node:http');
const server = createServer(app);
initSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // your frontend
  credentials:true
}));
app.use(cookieParser());

// io.on('connection', (socket) => {
   
//   console.log('a user connected',socket.id);
//   socket.on("send-msg",(data)=>{
//     console.log(data);
//     io.to(room).emit("grp-msg");
//   })
 
//   socket.on("disconnect",()=>{
//     console.log("user disconnected");
//   })
// });

server.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
    connectDB();
})



app.use('/auth',AuthRoute);
app.use('/answer',AnswerRoute);
app.use('/educator',EducatorRoute);
app.use('/message',MessageRoute);

// app.get('/', async (req, res) => {
//     try {
//         const result = await DoubtModel.find({}).populate('answers');

//         res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

app.post('/newdoubt', async (req, res) => {
    try {
        const doubt = req.body;
        const newDoubt = new DoubtModel(doubt);
        await newDoubt.save();
        res.status(200).json({ message: "successfully done" })
    } catch (error) {
        res.status(500).json(error.message)
    }
})
app.get('/doubt/:id', async (req, res) => {
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
})

app.get('/getAnswer', async (req, res) => {

})
app.get('/addUser', (req, res) => {
    //inserting value 
    users.forEach((value) => {
        let newUser = new UserModel({
            _id: value._id,
            name: value.name,
            email: value.email,
            password: value.password,
            role: value.role,
            bio: value.bio,
            solvedDoubts: value.solvedDoubts,
            postedDoubts: value.postedDoubts
        })
        newUser.save();
    })
    res.send("data inserted");
    console.log(UserModel);
})

app.delete('/deleteUser', async (req, res) => {
    try {
        const user = await UserModel.deleteMany({});
        res.status(200).json({
            message: "All users deleted successfully",
            deletedCount: user.deletedCount
        })
    } catch (error) {
        res.json({ msg: "data not able to delete" });
    }
})

app.get('/addDoubt', (req, res) => {
    try {
        doubts.forEach((value) => {
            let newDoubt = new DoubtModel({
                _id: value._id,
                title: value.title,
                description: value.description,
                tags: value.tags,
                postedBy: value.postedBy,
                answers: value.answers,
                isSolved: value.isSolved
            })
            newDoubt.save();
        })

        res.json({ msg: "inserted successfully" })
    } catch (error) {
        res.json({ msg: error.message });
    }
})

app.get('/addAnswer', (req, res) => {
    try {
        answers.forEach((v) => {
            let newAnswer = new AnswerModel({
                _id: v._id,
                doubtId: v.doubtId,
                answeredBy: v.answeredBy,
                answerText: v.answerText,

            })
            newAnswer.save();
        })
        res.json({ msg: "success" });
    } catch (error) {
        res.json({ msg: error.message });
    }
})
