import backgroundlogin from "../../images/logincover.png";
import "../Auth/auth.css";
import peoplesRepublicLogo from "../../images/Government of Bangladesh-logo.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const loginBg = {
  background: `url(${backgroundlogin})`,
  backgroundRepeat: "no-repeat",
  position: "relative",
  backgroundSize: "cover",
  overflowX: "hiden",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setEmail("Email and password cannot be empty.");
      return;
    }

    // Check if email is a valid format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setPassword("Please enter a valid email address.");
      return;
    }
  };
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
                <div className="login-input-tags-div">
                  <p className="login-input-tags">শুরু করতে লগইন করুন</p>
                  <div onSubmit={handleSubmit}>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="আপনার ইউজার আইডি / অফিস আইডি"
                    />
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control mt-4"
                      id="inputPassword"
                      placeholder="পাসওয়ার্ড"
                    ></input>
                    <Link to="/home">
                      {" "}
                      <button
                        type="submit"
                        className="login-submit-button mb-3"
                      >
                        লগইন
                      </button>
                    </Link>
                  </div>
                  <p className="change-pass">
                    পাসওয়ার্ড ভুলে গেছেন ?{" "}
                    <span className="change-pass-span">এখনই পরিবর্তন করুন</span>
                  </p>
                  <hr className="hr-line" />
                  <div className="">
                    <button
                      type="button"
                      className="btn btn-outline-success nobondhon-button"
                    >
                      নিবন্ধন করুন
                    </button>
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
export default Login;
