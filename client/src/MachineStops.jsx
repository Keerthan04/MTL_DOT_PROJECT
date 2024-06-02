import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./home.css";
import Logo from "../src/images/tmg-logo.jpg";
import "./editorial.css";
import Dropdown from "./components/dropdownbutton";
import ErrorOne from "./components/Error";

function MachineStops() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setsubmit] = useState("");
  const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  const [reportShowDropdown, setReportShowDropdown] = useState(false);

  const [login, setlogin] = useState(true);

  // Form state
  const [formValues, setFormValues] = useState({
    pub_date: "",
    ed_name: "",
    unit: "",
    pub: "",
    reason_for_stoppage: "",
    stop_from_time: "",
    stop_end_time: ""
  });

  const location = useLocation();
  const username = location.state?.Username;
  const token = location.state?.Token;

  const handleEntryDropdownToggle = () => {
    setEntryShowDropdown(!entryShowDropdown);
  };

  const handleReportDropdownToggle = () => {
    setReportShowDropdown(!reportShowDropdown);
  };

  useEffect(() => {
    if (!token) {
      setError("404 not logged in");
      setlogin(false);
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

  if (!login) {
    return <ErrorOne />;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      ...formValues,
    };
    console.log(dataToSend);
    axios
      .post("http://localhost:3000/home/entry/machinestops", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setsubmit(res.data.message);
        setData(res.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  return (
    <>
      <div className="body">
        <header>
          <div className="head-left">
            <img src={Logo} alt="Logo" />
            <h2>
              <span id="dot">DOT</span>
              <span id="mmnl">-MTL</span>
            </h2>
          </div>
          <div className="head-right">
            <h4>
              Hello <span className="user">{username}</span>
            </h4>
            <button>Logout</button>
          </div>
        </header>
        <div className="main">
          <div className="above">
            <div className="inner">
              <button onClick={handleEntryDropdownToggle}>Entry</button>
              {entryShowDropdown && (
                <div className="dropdowns">
                  <Dropdown name="Scheduling" Token={token} Username ={username} RoutePath="/home/entry/Scheduling" />
                  <Dropdown name="Editorial" Token={token} Username ={username} RoutePath="/home/entry/Editorial" />
                  <Dropdown name="CTP" Token={token} Username ={username} RoutePath="/home/entry/CTP" />
                  <Dropdown name="Prepress" Token={token} Username ={username} RoutePath="/home/entry/Prepress" />
                  <Dropdown name="Machine stop" Token={token} Username ={username} RoutePath="/home/entry/Machinestop" />
                  <Dropdown name="Production" Token={token} Username ={username} RoutePath="/home/entry/Production" />
                </div>
              )}
            </div>
            <div className="inner">
              <button onClick={handleReportDropdownToggle}>Report</button>
              {reportShowDropdown && (
                <div className="dropdowns">
                  <Dropdown name="Scheduling" Token={token} Username ={username} RoutePath="/home/report/Scheduling" />
                  <Dropdown name="Editorial" Token={token} Username ={username} RoutePath="/home/report/Editorial" />
                  <Dropdown name="CTP" Token={token} Username ={username} RoutePath="/home/report/CTP" />
                  <Dropdown name="Prepress" Token={token} Username ={username} RoutePath="/home/report/Prepress" />
                  <Dropdown name="Machine stop" Token={token} Username ={username} RoutePath="/home/report/Machinestop" />
                  <Dropdown name="Production" Token={token} Username ={username} RoutePath="/home/report/Production" />
                </div>
              )}
            </div>
          </div>
          <div className="below">
            <div className="content">
              <h2>Machine Stop Entry</h2>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className="detail">
                    <p>Publication Date:</p>
                    <label>
                      <input
                        type="date"
                        name="pub_date"
                        value={formValues.pub_date}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Unit:</p>
                    <label>
                      <input
                        type="text"
                        name="unit"
                        value={formValues.unit}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Publication:</p>
                    <label>
                      <input
                        type="text"
                        name="pub"
                        value={formValues.pub}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Edition Name:</p>
                    <label>
                      <input
                        type="text"
                        name="ed_name"
                        value={formValues.ed_name}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>
                  <div className='detail'>
                    <p>Reason for Stoppage:</p>
                    <label>
                      <input type="text" name="reason_for_stoppage" value={formValues.reason_for_stoppage} onChange={handleInputChange} placeholder="Reason for stoppage" required/>
                    </label>
                  </div>
                  <div className='detail'>
                    <p>Stop From Time:</p>
                    <label>
                      <input type="time" step="1" name="stop_from_time" value={formValues.stop_from_time} onChange={handleInputChange} placeholder="Stop from time" required/>
                    </label>
                  </div>
                  <div className='detail'>
                    <p>Stop End Time:</p>
                    <label>
                      <input type="time" step="1" name="stop_end_time" value={formValues.stop_end_time} onChange={handleInputChange}  placeholder="Stop end time" required/>
                    </label>
                  </div>
                  <button type="submit">Submit</button>
                  {(error && (
                    <div className="text-red-500 text-sm mt-2 text-center">
                      {error}
                    </div>
                  )) ||
                    (submit && (
                      <div className="text-green-500 text-sm mt-2 text-center">
                        {submit}
                      </div>
                    ))}
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <p>Copyright 2024 © All Rights Reserved. The Manipal Group</p>
        </footer>
      </div>
    </>
  );
}

export default MachineStops;
