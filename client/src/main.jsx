import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import Login from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Editorial from "./editorial.jsx";
import Scheduling from "./Scheduling.jsx";
import Prepress from "./Prepress.jsx";
import Ctp from "./Ctp.jsx";
import Production from "./Production.jsx";
import MachineStops from "./MachineStops.jsx";
import SchedulingReport from "./reports/SchedulingReport.jsx";
import Test from "./Test.jsx";
import EditorialReport from "./reports/EditorialReport.jsx";
import CTPreport from "./reports/CTPreport.jsx";
import PrepressReport from "./reports/PrepressReport.jsx";
import ErrorOne from "./components/Error.jsx";
import MachineStopReport from "./reports/MachineStopReport.jsx";
import ProductionReport from "./reports/ProductionReport.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<PrivateRoute element={Home} />} />
            <Route
              path="/home/entry/Editorial"
              element={<PrivateRoute element={Editorial} />}
            />
            <Route
              path="/home/entry/Scheduling"
              element={<PrivateRoute element={Scheduling} />}
            />
            <Route
              path="/home/entry/Prepress"
              element={<PrivateRoute element={Prepress} />}
            />
            <Route
              path="/home/entry/CTP"
              element={<PrivateRoute element={Ctp} />}
            />
            <Route
              path="/home/entry/Production"
              element={<PrivateRoute element={Production} />}
            />
            <Route
              path="/home/entry/Machinestop"
              element={<PrivateRoute element={MachineStops} />}
            />
            <Route
              path="/home/report/Scheduling"
              element={<PrivateRoute element={SchedulingReport} />}
            />
            <Route
              path="/home/report/Editorial"
              element={<PrivateRoute element={EditorialReport} />}
            />
            <Route
              path="/home/report/CTP"
              element={<PrivateRoute element={CTPreport} />}
            />
            <Route
              path="/home/report/Prepress"
              element={<PrivateRoute element={PrepressReport} />}
            />
            <Route
              path="/home/report/Machinestop"
              element={<PrivateRoute element={MachineStopReport} />}
            />
            <Route
              path="/home/report/Production"
              element={<PrivateRoute element={ProductionReport} />}
            />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<ErrorOne />} />{" "}
            {/*shd make here the error one as page has been moved and to login or back thing */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
