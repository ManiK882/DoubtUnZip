import { createContext, useEffect, useState } from "react";
import axios from '../api/axios.js';
import { useAxiosInterceptor } from "../hooks/useAxiosInterceptor.jsx";
export const GeneralContext = createContext();


export const GeneralContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);     // store user info
    const [loading, setLoading] = useState(true); // handle async loading
    const [isLoggedIn, setIsLoggedIn] = useState(false); // login status

  useAxiosInterceptor();

    const verifyUser =async()=>{
      try {
        const {data} = await axios.get('/auth/verify');
        const {success,message,user} = data;
        if(success){
            setUser(user);
        setIsLoggedIn(true);  
    
        }
      
        console.log(message);
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false)
      } finally{
        setLoading(false);
      }

    }
    useEffect(()=>{verifyUser()},[])
    return (
        <GeneralContext.Provider value={{ isLoggedIn, setIsLoggedIn,loading,user,setUser }}>
            {children}
        </GeneralContext.Provider>
    )

}