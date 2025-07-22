import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { GeneralContext } from '../pages/GeneralContext';
function Signup() {
    const navigate = useNavigate();
    const {setIsLoggedIn,loading,setLoading,setUser}=useContext(GeneralContext)
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        password: "",
        role: ""
    });
    const { username, email, password, role } = userInfo;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:4000/auth/signup", {
                ...userInfo
            },{ withCredentials: true })
            console.log(data);
            const { success, message ,loggedInUser } = data;
            if (success) {
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
                    title: 'Success',
                    text: `${message}`,
                    icon: 'success',
                    confirmButtonText: 'done'
                })               
                
            }
        } catch (error) {
            setIsLoggedIn(false);
                setUser(null);
            console.error(error)
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data?.message,
                icon: 'error',
                confirmButtonText: 'ok'
            })
        }
    }
    return (
        <div className='container d-flex justify-content-center align-items-center min-vh-100 '>
            <div className='row mt-3 w-100'>
            <div className='col-6 offset-3 '>
                <h4>Sign Up Here!</h4>
                <form onSubmit={handleOnSubmit}>
                    <div className="form-group mt-3">
                        <label htmlFor="name">Username</label>
                        <input type="text"
                            className="form-control"
                            id="name"
                            name='username'
                            value={username}
                            onChange={handleChange} />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name='email'
                            value={email}
                            onChange={handleChange} />

                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            value={password}
                            onChange={handleChange} />
                            <span>Must be 8 character</span>
                    </div>
                    <div className="form-group mt-3">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="role" id="inlineRadio1" value="student"
                                onChange={handleChange} />
                            <label className="form-check-label" htmlFor="inlineRadio1">Student</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="role" id="inlineRadio2" value="educator"
                                onChange={handleChange} />
                            <label className="form-check-label" htmlFor="inlineRadio2">Educator</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3 mb-3 ">Sign Up</button>


                </form>
            </div>

        </div>
        </div>
        
    )
}

export default Signup
