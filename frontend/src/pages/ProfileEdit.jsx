import React from 'react'
import { VscBell } from "react-icons/vsc";
import { VscBellDot } from "react-icons/vsc";
const ProfileEdit = () => {
  return (
    <>
      <div className="profile-conatiner">
              <div className='profile-card'>
              <div className='profile-notification-icon'>
                  <VscBell /><VscBellDot /></div>
              <div className='profile-details'>
                  
                  <div className='profile-image'>image</div>
                  <h5>John Doe</h5>
                  <div className="profile-info">
                      
                  <span>followers</span>
                  <span>Specialization</span>
                  <span>Experience</span>
                  </div>
                  
              </div>
              
              <div className='profile-actions'>
                  <button className='btn btn-outline-primary'>Save</button>
                  
              </div>
            </div>
          </div>
    </>
  )
}

export default ProfileEdit
