import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../home.css";
import Logo from "../images/tmg-logo.jpg";
import "./report.css";
import Dropdown from "../components/dropdownbutton";
import ErrorOne from "../components/Error";
import ModalComponent from "./ModalComponent";

function SchedulingReport() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  const [reportShowDropdown, setReportShowDropdown] = useState(false);
  const [login, setLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formValues, setFormValues] = useState({
    unit: "",
    publication: "",
    edition: "",
    Publish_from_date: "",
    Publish_to_date: "",
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
      setLogin(false);
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

    axios
      .post("http://localhost:3000/home/report/scheduling", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubmit(res.data.message);
        setData(res.data.records);
        console.log(data);
        setError("");
        setIsModalOpen(true); // Open modal when data is received
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
        setData(null);
      });
  };

  const reportHeaders = [
    "Publication Date",
    "Edition Name",
    "Schedule Time",
    "Actual Time",
    "Difference Time",
    "No of Pages",
    "Reason for Delay",
    "Unit",
    "Publication",
  ];

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
                <div className="dropdown">
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
                <div className="dropdown">
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
              <h2>Scheduling Report</h2>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  {Object.keys(formValues).map((key) => (
                    <div className="detail" key={key}>
                      <p>{key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:</p>
                      <label>
                        <input
                          type={key.includes("date") ? "date" : "text"}
                          name={key}
                          value={formValues[key]}
                          onChange={handleInputChange}
                          required
                        />
                      </label>
                    </div>
                  ))}
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
            <ModalComponent
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              data={data}
              reportName="Scheduling Report"
              headers={reportHeaders}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SchedulingReport;
