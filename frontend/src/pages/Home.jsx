import { useState, useEffect } from 'react';
import axios from 'axios';
// import socket from '../config/socket';
import { CgArrowDownR } from "react-icons/cg";
import '../style/Home.css'
import Swal from 'sweetalert2';

function Home() {
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  // const handleClick = (e) => {
  //   e.preventDefault();
  //   socket.emit("send-msg", msg, (response) => {
  //     console.log(msg);
  //     console.log("got response from server", response);
  //   })


  //   setMsg("")
  // }
  // useEffect(() => {
  //   // fetchData();
  //   socket.on("connect", () => {
  //     console.log("Connected:", socket.id);
  //   });

  // }, [])

  function handleAction() {
    Swal.fire({

      text: "Please Log In",

      confirmButtonText: 'ok',
       confirmButtonColor:'rgb(27, 143, 225)'
    })
  }
  return (
    <>

      <div className='cover'>
        <div className='box'>
          <h1>Put Your Doubt</h1>
          <span onClick={handleAction} className='clickbtn'><CgArrowDownR /></span>
        </div>

      </div>
      {/* <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button type='submit' onClick={handleClick}>send</button> */}
    </>
  )
}

export default Home
