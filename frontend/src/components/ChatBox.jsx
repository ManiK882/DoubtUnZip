import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from '../api/axios.js'
import { GeneralContext } from '../pages/GeneralContext';
import socket from '../config/socket.js';
const ChatBox = ({ receiver }) => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const { user } = useContext(GeneralContext);
  const bottomRef = useRef(null);
  //creating roomid
  const roomId = user?.role === 'educator'?
  `${user?._id}-${receiver?._id}`:`${receiver?._id}-${user?._id}`;

  const fetchMessage = async() => {
    try {
      const { data } = await axios.get('/message/getMessage',{params: {
       roomId:roomId
      }})
      console.log("frontend get api call",data.existingMessage);
      setMessages(data.existingMessage);
      
    } catch (error) {
      console.log("Error in fetching the messages", error?.reponse?.data?.message);
    }
  }
  useEffect(() => { if (user && roomId) fetchMessage() }, [user,roomId]);

  //debugging purpose
  useEffect(()=>{
     console.log("Fetched messages: ", messages);
  },[messages]);

  useEffect(() => {
    //  Scroll to bottom on message update
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  //setup socket listener
 useEffect(()=>{
  socket.emit('joinRoom',roomId);

  socket.on('receiveMessage',({text,messageFrom,messageTo})=>{
    setMessages((prev)=>[...prev,{text,messageFrom,messageTo}]);
  })

  return()=>{
    socket.off('receiveMessage');
  }
 },[roomId]);

  const handleSend =async (e) => {
    //axios post call to backend.
    e.preventDefault();
    if (!msg.trim()) return;
    try {
      const newMessage = {
        roomId,
        sender: user._id,
        receiver: receiver._id,
        message: msg,
      }

      const res = await axios.post('/message/sendMessage', newMessage);

      
      console.log("coming from post call ",res.data);
      console.log("newMessage",res.data.newMessage);
      socket.emit('sendMessage',res.data);

      setMsg('');

    } catch (error) {
      console.log("error occure in sending message:", error?.response.data?.message);
    }
  }

  return (
    <div>
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '700px' }}>
        <h4 className="card-title mb-3 text-primary">Chat with {receiver?.name}</h4>

        <div
          className="border rounded p-3 mb-3 bg-light"
          style={{ height: '300px', overflowY: 'auto' }}
        >
          {messages?.length === 0 ? (
            <p className="text-muted">No messages yet.</p>
          ) : (
            messages && messages.map((m, index) => (
              <div
                key={index}
                className={`d-flex mb-2 ${m.messageFrom === user?._id ? 'justify-content-end' : 'justify-content-start'
                  }`}
              >
                <div
                  className={`px-3 py-2 rounded-pill ${m.messageFrom === user?._id ? 'bg-primary text-white' : 'bg-secondary text-white'
                    }`}
                >
                  {m.text}
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef}></div>
        </div>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type message..."
          />
          <button className="btn btn-primary" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox
