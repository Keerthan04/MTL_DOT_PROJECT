//shd make the logic of diff time and reason for delay coming and then if error is there it shd show so that one shd be seen and validation of each of them has to be checked

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./home.css";
import Logo from '../src/images/tmg-logo.jpg';
import './editorial.css';
import Dropdown from "./components/dropdownbutton";
import ErrorOne from "./components/Error";
import { useAuth } from "./components/AuthContext";
import LogoutButton from "./components/LogoutButoon";
function Editorial() {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit,setsubmit] = useState("");
  const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  const [reportShowDropdown, setReportShowDropdown] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [actualTime, setActualTime] = useState('');
  const [differenceTime, setDifferenceTime] = useState('');
  const [showReasonForDelay, setShowReasonForDelay] = useState(false);
  //const [login,setlogin] = useState(true);
  // Form state
  const initialFormValues ={
    pub_date: '',
    ed_name: '',
    schedule_time: '',
    actual_time: '',
    difference_time: '0',
    reason_for_delay: ' ',
    unit: '',
    pub: ''
  }
  const [formValues, setFormValues] = useState(initialFormValues);

  const location = useLocation();
  const username = location.state?.Username;
  // const token = location.state?.Token;
  const { token } = useAuth();
  const handleEntryDropdownToggle = () => {
    setEntryShowDropdown(!entryShowDropdown);
  };

  const handleReportDropdownToggle = () => {
    setReportShowDropdown(!reportShowDropdown);
  };
  const handleScheduledTimeChange = (e) => {
    setScheduledTime(e.target.value);
    calculateDifferenceTime(e.target.value, actualTime);
  };

  const handleActualTimeChange = (e) => {
    setActualTime(e.target.value);
    calculateDifferenceTime(scheduledTime, e.target.value);
  };

  const calculateDifferenceTime = (scheduled, actual) => {
    if (scheduled && actual) {
      const scheduledDate = new Date(scheduled);
      const actualDate = new Date(actual);
      const diffMs = actualDate - scheduledDate;

      if (diffMs < 0) {
        setDifferenceTime("00:00:00");
        setShowReasonForDelay(false);
        setFormValues({ ...formValues, difference_time: "00:00:00" });
        return;
      }

      const diffHrs = Math.floor(diffMs / 3600000);
      const diffMins = Math.floor((diffMs % 3600000) / 60000);
      const diffSecs = Math.floor((diffMs % 60000) / 1000);

      const diffTime = `${String(diffHrs).padStart(2, '0')}:${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`;
      setDifferenceTime(diffTime);
      setFormValues({ ...formValues, difference_time: diffTime });

      if (diffMs > 0) {
        setShowReasonForDelay(true);
      } else {
        setShowReasonForDelay(false);
      }
    }
  };
  useEffect(() => {
    if (!token) {
      setError("404 not logged in");
      //setlogin(false); 
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
  // if(!login){
  //   return <ErrorOne />;
  // }
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
      ...formValues,
      schedule_time: scheduledTime,
      actual_time: actualTime
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
  const handleReset = () => {
    setFormValues(initialFormValues);
    setScheduledTime('');
    setActualTime('');
    setDifferenceTime('');
    setShowReasonForDelay(false);
    setsubmit('');
    setError('');
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
            <LogoutButton/>
            {/* <button>logout</button> */}
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
              <h2>Editorial Entry</h2>
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
                      <input type="text" name="pub" value={formValues.pub} onChange={handleInputChange} required />
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
                      <input type="datetime-local" step="1" value={scheduledTime} onChange={handleScheduledTimeChange} required />
                    </label>
                  </div>
                  <div className='detail'>
                    <p>Actual Time:</p>
                    <label>
                      <input type="datetime-local" step="1" value={actualTime} onChange={handleActualTimeChange} required />
                    </label>
                  </div>
                  <div className='detail'>
                    <p>Difference Time:</p>
                    <label>
                      <input type="text" name="difference_time" value={differenceTime} readOnly />
                    </label>
                  </div>
                  {showReasonForDelay && (
                    <div className='detail'>
                      <p>Reason for Delay:</p>
                      <label>
                        <input type="text" name="reason_for_delay" value={formValues.reason_for_delay} onChange={handleInputChange} required />
                      </label>
                    </div>
                  )}
                  <div className="submit-reset">
                    <button type="submit">Submit</button>
                    <button type="reset" onClick={handleReset} >Reset</button>
                  </div>
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
