const { Server } = require("socket.io");


let io;
const initSocket =(server)=>{
  io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        credentials:true
    }
  })
  io.on('connection',(socket)=>{
    console.log('A user connected',socket.id);
   socket.on('joinRoom',(roomId)=>{
    socket.join(roomId);
   })

   socket.on('sendMessage',({roomId,text,messageFrom,messageTo})=>{
    
    io.to(roomId).emit('receiveMessage',{text,messageFrom,messageTo});
   })

    socket.on('disconnect',()=>{
      console.log("User disconnected ",socket.id);
    })
  })
}

module.exports=initSocket;

