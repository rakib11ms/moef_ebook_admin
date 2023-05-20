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

function ForgotPasswordRequest() {
  const navigate = useNavigate();
  const [clickedRender, setClickedRender] = useState(false);

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const [errorOrSuccessMessage, setErrorOrSuccessMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setClickedRender(true);
    const loginInput = {
      email: email,
    };

    // console.log(loginInput);
    axios
      .post("api/reset-password-email-request", loginInput)
      .then((res) => {
        if (res.data.status === 200) {
          setClickedRender(false);
          setErrorOrSuccessMessage(res.data.message);
          // localStorage.setItem('auth_token', res.data.token);
          // localStorage.setItem('user', JSON.stringify(res.data.user));
          // navigate('/home');
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
  return (
    <>
      <section className="">
        <div className="">
          <div className="forget-background-wrapper" style={loginBg}>
            <div className="login-input-divs container">
              <div className="">
                <div className="login-logo-tags">
                  <img
                    className="peopleRepublic"
                    src={peoplesRepublicLogo}
                    alt="পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়-লোগো"
                  />
                  <h6 className="environment-tags">
                    Environment Information Book
                  </h6>
                  <p className="poribesh-tags">
                    পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="login-input-tags-div">
                    <p className="login-input-tags">
                      আপনার নিবন্ধিত ইমেইল দিন{" "}
                    </p>
                    <div className="login-input-div">
                      <input
                        onChange={(e) => setemail(e.target.value)}
                        type="string"
                        className="forget-inputs"
                        id="exampleFormControlInput1 forget-password-inputs"
                        name="email"
                        placeholder="আপনার ইমেইল দিন"
                      />
                      <span className="text-white">
                        {errorOrSuccessMessage}
                      </span>

                      <button
                        type="submit"
                        className="login-submit-button mb-3"
                      >
                        Submit{" "}
                        {clickedRender ? (
                          <span
                            class="spinner-border spinner-border-sm mx-1"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          ""
                        )}
                      </button>
                    </div>

                    <hr className="hr-line" />
                    <div className="">
                      <Link to="/">
                        {" "}
                        <button
                          type="button"
                          className="btn btn-outline-success nobondhon-button"
                        >
                          লগইন করুন
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="container">
              <div className="row sign-up-footer">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 footer-div1">
                  <div className="login-footer-div">
                    <div className="footer-download-text">
                      <a href="https://play.google.com/store/apps/details?id=com.moefcc.ptvl.eib  ">
                        {" "}
                        <h6>Download</h6>
                      </a>
                    </div>
                    <img className="login-footer-icon" src={ios} alt="" />
                    <img className="login-footer-icon" src={playStore} alt="" />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                  <div className="signup-footer-logos">
                    <Link to="  http://www.moef.gov.bd/">
                      {" "}
                      <img
                        className="login-logos"
                        src={bangladeshLogo}
                        alt=""
                      />
                    </Link>
                    <Link to="https://pakizatvl.com/">
                      {" "}
                      <img className="login-logos-ptvl" src={ptvlLogo} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 ">
                  <div className="sign-up-map-polices">
                    <Link to="/">
                      <p className="map-link">Site Map</p>
                    </Link>{" "}
                    <Link to="/privacy-policies">
                      <p className="map-link">Privacy & Policies</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ForgotPasswordRequest;
