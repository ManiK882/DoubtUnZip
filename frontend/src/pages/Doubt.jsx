import React, { useState, useEffect } from 'react'
import { IoReturnDownBackOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom'
import axios from '../api/axios.js'


function Doubt() {
    const { id } = useParams();
    const [doubtInfo, setDoubtInfo] = useState({});
    const [replayBtn,setReplayBtn]=useState(false);
    const [answer,setAnswer]=useState();
    const [dbAnswer,setDbAnswer]=useState([]);
    const handleClick=()=>{
        setReplayBtn(!replayBtn);
    }
    const handleChange=(e)=>{
        const {value}=e.target;       
        setAnswer(value);
        
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.post("/answer/addAnswer",{answer,id});
            
            const {success,message}=data;
            if(success){
                console.log(message);
            }
            else{
                console.log("backend",message);
            }
        } catch (error) {
            console.log("frontend",error);
        }
    }
    useEffect(() => {
        const fetchDoubt = async () => {
            try {
                const { data } = await axios.get(`/doubts/${id}`);
                setDoubtInfo(data);               
                const {answers}=data;
                console.log(answer);
               setDbAnswer(answers);
            } catch (error) {
                console.log(error)
            }
        }
        fetchDoubt();

    }, [id])

    return (
        <>
 <div className="container d-flex justify-content-center align-items-center min-vh-100">
  <div className="row w-100">
    <div className="col-12 col-md-6 offset-md-3">
      
        <div className="mb-3 text-center">
          <h4>{doubtInfo?.doubt}</h4>
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleClick}>
            <IoReturnDownBackOutline />
          </button>
        </div>
       {
       replayBtn &&
       <div className='mt-3 '>
           <form onSubmit={handleSubmit}>  
        <label forhtml="answers" className="form-label">Write Answer</label>
        <textarea className="form-control" id="answers" rows="3" name='answer' value={answer} onChange={handleChange}></textarea>
        <button type='submit' className='btn btn-outline-primary text-center mt-3'>submit</button>
        </form>
        </div>  
       }    
       {
      dbAnswer?.length>0?(
        dbAnswer.map((i)=>{
            return(
                <p>{i.answerText}</p>
            )
        })
      ):(
        <p>no answer found</p>
      )
            
       } 
    </div>
  </div>
</div>


        </>
    )
}

export default Doubt
