import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./home.css";
function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation(); // Use useLocation to access passed state

  useEffect(() => {
    const token = location.state?.token; // Access token from location state
    if (!token) {
      setError("404 not loged in");
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
  }, [location.state?.token]);

  if (error) {
    return <div style={{ color: "black" }}>{error}</div>;
  }

  return (
    <>
      <div className="body">
        <header>
          <div className="head-left">
            <img src="" />
            <h2><span id="dot">DOT</span><span id='mmnl'>-MMNL</span></h2>
          </div>
          <div className="head-right">
            <h4>hello ----</h4>
            <button>logout</button>
          </div>
        </header>
        <div className="main">
          <div className="above">
            <div className="inner"><button>Entry</button></div>
            <div className="inner"><button>Report</button></div>
          </div>
          <div className="below">
            <div className="heading">
              <h3>editorial report</h3>
              <h4>info</h4>
            </div>
            <div className="content">
              <div className="form">
                <form>
                  <label>
                    <input type="text" placeholder="field1" />
                  </label>
                  <label>
                    <input type="text" placeholder="field2" />
                  </label>
                  <label>
                    <input type="text" placeholder="field3" />
                  </label>
                  <label>
                    <input type="text" placeholder="field4" />
                  </label>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <h3>footer</h3>
        </footer>
      </div>
    </>
  );
}

export default Home;
