import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./home.css";
import Logo from "../src/images/tmg-logo.jpg";
import "./editorial.css";
import { useAuth } from "./components/AuthContext";
import NewNav from "./components/newNav";

function Production() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  // const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  // const [reportShowDropdown, setReportShowDropdown] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");
  const [actualTime, setActualTime] = useState("");
  const [differenceTime, setDifferenceTime] = useState("");
  const [showReasonForDelay, setShowReasonForDelay] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [selectedTowers, setSelectedTowers] = useState([]);
  const [machines, setMachines] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [publicationList, setPublicationList] = useState([]);
  const [editionList, setEditionList] = useState([]);

  const initialFormValues = {
    pub_date: "",
    ed_name: "",
    schedule_time: "",
    actual_time: "",
    difference_time: "0",
    reason_for_delay: " ",
    unit: "",
    pub: "",
    machine_used: "",
    Towers: "",
    print_order: 0,
    page_size: "30x50",
    print_start_time: "",
    print_stop_time: "",
    gross_copies: 0,
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const location = useLocation();
  const username = location.state?.username;
  const { token } = useAuth();

  const handleScheduledTimeChange = (e) => {
    setScheduledTime(e.target.value);
    calculateDifferenceTime(e.target.value, actualTime);
  };

  const handleActualTimeChange = (e) => {
    setActualTime(e.target.value);
    calculateDifferenceTime(scheduledTime, e.target.value);
  };

  const handleMachineChange = (event) => {
    setSelectedMachine(event.target.value);
    setSelectedTowers([]); // Reset towers when machine changes
  };

  const handleTowerSelect = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTowers((prevTowers) => [...prevTowers, value]);
    } else {
      setSelectedTowers((prevTowers) =>
        prevTowers.filter((tower) => tower !== value)
      );
    }
  };

  const selectedMachineTowers =
    machines.find((machine) => machine.name === selectedMachine)?.towers || [];

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

  useEffect(() => {
    axios
      .get("http://localhost:3000/home/entry/production", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMachines(res.data);
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
    const dataToSend = {
      ...formValues,
      schedule_time: scheduledTime,
      actual_time: actualTime,
      machine_used: selectedMachine,
      Towers: selectedTowers.join(","),
    };

    axios
      .post("http://localhost:3000/home/entry/production", dataToSend, {
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

  const handleReset = () => {
    // setFormValues(initialFormValues);
    // setScheduledTime("");
    // setActualTime("");
    // setDifferenceTime("");
    // setShowReasonForDelay(false);
    // setSubmit("");
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
              <h2>Production Entry</h2>
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
                  <div className="detail">
                    <p>Machine Used:</p>
                    <label>
                      <select
                        value={selectedMachine}
                        onChange={handleMachineChange}
                        required
                      >
                        <option value="" disabled>
                          Select a machine
                        </option>
                        {machines.map((machine, index) => (
                          <option key={index} value={machine.name}>
                            {machine.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  {selectedMachine && (
                    <div className="detail">
                      <p>Towers:</p>
                      {selectedMachineTowers.map((tower, index) => (
                        <div key={index} className="tower-label">
                          <label>
                            <input
                              type="checkbox"
                              value={tower}
                              checked={selectedTowers.includes(tower)}
                              onChange={handleTowerSelect}
                            />{" "}
                            <span>{tower}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="detail">
                    <p>Print Order:</p>
                    <label>
                      <input
                        type="number"
                        name="print_order"
                        value={formValues.print_order}
                        onChange={handleInputChange}
                        placeholder="Print Order"
                        min="1"
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Page Size:</p>
                    <label>
                      <input
                        type="text"
                        name="page_size"
                        value={formValues.page_size}
                        readOnly
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Print Start Time:</p>
                    <label>
                      <input
                        type="datetime-local"
                        step="1"
                        name="print_start_time"
                        value={formValues.print_start_time}
                        onChange={handleInputChange}
                        placeholder="Print start time"
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Print Stop Time:</p>
                    <label>
                      <input
                        type="datetime-local"
                        step="1"
                        name="print_stop_time"
                        value={formValues.print_stop_time}
                        onChange={handleInputChange}
                        placeholder="Print stop time"
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Gross Copies:</p>
                    <label>
                      <input
                        type="number"
                        name="gross_copies"
                        value={formValues.gross_copies}
                        onChange={handleInputChange}
                        placeholder="Gross copies"
                        min="1"
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
        <footer>
          <p>Copyright 2024 © All Rights Reserved. The Manipal Group</p>
        </footer>
      </div>
    </>
  );
}

export default Production;
