import backgroundlogin from "../../images/logincover.png";
import "../Auth/auth.css";
import peoplesRepublicLogo from "../../images/moefccebook.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ios from "../../images/ios.png";
import playStore from "../../images/play-store.png";
import bangladeshLogo from "../../images/Government of Bangladesh-logo.png";
import ptvlLogo from "../../images/ptvl-logo-PNG.png";

import Swal from "sweetalert2";
import axios from "axios";

const SignUpBg = {
  background: `url(${backgroundlogin})`,
  backgroundRepeat: "no-repeat",
  position: "relative",
  backgroundSize: "cover",
  overflowX: "hiden",
};

//
//
//

function SignUp() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [input, setInput] = useState({
    UserName: "",
    userPhone: "",
    email: "",
    password: "",
    confirm_password: "",
    userID: "",
    OfficeID: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.email.trim() === "" || input.password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email and password cannot be empty.",
      });
    } else if (input.password !== input.confirm_password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password and confirm password does not match.",
      });
    } else {
      axios.post("api/register", input).then((res) => {
        if (res.data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Registration Successful",
          });
          // redirect to login page
          window.location.href = "/";
        } else {
          console.log(res.data.validation_errors);
          if (res.data.validation_errors) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              //print the first error only
              text: res.data.validation_errors[
                Object.keys(res.data.validation_errors)[0]
              ][0],
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.data.message,
            });
          }
        }
      });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // if (email.trim() === "" || password.trim() === "") {
  //   setEmail("Email and password cannot be empty.");
  //   return;
  // }

  //   // Check if email is a valid format using a regular expression
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     setPassword("Please enter a valid email address.");
  //     return;
  //   }
  // };
  // const history = useHistory();
  // import { useHistory } from "react-router-dom";
  // history.push("/home");

  return (
    <>
      <section className="">
        <div className="">
          <div className="signUp-background-wrapper" style={SignUpBg}>
            <div className="signup-input-divs container">
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
                    <p className="login-input-tags">শুরু করতে লগইন করুন</p>
                    <div>
                      <input
                        onChange={handleChange}
                        type="text"
                        className="form-control signUp-inputs"
                        id="sign-text"
                        name="userID"
                        placeholder="আপনার ইউজার আইডি"
                      />
                      <input
                        onChange={handleChange}
                        type="name"
                        className="form-control signUp-inputs"
                        id="sign-name"
                        name="UserName"
                        placeholder="নাম"
                      />
                      <input
                        onChange={handleChange}
                        type="number"
                        className="form-control signUp-inputs"
                        id="sign-number"
                        name="userPhone"
                        placeholder="ফোন নম্বর"
                      />
                      <input
                        onChange={handleChange}
                        type="email"
                        className="form-control signUp-inputs"
                        id="sign-email"
                        name="email"
                        placeholder="ইমেইল"
                      />
                      <input
                        onChange={handleChange}
                        type="text"
                        className="form-control signUp-inputs"
                        id="sign-text-two"
                        name="OfficeID"
                        placeholder="অফিস আইডি"
                      />
                      <input
                        onChange={handleChange}
                        type="password"
                        className="form-control signUp-inputs"
                        id="sign-password"
                        name="password"
                        placeholder="পাসওয়ার্ড দিন"
                      ></input>
                      <input
                        onChange={handleChange}
                        type="password"
                        className="form-control signUp-inputs "
                        id="sign-password-again"
                        name="confirm_password"
                        placeholder="পুনরায় পাসওয়ার্ড দিন"
                      ></input>{" "}
                      <button type="submit" className="login-submit-button">
                        নিবন্ধন করুন
                      </button>
                    </div>{" "}
                    <p className="change-pass mt-3">
                      আপনার একাউন্ট আছে?
                      <Link to="/">
                        {" "}
                        <span className="change-pass-span">লগইন করুন</span>{" "}
                      </Link>
                    </p>
                    <hr className="hr-line" />
                  </div>
                </form>
              </div>
            </div>

            <div className="container">
              <div className="row  sign-up-footer">
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
                    <Link to="http://www.moef.gov.bd/">
                      <img
                        className="login-logos"
                        src={bangladeshLogo}
                        alt=""
                      />
                    </Link>

                    <Link to="https://pakizatvl.com/">
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
export default SignUp;
