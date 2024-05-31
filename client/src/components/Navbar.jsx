import React, { useState } from "react";
import Dropdown from "./dropdownbutton";
import { ChevronDown } from "lucide-react";
import "./navbar.css";

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
    <header className="navbar-container">
      <nav className="navbar" aria-label="Global">
        <div className="navbar-brand">
          <img src="" alt="Logo" className="navbar-logo" />
          <h2 className="navbar-title">
            <span id="dot">DOT</span>
            <span id="mmnl">-MTL</span>
          </h2>
          <h4>
            Hello <span className="user">{username}</span>
          </h4>
          <div className="navbar-toggle">
            <button type="button" className="navbar-toggle-btn" aria-controls="navbar-menu" aria-label="Toggle navigation">
              <svg className="open-icon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <svg className="close-icon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
        </div>
        <div id="navbar-menu" className="navbar-menu">
          <div className="navbar-links">
            <button
              className={`nav-button ${entryShowDropdown ? "active" : ""}`}
              onMouseEnter={handleEntryDropdownToggle}
              onMouseLeave={handleEntryDropdownToggle}
            >
              Entry
              <ChevronDown className="ml-2 h-4 w-4" />
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
            </button>
            <button
              className={`nav-button ${reportShowDropdown ? "active" : ""}`}
              onMouseEnter={handleReportDropdownToggle}
              onMouseLeave={handleReportDropdownToggle}
            >
              Report
              <ChevronDown className="ml-2 h-4 w-4" />
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
            </button>
            <a className="navbar-link" href="#">Home</a>
            <a className="navbar-link" href="#">Account</a>
            <a className="navbar-link" href="#">Work</a>
            <a className="navbar-link" href="#">Blog</a>
            <a className="navbar-link login" href="#">Log in</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
