import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "./ImageUrl";

const root = ReactDOM.createRoot(document.getElementById("root"));
// axios.defaults.baseURL = 'http://172.31.120.39:8000/';
axios.defaults.baseURL = "http://172.31.120.238:8000/";
// axios.defaults.baseURL = 'https://test.austtaa.com/server/public/';

// axios.defaults.baseURL = 'http://127.0.0.1:8000/';
// axios.defaults.baseURL = 'http://172.31.120.99:8000/';
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  },
  null,
  { synchronous: true }
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
