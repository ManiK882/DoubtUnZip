import React, { useContext } from 'react'
import { useParams,useLocation } from 'react-router-dom';
import ChatBox from '../components/ChatBox';
import { GeneralContext } from './GeneralContext';

const ChatPage = () => {
  const {user} = useContext(GeneralContext);
    const { id } = useParams();
  const location = useLocation();
  const follower = location.state?.follower;
  const educator = location.state?.educator;
  console.log(user);
  if(user?.role === "educator"){
    if (!follower) return <p>User data missing. Try clicking from follower list again.</p>;
  }
  else if(user?.role === "student")
  {
     if (!educator) return <p>User data missing. Try clicking from follower list again.</p>;
  }
   
  return (
    <>
 
    <div style={{ padding: "2rem" }}>
      
       <ChatBox receiver={user?.role === "educator" ? follower : educator} />
    </div>
 
    </>
  )
}

export default ChatPage
