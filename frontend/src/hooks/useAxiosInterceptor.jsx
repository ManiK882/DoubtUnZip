import { useNavigate } from 'react-router-dom'
import axiosInstance from '../api/axios.js'
import { useEffect } from 'react';

export const useAxiosInterceptor = () =>{
 const navigate = useNavigate();

 useEffect(()=>{
// Add response interceptor
 const interceptor = axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      Swal.fire({
        title: 'Session expired',
        text: 'Please log in again.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then(() => {
       navigate('/login');
      });
    }

    return Promise.reject(error);
  }
);

return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };

 },[navigate])
}