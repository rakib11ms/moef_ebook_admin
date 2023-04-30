import backgroundlogin from "../../images/logincover.png";
import "../Auth/auth.css";
import peoplesRepublicLogo from "../../images/Government of Bangladesh-logo.png";
import React, { useState } from "react";
import { Link, Navigate, useNavigate, Routes, Route } from "react-router-dom";
import Swal from 'sweetalert2';
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (email.trim() === "" || password.trim() === "") {
    //   setEmail("Email and password cannot be empty.");
    //   return;
    // }

    // // Check if email is a valid format using a regular expression
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   setPassword("Please enter a valid email address.");
    //   return;
    // }
    e.preventDefault();
    setClickedRender(true);
    const loginInput = {
      email: email,
      password: password,
    };
    // console.log(loginInput);
    axios.post("api/login", loginInput).then((res) => {
      // console.log(res.data);  
      if(res.data.status === 200){
        setClickedRender(false);
        localStorage.setItem('auth_token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/home');
      }
    }).catch((err) => {
      console.log(err);
      setClickedRender(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="#">Why do I have this issue?</a>'
      })
    });
  }
  // const history = useHistory();
  // import { useHistory } from "react-router-dom";
  // history.push("/home");

  return (
    <>
      <section className="">
        <div className="">
          <div className="login-background-wrapper" style={loginBg}>
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
                    <p className="login-input-tags">শুরু করতে লগইন করুন</p>
                    <div>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name="email"
                        placeholder="আপনার ইউজার আইডি / অফিস আইডি"
                      />
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control mt-4"
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
                        className="login-submit-button mb-3"
                      >
                        লগইন { clickedRender ? <span class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span> : '' }
                      </button>
                    </div>
                    <p className="change-pass">
                      পাসওয়ার্ড ভুলে গেছেন ?{" "}
                      <span className="change-pass-span">
                        এখনই পরিবর্তন করুন
                      </span>
                    </p>
                    <hr className="hr-line" />
                    <div className="">
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
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
