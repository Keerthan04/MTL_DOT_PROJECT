import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../home.css";
import Logo from "../images/tmg-logo.jpg";
import "./report.css";
import Dropdown from "../components/dropdownbutton";
//import ErrorOne from "../components/Error";
import ModalComponent from "./ModalComponent";
import { useAuth } from "../components/AuthContext";
import LogoutButton from "../components/LogoutButoon";

function CTPReport() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  const [reportShowDropdown, setReportShowDropdown] = useState(false);
  //const [login, setLogin] = useState(true);
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
  //const token = location.state?.Token;
  const { token } = useAuth();
  const handleEntryDropdownToggle = () => {
    setEntryShowDropdown(!entryShowDropdown);
  };

  const handleReportDropdownToggle = () => {
    setReportShowDropdown(!reportShowDropdown);
  };

  useEffect(() => {
    if (!token) {
      setError("404 not logged in");
      //setLogin(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      ...formValues,
    };

    axios
      .post("http://localhost:3000/home/report/ctp", dataToSend, {
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
    "Reason for Delay",
    "Unit",
    "Publication",
    "Total no of Pages",
    "B&W pages",
    "Color pages",
    "No. of plates",
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
            <LogoutButton/>
            {/*<button>Logout</button>*/}
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
              <h2>CTP Report</h2>
              <div className="form">
                <form onSubmit={handleSubmit}>
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
                        name="publication"
                        value={formValues.publication}
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
                        name="edition"
                        value={formValues.edition}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Publication From Date:</p>
                    <label>
                      <input
                        type="date"
                        name="Publish_from_date"
                        value={formValues.Publish_from_date}
                        onChange={handleInputChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="detail">
                    <p>Publication To Date:</p>
                    <label>
                      <input
                        type="date"
                        name="Publish_to_date"
                        value={formValues.Publish_to_date}
                        onChange={handleInputChange}
                        required
                      />
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
            <ModalComponent
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              data={data}
              reportName="CTP Report"
              headers={reportHeaders}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CTPReport;
