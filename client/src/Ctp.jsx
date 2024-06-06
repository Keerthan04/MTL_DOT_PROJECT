import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./home.css";
import Logo from '../src/images/tmg-logo.jpg';
import './editorial.css';
import Dropdown from "./components/dropdownbutton";
import { useAuth } from "./components/AuthContext";
import LogoutButton from "./components/LogoutButoon";
function Ctp() {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  const [reportShowDropdown, setReportShowDropdown] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [actualTime, setActualTime] = useState('');
  const [differenceTime, setDifferenceTime] = useState('');
  const [showReasonForDelay, setShowReasonForDelay] = useState(false);
  const [showReasonForDifference, setShowReasonForDifference] = useState(false);

  // Initial form values
  const initialFormValues = {
    pub_date: '',
    ed_name: '',
    schedule_time: '',
    actual_time: '',
    difference_time: '00:00:00',
    reason_for_delay: 'NA',
    unit: '',
    pub: '',
    total_no_of_pages: 0,
    black_and_white_pages: 0,
    color_pages: 0,
    calculated_no_of_plates: 0,
    actual_no_of_plates: 0,
    reason_for_difference: 'NA'
  }

  const [formValues, setFormValues] = useState(initialFormValues);

  const location = useLocation();
  const username = location.state?.Username;
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
        setFormValues({ ...formValues, difference_time: "00:00:00", reason_for_delay: "NA" });
        return;
      }

      const diffHrs = Math.floor(diffMs / 3600000);
      const diffMins = Math.floor((diffMs % 3600000) / 60000);
      const diffSecs = Math.floor((diffMs % 60000) / 1000);

      const diffTime = `${String(diffHrs).padStart(2, '0')}:${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`;
      setDifferenceTime(diffTime);
      setFormValues({ ...formValues, difference_time: diffTime });

      setShowReasonForDelay(diffMs > 0);
    }
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
        setError(err.response ? err.response.data.message : "An error occurred. Please try again.");
      });
  }, [token]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const calculatePlates = () => {
    const totalNoOfPages = parseInt(formValues.total_no_of_pages, 10);
    const blackAndWhitePages = parseInt(formValues.black_and_white_pages, 10);
    const colorPages = parseInt(formValues.color_pages, 10);

    if (!isNaN(totalNoOfPages) && !isNaN(blackAndWhitePages) && !isNaN(colorPages)) {
      const calculatedPlates = blackAndWhitePages + colorPages * 4;
      setFormValues({ ...formValues, calculated_no_of_plates: calculatedPlates });

      setShowReasonForDifference(formValues.actual_no_of_plates && parseInt(formValues.actual_no_of_plates, 10) !== calculatedPlates);
    }
  };

  useEffect(() => {
    calculatePlates();
  }, [formValues.total_no_of_pages, formValues.black_and_white_pages, formValues.color_pages, formValues.actual_no_of_plates]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const adjustedFormValues = { ...formValues };
    if (differenceTime === "00:00:00") {
      adjustedFormValues.reason_for_delay = "NA";
    }
    if (parseInt(adjustedFormValues.actual_no_of_plates, 10) === adjustedFormValues.calculated_no_of_plates) {
      adjustedFormValues.reason_for_difference = "NA";
    }

    const dataToSend = {
      ...adjustedFormValues,
      schedule_time: scheduledTime,
      actual_time: actualTime
    };

    console.log(dataToSend);
    axios.post('http://localhost:3000/home/entry/ctp', dataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setSubmit(res.data.message);
        setData(res.data);
      })
      .catch((err) => {
        setError(err.response ? err.response.data.message : "An error occurred. Please try again.");
      });
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
    setScheduledTime('');
    setActualTime('');
    setDifferenceTime('');
    setShowReasonForDelay(false);
    setShowReasonForDifference(false);
    setSubmit('');
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
        </div>
      </header>
      <div className="main">
        <div className="above">
          <div className="inner">
            <button onClick={handleEntryDropdownToggle}>Entry</button>
            {entryShowDropdown && (
              <div className="dropdowns">
                <Dropdown name="Scheduling" Token={token} Username={username} RoutePath="/home/entry/Scheduling" />
                <Dropdown name="Editorial" Token={token} Username={username} RoutePath="/home/entry/Editorial" />
                <Dropdown name="CTP" Token={token} Username={username} RoutePath="/home/entry/CTP" />
                <Dropdown name="Prepress" Token={token} Username={username} RoutePath="/home/entry/Prepress" />
                <Dropdown name="Machine stop" Token={token} Username={username} RoutePath="/home/entry/Machinestop" />
                <Dropdown name="Production" Token={token} Username={username} RoutePath="/home/entry/Production" />
              </div>
            )}
          </div>
          <div className="inner">
            <button onClick={handleReportDropdownToggle}>Report</button>
            {reportShowDropdown && (
              <div className="dropdowns">
                <Dropdown name="Scheduling" Token={token} Username={username} RoutePath="/home/report/Scheduling" />
                <Dropdown name="Editorial" Token={token} Username={username} RoutePath="/home/report/Editorial" />
                <Dropdown name="CTP" Token={token} Username={username} RoutePath="/home/report/CTP" />
                <Dropdown name="Prepress" Token={token} Username={username} RoutePath="/home/report/Prepress" />
                <Dropdown name="Machine stop" Token={token} Username={username} RoutePath="/home/report/Machinestop" />
                <Dropdown name="Production" Token={token} Username={username} RoutePath="/home/report/Production" />
              </div>
            )}
          </div>
        </div>
        <div className="below">
          <div className="content">
            <h2>CTP Entry</h2>
            <div className="container">
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
                <div className='detail'>
                  <p>Total Number of Pages:</p>
                  <label>
                    <input type="number" name="total_no_of_pages" value={formValues.total_no_of_pages} onChange={handleInputChange} placeholder="Total Number of Pages" min="1" required />
                  </label>
                </div>
                <div className='detail'>
                  <p>Number of Black and White Pages:</p>
                  <label>
                    <input type="number" name="black_and_white_pages" value={formValues.black_and_white_pages} onChange={handleInputChange} placeholder="Black and White Pages" min="1" required />
                  </label>
                </div>
                <div className='detail'>
                  <p>Number of Color Pages:</p>
                  <label>
                    <input type="number" name="color_pages" value={formValues.color_pages} onChange={handleInputChange} placeholder="Number of Color Pages" min="1" required />
                  </label>
                </div>
                <div className='detail'>
                  <p>Calculated Number of Plates:</p>
                  <label>
                    <input type="number" name="calculated_no_of_plates" value={formValues.calculated_no_of_plates} readOnly />
                  </label>
                </div>
                <div className='detail'>
                  <p>Actual Number of Plates:</p>
                  <label>
                    <input type="number" name="actual_no_of_plates" value={formValues.actual_no_of_plates} onChange={handleInputChange} placeholder="Actual Number of Plates" min="1" required />
                  </label>
                </div>
                {showReasonForDifference && (
                  <div className='detail'>
                    <p>Reason for Difference:</p>
                    <label>
                      <input type="text" name="reason_for_difference" value={formValues.reason_for_difference} onChange={handleInputChange} required />
                    </label>
                  </div>
                )}
                <div className="submit-reset">
                  <button type="submit">Submit</button>
                  <button type="reset" onClick={handleReset}>Reset</button>
                </div>
                {(error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>) || (submit && <div className="text-green-500 text-sm mt-2 text-center">{submit}</div>)}
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

export default Ctp;
