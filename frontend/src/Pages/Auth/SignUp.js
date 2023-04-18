import backgroundlogin from "../../images/logincover.png";
import "../Auth/auth.css";
import peoplesRepublicLogo from "../../images/Government of Bangladesh-logo.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUpBg = {
  background: `url(${backgroundlogin})`,
  backgroundRepeat: "no-repeat",
  position: "relative",
  backgroundSize: "cover",
  overflowX: "hiden",
};

function SignUp() {
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
          <div className="login-background-wrapper" style={SignUpBg}>
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
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="আপনার ইউজার আইডি / অফিস আইডি"
                      />
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="name"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="নাম"
                      />
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="ফোন নম্বর"
                      />
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="ইমেইল"
                      />
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="অফিস আইডি"
                      />
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="পাসওয়ার্ড দিন"
                      ></input>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control "
                        id="inputPassword"
                        placeholder="পুনরায় পাসওয়ার্ড দিন"
                      ></input>
                      <Link to="/">
                        {" "}
                        <button type="submit" className="login-submit-button">
                          নিবন্ধন করুন
                        </button>
                      </Link>
                    </div>
                    <p className="change-pass mt-5">
                      আপনার একাউন্ট আছে?
                      <span className="change-pass-span">লগইন করুন</span>
                    </p>
                    <hr className="hr-line" />
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
export default SignUp;
