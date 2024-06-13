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
function MachineStops() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  // const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  // const [reportShowDropdown, setReportShowDropdown] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const [publicationList, setPublicationList] = useState([]);
  const [editionList, setEditionList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  //const [login, setlogin] = useState(true);

  // Form state
  const initialFormValues = {
    pub_date: "",
    ed_name: "",
    unit: "",
    pub: "",
    reason_for_stoppage: "",
    printer_stop_time: "",
    printer_restart_time: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const location = useLocation();
  const username = location.state?.username;
  //const token = location.state?.Token;
  const { token } = useAuth();
  // const handleEntryDropdownToggle = () => {
  //   setEntryShowDropdown(!entryShowDropdown);
  // };

  // const handleReportDropdownToggle = () => {
  //   setReportShowDropdown(!reportShowDropdown);
  // };

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

  // if (!login) {
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
    axios.post('http://localhost:3000/home/entry/machinestops', dataToSend, {
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
    // // setScheduledTime("");
    // // setActualTime("");
    // // setDifferenceTime("");
    // // setShowReasonForDelay(false);
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
                    <p>Reason for Stoppage:</p>
                    <label>
                      <input
                        type="text"
                        name="reason_for_stoppage"
                        value={formValues.reason_for_stoppage}
                        onChange={handleInputChange}
                        placeholder="Reason for stoppage"
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Printer Stop Time</p>
                    <label>
                      <input
                        type="datetime-local"
                        step="1"
                        name="printer_stop_time"
                        value={formValues.printer_stop_time}
                        onChange={handleInputChange}
                        placeholder="printer_stop_time"
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Printer Restart time</p>
                    <label>
                      <input
                        type="datetime-local"
                        step="1"
                        name="printer_restart_time"
                        value={formValues.printer_restart_time}
                        onChange={handleInputChange}
                        placeholder="printer_restart_time"
                        required
                      />
                    </label>
                  </div>
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
          <p>Copyright 2024 © All Rights Reserved. The Manipal Group</p>
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

export default MachineStops;
