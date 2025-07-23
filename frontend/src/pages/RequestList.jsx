import React, { useEffect, useState } from 'react'
import axios from '../api/axios.js'
import RequestCard from '../components/RequestCard';


const RequestList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
   
    const fetchRequests = async () => { 
        try {          
            const {data} = await axios.get('/educator/requestList');
            
            setRequests(data.notifications);
            
        } catch (error) {
              console.log("Failed to fetch requests:",error.response.data.message);
        }
        finally {
        setLoading(false);
      }
    }
    console.log(requests);
    useEffect(() => {fetchRequests() }, [])
    if (loading) return <p>Loading...</p>;
    return (
        <>
            {/* <div className="requests-page">
                <h2>Student Requests</h2>
                {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((req) => <RequestCard key={req.sender._id} request={req} />)
      )}
            </div> */}
            <div className="container my-5">
  <h2 className="text-center mb-4 text-primary">Student Requests</h2>

  {requests.length === 0 ? (
    <p className="text-center text-muted">No requests found.</p>
  ) : (
    <div className="row g-4">
      {requests.map((req) => (
        <div className="col-md-6 col-lg-4" key={req.sender._id}>
          <RequestCard request={req} />
        </div>
      ))}
    </div>
  )}
</div>

        </>
    )
}

export default RequestList
