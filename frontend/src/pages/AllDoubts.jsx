import React, { useEffect, useState } from 'react'
import axios from '../api/axios.js'
import {Link} from 'react-router-dom'
const AllDoubts = () => {
    const [allDoubts,setAllDoubts] = useState([]);
    const fetchAllDoubts = async(req,res)=>{
        try {
            const {data} = await axios.get('/doubts/allDoubts');
            setAllDoubts(data);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }
    useEffect(()=>{fetchAllDoubts()},[])
    if(!allDoubts){
        return <>No doubts yet</>
    }
  return (
    <>
      {
        allDoubts && allDoubts.map((d,index)=>{
           return <Link to ={`/doubt/${d._id}`}key={index}>{d.doubt}</Link>
        })
      }
    </>
  )
}

export default AllDoubts
