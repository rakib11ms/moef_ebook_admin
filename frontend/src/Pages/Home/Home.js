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

import chapter1Img from "../../images/chapter1.png";
import onuchhedImg from "../../images/onuchhed.png";
import pagePlusImg from "../../images/page-plus.png";
import AddIcon from "@mui/icons-material/Add";
import bookPlusImg from "../../images/book-plus.png";
import SearchIcon from "@mui/icons-material/Search";
// import HomeSlider from "./HomeSlider";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import JoditEditor from "jodit-react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = React.useState(0);
  const [openCollapse, setOpenCollapse] = useState("");
  const [content, setContent] = useState("");

  // active div
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const handleCollapse = (id) => {
    setOpenCollapse(openCollapse === id ? "" : id);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Upload button
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadButtonClick = () => {
    // handle the upload logic here
    console.log(selectedFile);
  };

  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <div className="row">
          <div className="col-xl-7 col-lg-8 col-md-7 col-md-12 col-12 d-flex doc-chap-book">
            <div className=" amounts-div">
              <img className="home-img" src={docIcon} alt="" />
              <h4 className="amount-doc-text">
                ৩০ টি
                <br />
                <span className="doc-span">ডকুমেন্ট </span>{" "}
              </h4>
            </div>
            <div className=" amounts-div">
              <img className="home-img" src={chapterIcon} alt="" />
              <h4 className="amount-doc-text">
                ৩০ টি
                <br />
                <span className="doc-span">চ্যাপ্টার </span>{" "}
              </h4>
            </div>
            <div className=" amounts-div">
              <img className="home-img" src={bookIcon} alt="" />
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
          <div className="col-xl-6 col-lg-7 col-md-6 col-sm-12 col-12">
            <div className="books-index-search">
              <div className="all-books-index-show">
                <Link to="/all-books">
                  <h6>
                    {" "}
                    <span>
                      <LibraryBooksIcon className="icons" />
                    </span>
                    সকল বই দেখুন{" "}
                  </h6>
                </Link>
              </div>
              <div className="all-books-index-show">
                <h6>
                  {" "}
                  <span>
                    <AutoStoriesIcon className="icons" />
                  </span>
                  ইনডেক্স দেখুন
                </h6>
              </div>
              <div className="home-serchInput-icon-div">
                <SearchIcon />
                <input type="search" className="gsearch-home" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="container-fluid">
        {/* <div>
          <HomeSlider />
        </div> */}
        {/* <div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="বই যোগ করুন +" {...a11yProps(0)} />
                <Tab label="অধ্যায়  যোগ করুন +" {...a11yProps(1)} />
                <Tab label="অনুচ্ছেদ যোগ করুন +" {...a11yProps(2)} />
                <Tab label="পেইজ যোগ করুন  +" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
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
                      <lebel> ক্যাটেগরি * </lebel> <br />
                      <div className="d-flex border align-items-center">
                        <select
                          class="form-select select-category"
                          aria-label="Default select example"
                        >
                          <option selected></option>
                          <option value="1">ফিকশণ </option>
                          <option value="2">প্রবন্ধ</option>
                          <option value="3">কবিতা</option>
                          <option value="3">উপন্যাস</option>
                        </select>
                        <div>
                          <Link to="/book-categories">
                            {" "}
                            <ControlPointOutlinedIcon className="control-icon" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <lebel> লেখক এর নাম </lebel> <br />
                      <input className="home-input" type="text" />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <lebel>প্রকাশক </lebel> <br />
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
                      <lebel> ভাষা </lebel> <br />
                      <select
                        class="form-select select-category2"
                        aria-label="Default select example"
                      >
                        <option selected></option>
                        <option value="1">বাংলা</option>
                        <option value="2">ইংরেজি</option>
                        <option value="3">হিন্দী</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleFileInputChange}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="fileInput" className="btn btn-warning">
                      <strong>বইয়ের প্রচ্ছদ (ছবি আপলোড করুন)</strong>
                    </label>
                  </div>
                  <div className="home-input-button-div">
                    <button className="home-input-button1">খসড়া </button>
                    <button className="home-input-button2">প্রকাশ করুন </button>
                  </div>
                </div>
              </section>
            </TabPanel>

            <TabPanel value={value} index={1}>
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
                      <lebel>অধ্যায়ের নাম * </lebel> <br />
                      <input className="home-input" type="text" />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <lebel> বই নির্নয় করুন * </lebel> <br />
                      <div className="d-flex border align-items-center">
                        <select
                          class="form-select select-category"
                          aria-label="Default select example"
                        >
                          <option selected>জাতীয় পরিবেশ নীতি ২০১৯ </option>
                          <option value="1">জাতীয় পরিবেশ নীতি ২০১৮ </option>
                          <option value="2">জাতীয় পরিবেশ নীতি ২০১৩</option>
                          <option value="3">জাতীয় পরিবেশ নীতি ২০১৪</option>
                          <option value="3">জাতীয় পরিবেশ নীতি ২০১২</option>
                        </select>
                        <div>
                          <Link to="">
                            {" "}
                            <ControlPointOutlinedIcon className="control-icon" />
                          </Link>
                        </div>
                      </div>
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
            </TabPanel>
            <TabPanel value={value} index={2}>
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
            </TabPanel>
            <TabPanel value={value} index={3}>
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
            </TabPanel>
          </Box>
        </div> */}
      </section>

      <section className="active-div container-fluid">
        <div className="clickble-div">
          <div
            className={activeButton === 1 ? "active-button" : "inactive-button"}
            onClick={() => handleButtonClick(1)}
            id="single-slide-div"
          >
            {" "}
            <img className="img-fluid slide-img" src={bookPlusImg} alt="" />
            <h6 className="text">বই যোগ করুন </h6>
            <AddIcon />
          </div>

          <div
            className={activeButton === 2 ? "active-button" : "inactive-button"}
            onClick={() => handleButtonClick(2)}
            id="single-slide-div"
          >
            {" "}
            <img className="img-fluid slide-img" src={chapter1Img} alt="" />
            <h6>অধ্যায় যোগ করুন</h6>
            <AddIcon />
          </div>
          <div
            className={activeButton === 3 ? "active-button" : "inactive-button"}
            onClick={() => handleButtonClick(3)}
            id="single-slide-div"
          >
            <img className="img-fluid slide-img" src={onuchhedImg} alt="" />
            <h6>অনুচ্ছেদ যোগ করুন</h6>
            <AddIcon />
          </div>
          <div
            className={activeButton === 4 ? "active-button" : "inactive-button"}
            onClick={() => handleButtonClick(4)}
            id="single-slide-div"
          >
            <img className="img-fluid slide-img" src={pagePlusImg} alt="" />
            <h6>পেইজ যোগ করুন </h6>
            <AddIcon />
          </div>
        </div>
        <hr />

        <div className="home-inputs-div">
          <div className="home-inputs">
            {activeButton === 1 && (
              <div className="tab-1">
                <section className="">
                  <div className="row home-input-tags container-fluid">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <h5>বই এর তথ্য যোগ করুন </h5>
                    </div>
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 khosra-songrokkhon">
                      <Link to="/draft-documents">
                        {" "}
                        <p className="khosra-songrokkhon-p">
                          <span>
                            <ErrorOutlineOutlinedIcon className="me-2" />
                          </span>
                          আপনার ০২ টি খসড়া সংরক্ষণ করা আছে{" "}
                        </p>
                      </Link>
                    </div> */}
                  </div>
                  <div className="container">
                    <div className="row ">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <lebel>বই এর নাম </lebel> <br />
                        <input className="home-input" type="text" />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <lebel> ক্যাটেগরি *</lebel> <br />
                        <div className="d-flex border align-items-center">
                          <select
                            className="form-select select-category"
                            aria-label="Default select example"
                          >
                            <option selected></option>
                            <option value="1">ফিকশণ </option>
                            <option value="2">প্রবন্ধ</option>
                            <option value="3">কবিতা</option>
                            <option value="3">উপন্যাস</option>
                          </select>
                          <div>
                            <Link to="/book-categories">
                              {" "}
                              <ControlPointOutlinedIcon className="control-icon" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <lebel> লেখক এর নাম </lebel> <br />
                        <input className="home-input" type="text" />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <lebel>প্রকাশক </lebel> <br />
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
                        <lebel> ভাষা </lebel> <br />
                        <select
                          className=" select-category2"
                          aria-label="Default select example"
                        >
                          <option selected></option>
                          <option value="1">বাংলা</option>
                          <option value="2">ইংরেজি</option>
                          <option value="3">হিন্দী</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileInputChange}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="fileInput" className="btn btn-warning">
                        <strong>বইয়ের প্রচ্ছদ (ছবি আপলোড করুন)</strong>
                      </label>
                    </div>
                    <div className="home-input-button-div">
                      <button className="home-input-button1">খসড়া </button>
                      <button className="home-input-button2">
                        প্রকাশ করুন{" "}
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeButton === 2 && (
              <div className="tab-2">
                <section className="">
                  <div className="row home-input-tags container-fluid">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <h5>বইয়ের অধ্যায় যোগ করুন </h5>
                    </div>
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 khosra-songrokkhon">
                      <Link to="/draft-documents">
                        {" "}
                        <p className="khosra-songrokkhon-p">
                          <span>
                            <ErrorOutlineOutlinedIcon className="me-2" />
                          </span>
                          আপনার ০২ টি খসড়া সংরক্ষণ করা আছে{" "}
                        </p>
                      </Link>
                    </div> */}
                  </div>
                  <div className="container">
                    <div className="row ">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <lebel required>অধ্যায়ের নাম * </lebel> <br />
                        <input className="home-input" type="text" />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <lebel> বই নির্নয় করুন * </lebel> <br />
                        <div className="d-flex border align-items-center">
                          <select
                            class="form-select select-category"
                            aria-label="Default select example"
                          >
                            <option selected>জাতীয় নীতি-মালা যোগ করুন </option>
                            <option value="1">জাতীয় পরিবেশ নীতি ২০১৮ </option>
                            <option value="2">জাতীয় পরিবেশ নীতি ২০১৩</option>
                            <option value="3">জাতীয় পরিবেশ নীতি ২০১৪</option>
                            <option value="3">জাতীয় পরিবেশ নীতি ২০১২</option>
                          </select>
                          <div>
                            <Link to="">
                              {" "}
                              <ControlPointOutlinedIcon className="control-icon" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-input-button-div">
                      <button className="home-input-button1">খসড়া </button>
                      <button className="home-input-button2">
                        প্রকাশ করুন{" "}
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeButton === 3 && (
              <div>
                <section className="">
                  <div className="row home-input-tags container-fluid">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <h5>বইয়ের অনুচ্ছেদ যোগ করুন </h5>
                    </div>
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 khosra-songrokkhon">
                      <Link to="/draft-documents">
                        {" "}
                        <p className="khosra-songrokkhon-p">
                          <span>
                            <ErrorOutlineOutlinedIcon className="me-2" />
                          </span>
                          আপনার ০২ টি খসড়া সংরক্ষণ করা আছে{" "}
                        </p>
                      </Link>
                    </div> */}
                  </div>
                  <div className="container">
                    <div className="row ">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <lebel>অনুচ্ছেদের নাম * </lebel> <br />
                        <input className="home-input" type="text" />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                        <lebel> বই নির্নয় করুন * </lebel> <br />
                        <div className="d-flex border align-items-center">
                          <select
                            class="form-select select-category"
                            aria-label="Default select example"
                          >
                            <option selected>বই যোগ করুন </option>
                            <option value="1">জাতীয় পরিবেশ নীতি ২০১৮ </option>
                            <option value="2">জাতীয় পরিবেশ নীতি ২০১৩</option>
                            <option value="3">জাতীয় পরিবেশ নীতি ২০১৪</option>
                            <option value="3">জাতীয় পরিবেশ নীতি ২০১২</option>
                          </select>
                          <div>
                            <Link to="">
                              {" "}
                              <ControlPointOutlinedIcon className="control-icon" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-5 select-Chapter">
                        <lebel> অধ্যায় নির্নয় করুন * </lebel> <br />
                        <div className="d-flex border align-items-center">
                          <select
                            class="form-select select-category"
                            aria-label="Default select example"
                          >
                            <option selected> অধ্যায় সমগ্র </option>
                            <option value="1">পরিবেশ নীতির সকল সমগ্র১ </option>
                            <option value="2">পরিবেশ নীতির সকল সমগ্র২</option>
                            <option value="3">পরিবেশ নীতির সকল সমগ্র৩</option>
                            <option value="3">পরিবেশ নীতির সকল সমগ্র৪</option>
                          </select>
                          <div>
                            <Link to="">
                              {" "}
                              <ControlPointOutlinedIcon className="control-icon" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-input-button-div">
                      <button className="home-input-button1">খসড়া </button>
                      <button className="home-input-button2">
                        প্রকাশ করুন{" "}
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeButton === 4 && (
              <div>
                <section className="">
                  <div className="row home-input-tags container-fluid">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                      <h5>নতুন পৃষ্ঠা যোগ করুন </h5>
                    </div>
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 khosra-songrokkhon">
                      <Link to="/draft-documents">
                        {" "}
                        <p className="khosra-songrokkhon-p">
                          <span>
                            <ErrorOutlineOutlinedIcon className="me-2" />
                          </span>
                          আপনার ০২ টি খসড়া সংরক্ষণ করা আছে{" "}
                        </p>
                      </Link>
                    </div> */}
                  </div>
                  <div className="container">
                    <div className="row ">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12  mb-4">
                        <lebel>বই নির্নয় করুন * </lebel> <br />
                        <div className="select-category-div">
                          <select
                            class="form-select select-category"
                            aria-label="Default select example"
                          >
                            <option selected>বই নির্বাচন করুন</option>
                            <option value="1">পরিবেশ নীতির সকল সমগ্র১ </option>
                            <option value="2">পরিবেশ নীতির সকল সমগ্র২</option>
                            <option value="3">পরিবেশ নীতির সকল সমগ্র৩</option>
                            <option value="3">পরিবেশ নীতির সকল সমগ্র৪</option>
                          </select>
                          <div>
                            <Link to="">
                              {" "}
                              <ControlPointOutlinedIcon className="control-icon" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-5 select-Chapter">
                        <lebel> অধ্যায় নির্নয় করুন * </lebel> <br />
                        <div className="select-category-div">
                          <select
                            class="form-select select-category"
                            aria-label="Default select example"
                          >
                            <option selected>অধ্যায় নির্বাচন করুন</option>
                            <option value="1">পরিবেশ নীতির সকল সমগ্র১ </option>
                            <option value="2">পরিবেশ নীতির সকল সমগ্র২</option>
                            <option value="3">পরিবেশ নীতির সকল সমগ্র৩</option>
                            <option value="3">পরিবেশ নীতির সকল সমগ্র৪</option>
                          </select>
                          <div>
                            <Link to="">
                              {" "}
                              <ControlPointOutlinedIcon className="control-icon" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-5">
                        <lebel> অনুচ্ছেদ নির্নয় করুন * </lebel> <br />
                        <div className="select-category-div">
                          <select
                            class="form-select select-category"
                            aria-label="Default select example"
                          >
                            <option selected>অনুচ্ছেদ নির্বাচন করুন </option>
                            <option value="1">অনুচ্ছেদ ১ </option>
                            <option value="2">অনুচ্ছেদ ২</option>
                            <option value="3">অনুচ্ছেদ ৩</option>
                            <option value="3">অনুচ্ছেদ ৪</option>
                          </select>
                          <div>
                            <Link to="">
                              {" "}
                              <ControlPointOutlinedIcon className="control-icon" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-5">
                        <JoditEditor
                          value={content}
                          onChange={setContent}
                          height={400}
                          spellcheck={false}
                          language="en"
                        />
                      </div>
                    </div>
                    <div className="home-input-button-div">
                      <button className="home-input-button1">খসড়া </button>
                      <button className="home-input-button2">
                        প্রকাশ করুন{" "}
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* <section className="">
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
      </section> */}
    </div>
  );
};

export default Home;
