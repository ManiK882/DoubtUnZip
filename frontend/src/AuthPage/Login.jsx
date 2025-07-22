import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../pages/GeneralContext';
import Swal from 'sweetalert2';
function Login() {
    const navigate=useNavigate();
    const {setIsLoggedIn,setUser,user}=useContext(GeneralContext);

    const [userInfo,setUserInfo]=useState({
        email:"",
        password:""
    })

    const {email,password}=userInfo;

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setUserInfo({
            ...userInfo,
            [name]:value
        })
    }

    const handleOnSubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data}= await axios.post('http://localhost:4000/auth/login',{
               ... userInfo
            },
        {
            withCredentials:true
        })
        console.log("data",data);
            const {success,message,loggedInUser}=data;

            if(success){
                setIsLoggedIn(true);
                setUser(loggedInUser);
               
                if(loggedInUser.role === "student"){
                    setTimeout(()=>{
                        navigate('/profile');
                    },2000)
                }
                else{
                      setTimeout(()=>{
                        navigate(`/educator/profile/${loggedInUser._id}`);
                    },2000)
                }
                Swal.fire({
                    title:"Success",
                    text:`${message}`,
                    icon:'success',
                    confirmButtonText:'done'
                })
            }
            setUserInfo({
                email:" ",
                password:" "
            })
        } catch (error) {
             Swal.fire({
      title: "Error",
      text: error.response?.data?.message || "Login failed",
      icon: 'error',
      confirmButtonText: 'OK'
    });

    setIsLoggedIn(false);
    setUser(null);
    console.error(error);
        }
    }

    return (
        <div className='row mt-3'>
            <div className='col-6 offset-3'>
                 <h4>Log In Here!</h4>
                <form onSubmit={handleOnSubmit}>

                    <div className="form-group mt-3">
                        <label forhtml="email">Email address</label>
                        <input type="email" 
                        name='email'
                        value={email}
                        className="form-control" id="email" aria-describedby="emailHelp"
                       onChange={handleChange} />
                       
                    </div>
                    <div className="form-group mb-3 mt-3">
                        <label forhtml="password">Password</label>
                        <input type="password" 
                        name='password'
                        value={password} 
                        className="form-control" id="password"
                       onChange={handleChange} />
                    </div> 
                    <div className="form-group mb-1 text-end">
                        <a>forgot password</a> 
                    </div>
                   
                    <button type="submit" className="btn btn-primary mb-3 mt-3">Log In</button>
                </form>
            </div>

        </div>
    )
}

export default Login
