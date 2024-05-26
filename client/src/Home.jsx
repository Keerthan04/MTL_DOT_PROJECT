import{ useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation(); // Use useLocation to access passed state

  useEffect(() => {
    const token = location.state?.token; // Access token from location state
    if (!token) {
      setError('No token found, please log in.');
      return;
    }

    axios.get('http://localhost:3000/home', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    });
  }, [location.state?.token]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Home Page</h2>
    </div>
  );
}

export default Home;
