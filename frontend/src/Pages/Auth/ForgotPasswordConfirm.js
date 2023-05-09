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

function ForgotPasswordConfirm() {
    const navigate = useNavigate();
    const [clickedRender, setClickedRender] = useState(false);

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setconfirm_password] = useState("");


    const handleSubmit = (e) => {
     
        e.preventDefault();
        setClickedRender(true);
        const data = {
            email: email,
            password:password,
            confirm_password:confirm_password
        };

        // console.log(loginInput);
        axios.post("api/reset-password-email-confirm/12", data).then((res) => {
            console.log(res.data);
            if (res.data.status === 200) {
                setClickedRender(false);
                Swal.fire(res.data.message, '', 'success')
                navigate('/')
            }
        }).catch((err) => {
            console.log(err);
            setClickedRender(false);
            if (err.response.data.errors) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0],
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
            }
        });
    }
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
                                        <p className="login-input-tags">পাসওয়ার্ড পরিবর্তন   </p>
                                        <div>
                                            <input
                                                onChange={(e) => setemail(e.target.value)}
                                                type="email"
                                                className="form-control"
                                                id="exampleFormControlInput1"
                                                name="email"
                                                placeholder="আপনার ইমেইল দিন"
                                            />

                                            <input
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                className="form-control"
                                                id="exampleFormControlInput1"
                                                name="password"
                                                placeholder="আপনার পাসওয়ার্ড  দিন"
                                            />
                                            <input
                                                onChange={(e) => setconfirm_password(e.target.value)}
                                                type="password"
                                                className="form-control"
                                                id="exampleFormControlInput1"
                                                name="confirm_password"
                                                placeholder="আপনার কনফার্ম পাসওয়ার্ড দিন"
                                            />
                                            <button
                                                type="submit"
                                                className="login-submit-button mb-3"
                                            >
                                                Update {clickedRender ? <span class="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span> : ''}
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
                    </div>
                </div>
            </section>
        </>
    )
}
export default ForgotPasswordConfirm