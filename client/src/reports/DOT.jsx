import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../home.css";
import "./report.css";
import { useAuth } from "../components/AuthContext";
import DOTModalComponent from "./DOTModalComponent";
import NewNav from "../components/newNav";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Dot() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState("");
  const [unitList, setUnitList] = useState([]);
  const [publicationList, setPublicationList] = useState([]);
  const [editionList, setEditionList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Form state
  const initialFormValues = {
    unit: "",
    pub: "",
    ed_name: "",
    Publish_date: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const location = useLocation();
  const username = location.state?.username;
  const { token } = useAuth();

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/home/entry/", {
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
    setFormValues({ ...formValues, unit: selectedUnit, pub: "", ed_name: "" });
  };

  const handlePublicationChange = (event) => {
    const selectedPub = event.target.value;
    setFormValues({ ...formValues, pub: selectedPub, ed_name: "" });
  };

  const getFilteredEditions = () => {
    const { unit, pub } = formValues;
    if (!unit || !pub) return [];
    const editionData = editionList.find(
      (item) => item.unit === unit && item.publication === pub
    );
    return editionData && editionData.edition && editionData.edition.length > 0
      ? editionData.edition
      : [];
  };

  const handleDownloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "DOT_Report.xlsx");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      ...formValues,
    };
    axios
      .post("http://localhost:3000/home/dot", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSubmit(res.data.message);
        setData(res.data.records);
        setError("");
        if (res.data.records.length > 0) {
          setModalContent(
            <div className="flex flex-col gap-3">
              <p>Records found: {res.data.records.length}</p>
              <button className="gap-3"onClick={() => handleDownloadExcel(res.data.records)}>
                Download as Excel
              </button>
                <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                    Close
                </button>
            </div>
          );
        } else {
          setModalContent(<p>No record found</p>);
        }
        setIsModalOpen(true);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
        setData(null);
        setIsModalOpen(true);
        setModalContent(<p>An error occurred. Please try again.</p>);
      });
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="body">
        <NewNav username={username} token={token} />
        <div className="main">
          <div className="below">
            <div className="content">
              <h2>Delivery On Time Report</h2>
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
                        {getFilteredEditions().map((edition, index) => (
                          <option key={index} value={edition}>
                            {edition}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="detail">
                    <p>Publication Date:</p>
                    <label>
                      <input
                        type="date"
                        name="Publish_date"
                        value={formValues.Publish_date}
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
            {isModalOpen && (
              <DOTModalComponent
                isOpen={isModalOpen}
                
              >
                {modalContent}
              </DOTModalComponent>
            )}
          </div>
        </div>
        <footer className="bg-gray-800 text-white text-center p-4 absolute bottom-0 ">
          <p>Copyright 2024 © All Rights Reserved. The Manipal Group</p>
        </footer>
      </div>
    </>
  );
}

export default Dot;
