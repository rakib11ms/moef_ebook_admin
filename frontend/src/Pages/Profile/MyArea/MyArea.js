import React, { useState } from "react";
import Slider from "react-slick";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./MyArea.css";
import profilePic from "../../../images/profile-pic.jpg";
import bookImg from "../../../images/book.png";
import CreateIcon from "@mui/icons-material/Create";
import GppGoodIcon from "@mui/icons-material/GppGood";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Navigate, useNavigate, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";

// const state = {
//   selectedFile: null
// };

// const onFileChange = event => {
//   state.selectedFile = event.target.files[0];
// };

// const handleFileUpload = () => {
//   if (!state.selectedFile) {
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: "Please select a file!",
//     });
//     return;
//   }
//   //get user id from user json local storage
  // const userID = JSON.parse(localStorage.getItem('user')).id;
//   const formData = new FormData();
//   formData.append(
//     "file",
//     state.selectedFile,
//     state.selectedFile.name
//   );
  
//   axios.post("api/update-user/" + userID, formData).then(res => {
//     console.log(res);
//   });
// };

const MyArea = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  // console.log(selectedFile);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const formData = new FormData();
  formData.append('userImage', selectedFile);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log("xx",formData.get('userImage'))
    
    const userID = JSON.parse(localStorage.getItem('user')).id;

    try {
      await axios.post("api/update-user/" + userID, formData).then(res => {

        console.log(res);
        Swal.fire({
          icon: "success",
          title: "সফলভাবে আপলোড হয়েছে",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "আপলোড করা যায়নি!",
      });
    }
  };

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <div className="row ">
          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
            <div className="my-area-left-div container">
              <h3 className="d-flex justify-content-center mb-3 pt-3">
                আমার এরিয়া
              </h3>
              <div className="name-pic-div">
                <img className="profile-pic" src={profilePic} alt="" />
                <br />
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <strong className="change-pp-button">
                    প্রোফাইল ছবি পরিবর্তন করুন
                    <input className="change-pp-button" type="file" name="userImage" onChange={handleFileChange} />
                    <button className="btn btn-success" type="submit">আপলোড</button>
                  </strong>
                </form>
              </div>
              <div>
                <div className="offi-info-div">
                  <p>অফিসিয়াল তথ্য</p>
                  <CreateIcon />
                </div>
                <div className="name-info container">
                  <p>অফিসের নাম</p>
                  <p>ঠিকানা</p>
                  <p>অফিস এর আইডি</p>
                  <p>ইমেইল</p>
                  <p>ফোন নম্বর</p>
                </div>
              </div>
              <div className="varify-button-div">
                <button className="area-varify-button">
                  <span>
                    <GppGoodIcon />
                  </span>
                  প্রোফাইল ভেরিফাইড
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-8 col-md-8 col-sm-12 col-12">
            <section className="container-fluid">
              <h5>আমার বই</h5>
              <div className="area-all-books-div">
                <div className="area-book-div">
                  <img className="bookImg-area" src={bookImg} alt="" />
                  <p>পরিবেশ আইন ১০১-২০০</p>
                </div>
                <div className="area-book-div">
                  <img className="bookImg-area" src={bookImg} alt="" />
                  <p>জাতীয় পরিবেশ নীতি ২০১৮</p>
                </div>
                <div className="area-book-div">
                  <img className="bookImg-area" src={bookImg} alt="" />
                  <p>পরিবেশ আইন ২০০-৩৩৬</p>
                </div>
                <div className="area-book-div">
                  <img className="bookImg-area" src={bookImg} alt="" />
                  <p>পরিবেশ আদালত আইন, ২০১০</p>
                </div>
                <div className="area-book-div">
                  <img className="bookImg-area" src={bookImg} alt="" />
                  <p>১৯২৭ বন আইন</p>
                </div>
              </div>
            </section>
            <section className="mt-5 container-fluid">
              <h5>আমার বুকমার্কস</h5>
              <div className="row ">
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 me-4">
                  <div className="bookmark-div">
                    <div className="d-flex align-items-center">
                      <img className="bookmark-img" src={bookImg} alt="" />
                      <p>১৯২৭ বন আইন</p>
                    </div>
                    <BookmarksIcon style={{ color: "#8D8E92" }} />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                  <div className="bookmark-div">
                    <div className="d-flex align-items-center">
                      <img className="bookmark-img" src={bookImg} alt="" />
                      <p>পরিবেশ আইন সংকলন ২০০-৩৩৬</p>
                    </div>
                    <BookmarksIcon style={{ color: "#8D8E92" }} />
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-5 container-fluid">
              <h5>আমার ড্রাফট</h5>
              <div>
                <Slider {...settings}>
                  <div className="draft-card-div">
                    <div>
                      <p>
                        বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা
                        সাকিব-তামিমের মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি।
                        নেতৃত্বে যখন ফাটল থাকবে, তখন দলে ফাটল ধরবে, এ তো নতুন
                        কিছু নয়! তারপরও ক্রিকেটারদের ধন্যবাদ দিতে হয়,
                      </p>
                    </div>
                    <div className="d-flex ">
                      <CreateIcon className=" area-draft-icon" />
                      <DeleteIcon className=" area-draft-icon" />
                    </div>
                  </div>
                  <div className="draft-card-div">
                    <div>
                      <p>
                        বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা
                        সাকিব-তামিমের মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি।
                        নেতৃত্বে যখন ফাটল থাকবে, তখন দলে ফাটল ধরবে, এ তো নতুন
                        কিছু নয়! তারপরও ক্রিকেটারদের ধন্যবাদ দিতে হয়,
                      </p>
                    </div>
                    <div className="d-flex ">
                      <CreateIcon className=" area-draft-icon" />
                      <DeleteIcon className=" area-draft-icon" />
                    </div>
                  </div>
                  <div className="draft-card-div">
                    <div>
                      <p>
                        বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা
                        সাকিব-তামিমের মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি।
                        নেতৃত্বে যখন ফাটল থাকবে, তখন দলে ফাটল ধরবে, এ তো নতুন
                        কিছু নয়! তারপরও ক্রিকেটারদের ধন্যবাদ দিতে হয়,
                      </p>
                    </div>
                    <div className="d-flex ">
                      <CreateIcon className=" area-draft-icon" />
                      <DeleteIcon className=" area-draft-icon" />
                    </div>
                  </div>
                  <div className="draft-card-div">
                    <div>
                      <p>
                        বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা
                        সাকিব-তামিমের মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি।
                        নেতৃত্বে যখন ফাটল থাকবে, তখন দলে ফাটল ধরবে, এ তো নতুন
                        কিছু নয়! তারপরও ক্রিকেটারদের ধন্যবাদ দিতে হয়,
                      </p>
                    </div>
                    <div className="d-flex ">
                      <CreateIcon className=" area-draft-icon" />
                      <DeleteIcon className=" area-draft-icon" />
                    </div>
                  </div>
                  <div className="draft-card-div">
                    <div>
                      <p>
                        বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা
                        সাকিব-তামিমের মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি।
                        নেতৃত্বে যখন ফাটল থাকবে, তখন দলে ফাটল ধরবে, এ তো নতুন
                        কিছু নয়! তারপরও ক্রিকেটারদের ধন্যবাদ দিতে হয়,
                      </p>
                    </div>
                    <div className="d-flex ">
                      <CreateIcon className=" area-draft-icon" />
                      <DeleteIcon className=" area-draft-icon" />
                    </div>
                  </div>
                </Slider>
              </div>
            </section>

            <section className="mt-5 container-fluid">
              <h5>আমার প্রকাশিত</h5>
              <div className="prokash-card-div">
                <div>
                  <p>
                    বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা
                    সাকিব-তামিমের মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি।
                    নেতৃত্বে যখন ফাটল থাকবে, তখন দলে ফাটল ধরবে, এ তো নতুন কিছু
                    নয়! তারপরও ক্রিকেটারদের ধন্যবাদ দিতে হয়,
                  </p>
                </div>
                <div className="d-flex ">
                  <CreateIcon className=" area-draft-icon" />
                  <DeleteIcon className=" area-draft-icon" />
                </div>
              </div>
            </section>
            <section className="container-fluid mt-5 mb-3">
              <h5>নোটিফিকেশন</h5>
              <div className="notification-div">
                <p>আপনার জন্য, কোন নোটিফিকেশন নেই</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyArea;
