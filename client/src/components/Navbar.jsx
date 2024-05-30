import React, { useState } from "react";
//import Logo from "../src/images/tmg-logo.jpg";
import Dropdown from "./dropdownbutton";
import "./navbar.css";
import { ChevronDown } from "lucide-react";
function Navbar({ username, token }) {
  const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  const [reportShowDropdown, setReportShowDropdown] = useState(false);

  const handleEntryDropdownToggle = () => {
    setEntryShowDropdown(!entryShowDropdown);
  };

  const handleReportDropdownToggle = () => {
    setReportShowDropdown(!reportShowDropdown);
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <img src="" alt="Logo" className="navbar-logo" />
        <h2 className="navbar-title">
          <span id="dot">DOT</span>
          <span id="mmnl">-MTL</span>
        </h2>
      </div>
      <div className="navbar-middle">
        <div className="navbar-item">
          <button onClick={handleEntryDropdownToggle}>Entry<ChevronDown className="ml-2 h-4 w-4" /></button>
          {entryShowDropdown && (
            <div className="dropdown">
              <Dropdown name="Scheduling" Token={token} Username={username} />
              <Dropdown name="Editorial" Token={token} Username={username} />
              <Dropdown name="CTP" Token={token} Username={username} />
              <Dropdown name="Prepress" Token={token} Username={username} />
              <Dropdown name="Machine Stop" Token={token} Username={username} />
              <Dropdown name="Production" Token={token} Username={username} />
            </div>
          )}
        </div>
        <div className="navbar-item">
          <button onClick={handleReportDropdownToggle}>Report<ChevronDown className="ml-2 h-4 w-4" /></button>
          {reportShowDropdown && (
            <div className="dropdown">
              <button>Scheduling</button>
              <button>Editorial</button>
              <button>RIP</button>
              <button>CTP</button>
              <button>Prepress</button>
              <button>Machine Stop</button>
              <button>Production</button>
            </div>
          )}
        </div>
      </div>
      <div className="navbar-right">
        <h4>
          Hello <span className="user">{username}</span>
        </h4>
        <button>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;
