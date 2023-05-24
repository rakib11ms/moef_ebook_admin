import React, { useState, useEffect, navigate } from "react";
import Slider from "react-slick";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./MyArea.css";
// import profilePic from "../../../images/profile-pic.jpg";
import bookImg from "../../../images/book.png";
import singleDoc from "../../../images/document.png";
import CreateIcon from "@mui/icons-material/Create";
import GppGoodIcon from "@mui/icons-material/GppGood";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import DeleteIcon from "@mui/icons-material/Delete";
// import { Link, Navigate, useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

import CheckIcon from "@mui/icons-material/Check";

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
  const [loading, setLoading] = useState(true);
  const [loadingDrafts, setLoadingDrafts] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("user"));
  const userID = JSON.parse(localStorage.getItem("user")).id;
  const [user, setUser] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  async function getUserImage() {
    await axios.get("api/get-user-image/" + userID).then((res) => {
      setUser(res.data.image);
    });
  }

  const [booksMain, setBooksMain] = useState([]);
  const [singleDocuments, setSingleDocuments] = useState([]);

  const $user = JSON.parse(localStorage.getItem("user"));

  async function getBooksMain() {
    await axios
      .get(
        "api/get-all-main-books-and-single-documents-for-a-specific-user/" +
          $user.id
      )
      .then((res) => {
        //store to bookMain whose type is main_book from res.data.data
        const bookMain = res.data.data.filter(
          (item) => item.type === "main_book"
        );
        setBooksMain(bookMain);

        //store to singleDocuments whose type is single_document from res.data.data
        const singleDocument = res.data.data.filter(
          (item) => item.type === "single_document"
        );
        setSingleDocuments(singleDocument);
      });
  }

  const [draftsBooks, setDraftsBooks] = useState([]);
  const [draftsSingleDocs, setDraftsSingleDocs] = useState([]);

  async function fetchDrafts() {
    await axios
      .get("api/get-All-Draft-Books-And-Single-Documents-By-UserID/" + $user.id)
      .then((res) => {
        if (res.data.status === 200) {
          const draftsBook = res.data.data.filter(
            (item) => item.type === "main_book"
          );
          setDraftsBooks(draftsBook);
          // console.log(draftsBook);

          const draftsSingleDoc = res.data.data.filter(
            (item) => item.type === "single_document"
          );
          setDraftsSingleDocs(draftsSingleDoc);
          // console.log(draftsSingleDoc);
        }
      });
  }

  useEffect(() => {
    // axios.get("api/get-user-image/" + userID).then((res) => {
    //   setUser(res.data.image);
    // });
    getUserImage();
    setTimeout(() => {
      getBooksMain();
      setLoading(false);
    }, 500);

    setTimeout(() => {
      fetchDrafts();
      setLoadingDrafts(false);
    }, 500);
  }, []);

  // console.log(user);

  const [selectedFile, setSelectedFile] = useState(null);
  // console.log(selectedFile);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const [file, setFile] = useState(null);

  const handleUpload = () => {
    console.log("Uploading file:", file);
    // Implement your file upload logic here
  };

  const formData = new FormData();
  formData.append("userImage", selectedFile);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select a file!",
      });
      return;
    }
    // console.log("xx",formData.get('userImage'))

    try {
      await axios
        .post("api/update-user/" + userID, formData, config)
        .then((res) => {
          //display current user image
          axios.get("api/get-user-image/" + userID).then((res) => {
            setUser(res.data.image);
          });
          // console.log(res);
          Swal.fire({
            icon: "success",
            title: "সফলভাবে আপলোড হয়েছে",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } catch (error) {
      // console.log(error);
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

  const [userUpdate, setUserInfo] = useState({
    UserName: userInfo.UserName,
    userEmail: userInfo.email,
    userPhone: userInfo.userPhone,
  });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserInfo({ ...userUpdate, [name]: value });
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // console.log(userUpdate);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.post("api/update-user/" + userID, userUpdate).then((res) => {
        console.log(res);
        // handleEditClick();
        //update local storage only name, email and phone
        const user = JSON.parse(localStorage.getItem("user"));
        user.UserName = userUpdate.UserName;
        user.email = userUpdate.userEmail;
        user.userPhone = userUpdate.userPhone;
        localStorage.setItem("user", JSON.stringify(user));
        setUserInfo({
          UserName: user.UserName,
          userEmail: user.email,
          userPhone: user.userPhone,
        });
        Swal.fire({
          icon: "success",
          title: "সফলভাবে আপডেট হয়েছে",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ইমেইল অথবা ফোন নাম্বার পরিবর্তন করে আবার চেষ্টা করুন ",
      });
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      document.getElementById("editInp").focus();
    }
  }, [isEditing]);

  const handleEditClick = (e) => {
    // setIsEditing(!isEditing);
    // document.getElementById("editInp").focus();
    setIsEditing(!isEditing);
    // console.log(isEditing);
    if (isEditing) {
      handleUpdate(e);
    }
  };

  // Upload button
  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSingleDoc = async (event) => {
    const currentPage = window.location.pathname;
    window.location.href = `/view-documents/${
      event.id
    }?page=${encodeURIComponent(currentPage)}`;
  };

  const currentPage = window.location.pathname;
  const handleBook = async (event) => {
    window.location.href = `/view-books/${event.id}?page=${encodeURIComponent(
      currentPage
    )}`;
  };

  function truncateContent(content, lines) {
    const paragraphs = content.split("\n");
    const truncatedContent = paragraphs.slice(0, lines).join("\n");
    return truncatedContent;
  }

  return (
    <div>
      <section>
        <NavigationBa onClick={handleEditClick} />
      </section>
      <section className="container-fluid">
        <div className="row ">
          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12 col-12">
            <div className="my-area-left-div container">
              <h3 className="d-flex justify-content-center mb-3 pt-3">
                আমার এরিয়া
              </h3>
              <div className="name-pic-div">
                <img
                  className="profile-pic"
                  id="profile-dp"
                  src={`${global.imageURL}/images/user/${user}`}
                  alt="User dp"
                />
                <br />
                {/* <strong className="change-pp-button mb-2">
                  প্রোফাইল ছবি পরিবর্তন করুন
                </strong> */}
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="file"
                      id="fileInput"
                      onChange={handleFileChange}
                      // style={{ display: "none" }}
                      className="area-upload"
                    />
                    <label htmlFor="fileInput" className="btn btn-warning">
                      <strong>প্রোফাইল ছবি পরিবর্তন করুন</strong>
                    </label>
                  </div>
                  {/* 
                    <input className="change-pp-button" type="file" name="userImage" onChange={handleFileChange} /> */}

                  {file && (
                    <button
                      onClick={handleUpload}
                      className="btn btn-success upload-button"
                      type="submit"
                    >
                      আপলোড
                    </button>
                  )}
                </form>
              </div>

              <div>
                <div className="offi-info-div">
                  <p>অফিসিয়াল তথ্য</p>
                  <div onClick={handleEditClick}>
                    {/* <EditIcon
                      onClick={handleClick}
                      // onClick={handleEditClick}
                      // onDoubleClickDelay={500}
                      className="mt-1 "
                      style={{ cursor: "pointer" }}
                    /> */}
                    {isEditing ? (
                      <CheckIcon
                        className="mt-1"
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <EditIcon
                        onClick={handleClick}
                        className="mt-1"
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </div>
                </div>

                <div className="name-info ">
                  {/* <p>নাম: {userInfo.UserName}</p> */}
                  <form onSubmit={handleUpdate}>
                    <p className="areaName-p">
                      নাম:-
                      {isEditing ? (
                        <input
                          id="editInp"
                          className="form-control-sm outline-0 area-in area-input-name"
                          type="text"
                          name="UserName"
                          value={userUpdate.UserName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          style={{ width: userInfo.UserName.length + 2 + "ch" }}
                        />
                      ) : (
                        <span>{userInfo.UserName}</span>
                      )}
                    </p>

                    <p className="areaEmail-p">
                      ইমেইল:-
                      {isEditing ? (
                        <input
                          id="editInp"
                          className="form-control-sm area-in area-input-email"
                          type="text"
                          name="userEmail"
                          value={userUpdate.userEmail}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          style={{ width: userInfo.email.length + 2 + "ch" }}
                        />
                      ) : (
                        <span>{userInfo.email}</span>
                      )}
                    </p>

                    <p className="areaPhone-p">
                      ফোন:-
                      {isEditing ? (
                        <input
                          id="editInp"
                          className="form-control-sm area-in area-input-phone"
                          type="text"
                          name="userPhone"
                          value={userUpdate.userPhone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          style={{
                            width: userInfo.userPhone.length + 3 + "ch",
                          }}
                        />
                      ) : (
                        <span>{userInfo.userPhone}</span>
                      )}
                    </p>
                    <p className="areaUserID-p" id="profile-user-id">
                      ব্যবহারকারী আইডি:- {userInfo.userID}
                    </p>
                    <p className="areaOfficeID-p" id="profile-user-office-id">
                      অফিস আইডি:-{" "}
                      {userInfo.OfficeID ? userInfo.OfficeID : "অফিস আইডি নেই"}
                    </p>

                    {/* {isClicked && (
                      <button
                        className="btn btn-success"
                        type="submit"
                        id="profile-update-button"
                      >
                        আপডেট
                      </button>
                    )} */}
                  </form>
                  <hr />
                </div>
              </div>
              <div className="varify-button-div">
                <button
                  className="area-varify-button"
                  id="profile-varied-button"
                >
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
              <h5>আমার লাইব্রেরি</h5>
              {/* show all books */}
              <div className="row">
                {/* {booksMain.map((book) => (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                    <button class="SubmitButtonClass" style={{border:"none", background:"none"}} onClick={() => handleBook(book)}>
                      <div className="book-div">
                        <img
                          className="bookImg"
                          src={bookImg}
                          alt="book img"
                        />
                        <p>{book.title}</p>
                      </div>
                    </button>
                  </div>
                ))} */}

                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className=""></span>
                    </div>
                  </div>
                ) : (
                  booksMain.map((book) => (
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-12 singlebooks-area">
                      <button
                        className="SubmitButtonClass"
                        onClick={() => handleBook(book)}
                      >
                        <div className="book-div">
                          <img
                            className="bookImg"
                            src={bookImg}
                            alt="book img"
                          />
                          <p className="area-p">{book.title}</p>
                        </div>
                      </button>
                    </div>
                  ))
                )}

                {loading ? (
                  <div className=""></div>
                ) : (
                  singleDocuments.map((book) => (
                    <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-12 singledoc-area ">
                      <button
                        class="SubmitButtonClass"
                        onClick={() => handleSingleDoc(book)}
                      >
                        <div className="book-div">
                          <img
                            className="single-doc-img"
                            src={singleDoc}
                            alt="book img"
                          />
                          <p className="area-p">{book.title}</p>
                        </div>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* <div className="area-all-books-div">
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
              </div> */}
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
                  {/* <div className="draft-card-div">
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
                  </div> */}

                  {loadingDrafts ? (
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className=""></span>
                      </div>
                    </div>
                  ) : booksMain.length === 0 ? (
                    <p className="text-left">কোন ড্রাফট বই নেই</p>
                  ) : (
                    draftsBooks.map((draftsBook) => (
                      <div className="draft-card-div ">
                        <div
                          key={draftsBook.id}
                          className="draftinternal-card-div row"
                        >
                          <div className="doc-area-div col-xl-10 col-lg-10 col-sm-10 col-md-10 col-10"></div>
                          <div className=" col-xl-2 col-lg-2 col-sm- col-md-2 col-2">
                            {/* show edit and delete icon in the right side */}
                            {/* <CreateIcon className=" area-draft-icon" /> */}
                            <div className="draftinternal-card-div">
                              <Link
                                to={`/edit-books/${
                                  draftsBook.id
                                }?page=${encodeURIComponent(currentPage)}`}
                              >
                                <CreateIcon className=" area-draft-icon" />
                              </Link>
                              <Link>
                                <DeleteIcon
                                  className=" area-draft-icon"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                      title: "আপনি কি নিশ্চিত?",
                                      text: "ডকুমেন্টটি মুছে ফেলতে চান?",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                      showCancelButton: true,
                                      confirmButtonText: "Yes",
                                      cancelButtonText: "Cancel",
                                    }).then((willDelete) => {
                                      if (willDelete.isConfirmed) {
                                        axios
                                          .delete(
                                            `/api/delete-main-book/${draftsBook.id}`
                                          )
                                          .then((res) => {
                                            if (res.data.status === 200) {
                                              Swal.fire(
                                                "ডকুমেন্টটি সফলভাবে ডিলিট করা হয়েছে",
                                                {
                                                  icon: "success",
                                                }
                                              );
                                            }
                                          });
                                        fetchDrafts();
                                      }
                                    });
                                  }}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="area-draft-p">
                          <p>
                            <strong>বইয়ের নাম: </strong>
                            {draftsBook.title}
                          </p>

                          <p>
                            <strong>বইয়ের বর্ণনা: </strong>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: draftsBook.book_content,
                              }}
                            ></div>
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                  {loadingDrafts ? (
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className=""></span>
                      </div>
                    </div>
                  ) : draftsSingleDocs.length === 0 ? (
                    <p className="text-left">কোন ড্রাফট ডকুমেন্ট নেই</p>
                  ) : (
                    draftsSingleDocs.map((draftsSingleDoc) => (
                      <div className="draft-card-div">
                        <div
                          key={draftsSingleDoc.id}
                          className="draftinternal-card-div row"
                        >
                          <div className="doc-area-div col-xl-10 col-lg-10 col-sm-10 col-md-10 col-10"></div>
                          <div className="col-xl-2 col-lg-2 col-sm- col-md-2 col-2">
                            <div className="draftinternal-card-div">
                              <Link
                                to={`/edit-document/${
                                  draftsSingleDoc.id
                                }?page=${encodeURIComponent(currentPage)}`}
                              >
                                <CreateIcon className=" area-draft-icon" />
                              </Link>
                              <Link>
                                <DeleteIcon
                                  className=" area-draft-icon"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                      title: "আপনি কি নিশ্চিত?",
                                      text: "ডকুমেন্টটি মুছে ফেলতে চান?",
                                      icon: "warning",
                                      buttons: true,
                                      dangerMode: true,
                                      showCancelButton: true,
                                      confirmButtonText: "Yes",
                                      cancelButtonText: "Cancel",
                                    }).then((willDelete) => {
                                      if (willDelete.isConfirmed) {
                                        axios
                                          .delete(
                                            `/api/delete-single-document/${draftsSingleDoc.id}`
                                          )
                                          .then((res) => {
                                            if (res.data.status === 200) {
                                              Swal.fire(
                                                "ডকুমেন্টটি সফলভাবে ডিলিট করা হয়েছে",
                                                {
                                                  icon: "success",
                                                }
                                              );
                                            }
                                          });
                                        fetchDrafts();
                                      }
                                    });
                                  }}
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="area-draft-p">
                          <p>
                            <strong>ডকুমেন্টের নাম: </strong>
                            {draftsSingleDoc.title}
                          </p>

                          <p>
                            <strong>ডকুমেন্টের বর্ণনা: </strong>
                            <div
                              className="content-preview"
                              dangerouslySetInnerHTML={{
                                __html: truncateContent(
                                  draftsSingleDoc.document_content,
                                  2
                                ),
                              }}
                            ></div>
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </Slider>
              </div>
            </section>

            {/* <section className="mt-5 container-fluid">
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
            </section> */}

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
