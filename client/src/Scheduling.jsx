import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./home.css";
import Logo from '../src/images/tmg-logo.jpg';
import './editorial.css';
import Dropdown from "./components/dropdownbutton";
import ErrorOne from "./components/Error";

function Scheduling() {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  const [reportShowDropdown, setReportShowDropdown] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [actualTime, setActualTime] = useState('');
  const [differenceTime, setDifferenceTime] = useState('');
  const [showReasonForDelay, setShowReasonForDelay] = useState(false);
  const [login,setlogin] = useState(true);
  const location = useLocation();
  const username = location.state?.Username;
  const token = location.state?.Token;

  //shd be same of the backend requirement
  const [formValues, setFormValues] = useState({
    pub_date: '',
    ed_name: '',
    schedule_time: '',
    actual_time: '',
    difference_time: '0',
    reason_for_delay: ' ',
    unit: '',
    pub: '',
    no_of_pages: 0
  });

  const handleEntryDropdownToggle = () => {
    setEntryShowDropdown(!entryShowDropdown);
    console.log(entryShowDropdown);
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
      const scheduledDate = new Date(`1970-01-01T${scheduled}`);
      const actualDate = new Date(`1970-01-01T${actual}`);
      const diffMs = actualDate - scheduledDate;
      const diffHrs = Math.floor(diffMs / 3600000);
      console.log(diffMs);
      const diffMins = Math.floor((diffMs % 3600000) / 60000);
      console.log(diffMins);
      const diffSecs = Math.floor((diffMs % 60000) / 1000);
      console.log(diffSecs);

      const diffTime = `${String(diffHrs).padStart(2, '0')}:${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`;
      console.log(diffTime);
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

  if(!login){
    return <ErrorOne />;
  }
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

    axios.post('http://localhost:3000/home/entry/scheduling', dataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setSubmit(res.data.message);
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
              <div className="dropdowns">
                <Dropdown name="Scheduling" Token={token} Username={username} />
                <Dropdown name="Editorial" Token={token} Username={username} />
                <Dropdown name="CTP" Token={token} Username={username} />
                <Dropdown name="Prepress" Token={token} Username={username} />
                <Dropdown name="Machinestop" Token={token} Username={username} />
                <Dropdown name="Production" Token={token} Username={username} />
              </div>
            )}
          </div>
          <div className="inner">
            <button onClick={handleReportDropdownToggle}>Report</button>
            {reportShowDropdown && (
              <div className="dropdowns">
                <button>Scheduling</button>
                <button>Editorial</button>
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
            <h2>Scheduling Entry</h2>
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
                  <p>Number of Pages:</p>
                  <label>
                    <input type="number" name="no_of_pages" value={formValues.no_of_pages} min="1" onChange={handleInputChange} required />
                  </label>
                </div>
                <div className='detail'>
                  <p>Schedule Time:</p>
                  <label>
                    <input type="time" step="1" value={scheduledTime} onChange={handleScheduledTimeChange} required />
                  </label>
                </div>
                <div className='detail'>
                  <p>Actual Time:</p>
                  <label>
                    <input type="time" step="1" value={actualTime} onChange={handleActualTimeChange} required />
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
                <button type="submit">Submit</button>
                {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
                {submit && <div className="text-green-500 text-sm mt-2 text-center">{submit}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>Copyright 2019 © All Rights Reserved. The Manipal Group</p>
      </footer>
    </div>
  );
}

export default Scheduling;































//how to do for reports the table part can be seen from here
// function Scheduling() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const location = useLocation(); // Use useLocation to access passed state

//   useEffect(() => {
//     const token = location.state?.token; // Access token from location state
//     if (!token) {
//       setError("404 not loged in");
//       return;
//     }

//     axios
//       .get("http://localhost:3000/scheduling", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         if (err.response) {
//           setError(err.response.data.message);
//         } else {
//           setError("An error occurred. Please try again.");
//         }
//       });
//   }, [location.state?.token]);

//   if (error) {
//     return <div style={{ color: "black" }}>{error}</div>;
//   }

//   if (data) {
//     return (
//       <div>
//         <h2>Scheduling</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Editorial</th>
//               <th>Unit</th>
//               <th>Publication</th>
//               <th>Reason for Stoppage</th>
//               <th>Stop from Time</th>
//               <th>Stop End Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row) => (
//               <tr key={row.id}>
//                 <td>{row.pub_date}</td>
//                 <td>{row.ed_name}</td>
//                 <td>{row.unit}</td>
//                 <td>{row.pub}</td>
//                 <td>{row.reason_for_stoppage}</td>
//                 <td>{row.stop_from_time}</td>
//                 <td>{row.stop_end_time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   return null;
// }

// // export default Scheduling;
