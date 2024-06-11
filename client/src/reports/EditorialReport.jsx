import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../home.css";
import Logo from "../images/tmg-logo.jpg";
import "./report.css";
//import Dropdown from "../components/dropdownbutton";
//import ErrorOne from "../components/Error";
import { useAuth } from "../components/AuthContext";
//import LogoutButton from "../components/LogoutButoon";
import ModalComponent from "./ModalComponent";
import NewNav from "../components/newNav";
function EditorialReport() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  // const [entryShowDropdown, setEntryShowDropdown] = useState(false);
  // const [reportShowDropdown, setReportShowDropdown] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const [publicationList, setPublicationList] = useState([]);
  const [editionList, setEditionList] = useState([]);
  //const [login, setLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Form state
  const initialFormValues = {
    unit: "",
    pub: "",
    ed_name: "",
    Publish_from_date: "",
    Publish_to_date: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const location = useLocation();
  const username = location.state?.Username;
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
        setIsModalOpen(true);
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
  ];
  const handleReset = () => {
    // setFormValues(initialFormValues);
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
              <h2>Editorial Report</h2>
              <div className="form">
                <form onSubmit={handleSubmit}>
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
            <ModalComponent
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              data={data}
              reportName="Editorial Report"
              headers={reportHeaders}
            />
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
