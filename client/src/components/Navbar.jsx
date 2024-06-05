import React, { useState } from "react";
import Dropdown from "./dropdownbutton";
import "./navbar.css";
import Logo from '../images/tmg-logo.jpg';
import "../home.css";
import LogoutButton from "../components/LogoutButoon";

function Navbar({ username ,token}) {
  const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  const [reportShowDropdown, setReportShowDropdown] = useState(false);

  const handleEntryDropdownToggle = () => {
    setEntryShowDropdown(!entryShowDropdown);
    if(reportShowDropdown === true) setReportShowDropdown(!reportShowDropdown);
  };

  const handleReportDropdownToggle = () => {
    setReportShowDropdown(!reportShowDropdown);
    if(entryShowDropdown === true) setEntryShowDropdown(!entryShowDropdown);
  };

  return (
    <header className="navbar-container">
      <div className="nav-left">
        <img src={Logo} alt="Logo" className="navbar-logo" />
        <h2><span id="dot">DOT</span><span id='mmnl'>-MTL</span></h2>
        <h4>Hello <span className="user">{username}</span></h4>
      </div>
      <div className="nav-right">
        <a href="#">Home</a>
        <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={handleEntryDropdownToggle}>Entry</button>
          {entryShowDropdown && (
            <div className="dropdown-menu">
              <Dropdown name="Scheduling" Token={token} Username={username} RoutePath="/home/entry/Scheduling" />
              <Dropdown name="Editorial" Token={token} Username={username} RoutePath="/home/entry/Editorial" />
              <Dropdown name="CTP" Token={token} Username={username} RoutePath="/home/entry/CTP" />
              <Dropdown name="Prepress" Token={token} Username={username} RoutePath="/home/entry/Prepress" />
              <Dropdown name="Machine stop" Token={token} Username={username} RoutePath="/home/entry/Machinestop" />
              <Dropdown name="Production" Token={token} Username={username} RoutePath="/home/entry/Production" />
            </div>
          )}
        </div>
        <div className="dropdown-container">
          <button className="dropdown-toggle" onClick={handleReportDropdownToggle}>Report</button>
          {reportShowDropdown && (
            <div className="dropdown-menu">
              <Dropdown name="Scheduling" Token={token} Username={username} RoutePath="/home/report/Scheduling" />
              <Dropdown name="Editorial" Token={token} Username={username} RoutePath="/home/report/Editorial" />
              <Dropdown name="CTP" Token={token} Username={username} RoutePath="/home/report/CTP" />
              <Dropdown name="Prepress" Token={token} Username={username} RoutePath="/home/report/Prepress" />
              <Dropdown name="Machine stop" Token={token} Username={username} RoutePath="/home/report/Machinestop" />
              <Dropdown name="Production" Token={token} Username={username} RoutePath="/home/report/Production" />
            </div>
          )}
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}

export default Navbar;
