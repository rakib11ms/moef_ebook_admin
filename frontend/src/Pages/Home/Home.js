import React from "react";
import NavigationBa from "../Shared/NavigationBa/NavigationBa";
import "./Home.css";
import docIcon from "../../images/document.png";
import chapterIcon from "../../images/chapter.png";
import bookIcon from "../../images/book.png";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
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

      <section className="container-fluid">
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
    </div>
  );
};

export default Home;
