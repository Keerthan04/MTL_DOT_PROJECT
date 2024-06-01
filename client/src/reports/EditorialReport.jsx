import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../home.css";
import Logo from "../images/tmg-logo.jpg";
import "./report.css";
import Dropdown from "../components/dropdownbutton";
import ErrorOne from "../components/Error";

function EditorialReport() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  const [reportShowDropdown, setReportShowDropdown] = useState(false);
  const [login, setLogin] = useState(true);

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
    console.log(token);
    console.log(dataToSend);
    axios
      .post("http://localhost:3000/home/report/editorial", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubmit(res.data.message);
        setData(res.data.records);
        setError("");
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
                  <Dropdown
                    name="Scheduling"
                    Token={token}
                    Username={username}
                  />
                  <Dropdown
                    name="Editorial"
                    Token={token}
                    Username={username}
                  />
                  <Dropdown name="CTP" Token={token} Username={username} />
                  <Dropdown name="Prepress" Token={token} Username={username} />
                  <Dropdown
                    name="Machinestop"
                    Token={token}
                    Username={username}
                  />
                  <Dropdown
                    name="Production"
                    Token={token}
                    Username={username}
                  />
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
              <h2>Editorial Report</h2>
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
            {data && data.length > 0 && (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Publication Date</th>
                      <th>Edition Name</th>
                      <th>Schedule Time</th>
                      <th>Actual Time</th>
                      <th>Difference Time</th>
                      <th>Reason for Delay</th>
                      <th>Unit</th>
                      <th>Publication</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((record, index) => (
                      <tr key={index}>
                        <td>{record.pub_date}</td>
                        <td>{record.ed_name}</td>
                        <td>{record.schedule_time}</td>
                        <td>{record.actual_time}</td>
                        <td>{record.difference_time}</td>
                        <td>{record.reason_for_delay}</td>
                        <td>{record.unit}</td>
                        <td>{record.pub}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <footer>
          <p>Copyright 2024 © All Rights Reserved. The Manipal Group</p>
        </footer>
      </div>
    </>
  );
}

export default EditorialReport;
