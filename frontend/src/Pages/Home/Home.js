import React, { useEffect, useState, useRef, useMemo } from "react";
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
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import Swal from "sweetalert2";

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

const Home = (props) => {
  const [renderData, setRenderData] = useState("");
  const editor = useRef(null);
  useEffect(() => {
    axios.get("api/total-document-count").then((res) => {
      if (res.data) {
        setTotalDocuments(res.data);
      }
    });
  }, [renderData]);

  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = React.useState(0);
  const [openCollapse, setOpenCollapse] = useState("");
  const [content, setContent] = useState("");
  console.log("cont", content);

  // active div

  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const handleCollapse = (id) => {
    setOpenCollapse(openCollapse === id ? "" : id);
  };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  // Upload button
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };



  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [books, setBooks] = useState([]);
  const [chapters, setchapters] = useState([]);
  const [allParagraphs, setallParagraphs] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState("");
  // console.log('allParagraphs', allParagraphs)

  // console.log('totalDoc',totalDocuments)

  useEffect(() => {
    axios.get("api/book-category").then((res) => {
      if (res.data.bookcategories) {
        setCategories(res.data.bookcategories);
      }
    });

    axios.get("api/language").then((res) => {
      if (res.data.languages) {
        // console.log(res.data.languages);
        setLanguages(res.data.languages);
      }
    });

    axios.get("api/books").then((res) => {
      if (res.data.books_masters) {
        setBooks(res.data.books_masters);
      }
    });

    axios.get("api/bookChapter").then((res) => {
      if (res.data.bookChapters) {
        setchapters(res.data.bookChapters);
      }
    });

    axios.get("api/bookParagraph").then((res) => {
      if (res.data.book_paragraphs) {
        setallParagraphs(res.data.book_paragraphs);
      }
    });
  }, [renderData]);

  //allstates 

  const[Title,setTitle]=useState('');
  const[CatID,setCatID]=useState('');
  const[PublisherID,setPublisherID]=useState('');
  const[Publish_date,setPublish_date]=useState('');
  const[AuthorID,setAuthorID]=useState('');
  const[LanguageID,setLanguageID]=useState('');

  const[BookID,setBookID]=useState('');
  const[ChapterID,setChapterID]=useState('');
  const[ParagraphID,setParagraphID]=useState('');
  const[ChapterName,setChapterName]=useState('');
  const[ParagraphName,setParagraphName]=useState('');
  

  
  const SubmitBookMaster = (e) => {
    e.preventDefault();
    const masterBookData={
      CatID:CatID,
      Title:Title,
      PublisherID:PublisherID,
      Publish_date:Publish_date,
      AuthorID:AuthorID,
      LanguageID:LanguageID
    }
    axios.post("api/books", masterBookData).then((res) => {
      if (res.data.status === 200) {
        document.getElementById('form1').reset();
        Swal.fire('সফলভাবে সম্পন্ন হয়েছে', '', 'success')
        setRenderData(res.data)
        setCatID('');
        setLanguageID('');
        setPublish_date('');
        setPublisherID('');
        setAuthorID('');
        setTitle('')
 

      }
    });
  };

  const handleChapterSubmit = (event) => {
    event.preventDefault();
    const  chapterData={
     BookID:BookID,
     ChapterName:ChapterName
    }
    axios.post("api/bookChapter", chapterData).then((res) => {
      if (res.data.status === 200) {
        Swal.fire('সফলভাবে সম্পন্ন হয়েছে', '', 'success')
        setRenderData(res.data)
        setChapterName('');
        setBookID('')
    
      }
    });
  };
  

  const handleParagraphSubmit = (event) => {
    event.preventDefault();
    const  paragraphData={
      BookID:BookID,
      ChapterID:ChapterID,
      ParagraphName:ParagraphName
     }
     axios.post("api/bookParagraph", paragraphData).then((res) => {
      if (res.data.status === 200) {
        Swal.fire('সফলভাবে সম্পন্ন হয়েছে', '', 'success')
        setRenderData(res.data)
     
      }
    });
  };

  const handlePageSubmit = (e) => {
    e.preventDefault();
    const  pageData={
      book_id:BookID,
      chapter_id:ChapterID,
      paragraph_id:ParagraphID,
      content:content
     }
    axios.post("api/create-main-book", pageData).then((res) => {
      if (res.data.status === 200) {
        Swal.fire('সফলভাবে সম্পন্ন হয়েছে', '', 'success')
        setRenderData(res.data)

      
      }
    });
  };

    //dependent dropdowns


    useEffect(()=>{
      if(BookID){
        axios.get(`api/get-dependent-chapters-by-book-master-id/${BookID}`).then((res) => {
          if (res.data.book_chapters) {
            setchapters(res.data.book_chapters)
          }
        });
      }
      if(ChapterID){
        axios.get(`api/get-dependent-paragraphs-by-book-chapter-id/${ChapterID}`).then((res) => {
          if (res.data.book_paragraphs) {
            setallParagraphs(res.data.book_paragraphs)
          }
        });
      }
  

    },[BookID,ChapterID])
  
  
  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <div className="row">
          <div className="col-xl-7 col-lg-8 col-md-7 col-md-12 col-12 d-flex doc-chap-book">
            <Link to="/add-document" className=" amounts-div">
              <img className="home-img" src={docIcon} alt="" />
              <h4 className="amount-doc-text">
                <span className="doc-span1">
                  {" "}
                  {totalDocuments.singleDocs == null
                    ? "..."
                    : totalDocuments.singleDocs}{" "}
                </span>
                <br />
                <span className="doc-span">ডকুমেন্ট </span>{" "}
              </h4>
            </Link>
            <Link to="/books-101200" className=" amounts-div">
              <img className="home-img" src={chapterIcon} alt="" />
              <h4 className="amount-doc-text">
                <span className="doc-span1">
                  {" "}
                  {totalDocuments.bookChapter == null
                    ? "..."
                    : totalDocuments.bookChapter}{" "}
                </span>
                <br />
                <span className="doc-span">চ্যাপ্টার </span>{" "}
              </h4>
            </Link>
            <Link to="/all-books" className=" amounts-div">
              <img className="home-img" src={bookIcon} alt="" />
              <h4 className="amount-doc-text">
                <span className="doc-span1">
                  {" "}
                  {totalDocuments.booksMaster == null
                    ? "..."
                    : totalDocuments.booksMaster}{" "}
                </span>
                <br />
                <span className="doc-span">বই </span>{" "}
              </h4>
            </Link>
          </div>
          <div className="col-xl-5 col-lg-4 col-md-5 col-md-12 col-12 recently">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h4 className="samprotik">সাম্প্রতিক </h4>
              <h6 className="sob-dekhun">সব দেখুন </h6>
            </div>
            <div className="row ">
              <div className="col-xl-10 col-lg-10 col-md-8 col-sm-6 ">
                <p>
                  ২ টি নতুন চ্যাপ্টার যোগ করা হয়েছে যোগ করেছেন আনিসুর রাহমান (
                  উপ সচিব ) ০৪ জানু ২০২৩ , ১২. ৪৪ মিনিট{" "}
                </p>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                <div className="d-flex justify-content-between recent-news">
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
              <div className="all-books-index-show" id="all-books-show-btn">
                <Link to="/all-books">
                  <h6 className="doc-text">
                    {" "}
                    <span>
                      <LibraryBooksIcon className="icons" />
                    </span>
                    সকল বই দেখুন{" "}
                  </h6>
                </Link>
              </div>
              <div className="all-books-index-show" id="add-doc-btn">
                <Link to="/add-document">
                  <h6 className="doc-text">
                    {" "}
                    <span>
                      <AutoStoriesIcon className="icons" />
                    </span>
                    <AddIcon />
                    ডকুমেন্ট যোগ করুন
                  </h6>
                </Link>
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
      <section className="container-fluid"></section>

      <section className="active-div container-fluid">
        <div className="clickble-div">
          <div
            className={
              activeButton === 1
                ? "active-button single-slide-div"
                : "inactive-button single-slide-div"
            }
            onClick={() => handleButtonClick(1)}
            id="add-book-button"
          >
            {" "}
            <img className="img-fluid slide-img" src={bookPlusImg} alt="" />
            <h6 className="text">বই যোগ করুন </h6>
            <AddIcon />
          </div>

          <div
            className={
              activeButton === 2
                ? "active-button single-slide-div"
                : "inactive-button single-slide-div"
            }
            onClick={() => handleButtonClick(2)}
            id="add-chapter-button"
          >
            {" "}
            <img className="img-fluid slide-img" src={chapter1Img} alt="" />
            <h6>অধ্যায় যোগ করুন</h6>
            <AddIcon />
          </div>
          <div
            className={
              activeButton === 3
                ? "active-button single-slide-div"
                : "inactive-button single-slide-div"
            }
            onClick={() => handleButtonClick(3)}
            id="add-paragraph-button"
          >
            <img className="img-fluid slide-img" src={onuchhedImg} alt="" />
            <h6>অনুচ্ছেদ যোগ করুন</h6>
            <AddIcon />
          </div>
          <div
            className={
              activeButton === 4
                ? "active-button single-slide-div"
                : "inactive-button single-slide-div"
            }
            onClick={() => handleButtonClick(4)}
            id="add-book-button"
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
                  </div>

                  <form onSubmit={SubmitBookMaster} id="form1">
                    <div className="container">
                      <div className="row ">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <lebel>বই এর নাম *</lebel> <br />
                          <input
                            className="home-input allField"
                            type="text"
                            name="Title"
                            value={Title}
                            onChange={(e)=>setTitle(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <lebel> ক্যাটেগরি *</lebel> <br />
                          <div className="d-flex border align-items-center">
                            <select
                              name="CatID"
                              value={CatID}
                              onChange={(e)=>setCatID(e.target.value)}
                              className="form-select select-category allField"
                              aria-label="Default select example"
                              id="add-book-categories"
                              required
                            >
                              <option selected  value="">
                                ক্যাটাগরি নির্বাচন করুন
                              </option>
                              {categories.map((category, index) => {
                                return (
                                  <option key={index} value={category.id}>
                                    {category.CategoryName}
                                  </option>
                                );
                              })}
                            </select>
                            {/* <div>
                              <Link to="/book-categories">
                                {" "}
                                <ControlPointOutlinedIcon className="control-icon" />
                              </Link>
                            </div> */}
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <lebel> লেখক এর নাম *</lebel> <br />
                          <input
                            name="AuthorID"
                            onChange={(e)=>setAuthorID(e.target.value)}
                            className="home-input allField"
                            type="text"
                            required
                          />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <lebel>প্রকাশক *</lebel> <br />
                          <input
                            name="PublisherID"
                            value={PublisherID}
                            onChange={(e)=>setPublisherID(e.target.value)}
                            className="home-input allField"
                            type="text"
                            required
                          />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <lebel> প্রকাশ কাল *</lebel> <br />
                          {/* <ReactDatePicker
                            className="home-input allField"
                            name="Publish_date"
                            value={inputs.Publish_date}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          /> */}

                          <input type="date"     className="home-input allField"
                            name="Publish_date"
                            value={Publish_date}
                            selected={startDate}
                            onChange={(e)=>setPublish_date(e.target.value)}
                            required
                          />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <lebel> ভাষা </lebel> <br />
                          <select
                            name="language_id"
                            // value={inputs.language}
                            onChange={(e)=>setLanguageID(e.target.value)}
                            className=" select-category2 allField"
                            aria-label="Default select example"
                            id="add-book-vasha"
                          >
                            <option selected  value="">
                              ভাষা নির্বাচন করুন{" "}
                            </option>
                            {languages.map((language, index) => {
                              return (
                                <option key={index} value={language.id}>
                                  {language.Name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      {/* <div>
                        <input
                          type="file"
                          id="fileInput"
                          onChange={handleFileInputChange}
                          style={{ display: "none" }}
                        />
                        <label htmlFor="fileInput" className="btn btn-warning">
                          <strong>বইয়ের প্রচ্ছদ (ছবি আপলোড করুন)</strong>
                        </label>
                      </div> */}
                      <div className="home-input-button-div">
                        <button className="home-input-button1">খসড়া </button>
                        <button className="home-input-button2">
                          প্রকাশ করুন{" "}
                        </button>
                      </div>
                    </div>
                  </form>
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
                  </div>
                  <form onSubmit={handleChapterSubmit}>
                    <div className="container">
                      <div className="row ">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <lebel required>অধ্যায়ের নাম * </lebel> <br />
                          <input
                            className="home-input allField"
                            type="text"
                            name="ChapterName"
                            value={ChapterName}
                            onChange={(e)=>setChapterName(e.target.value)}
                          />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <lebel> বই নির্নয় করুন * </lebel> <br />
                          <div className="d-flex border align-items-center">
                            <select
                              name="BookID"
                              // onClick={fetchBooks}
                              class="form-select select-category allField"
                              aria-label="Default select example"
                              id="add-chapter-book-nirnoy"
                              onChange={(e)=>setBookID(e.target.value)}

                            >
                              <option selected value="">
                                বই নির্নয় করুন
                              </option>
                              {books.map((book, index) => {
                                return (
                                  <option key={index} value={book.id}>
                                    {book.Title}
                                  </option>
                                );
                              })}
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
                  </form>
                </section>
              </div>
            )}

            {activeButton === 3 && (
              <div>
                <section className="">
                  <form id="myForm" onSubmit={handleParagraphSubmit}>
                    <div className="row home-input-tags container-fluid">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <h5>বইয়ের অনুচ্ছেদ যোগ করুন </h5>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row ">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <lebel>অনুচ্ছেদের নাম * </lebel> <br />
                          <input
                            className="home-input"
                            type="text"
                            onChange={(e)=>setParagraphName(e.target.value)}
                            name="ParagraphName"
                            value={ParagraphName}
                          />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                          <lebel> বই নির্নয় করুন * </lebel> <br />
                          <div className="d-flex border align-items-center">
                            <select
                              class="form-select select-category allField"
                              aria-label="Default select example"
                              value={BookID}
                              onChange={(e)=>setBookID(e.target.value)}
                              name="BookID"
                              id="add-paragraph-book-nirnoy"
                            >
                              <option selected value="">
                                বই যোগ করুন{" "}
                              </option>
                              {books.map((item, i) => {
                                return (
                                  <>
                                    <option value={item.id}>
                                      {item.Title}{" "}
                                    </option>
                                  </>
                                );
                              })}
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
                              class="form-select select-category allField"
                              aria-label="Default select example"
                              value={ChapterID}
                              onChange={(e)=>setChapterID(e.target.value)}
                              name="chapterID"
                              id="add-paragraph-nirnoy"
                            >
                              <option selected value="">
                                {" "}
                                অধ্যায় সমগ্র{" "}
                              </option>
                              {chapters.map((item, i) => {
                                return (
                                  <>
                                    <option value={item.id}>
                                      {item.ChapterName}{" "}
                                    </option>
                                  </>
                                );
                              })}
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
                  </form>
                </section>
              </div>
            )}

            {activeButton === 4 && (
              <div>
                <section className="">
                  <form id="myForm4" onSubmit={handlePageSubmit}>
                    <div className="row home-input-tags container-fluid">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <h5>নতুন পৃষ্ঠা যোগ করুন </h5>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row ">
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12  mb-4">
                          <lebel>বই নির্নয় করুন * </lebel> <br />
                          <div className="select-category-div">
                            <select
                              class="form-select select-category allField"
                              aria-label="Default select example"
                              value={BookID}
                              onChange={(e)=>setBookID(e.target.value)}
                              name="BookID"
                              id="add-page-book-selection"
                            >
                              <option selected value="">
                                বই নির্বাচন করুন
                              </option>
                              {books.map((item, i) => {
                                return (
                                  <>
                                    <option value={item.id}>
                                      {item.Title}{" "}
                                    </option>
                                  </>
                                );
                              })}
                            </select>
                            <div>
                              <Link to="">
                                {" "}
                                <ControlPointOutlinedIcon className="control-icon" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div> */}
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-5 select-Chapter">
                          <lebel> অধ্যায় নির্নয় করুন * </lebel> <br />
                          <div className="select-category-div">
                            <select
                              class="form-select select-category allField"
                              aria-label="Default select example"
                              value={ChapterID}
                              onChange={(e)=>setChapterID(e.target.value)}
                              name="ChapterID"
                              id="add-page-chapter-selection"
                            >
                              <option selected value="">
                                অধ্যায় নির্বাচন করুন
                              </option>
                              {chapters.map((item, i) => {
                                return (
                                  <>
                                    <option value={item.id}>
                                      {item.ChapterName}{" "}
                                    </option>
                                  </>
                                );
                              })}
                            </select>
                            <div>
                              <Link to="">
                                {" "}
                                <ControlPointOutlinedIcon className="control-icon" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-5">
                          <lebel> অনুচ্ছেদ নির্নয় করুন * </lebel> <br />
                          <div className="select-category-div">
                            <select
                              class="form-select select-category allField"
                              aria-label="Default select example"
                              value={ParagraphID}
                              onChange={(e)=>setParagraphID(e.target.value)}
                              name="ParagraphID"
                              id="add-page-paragraph-selection"
                            >
                              <option selected value="">অনুচ্ছেদ নির্বাচন করুন </option>
                              {allParagraphs.map((item, i) => {
                                return (
                                  <>
                                    <option value={item.id}>
                                      {item.ParagraphName}{" "}
                                    </option>
                                  </>
                                );
                              })}
                            </select>
                            <div>
                              <Link to="">
                                {" "}
                                <ControlPointOutlinedIcon className="control-icon" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-2">
                          <JoditEditor
                            value={content}
                            ref={editor}
                            // config={config}

                            onChange={setContent}
                            height={400}
                            // spellcheck={false}
                            language="en"
                          />
                        </div>
                      </div>
                      <div className="home-input-button-div">
                        <button className="home-input-button1">খসড়া </button>
                        <button className="home-input-button2" type="submit">
                          প্রকাশ করুন{" "}
                        </button>
                      </div>
                    </div>
                  </form>
                </section>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
