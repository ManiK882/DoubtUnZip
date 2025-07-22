import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

const EducatorList = () => {
    const [list,setList]=useState([]);
    const [followedIds, setFollowedIds]=useState(new Set());
    const [status,setStatus] = useState(false);
    async function handleFollow(id){
       const res = await axios.put("http://localhost:4000/educator/unfollow/unFollowEducator",{educatorId:id},{withCredentials:true});
        console.log(res);
        const {success}=res.data;
        if(success){
           setFollowedIds((prev)=>{
        console.log("Previous Set:", prev);
        const updated = new Set(prev);//creating clone
        if(!updated.has(id)){
          updated.add(id);
           console.log(`Followed ${id}`);
        }
        return updated;
      })
      setStatus()
        }
    }
    const handleClick=async(id)=>{
      if(status){
       handleFollow(id);
      }
      await axios.put("http://localhost:4000/educator/follow/followEducator")
      setFollowedIds((prev)=>{
        console.log("Previous Set:", prev);
        const updated = new Set(prev);//creating clone

        if(updated.has(id)){
          updated.delete(id);
          console.log(`Unfollowed ${id}`);
        }
        else{
          updated.add(id);
           console.log(`Followed ${id}`);
        }
        return updated;
      })
     
    }
    
    const fetchData = async()=>{
            try {
                const {data}=await axios.get("http://localhost:4000/educator/getList");
                console.log(data);
                setList(data);
                console.log("data fetched");
            } catch (error) {
                 console.error("Error fetching educators:", error.message);
            }
        }
    useEffect(()=>{
        fetchData();
    },[])
  return (
    <>
    <div className='container'>
<table class="table table-hover">
  <tbody>
    {
      list && list.map((item,index)=>{
        return (
          <Link to={`/educator/${item._id}`} className='d-flex'>
           <tr key={index}>
      <td><CgProfile /></td>
      <td>{item.name}</td>
      
    </tr>
          </Link>
          
        )
      })
    }
   
  </tbody>
</table>
    </div>
      
    </>
  )
}

export default EducatorList
