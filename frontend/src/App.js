import React, { useState, useEffect, Suspense, lazy } from "react";
import { Link, Navigate, useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./Pages/Auth/Login";
import NotFound from "./Pages/NotFound/NotFound";
import NavigationBa from "./Pages/Shared/NavigationBa/NavigationBa";
import Home from "./Pages/Home/Home";

import AllUsers from "./Pages/UserManagement/AllUsers/AllUsers";
import PermissionUser from "./Pages/UserManagement/PermissionUser/PermissionUser";
import AllBooks from "./Pages/AllBooks/AllBooks/AllBooks";
import BooksCatagories from "./Pages/AllBooks/BooksCatagories/BooksCatagories";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/navigation" element={<NavigationBa />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/permission-users" element={<PermissionUser />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/book-categories" element={<BooksCatagories />} />

        {/* <Route path="admin-login" element={<Login />}> </Route> */}
        {/* <Route exact path="admin-login" element={<Login />}>
              </Route> */}
      </Routes>
    </div>
  );
}

export default App;
