import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./home.css";
import logo from '../src/images/tmg-logo.jpg';
import CardOne from "./components/card";
import ErrorOne from "./components/Error";
// import LogoutButton from "./components/LogoutButoon";
import { useAuth } from "./components/AuthContext";
import NewNav from "./components/newNav";
import HomeNav from "./components/HomeNav";

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation(); // Use useLocation to access passed state
  const username = location.state?.username;
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setError("404 not logged in");
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
    return <ErrorOne />;
  }

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <HomeNav token={token} username={username} />
      <div className="flex-grow flex items-center justify-center">
        <div className="container mx-auto p-4">
          <div className="contents grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="entry bg-white shadow-md rounded-lg p-4">
              <div className="headername">
                <h4 className="font-bold text-black sm:text-medium ">ENTRY</h4>
              </div>
              <div className="entrycontent grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CardOne name="Scheduling" Token={token} username={username} RoutePath="/home/entry/Scheduling" />
                <CardOne name="Editorial" Token={token} username={username} RoutePath="/home/entry/Editorial" />
                <CardOne name="Prepress" Token={token} username={username} RoutePath="/home/entry/Prepress" />
                <CardOne name="CTP" Token={token} username={username} RoutePath="/home/entry/CTP" />
                <CardOne name="Machinestop" Token={token} username={username} RoutePath="/home/entry/Machinestop" />
                <CardOne name="Production" Token={token} username={username} RoutePath="/home/entry/Production" />
              </div>
            </div>
            <div className="report bg-white shadow-md rounded-lg p-4">
              <div className="headername">
                <h4 className="font-bold text-black sm:text-medium ">REPORT</h4>
              </div>
              <div className="reportcontent grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CardOne name="Scheduling" Token={token} username={username} RoutePath="/home/report/Scheduling" />
                <CardOne name="Editorial" Token={token} username={username} RoutePath="/home/report/Editorial" />
                <CardOne name="Prepress" Token={token} username={username} RoutePath="/home/report/Prepress" />
                <CardOne name="CTP" Token={token} username={username} RoutePath="/home/report/CTP" />
                <CardOne name="Machinestop" Token={token} username={username} RoutePath="/home/report/Machinestop" />
                <CardOne name="Production" Token={token} username={username} RoutePath="/home/report/Production" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white text-center p-4">
        <h3>Copyright 2024 © All Rights Reserved. The Manipal Group</h3>
      </footer>
    </div>
  );
}

export default Home;
