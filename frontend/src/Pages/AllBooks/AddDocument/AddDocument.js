import React from "react";
import "./AddDocument.css";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import EditIcon from "@mui/icons-material/Edit";
import ReactDatePicker from "react-datepicker";
import axios from "axios";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link, redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Home from "../../Home/Home";
const AddDocument = (props) => {
  // Header Text edit
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("Untitled");

  const [bookId, setBookId] = useState('');
  const [chapterId, setchapterId] = useState('');
  const [ParagraphId, setParagraphId] = useState('');
  const [BookCategoryId, setBookCategoryId] = useState('');

  const [documentTitle, setdocumentTitle] = useState('');

  const [notice_news_category_id, setnotice_news_category_id] = useState('');
  const [notice_news_subcategory_id, setnotice_news_subcategory_id] = useState('');
  const [redirect_url, setredirect_url] = useState('');


  const handleEditClick = () => {
    setIsEditing(true);
    document.getElementById("editInp").focus();

  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Save the edited text to your data store
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  // const [activeButton, setActiveButton] = useState(null);
  const [chapter, setChapter] = useState("");
  const [page, setPage] = useState("");
  const [content, setContent] = useState("");
  // const [activeButton, setActiveButton] = useState(1);

  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };



  const [allBooks, setAllBooks] = useState([]);
  const [allChapters, setAllChapters] = useState([]);
  const [allParagraphs, setAllParagraphs] = useState([]);
  const [allBookCategories, setAllBookCategories] = useState([]);
  const [allNoticeNewsCategories, setAllNoticeNewsCategories] = useState([]);
  const [allNoticeNewsSubCategories, setAllNoticeNewsSubCategories] = useState([]);


  console.log('all books', allBooks)
  console.log('all chapters', allChapters)
  console.log('all paragraphs', allParagraphs)
  console.log('all book catgeories', allBookCategories)

  useEffect(() => {
    axios.get(`/api/books`).then(res => {
      if (res.data.status == 200) {
        setAllBooks(res.data.books_masters);
      }
    })

    axios.get(`/api/bookParagraph`).then(res => {
      if (res.data.status == 200) {
        setAllParagraphs(res.data.book_paragraphs);
      }
    })

    axios.get(`/api/book-category`).then(res => {
      if (res.data.status == 200) {
        setAllBookCategories(res.data.bookcategories);
      }
    })

    axios.get(`/api/bookChapter`).then(res => {
      if (res.data.status == 200) {
        setAllChapters(res.data.bookChapters);
      }
    })

    axios.get(`/api/newsNotice`).then(res => {
      if (res.data.status == 200) {
        setAllNoticeNewsCategories(res.data.news_notice_categories)
      }
    })

    axios.get(`/api/newsNoticeSub`).then(res => {
      if (res.data.status == 200) {
        setAllNoticeNewsSubCategories(res.data.news_notices_sub_categories)
      }
    })

  }, [])

  const data = {
    contents: content,
    title: documentTitle,
    notice_news_category_id: notice_news_category_id,
    notice_news_subcategory_id: notice_news_subcategory_id,
    redirect_url: redirect_url,
    created_by: 1,
    book_id: bookId,
    chapter_id: chapterId,
    paragraph_id: ParagraphId

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === '<p><br></p>' || content.trim() === '') {
      Swal.fire('বিষয়বস্তু পূরণ করুন', '', 'warning')
      return
    }

      else {
      axios.post(`/api/save-single-document`, data).then(res => {
        if (res.data.status == 200) {
          Swal.fire(res.data.message, '', 'success')

          setContent('');
          setdocumentTitle('')


        }
      
      })
    }
  }



  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <div className="row">


          <div className="col-xl-7 col-lg-7 col-md-8 col-sm-6 col-6 d-flex">
            <h3 className="d-flex align-items-center px-0"> লাইব্রেরী /
              <input type="text" className="form-control-sm border-1 border-secondary outline-0 ms-2 me-2 " placeholder="টাইটেল যোগ করুন " id="editInp" value={documentTitle} onChange={(e) => setdocumentTitle(e.target.value)
              } />
            </h3>

            <EditIcon
              className="mt-1 " style={{ cursor: "pointer" }}
              onClick={handleEditClick}
            />
          </div>
        </div>
      </section>
      <hr />
      <section className="container-fluid">
        <div className="">
          <div className="row">
            <div className="col-1">

            </div>

            <div className=" col-8 ">

              <div className="documents-text-div ">
                <div className="documents-text-header">{/* header Text */}</div>
                <JoditEditor
                  className="jodit-editor"
                  value={content}
                  onChange={setContent}
                  spellcheck={false}
                  language="en"
                  toolbarAdaptive="false"
                  height="800"
                  autofocus="true"
                />
                <div className="TrendingFlatIcon-doc-div">
                  <TrendingFlatIcon className="TrendingFlatIcon" />
                </div>
              </div>
            </div>

            <div className="col-3">
              <div className="">
                <h5 className="mt-3">তথ্য যোগ করুন </h5>
                <div className="book-add-input">
                  <select
                    className="form-select draft-form-control"
                    aria-label="Default select example"
                  >
                    <option selected disabled>বই নির্বাচন করুন  </option>
                    {
                      allBooks && allBooks.map((item) => {
                        return (
                          <>
                            <option value={item.Title} >{item.Title}</option>

                          </>
                        )
                      })
                    }

                  </select>
                  <Link to="/home" className="text-dark">
                    <AddIcon className="book-add-icon" />
                    <div className="d-none">
                      <Home activeButton={1} />

                    </div>
                  </Link>

                </div>
                <div className="book-add-input">
                  <select
                    className="form-select draft-form-control"
                    aria-label="Default select example"
                  >
                    <option selected disabled>অধ্যায় নির্বাচন করুন </option>

                    {
                      allChapters && allChapters.map((item) => {
                        return (
                          <>
                            <option value={item.ChapterName} >{item.ChapterName}</option>

                          </>
                        )
                      })
                    }
                  </select>
                  <Link to="/home" className="text-dark">
                    <AddIcon className="book-add-icon" />
                    <div className="d-none" >
                      <Home activeButton={2} />

                    </div>
                  </Link>
                </div>
                <div className="book-add-input">
                  <select
                    className="form-select draft-form-control"
                    aria-label="Default select example"
                  >
                    <option selected disabled>অনুচ্ছেদ নির্বাচন করুন  </option>
                    {
                      allParagraphs.map((item) => {
                        return (
                          <>
                            <option value={item.ParagraphName} >{item.ParagraphName}</option>

                          </>
                        )
                      })
                    }
                  </select>
                  <Link to="/home" className="text-dark">
                    <AddIcon className="book-add-icon" />
                    <div className="d-none" >
                      <Home activeButton={2} />

                    </div>
                  </Link>                 </div>

              </div>
              <div className="form-check">
                <input
                  className="form-check-input mt-0"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  onClick={toggleDiv}
                />

                <p className="doc-redios-text mt-4 text-danger">
                  {" "}
                  এই ডকুমেন্ট প্রজ্ঞপন/ অফিস আদেশ/ নোটিশ আকারে প্রকাশিত হবে
                </p>
              </div>

              <div className="container-fluid">
                {" "}
                {isOpen && (
                  <div>
                    <div className="doc-suchi-div">
                      {/* <div>
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          ক্যটেগরি
                        </label>
                        <div className="d-flex doc-select-1 mb-4">
                          <select
                            className="form-select "
                            aria-label="Default select example"
                            onChange={(e) => setnotice_news_category_id(e.target.value)}
                          >
                            <option selected disabled>ক্যাটাগরি নির্বাচন করুন </option>

                            {
                              allNoticeNewsCategories.map((item) => {
                                return (
                                  <>
                                    <option value={item.id} >{item.Name}</option>

                                  </>
                                )
                              })
                            }
                          </select>
                          <Link to="/book-categories">
                            <AddIcon className="create-news-notice-icon" />
                          </Link>
                        </div>
                      </div>
                      <div>
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          সাব ক্যাটাগরি
                        </label>
                        <select
                          className="form-select mb-4"
                          aria-label="Default select example"
                          onChange={(e) => setnotice_news_subcategory_id(e.target.value)}

                        >
                          <option selected>
                            সাব ক্যাটাগরি নির্বাচন করুন</option>

                          {
                            allNoticeNewsSubCategories.map((item) => {
                              return (
                                <>
                                  <option value={item.Name} >{item.Name}</option>

                                </>
                              )
                            })
                          }

                        </select>
                      </div> */}
                      <div>
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          যারা দেখতে পারবেন
                        </label>
                        <select
                          className="form-select mb-4"
                          aria-label="Default select example"
                        >
                          <option selected>সকলের জন্য</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <lebel> প্রকাশ কাল </lebel> <br />
                        <div className="doc-prokash-date">
                          <ReactDatePicker
                            className="create-news-calander-input "
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                          <CalendarTodayIcon className="calander-icon" />
                        </div>
                      </div>
                      <div>
                        <lebel> লিংক </lebel> <br />
                        <input className=" doc-link" value={redirect_url} onChange={(e) => setredirect_url(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className=" doc-input-button-div">
                <button type="submit" className="doc-input-button py-2" onClick={handleSubmit}>
                  সংরক্ষন করুন
                </button>
              </div>
            </div>
          </div>
        </div>


      </section>
    </div>
  );
};

export default AddDocument;
