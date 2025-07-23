import axios from 'axios';
import Swal from 'sweetalert2';
import React , { useContext } from 'react'
import { GeneralContext } from '../pages/GeneralContext'
import { Link,useLocation, useNavigate } from "react-router-dom";
import { MdOutlineFormatListBulleted } from "react-icons/md";

function Navbar() {
  const{ isLoggedIn , setIsLoggedIn , setUser} = useContext(GeneralContext);
  const navigate = useNavigate();
  // const location = useLocation();

  // // Hide navbar on /login and /register
  // const hideNavbarRoutes = ['/login', '/signup'];
  // if (hideNavbarRoutes.includes(location.pathname)) {
  //   return null; // Don’t render navbar
  // }
   const loggingout = async () => {
            try {
                //this handle 2XX code.
                const { data } = await axios.post('http://localhost:4000/auth/logout', {},{
                    withCredentials: true
                })
                console.log(data);
                 localStorage.removeItem("isFollowing");
                 localStorage.removeItem("isAccepted");
                const { success, message } = data;
                if (success) {
                    setIsLoggedIn(false);
                    setUser(null); 
                     Swal.fire({
                    title: 'Success',
                    text: message,
                    icon: 'success',
                    confirmButtonText: 'Done',
                });                                
                    navigate('/');
                           
                }
            } catch (error) {//this catches all 4XX,5XX code
                Swal.fire({
                    title: 'Error',
                    text: error.response?.data?.message || 'Logout failed',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                console.error(error);
                console.log(error.message);
            }
        }

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top box-shodow">
  <div className="container-fluid">
   
    <span className="navbar-brand offset-1" >
     DoubtUnZip
    </span>
 
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      <ul className="navbar-nav ms-md-5 mb-2 mb-lg-0 ">
         {
          isLoggedIn?(
           <li className="nav-item">
              <Link to='/educator/list'  className='nav-link active'> Educator List </Link>
           </li>                                            
          ):null
        }
        {
          isLoggedIn?(
           <li className="nav-item">
              <Link to='/educator/list' className='nav-link active'> All Doubts </Link>
           </li>                                            
          ):null
        }

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/signup">Sign Up</Link>
        </li>
        {isLoggedIn ?(
        <li className="nav-item">
           <button className="btn nav-link border-0 bg-transparent" 
           style={{ cursor: 'pointer' }}
           onClick={loggingout} >Log Out</button>
        </li>) : (<li className="nav-item">
           <Link className="nav-link" to="/login">Log In</Link>
        </li> )
        }     
      </ul>
      
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
