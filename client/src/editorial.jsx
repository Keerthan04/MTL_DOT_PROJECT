//shd make the logic of diff time and reason for delay coming and then if error is there it shd show so that one shd be seen and validation of each of them has to be checked

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./home.css";
import Logo from "../src/images/tmg-logo.jpg";
import "./editorial.css";
//import Dropdown from "./components/dropdownbutton";
//import ErrorOne from "./components/Error";
import { useAuth } from "./components/AuthContext";
//import LogoutButton from "./components/LogoutButoon";
import NewNav from "./components/newNav";
function Editorial() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  // const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  // const [reportShowDropdown, setReportShowDropdown] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");
  const [actualTime, setActualTime] = useState("");
  const [differenceTime, setDifferenceTime] = useState("");
  const [showReasonForDelay, setShowReasonForDelay] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const [publicationList, setPublicationList] = useState([]);
  const [editionList, setEditionList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  //const [login,setlogin] = useState(true);
  // Form state
  const initialFormValues = {
    pub_date: "",
    ed_name: "",
    schedule_time: "",
    actual_time: "",
    difference_time: "0",
    reason_for_delay: " ",
    unit: "",
    pub: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const location = useLocation();
  const username = location.state?.username;
  // const token = location.state?.Token;
  const { token } = useAuth();
  // const handleEntryDropdownToggle = () => {
  //   setEntryShowDropdown(!entryShowDropdown);
  // };

  // const handleReportDropdownToggle = () => {
  //   setReportShowDropdown(!reportShowDropdown);
  // };
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

      const diffTime = `${String(diffHrs).padStart(2, "0")}:${String(
        diffMins
      ).padStart(2, "0")}:${String(diffSecs).padStart(2, "0")}`;
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
      [name]: value,
    });
  };
  useEffect(() => {
    axios.get("http://localhost:3000/home/entry/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUnitList(res.data.unit);
        setPublicationList(res.data.publication);
        setEditionList(res.data.edition);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  }, [token]);

  

  const handleUnitChange = (event) => {
    const selectedUnit = event.target.value;
    setFormValues({ ...formValues, unit: selectedUnit, pub: '', ed_name: '' });
  };

  const handlePublicationChange = (event) => {
    const selectedPub = event.target.value;
    setFormValues({ ...formValues, pub: selectedPub, ed_name: '' });
  };

  const getFilteredEditions = () => {
    const { unit, pub } = formValues;
    if (!unit || !pub) return [];
    const editionData = editionList.find(
      (item) => item.unit === unit && item.publication === pub
    );
    console.log(editionData);
    return !(editionData.edition.includes('No edition available')) ? editionData.edition : [];
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredEditions = getFilteredEditions();
    if (filteredEditions.length === 0 || filteredEditions.includes('No edition available')) {
      setError("No editions available for the selected unit and publication.");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    const dataToSend = { ...formValues };
    console.log(dataToSend);
    axios.post('http://localhost:3000/home/entry/editorial', dataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setSubmit(res.data.message);
          setData(res.data);
          setShowConfirmation(false);
          setTimeout(() => {
            setSubmit("");
          }, 5000);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            setError(err.response.data.message);
          } else if (err.response.status === 500) {
            setError("An error occurred while saving the scheduling entry");
          } else {
            setError("An unexpected error occurred");
          }
          setTimeout(() => {
            setError("");
          }, 5000);
        } else {
          setError("An error occurred. Please try again.");
          setTimeout(() => {
            setError("");
          }, 5000);
        }
        setShowConfirmation(false);
      });
  };
  const handleReset = () => {
    // setFormValues(initialFormValues);
    // setScheduledTime("");
    // setActualTime("");
    // setDifferenceTime("");
    // setShowReasonForDelay(false);
    // setsubmit("");
    // setError("");
    window.location.reload();
  };
  return (
    <>
      <div className="body">
        <NewNav username={username} token={token} />
        <div className="main">
          <div className="below">
            <div className="content">
              <h2>Editorial Entry</h2>
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
                      <select
                        name="unit"
                        value={formValues.unit}
                        onChange={handleUnitChange}
                        required
                        className="input-field"
                      >
                        <option value="" disabled>
                          Select Unit
                        </option>
                        {unitList.map((unit, index) => (
                          <option key={index} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="detail">
                    <p>Publication:</p>
                    <label>
                      <select
                        name="pub"
                        value={formValues.pub}
                        onChange={handlePublicationChange}
                        required
                        className="input-field"
                      >
                        <option value="" disabled>
                          Select Publication
                        </option>
                        {publicationList.map((pub, index) => (
                          <option key={index} value={pub}>
                            {pub}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="detail">
                    <p>Edition Name:</p>
                    <label>
                      <select
                        name="ed_name"
                        value={formValues.ed_name}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                      >
                        <option value="" disabled>
                          Select Edition
                        </option>
                        {getFilteredEditions().length === 0 && (
                          <option value="No edition available" disabled>
                            No editions available
                          </option>
                        )}
                        {getFilteredEditions().map((edition, index) => (
                          <option key={index} value={edition}>
                            {edition}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="detail">
                    <p>Schedule Time:</p>
                    <label>
                      <input
                        type="datetime-local"
                        step="1"
                        value={scheduledTime}
                        onChange={handleScheduledTimeChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Actual Time:</p>
                    <label>
                      <input
                        type="datetime-local"
                        step="1"
                        value={actualTime}
                        onChange={handleActualTimeChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Difference Time:</p>
                    <label>
                      <input
                        type="text"
                        name="difference_time"
                        value={differenceTime}
                        readOnly
                      />
                    </label>
                  </div>
                  {showReasonForDelay && (
                    <div className="detail">
                      <p>Reason for Delay:</p>
                      <label>
                        <input
                          type="text"
                          name="reason_for_delay"
                          value={formValues.reason_for_delay}
                          onChange={handleInputChange}
                          required
                        />
                      </label>
                    </div>
                  )}
                  <div className="submit-reset">
                    <button type="submit">Submit</button>
                    <button type="reset" onClick={handleReset}>
                      Reset
                    </button>
                  </div>
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
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>Copyright 2019 © All Rights Reserved. The Manipal Group</p>
        </footer>
        {showConfirmation && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Are you sure you want to submit?</h3>
            <button className="confirm-button" onClick={handleConfirmSubmit}>Yes</button>
            <button className="confirm-button" onClick={() => setShowConfirmation(false)}>No</button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}



export default Editorial;
