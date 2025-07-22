import React ,{useContext, useEffect, useState} from 'react'
import axios from '../api/axios';
import { VscBell } from "react-icons/vsc";
import { VscBellDot } from "react-icons/vsc";
import '../style/ProfilePage.css';
import {Link, useParams} from 'react-router-dom';
import { GeneralContext } from './GeneralContext';

const EducatorProfilePage = () => {
const [isNotification,setIsNotification] = useState(true);
const [isFollowed,setIsFollowed] = useState(()=>{
  const store = localStorage.getItem("isFollowed")
  return store?JSON.parse(store):false
});
const [educatorInfo,setEducatorInfo]=useState({});
const {user}=useContext(GeneralContext);
const {id}=useParams();

const handleEducatorInfo = async()=>{
  try {
    const {data} = await axios.get(`/educator/getProfile/${id}`);
    console.log(data);
    const {educator} = data;
    setEducatorInfo(educator);
    
  } catch (error) {
    console.log(error.response?.data.message);
  }
}

const handleRequest = async()=>{
  try {
    const {data} = await axios.put('/educator/sentrequest',{educatorId:`${id}`});
    const {success,message}=data;
    if(success){
      setIsFollowed(true)
      setIsNotification(true)
    }
    console.log(message);
  } catch (error) {
    console.log(error.response?.data.message);

  }
}

const handleUnFollow = async()=>{
  try {
    const {data} = await axios.put('/educator/unfollow',{educatorId:`${id}`});
    const {success,message} = data;

    if(success){
      setIsFollowed(false)
    }
  } catch (error) {
    setIsFollowed(true);
    console.log(error.response?.data.message);
  }
}

useEffect(()=>{handleEducatorInfo()},[]);
useEffect(()=>{
 localStorage.setItem("isFollowed",JSON.stringify(isFollowed))
},[isFollowed])
  return (
    <>
    <div className="profile-conatiner">
        <div className='profile-card'>
          {user?.role === 'educator' ? (
  <Link to={"/requests"} className='profile-notification-icon'>
    {isNotification ? <VscBellDot /> : <VscBell />}
  </Link>
) : null}

        
        <div className='profile-details'>
            
            <div className='profile-image'>image</div>
            <h5>{educatorInfo.name}</h5>
            <div className="profile-info">
                
            <Link to='/educator/followers'>followers:</Link><span>{educatorInfo.followers?.length}</span>
            
            {/* <span>Specialization:{educatorInfo.}</span>
            <span>Experience:{educatorInfo}</span> */}
            </div>
            
        </div>
        
        <div className='profile-actions'>
          {
            user?.role === "educator"? <Link to="/educator/profile/edit" className='btn btn-outline-primary'>Edit</Link >:null
          }
           
            {user?.role === "student"?
            ( 
                <>
                <button className='btn btn-primary' onClick={handleRequest} disabled={isFollowed == true}>Follow</button>
                <button className='btn btn-outline-primary' onClick={handleUnFollow}>Unfollow</button>
                
                </>  
           
            )            
            :null
            }
        </div>
      </div>
    </div>
      
    </>
  )
}

export default EducatorProfilePage
