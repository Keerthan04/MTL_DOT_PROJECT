import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> {/* Assuming you have a Home component */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
