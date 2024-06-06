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
import NewNav from "../components/newNav";

function PrepressReport() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  const [reportShowDropdown, setReportShowDropdown] = useState(false);
  //const [login, setLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();
  // Form state
  const initialFormValues ={
    unit: "",
    publication: "",
    edition: "",
    Publish_from_date: "",
    Publish_to_date: "",
  }
  const [formValues, setFormValues] = useState(initialFormValues);

  const location = useLocation();
  const username = location.state?.Username;
  //const token = location.state?.Token;

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
      .post("http://localhost:3000/home/report/prepress", dataToSend, {
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
    "Publication"
  ];
  const handleReset = () => {
    setFormValues(initialFormValues);
    setSubmit('');
    setError('');
  };
  return (
    <>
      <div className="body">
        <NewNav username={username} token={token}/>
        <div className="main">
          <div className="below">
            <div className="content">
              <h2>Prepress Report</h2>
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
                  <div className="submit-reset">
                    <button type="submit">Submit</button>
                    <button type="reset" onClick={handleReset}>Reset</button>
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
            <ModalComponent
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              data={data}
              reportName="Prepress Report"
              headers={reportHeaders}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PrepressReport;
