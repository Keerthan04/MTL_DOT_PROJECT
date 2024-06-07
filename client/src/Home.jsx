import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./home.css";
import logo from  '../src/images/tmg-logo.jpg';
import CardOne from "./components/card";
import ErrorOne from "./components/Error";
import LogoutButton from "./components/LogoutButoon";
import { useAuth } from "./components/AuthContext";
import NewNav from "./components/newNav";
import HomeNav from "./components/HomeNav";
function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  // const [token,settoken]= useState("");
  const location = useLocation(); // Use useLocation to access passed state
  const username = location.state?.username;
  const { token } = useAuth();
  useEffect(() => {
    
    console.log(token);
    // settoken(token);
     // Access token from location state
    if (!token) {
      setError("404 not loged in");
      return;
    }

    axios
      .get("http://localhost:3000/home", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  }, [token]);

  if (error) {
    return <ErrorOne/>;
  }

  return (
      <div className="body">
      {/* <header>
        <div className="head-left">
          <img src={logo} alt="Logo" />
          <h2>
            <span id="dot">DOT</span>
            <span id="mmnl">-MTL</span>
          </h2>
        </div>
        <div className="head-right">
          <h4>Hello <span className="user">{username}</span></h4>
          <LogoutButton/>
        </div>
      </header> */}
      <HomeNav token={token} username={username}/>
      <div className="main">
        <div className="below">
          <div className="contents">
            <div className="entry">
              <div className="headername">
                <h4>ENTRY</h4>
              </div>
              <div className="entrycontent">
                <CardOne name="Scheduling" Token={token} Username ={username} RoutePath="/home/entry/Scheduling"/>
                <CardOne name="Editorial" Token={token} Username ={username} RoutePath="/home/entry/Editorial"/>{/*since for each route we need the token is sent as props only */}
                <CardOne name="Prepress" Token={token} Username ={username} RoutePath="/home/entry/Prepress"/>
                <CardOne name="CTP" Token={token} Username ={username} RoutePath="/home/entry/CTP"/>
                <CardOne name="Machinestop" Token={token} Username ={username} RoutePath="/home/entry/Machinestop"/>
                <CardOne name="Production" Token={token} Username ={username} RoutePath="/home/entry/Production"/>
              </div>
            </div>
            <div className="report">
              <div className="headername">
                <h4>REPORT</h4>
              </div>
              <div className="reportcontent">
                <CardOne name="Scheduling" Token={token} Username ={username} RoutePath="/home/report/Scheduling" />
                <CardOne name="Editorial" Token={token} Username ={username} RoutePath="/home/report/Editorial" />
                <CardOne name="Prepress" Token={token} Username ={username} RoutePath="/home/report/Prepress"/>
                <CardOne name="CTP" Token={token} Username ={username} RoutePath="/home/report/CTP"/>
                <CardOne name="Machinestop" Token={token} Username ={username} RoutePath="/home/report/Machinestop"/>
                <CardOne name="Production" Token={token} Username ={username} RoutePath="/home/report/Production"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <h3>Copyright 2024 © All Rights Reserved. The Manipal Group</h3>
      </footer>
    </div>
  );
}

export default Home;
