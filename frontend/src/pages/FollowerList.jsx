import axios from '../api/axios.js';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const ITEMS_PER_PAGE=5;
const FollowerList = () => {
  const [followers, setFollowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const handleChatOpen = (follower) => {
    navigate(`/chat/${follower._id}`, { state: { follower } });
  };
  const fetchFollowers = async () => {
    try {
      const res = await axios.get("/educator/followerList");
      setFollowers(res.data.followers || []);
    } catch (error) {
      console.error("Error fetching followers", error.response.data.message);
    }
  }
  useEffect(() => { fetchFollowers() }, [])

  const totalPages = Math.ceil(followers.length / ITEMS_PER_PAGE);
  const paginatedFollowers = followers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-3">Your Followers</h2>

        {paginatedFollowers.length === 0 ? (
          <p>No followers yet.</p>
        ) : (
          <div className="list-group">
            {paginatedFollowers.map((follower) => (
              <div
                key={follower._id}
                className="list-group-item list-group-item-action"
                onClick={() => handleChatOpen(follower)}
                style={{ cursor: 'pointer' }}
              >
                <strong>{follower.name}</strong>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {paginatedFollowers.length>5?(
          <div className="mt-3 d-flex justify-content-center gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo; Prev
          </button>
          <span className="align-self-center">Page {currentPage} of {totalPages}</span>
          <button
            className="btn btn-outline-primary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </div>
        ):null}
        
      </div>
    </>
  )
}

export default FollowerList
