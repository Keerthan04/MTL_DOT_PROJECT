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
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
