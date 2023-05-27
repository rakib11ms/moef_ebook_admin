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
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/system';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import { Link, redirect } from "react-router-dom";
import Swal from "sweetalert2";
import Home from "../../Home/Home";
import {
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
  Stack,
  Select,
  Chip,
  MenuItem,
  makeStyles,
} from '@mui/material';

import { Box, ThemeProvider, createTheme } from '@mui/system';

const AddDocument = (props) => {



  const [allUsers, setAllUsers] = useState([]);
  
const[targetUser,setTargetUser]=useState('সকল')
const [contactPerson, setcontactPerson] = React.useState([]);
let result = contactPerson.map(a => a.id);

console.log('result',result)

function handlePersonChange(event, values) {
   setcontactPerson(values)
   
}




  useEffect(() => {
    axios.get(`/api/get-all-user-info`).then(res => {
      if (res.data.status == 200) {
        setAllUsers(res.data.users);

      }
    })
  }, [])




  // Header Text edit
  const [isEditing, setIsEditing] = useState(false);
  // const [text, setText] = useState("Untitled");

  const [bookId, setBookId] = useState("");
  const [chapterId, setchapterId] = useState("");
  const [ParagraphId, setParagraphId] = useState("");
  // const [BookCategoryId, setBookCategoryId] = useState("");

  const [documentTitle, setdocumentTitle] = useState("");

  const [notice_news_category_id, setnotice_news_category_id] = useState("");
  const [notice_news_subcategory_id, setnotice_news_subcategory_id] =
    useState("");
  const [redirect_url, setredirect_url] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    document.getElementById("editInp").focus();
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Save the edited text to your data store
  };


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
  const [allNoticeNewsSubCategories, setAllNoticeNewsSubCategories] = useState(
    []
  );


  async function fetchData() {
    try {
      await axios.get(`/api/books`).then((res) => {
        if (res.data.status == 200) {
          setAllBooks(res.data.books_masters);
        }
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await axios.get(`/api/bookParagraph`).then((res) => {
        if (res.data.status == 200) {
          setAllParagraphs(res.data.book_paragraphs);
        }
      });
    } catch (error) {
      console.log(error);
    }



    try {
      await axios.get(`/api/bookChapter`).then((res) => {
        if (res.data.status == 200) {
          setAllChapters(res.data.bookChapters);
        }
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await axios.get(`/api/newsNotice`).then((res) => {
        if (res.data.status == 200) {
          setAllNoticeNewsCategories(res.data.news_notice_categories);
          console.log(res.data.news_notice_categories);
        }
      });
    } catch (error) {
      console.log(error);
    }

    try {
      await axios.get(`/api/newsNoticeSub`).then((res) => {
        if (res.data.status == 200) {
          setAllNoticeNewsSubCategories(res.data.news_notices_sub_categories);
          console.log(res.data.news_notices_sub_categories);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    fetchData();
  }, []);

  const $user = JSON.parse(localStorage.getItem("user"));

  const data = {
    contents: content,
    title: documentTitle,
    notice_news_category_id: notice_news_category_id,
    notice_news_subcategory_id: notice_news_subcategory_id,
    redirect_url: redirect_url,
    book_id: bookId,
    chapter_id: chapterId,
    paragraph_id: ParagraphId,
    created_by: $user.id,
    isPublished: true,
    // target_users:
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "<p><br></p>" || content.trim() === "") {
      Swal.fire("বিষয়বস্তু পূরণ করুন", "", "warning");
      return;
    } else {
      axios.post(`/api/save-single-document`, data).then((res) => {
        if (res.data.status == 200) {
          Swal.fire(res.data.message, "", "success");

          setContent("");
          setdocumentTitle("");
        }
      });
    }
  };

  const handleDraftSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "<p><br></p>" || content.trim() === "") {
      Swal.fire("বিষয়বস্তু পূরণ করুন", "", "warning");
      return;
    } else {
      const draftData = {
        contents: content,
        title: documentTitle,
        notice_news_category_id: notice_news_category_id,
        notice_news_subcategory_id: notice_news_subcategory_id,
        redirect_url: redirect_url,
        book_id: bookId,
        chapter_id: chapterId,
        paragraph_id: ParagraphId,
        created_by: $user.id,
        isPublished: false,
      };

      axios.post(`/api/save-single-document`, draftData).then((res) => {
        if (res.data.status == 200) {
          Swal.fire(res.data.message, "", "success");

          setContent("");
          setdocumentTitle("");
        }
      });
    }
  };


  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <div className="row">
          <div className="col-xl-7 col-lg-7 col-md-8 col-sm-6 col-6 d-flex">
            <h3 className="d-flex align-items-center px-0">
              {" "}
              লাইব্রেরী /
              <input
                type="text"
                className="form-control-sm border-1 border-secondary outline-0 ms-2 me-2 "
                placeholder="টাইটেল যোগ করুন "
                id="editInp"
                value={documentTitle}
                onChange={(e) => setdocumentTitle(e.target.value)}
              />
            </h3>

            <EditIcon
              className="mt-1 "
              style={{ cursor: "pointer" }}
              onClick={handleEditClick}
              id="docu-edit-icon"
            />

            <button
              type="submit"
              className="doc-input-button "
              onClick={handleDraftSubmit}
            >
              খসড়া করুন
            </button>

            <button
              style={{ position: "absolute", right: "0" }}
              type="submit"
              className="doc-input-button-songrokkhon"
              onClick={handleSubmit}
            >
              সংরক্ষন করুন
            </button>
          </div>
        </div>
        {/* <div className=" doc-input-button-div" style={{ display: 'flex', justifyContent: 'right'}}>
            <button
              type="submit"
              className="doc-input-button py-2"
              onClick={handleSubmit}
              // style={{ float: 'right', marginTop: '-80px' }}
            >
              সংরক্ষন করুন
            </button>
          </div> */}
      </section>

      <hr />
      <section className="container-fluid">
        <div className="">
          <div className="row">
            <div className="col-1"></div>

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
                  id="add-doc-jodit-editor"
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
                    id="add-docu-book-selection"
                  >
                    <option selected disabled>
                      বই নির্বাচন করুন{" "}
                    </option>
                    {allBooks &&
                      allBooks.map((item) => {
                        return (
                          <>
                            <option value={item.Title}>{item.Title}</option>
                          </>
                        );
                      })}
                  </select>
                  {/* <Link to="/home" className="text-dark">
                    <AddIcon className="book-add-icon" />
                    <div className="d-none">
                      <Home activeButton={1} />
                    </div>
                  </Link> */}
                </div>
                <div className="book-add-input">
                  <select
                    className="form-select draft-form-control"
                    aria-label="Default select example"
                    id="add-docu-chapter-selection"
                  >
                    <option selected disabled>
                      অধ্যায় নির্বাচন করুন{" "}
                    </option>

                    {allChapters &&
                      allChapters.map((item) => {
                        return (
                          <>
                            <option value={item.ChapterName}>
                              {item.ChapterName}
                            </option>
                          </>
                        );
                      })}
                  </select>
                  {/* <Link to="/home" className="text-dark">
                    <AddIcon className="book-add-icon" />
                    <div className="d-none">
                      <Home activeButton={2} />
                    </div>
                  </Link> */}
                </div>
                <div className="book-add-input">
                  <select
                    className="form-select draft-form-control"
                    aria-label="Default select example"
                  >
                    <option selected disabled>
                      অনুচ্ছেদ নির্বাচন করুন{" "}
                    </option>
                    {allParagraphs.map((item) => {
                      return (
                        <>
                          <option value={item.ParagraphName}>
                            {item.ParagraphName}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  {/* <Link to="/home" className="text-dark">
                    <AddIcon className="book-add-icon" />
                    <div className="d-none">
                      <Home activeButton={2} />
                    </div>
                  </Link>{" "} */}
                </div>
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
                          id="add-docu-show"
                          onChange={(e)=>setTargetUser(e.target.value)}
                        >
                          <option selected value="সকল">সকলের জন্য</option>
                          <option value="এডমিন">এডমিন</option>
                          <option value="মডারেটর">মডারেটর</option>
                          <option value="ইউজার">ইউজার</option>
                          <option value="অন্যান্য">অন্যান্য </option>
                        </select>
                      </div>
                      {
                        targetUser=='অন্যান্য' 
                        && 
                        <div class="">
                        <Stack spacing={5} sx={{ width: '100%', paddingTop: '7px' }}>
                          <Autocomplete
                            multiple
                            id="tags-standard"
                            options={allUsers}
                            getOptionLabel={(option) => option.UserName}
                            // defaultValue={[allUsers[1]]}
                            onChange={handlePersonChange}
                            renderOption={(props, option) => (
                              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                                {
                                  option.userImage === 'default.png' ?
                                    <img
                                      loading="lazy"
                                      width="25"
                                      src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                                      alt=""
                                    />
                                    :
                                    <img
                                      loading="lazy"
                                      width="20"
                                      src={`https://test.austtaa.com/server/public/images/user/${option.userImage}`}
                                      alt=""
                                    />

                                }

                                {option.UserName}
                              </Box>
                            )}
                            getOptionSelected={(option, value) =>
                              option.id === value.id
                            }

                            renderInput={(params) => (

                              <TextField


                                {...params}
                                // variant="standard"
                                // label="Multiple values"
                                placeholder="Search..."
                              />
                            )}

                          />
                        </Stack>

                      </div>
                      }

                     
                      <div className="mb-4">
                        <lebel> প্রকাশ কাল </lebel> <br />
                        <div className="doc-prokash-date">
                          <ReactDatePicker
                            className="create-news-calander-input "
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            id="add-docu-date-select"
                          />
                          <CalendarTodayIcon className="calander-icon" />
                        </div>
                      </div>
                      <div>
                        <lebel> লিংক </lebel> <br />
                        <input
                          className=" doc-link"
                          value={redirect_url}
                          onChange={(e) => setredirect_url(e.target.value)}
                        ></input>
                      </div>








                    </div>
                  </div>
                )}
              </div>

              {/* <div className=" doc-input-button-div">
                <button
                  type="submit"
                  className="doc-input-button py-2"
                  onClick={handleSubmit}
                >
                  সংরক্ষন করুন
                </button>
              </div> */}
            </div>
          </div>


        </div>
      </section>
    </div>
  )
}

export default AddDocument;
