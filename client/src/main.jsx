import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Editorial from './editorial.jsx';
import Scheduling from './Scheduling.jsx';
import Prepress from './Prepress.jsx';
import Ctp from './Ctp.jsx';
import Production from './Production.jsx';
import MachineStops from './MachineStops.jsx';
import SchedulingReport from './reports/SchedulingReport.jsx';
import Test from './Test.jsx';
import EditorialReport from './reports/EditorialReport.jsx';
import CTPreport from './reports/CTPreport.jsx';
import PrepressReport from './reports/PrepressReport.jsx';
import ErrorOne from './components/Error.jsx';
import MachineStopReport from './reports/MachineStopReport.jsx';
import ProductionReport from './reports/ProductionReport.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> {/* Assuming you have a Home component */}
        <Route path="/home/entry/Editorial" element={<Editorial />} />
        <Route path="/home/entry/Scheduling" element={<Scheduling />}/>
        <Route path="/home/entry/Prepress" element={<Prepress/>}/>
        <Route path="/home/entry/CTP" element={<Ctp/>}/>
        <Route path="/home/entry/Production" element={<Production/>}/>
        <Route path="/home/entry/Machinestop" element={<MachineStops/>}/>
        <Route path="/home/report/Scheduling" element={<SchedulingReport />}/>
        <Route path="/home/report/Editorial" element={<EditorialReport />}/>
        <Route path="/home/report/CTP" element={<CTPreport />}/>
        <Route path="/home/report/Prepress" element={<PrepressReport/>}/>
        <Route path="/home/report/Machinestop" element={<MachineStopReport/>}/>
        <Route path="/home/report/Production" element={<ProductionReport/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="*" element={<ErrorOne/>}/> {/*shd make here the error one as page has been moved and to login or back thing */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
