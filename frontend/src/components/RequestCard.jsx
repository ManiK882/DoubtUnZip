import React ,{useEffect} from 'react';
import axios from '../api/axios.js';
import { useState } from 'react';

const RequestCard = ({ request }) => {
const id=request?.sender?._id;
const [isAccepted,setIsAccepted] = useState(() => {
  const stored = localStorage.getItem("isAccepted");
  return stored ? JSON.parse(stored) : false;
});

  const handleAcceptAction = async()=>{
    try {
      const {data} = await axios.put('/educator/accept',{studentId:id});
      const {success,message} = data;
      if(success){
        setIsAccepted(true);
        console.log(message);
      }

    } catch (error) {
      console.log(error?.response.data?.message)
    }
  }

  const handleRejectAction = async()=>{
    try {
      const {data} = await axios.put('/educator/reject',{studentId:id});
      const {success,message} = data;
      if(success){
        console.log(message);
      }

    } catch (error) {
      console.log(error?.response.data?.message)
    }
  }
  useEffect(()=>{
    localStorage.setItem("isAccepted",JSON.stringify(isAccepted))
   
  },[isAccepted]);
 
console.log(request);
  return (
    <div className="request-card">
      
      <h3>{request.sender.name}</h3>
      <p>Message {request.sender.message}</p>    
      <button className='btn btn-primary' onClick={handleAcceptAction} disabled={isAccepted == true} >Accpet</button>
      <button className='btn btn-danger' onClick={handleRejectAction} >Reject</button>
    </div>
  );
};

export default RequestCard;
