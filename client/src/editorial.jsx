//shd make the logic of diff time and reason for delay coming and then if error is there it shd show so that one shd be seen and validation of each of them has to be checked

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./home.css";
import Logo from '../src/images/tmg-logo.jpg';
import './editorial.css';
import Dropdown from "./components/dropdownbutton";

function Editorial() {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit,setsubmit] = useState("");
  const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  const [reportShowDropdown, setReportShowDropdown] = useState(false);

  // Form state
  const [formValues, setFormValues] = useState({
    pub_date: '',
    ed_name: '',
    schedule_time: '',
    actual_time: '',
    difference_time: '0',
    reason_for_delay: ' ',
    unit: '',
    pub: ''
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      ...formValues
    };
    console.log(dataToSend);
    axios.post('http://localhost:3000/home/entry/editorial', dataToSend, {
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
            <h2><span id="dot">DOT</span><span id='mmnl'>-MTL</span></h2>
          </div>
          <div className="head-right">
            <h4>Hello <span className="user">{username}</span></h4>
            <button>Logout</button>
          </div>
        </header>
        <div className="main">
          <div className="above">
            <div className="inner">
              <button onClick={handleEntryDropdownToggle}>Entry</button>
              {entryShowDropdown && (
                <div className="dropdown">
                  <Dropdown name="Scheduling" Token={token} Username={username}/>{/* for the dropdown se navigate*/}
                  <Dropdown name="Editorial" Token={token} Username={username}/>
                  <Dropdown name="CTP" Token={token} Username={username}/>
                  <Dropdown name="Prepress" Token={token} Username={username}/>
                  <Dropdown name="Machine Stop" Token={token} Username={username}/>
                  <Dropdown name="Production" Token={token} Username={username}/>
                  <Dropdown name="Scheduling" Token={token} Username={username}/>
                </div>
              )}
            </div>
            <div className="inner">
              <button onClick={handleReportDropdownToggle}>Report</button>
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
          <div className="below">
            <div className="content">
              <h2>Editorial Report</h2>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <div className='detail'>
                    <p>Publication Date:</p>
                    <label>
                      <input type="date" name="pub_date" value={formValues.pub_date} onChange={handleInputChange} required />
                    </label>
                  </div>
                  <div className='detail'>
                    <p>Unit:</p>
                    <label>
                      <input type="text" name="unit" value={formValues.unit} onChange={handleInputChange} required />
                    </label>
                  </div>
                  <div className='detail'>
                    <p>Publication:</p>
                    <label>
                      <input type="text" name="pub" value={formValues.publ} onChange={handleInputChange} required />
                    </label>
                  </div>
                  <div className='detail'>
                    <p>Edition Name:</p>
                    <label>
                      <input type="text" name="ed_name" value={formValues.ed_name} onChange={handleInputChange} required />
                    </label>
                  </div>
                  <div className='detail'>
                    <p>Schedule Time:</p>
                    <label>
                      <input type="time" step="1" name="schedule_time" value={formValues.schedule_time} onChange={handleInputChange} required />
                    </label>
                  </div>
                  <div className='detail'>
                    <p>Actual Time:</p>
                    <label>
                      <input type="time" step="1" name="actual_time" value={formValues.actual_time} onChange={handleInputChange} required />
                    </label>
                  </div>
                  
                  <button type="submit">Submit</button>
                  {(error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>) || (submit && <div className="text-green-500 text-sm mt-2 text-center">{submit}</div>)}
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <p>Copyright 2019 © All Rights Reserved. The Manipal Group</p>
        </footer>
      </div>
    </>
  );
}

export default Editorial;
