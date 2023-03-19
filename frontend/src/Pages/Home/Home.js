import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavigationBa from "../Shared/NavigationBa/NavigationBa";
import "./Home.css";
import docIcon from "../../images/document.png";
import chapterIcon from "../../images/chapter.png";
import bookIcon from "../../images/book.png";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SearchIcon from "@mui/icons-material/Search";
import HomeSlider from "./HomeSlider";
import { Link } from "react-router-dom";

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <div className="row">
          <div className="col-xl-7 col-lg-8 col-md-7 col-md-12 col-12 d-flex">
            <div className=" amounts-div">
              <img src={docIcon} alt="" />
              <h4 className="amount-doc-text">
                ৩০ টি
                <br />
                <span className="doc-span">ডকুমেন্ট </span>{" "}
              </h4>
            </div>
            <div className=" amounts-div">
              <img src={chapterIcon} alt="" />
              <h4 className="amount-doc-text">
                ৩০ টি
                <br />
                <span className="doc-span">চ্যাপ্টার </span>{" "}
              </h4>
            </div>
            <div className=" amounts-div">
              <img src={bookIcon} alt="" />
              <h4 className="amount-doc-text">
                ৩০ টি
                <br />
                <span className="doc-span">বই </span>{" "}
              </h4>
            </div>
          </div>
          <div className="col-xl-5 col-lg-4 col-md-5 col-md-12 col-12">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h4 className="samprotik">সাম্প্রতিক </h4>
              <h6 className="sob-dekhun">সব দেখুন </h6>
            </div>
            <div className="row">
              <div className="col-xl-10 col-lg-10 col-md-8 col-sm-6">
                <p>
                  ২ টি নতুন চ্যাপ্টার যোগ করা হয়েছে যোগ করেছেন আনিসুর রাহমান (
                  উপ সচিব ) ০৪ জানু ২০২৩ , ১২. ৪৪ মিনিট{" "}
                </p>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                <div className="d-flex justify-content-between">
                  <CancelOutlinedIcon className="icons" />
                  <RemoveRedEyeIcon className="icons" />
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-8 col-sm-6">
                <p>
                  ১৫ টি পরিবর্তন ও সংশোধন করা হয়েছে পরিবর্তন করেছেন আনিসুর
                  রাহমান ( উপ সচিব ) ০৪ জানু ২০২৩ , ১২. ৪৪ মিনিট
                </p>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                <div className="d-flex justify-content-between">
                  <CancelOutlinedIcon className="icons" />
                  <RemoveRedEyeIcon className="icons" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid mt-5">
        <div className="row">
          <div className="col-xl-6 col-lg-5 col-md-6">
            <h6>যোগ করুন </h6>
          </div>
          <div className="col-xl-6 col-lg-7 col-md-6">
            <div className="books-index-search">
              <h6>
                {" "}
                <span>
                  <LibraryBooksIcon className="icons" />
                </span>
                সকল বই দেখুন{" "}
              </h6>
              <h6>
                {" "}
                <span>
                  <AutoStoriesIcon className="icons" />
                </span>
                ইনডেক্স দেখুন
              </h6>
              <div className="serchInput-icon-div">
                <SearchIcon />
                <input type="search" className="gsearch" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="container-fluid">
        <div>
          <HomeSlider />
        </div>
      </section>
      <hr />

      <section className="">
        <div className="row home-input-tags container-fluid">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <h5>বই এর তথ্য যোগ করুন </h5>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 khosra-songrokkhon">
            <Link to="/draft-documents">
              {" "}
              <p className="khosra-songrokkhon-p">
                <span>
                  <ErrorOutlineOutlinedIcon className="me-2" />
                </span>
                আপনার ০২ টি খসড়া সংরক্ষণ করা আছে{" "}
              </p>
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="row ">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <lebel>বই এর নাম </lebel> <br />
              <input className="home-input" type="text" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <lebel> অন্যান্য </lebel> <br />
              <input className="home-input" type="text" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <lebel> লেখক এর নাম </lebel> <br />
              <input className="home-input" type="text" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <lebel>অন্যান্য </lebel> <br />
              <input className="home-input" type="text" />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <lebel> প্রকাশ কাল </lebel> <br />
              <DatePicker
                className="home-input"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <lebel> অন্যান্য </lebel> <br />
              <input className="home-input" type="text" />
            </div>
          </div>
          <div className="home-input-button-div">
            <button className="home-input-button1">খসড়া </button>
            <button className="home-input-button2">প্রকাশ করুন </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
