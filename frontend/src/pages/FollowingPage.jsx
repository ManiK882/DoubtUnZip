import React, { useContext , useEffect , useState } from 'react'
import { GeneralContext } from './GeneralContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios.js';
const ITEMS_PER_PAGE = 5;
const FollowingPage = () => {
    
    const [educatorList , setEducatorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleChatOpen = (educator) => {
    navigate(`/chat/${educator._id}`, { state: { educator } });
  };
    const fetchData = async() =>{
      try {
        const {data} = await axios.get('/educator/followingList');
        console.log(data);
        const {educators} = data;
        if (data.success) {
        setEducatorList(educators.following || []);
      }

      } catch (error) {
         console.log("Error fetching educators:", error.response.data.message);
      }
    }
    useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(educatorList.length / ITEMS_PER_PAGE);
  const paginatedEducators = educatorList.slice(
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
      <h3>Following Educators</h3>
      {paginatedEducators.length === 0 ? (
        <p>You are not following any educators yet.</p>
      ) : (
        <ul className="list-group">
          {paginatedEducators.map((educator) => (
            // <Link to={`/chat/${educator._id}`} key={}><li className="list-group-item" >
            //   {educator.name}
            // </li></Link>
            <div
                key={educator._id}
                className="list-group-item list-group-item-action"
                onClick={() => handleChatOpen(educator)}
                style={{ cursor: 'pointer' }}
              >
                <strong>{educator.name}</strong>
              </div>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      {paginatedEducators.length>5? (
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

export default FollowingPage
