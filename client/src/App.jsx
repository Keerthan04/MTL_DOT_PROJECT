import { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from  '../src/images/tmg-logo.jpg';
import { useNavigate } from 'react-router-dom';
import Home from './Home'; // Import Home component

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState(null); // State to store token
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    axios.post('http://localhost:3000/auth/login', {
      user_id: username,
      password: password
    })
    .then((res) => {
      if (res.status === 200) {
        const token = res.data.token;
        setToken(token); // Store the token in state
        navigate('/home', { state: { token } }); // Pass token as state in navigate
      }
    })
    .catch((err) => {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    });
  };

  return (
    <>
    <div className="body">
      <div className="login">
        <img src={logo} alt="school" id="img" />
        <h2><span id="dot">DOT</span><span id='mmnl'>-MMNL</span></h2>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {error && <label className="error">{error}</label>}
      </div>
    </div>
  </>
  );
}

export default Login;


//axios error handling
/*
Successful Response Handling
When you send an HTTP request using axios, and the request is successful (the server responds with a status code in the range of 2xx), the .then block is executed. The res object in the .then block contains the response from the server. This object typically includes:

status: The HTTP status code (e.g., 200 for success).
data: The payload returned from the server, which could be any data you need (e.g., a message or token).
headers: The response headers.
config: The request configuration.
In your case:

javascript
Copy code
axios.post('http://localhost:3000/auth/login', {
  user_id: username,
  password: password
})
.then((res) => {
  if (res.status === 200) {
    navigate('/home'); // Redirect to home page on successful login
  }
})
If the response status is 200, it means the login was successful.
The navigate('/home') function redirects the user to the home page.
Error Handling
If the request fails (the server responds with a status code outside the range of 2xx, or there is a network error), the .catch block is executed. The err object in the .catch block contains details about the error. This object typically includes:

response: The response object if the server responded with a non-2xx status code.
message: A message describing the error.
request: The request that generated the error.
config: The request configuration.
The response object within err includes:

status: The HTTP status code returned by the server (e.g., 400 for a bad request, 401 for unauthorized).
data: The payload returned from the server, which often includes an error message.
headers: The response headers.
In your case:

javascript
Copy code
.catch((err) => {
  if (err.response) {
    setError(err.response.data.message); // Set error message from backend
  } else {
    setError('An error occurred. Please try again.');
  }
});
err.response exists if the server responded with a non-2xx status code.
err.response.data.message contains the error message sent by the backend. This message is used to update the error state, which will be displayed to the user.
If err.response is not present (e.g., due to a network error), a generic error message ('An error occurred. Please try again.') is set.
*/