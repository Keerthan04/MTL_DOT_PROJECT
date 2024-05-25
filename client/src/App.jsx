import  { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './tmg-logo.jpg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log(`Logging in with username: ${username} and password: ${password}`);
    axios.post('http://localhost:3000/auth/login',
      {
        user_id: username,
        password: password
      })
      .then((res) => {
        if(res.status !== 200){
          console.log(res.data);
          return;
        }
        else{
          console.log(res.data);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login">
      <img src={logo} alt="school" id ="img"></img>
      <h2 ><span id="dot">DOT</span><span id='mmnl'>-MMNL</span></h2>
      <h3 id="">Login</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;