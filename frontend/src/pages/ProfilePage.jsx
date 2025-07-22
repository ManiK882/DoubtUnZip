import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import React ,{useContext}from 'react'

import '../style/ProfilePage.css'

import { FaUserCheck } from "react-icons/fa";

import { IoCameraSharp } from "react-icons/io5";
import { MdTextsms } from "react-icons/md";
import { GeneralContext } from './GeneralContext';

const ProfilePage = () => {
  const {user} = useContext(GeneralContext);
  
  return (
    <>
      <div className="container mt-5">
      <div className="row align-items-center bg-white shadow rounded p-4">
        {/* Left Section */}
        <div className="col-md-7">
          <div className="d-flex align-items-center mb-3">
            <div
              className="rounded-circle bg-secondary"
              style={{
                width: '80px',
                height: '80px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="ms-3">
              <h5 className="mb-1">My Profile</h5>
              <Link to="/following" className="btn btn-outline-primary btn-sm mt-1">
                Following <FaUserCheck />
              </Link>
            </div>
          </div>

          <div className="mb-2">
            <strong>Name:</strong> <span className="ms-2">{user?.name}</span>
          </div>
          <div className="mb-2">
            <strong>Email:</strong> <span className="ms-2">{user?.email}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-5 text-end">
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-outline-secondary">
              <IoCameraSharp />
            </button>
            <button className="btn btn-outline-secondary">
              <MdTextsms />
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfilePage
