import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Editorial from './editorial.jsx';
import Scheduling from './Scheduling.jsx';
import Prepress from './Prepress.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> {/* Assuming you have a Home component */}
        <Route path="/home/Editorial" element={<Editorial />} />
        <Route path="/home/Scheduling" element={<Scheduling />}/>
        <Route path="/home/Prepress" element={<Prepress/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
