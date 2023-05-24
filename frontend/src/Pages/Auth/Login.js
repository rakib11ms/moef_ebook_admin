import backgroundlogin from "../../images/logincover.png";
import "../Auth/auth.css";
import peoplesRepublicLogo from "../../images/moefccebook.png";
import ios from "../../images/ios.png";
import playStore from "../../images/play-store.png";
import bangladeshLogo from "../../images/Government of Bangladesh-logo.png";
import ptvlLogo from "../../images/ptvl-logo-PNG.png";
import React, { useState } from "react";
import { Link, Navigate, useNavigate, Routes, Route } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const loginBg = {
  background: `url(${backgroundlogin})`,
  backgroundRepeat: "no-repeat",
  position: "relative",
  backgroundSize: "cover",
  overflowX: "hiden",
};

function Login({ handleSucessLogin }) {
  const navigate = useNavigate({ handleSucessLogin });
  const [clickedRender, setClickedRender] = useState(false);

  const [id, setid] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (id.trim() === "" || password.trim() === "") {
    //   setid("id and password cannot be empty.");
    //   return;
    // }

    // // Check if id is a valid format using a regular expression
    // const idRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!idRegex.test(id)) {
    //   setPassword("Please enter a valid id address.");
    //   return;
    // }
    e.preventDefault();
    setClickedRender(true);
    const loginInput = {
      id: id,
      password: password,
    };

    if (id.trim() === "" || password.trim() === "") {
      setClickedRender(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ID and Password cannot be empty.",
      });
      return;
    }

    // console.log(loginInput);
    axios
      .post("api/login", loginInput)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          setClickedRender(false);
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("permissions", JSON.stringify(res.data.only_permissions));
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        setClickedRender(false);
        if (err.response.data.errors) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.errors[
              Object.keys(err.response.data.errors)[0]
            ][0],
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          });
        }
      });
  };
  // const history = useHistory();
  // import { useHistory } from "react-router-dom";
  // history.push("/home");

  return (
    <>
      <section>
        <div>
          <div className="login-background-wrapper" style={loginBg}>
            <div className="login-input-divs container">
              <div>
                <div className="login-logo-tags">
                  <img
                    className="peopleRepublic"
                    src={peoplesRepublicLogo}
                    alt="পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়-লোগো"
                  />
                  <h6 className="environment-tags">
                    Environment Information ebook
                  </h6>
                  <p className="poribesh-tags">
                    পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="login-input-tags-div">
                    <p className="login-input-tags">শুরু করতে লগইন করুন</p>
                    <div className="login-input-div">
                      <input
                        onChange={(e) => setid(e.target.value)}
                        type="string"
                        className="form-control login-inputs"
                        id="exampleFormControlInput1"
                        name="id"
                        placeholder="আপনার ইউজার আইডি / অফিস আইডি"
                      />
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control login-inputs mt-2"
                        id="inputPassword"
                        name="password"
                        placeholder="পাসওয়ার্ড"
                      ></input>
                      {/* <Link to="/home">
                        {" "}
                        <button
                          type="submit"
                          className="login-submit-button mb-3"
                        >
                          লগইন
                        </button>
                      </Link> */}

                      <button
                        type="submit"
                        className=" login-submit-button mb-3 mt-2"
                      >
                        লগইন{" "}
                        {clickedRender ? (
                          <span
                            className="spinner-border spinner-border-sm mx-1"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          ""
                        )}
                      </button>
                    </div>
                    <p className="change-pass">
                      পাসওয়ার্ড ভুলে গেছেন ?{" "}
                      <Link to="/forgot-password-request">
                        <span className="change-pass-span">
                          এখনই পরিবর্তন করুন
                        </span>
                      </Link>
                    </p>
                    <hr className="hr-line" />
                    <div className="nibondhon-button">
                      <Link to="/sign-up">
                        {" "}
                        <button
                          type="button"
                          className="btn btn-outline-success nobondhon-button"
                        >
                          নিবন্ধন করুন
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-sm d-flex justify-content-start">
                  <span className=" align-middle color-white">Downlaod</span>
                  &nbsp; &nbsp;
                  <a
                    className="align-middle"
                    href="https://play.google.com/store/apps/details?id=com.moefcc.ptvl.eib "
                    target="_blank"
                  >
                    <i className="fab fa-google-play fa-2x color-white"></i>
                  </a>
                  &nbsp; &nbsp; &nbsp;
                  <a
                    className="align-middle"
                    href="https://play.google.com/store/apps/details?id=com.moefcc.ptvl.eib "
                    target="_blank"
                  >
                    <i className="fab fa-apple fa-2x color-white"></i>
                  </a>
                </div>
                <div className="col-sm d-flex justify-content-center">
                  <a
                    href="http://www.moef.gov.bd/"
                    target="_blank"
                    className="align-middle"
                  >
                    {" "}
                    <img className="login-logos" src={bangladeshLogo} alt="" />
                  </a>

                  {/* <Link to="  http://www.moef.gov.bd/">
                      {" "}
                      <img
                        className="login-logos"
                        src={bangladeshLogo}
                        alt=""
                      />
                    </Link> */}

                  <a
                    href="https://pakizatvl.com/"
                    target="_blank"
                    className="align-middle"
                  >
                    {" "}
                    <img className="login-logos-ptvl" src={ptvlLogo} alt="" />
                  </a>
                </div>
                <div className="col-sm d-flex justify-content-end">
                  <Link to="/">
                    <span className="align-middle map-link">Site Map</span>
                  </Link>{" "}
                  <Link to="/privacy-policies">
                    <span className=" align-middle map-link">
                      Privacy & Policies
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
