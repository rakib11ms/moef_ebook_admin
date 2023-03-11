
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link, Navigate, useNavigate, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Login from './Pages/Auth/Login';
function App() {
  return (
    <div className="App">
              <Routes>
              <Route path="/" element={<Login />} />

              {/* <Route path="admin-login" element={<Login />}> </Route> */}
              {/* <Route exact path="admin-login" element={<Login />}>
              </Route> */}


                </Routes>

    </div>
  );
}

export default App;
