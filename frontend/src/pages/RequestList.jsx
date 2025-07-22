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
            <div className="requests-page">
                <h2>Student Requests</h2>
                {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((req) => <RequestCard key={req.sender._id} request={req} />)
      )}
            </div>
        </>
    )
}

export default RequestList
