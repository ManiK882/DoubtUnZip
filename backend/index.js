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
const MessageRoute = require('./routes/MessageRoute.js');
const DoubtRoute = require('./routes/DoubtRoute.js');
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

server.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`);
    connectDB();
})



app.use('/auth',AuthRoute);
app.use('/answer',AnswerRoute);
app.use('/educator',EducatorRoute);
app.use('/message',MessageRoute);
app.use('/doubts',DoubtRoute);
// app.get('/', async (req, res) => {
//     try {
//         const result = await DoubtModel.find({}).populate('answers');

//         res.send(result);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

app.get('/getAnswer', async (req, res) => {

})

