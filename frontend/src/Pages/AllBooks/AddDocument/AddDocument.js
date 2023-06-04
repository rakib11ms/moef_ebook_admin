import React from "react";
import "./AddDocument.css";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect, useRef, useMemo } from "react";
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


  const editor = useRef(null);
  // const config = useMemo(
  // 	{
  // 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  // 		placeholder: placeholder || 'Start typings...'
  // 	},
  // 	[placeholder]
  // );



  // Header Text edit
  const [isEditing, setIsEditing] = useState(false);
  // const [text, setText] = useState("Untitled");

  const [bookId, setBookId] = useState("");
  const [chapterId, setChapterId] = useState("");
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
  console.log('con1', content)
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
  const [noticeNewsCheckBoxStatus, setNoticeNewsCheckBoxStatus] = useState(false)
  const [fileUploadCheckBox, setFileUploadCheckBox] = useState(false)

  const [selectedFile, setSelectedFile] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const [targetUser, setTargetUser] = useState('সকল')

  const [contactPerson, setcontactPerson] = React.useState('');

  function handlePersonChange(event, values) {
    let result = values.map(a => a.id);
    let arrString = result.join(',');
    setcontactPerson(arrString)

  }

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

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


    try {
      axios.get(`/api/get-all-user-info`).then(res => {
        if (res.data.status == 200) {
          setAllUsers(res.data.users);

        }
      })
    }
    catch (error) {
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
    book_id: bookId,
    chapter_id: chapterId,
    paragraph_id: ParagraphId,
    created_by: $user.id,
    isPublished: true,
    noticeNewsCheckBoxStatus: noticeNewsCheckBoxStatus
  };

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  formData.append('title', documentTitle)
  formData.append('file', selectedFile)
  formData.append('created_by', $user.id)
  formData.append('book_id', bookId)
  formData.append('chapter_id', chapterId)
  formData.append('paragraph_id', ParagraphId)
  formData.append('contents', content)
  formData.append('type', noticeNewsCheckBoxStatus ? 'both' : 'single_document')
  formData.append('noticeNewsCheckBoxStatus', noticeNewsCheckBoxStatus)
  formData.append('target_users', targetUser == 'অন্যান্য' ? contactPerson : targetUser
  )
  const handleSubmit = (e) => {
    e.preventDefault();

    // if(fileUploadCheckBox==false){
    //   if (content.trim() === "<p><br></p>" || content.trim() === "") {
    //     Swal.fire("বিষয়বস্তু পূরণ করুন", "", "warning");
    //     return;
    //   }
    // }

    // else {

    axios.post(`/api/save-single-document`, formData, config).then((res) => {
      if (res.data.status == 200) {
        Swal.fire(res.data.message, "", "success");

        setSelectedFile(null);
        setdocumentTitle('')
        setContent('')
        setFileUploadCheckBox(false)
        setNoticeNewsCheckBoxStatus(false)
      }
    });

    // else {
    //   axios.post(`/api/save-single-document`, data).then((res) => {
    //     if (res.data.status == 200) {
    //       Swal.fire(res.data.message, "", "success");

    //       setdocumentTitle("");
    //       setContent('')
    //       setNoticeNewsCheckBoxStatus(false);
    //       setBookId('');
    //       setChapterId('');
    //       setParagraphId('');
    //     }
    //   });
    //   // }
    // }
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
        noticeNewsCheckBoxStatus: noticeNewsCheckBoxStatus
      };

      axios.post(`/api/save-single-document`, draftData).then((res) => {
        if (res.data.status == 200) {
          Swal.fire(res.data.message, "", "success");

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
              style={{ position: "absolute", right: "200px" }}
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
      <div class="form-check mx-3">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
          checked={fileUploadCheckBox} onChange={() => setFileUploadCheckBox(!fileUploadCheckBox)}
        />
        <label class="form-check-label" for="flexCheckDefault">
          আপনি কি ফাইল আপলোড দিতে চাচ্ছেন?
        </label>
      </div>
      {
        fileUploadCheckBox ?
          <div className="mt-3">
            <div className="my-2  mx-3">
              <label htmlFor="fileInput" className="btn btn-warning">
                <strong>ফাইল (ডকুমেন্ট) আপলোড করুন </strong>
              </label>
              <input
                type="file"
                className="ms-3"
                id="fileInput"
                name="file"
                hidden
                accept=".doc,.docx,.pdf"
                onChange={handleFileInputChange}

              // style={{ display: "none" }}
              />
            </div>
            <div class="form-check mx-3 my-4">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                checked={noticeNewsCheckBoxStatus} onChange={() => setNoticeNewsCheckBoxStatus(!noticeNewsCheckBoxStatus)}
              />
              <label class="form-check-label text-muted" for="flexCheckDefault">
                এই ডকুমেন্ট প্রজ্ঞপন/ অফিস আদেশ/ নোটিশ আকারে প্রকাশিত হবে?
              </label>

              {noticeNewsCheckBoxStatus && (
                      <div>
                        <div className="doc-suchi-div col-3">


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
                              onChange={(e) => setTargetUser(e.target.value)}                            >
                              <option selected value="সকল">সকলের জন্য</option>
                              <option value="সুপার এডমিন">সুপার এডমিন</option>
                              <option value="এডমিন">এডমিন</option>
                              <option value="মডারেটর">মডারেটর</option>
                              <option value="ইউজার">ইউজার</option>
                              <option value="অন্যান্য">অন্যান্য </option>
                            </select>
                          </div>

                          {
                            targetUser == 'অন্যান্য'
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



                        </div>
                      </div>
                    )}
            </div>
          </div>
          :
          <section className="container-fluid">
            <div className="">
              <div className="row">
                <div className="col-1"></div>

                <div className=" col-8 ">
                  <div className="documents-text-div ">
                    <div className="documents-text-header">{/* header Text */}</div>
                    <JoditEditor
                      className="jodit-editor"
                      ref={editor}
                      value={content}
                      // config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      // onChange={newContent => {setContent(newContent)}}
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
                        onChange={(e) => setBookId(e.target.value)}
                      >
                        <option selected disabled>
                          বই নির্বাচন করুন{" "}
                        </option>
                        {allBooks &&
                          allBooks.map((item) => {
                            return (
                              <>
                                <option value={item.id}>{item.Title}</option>
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
                        onChange={(e) => setChapterId(e.target.value)}

                      >
                        <option selected disabled>
                          অধ্যায় নির্বাচন করুন{" "}
                        </option>

                        {allChapters &&
                          allChapters.map((item) => {
                            return (
                              <>
                                <option value={item.id}>
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
                        onChange={(e) => setParagraphId(e.target.value)}

                      >
                        <option selected disabled>
                          অনুচ্ছেদ নির্বাচন করুন{" "}
                        </option>
                        {allParagraphs.map((item) => {
                          return (
                            <>
                              <option value={item.id}>
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
                      checked={noticeNewsCheckBoxStatus}
                      id="flexCheckDefault"
                      onClick={toggleDiv}
                      onChange={() => setNoticeNewsCheckBoxStatus(!noticeNewsCheckBoxStatus)}

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
                              onChange={(e) => setTargetUser(e.target.value)}                            >
                              <option selected value="সকল">সকলের জন্য</option>
                              <option value="সুপার এডমিন">সুপার এডমিন</option>
                              <option value="এডমিন">এডমিন</option>
                              <option value="মডারেটর">মডারেটর</option>
                              <option value="ইউজার">ইউজার</option>
                              <option value="অন্যান্য">অন্যান্য </option>
                            </select>
                          </div>

                          {
                            targetUser == 'অন্যান্য'
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

      }


    </div>
  )
}

export default AddDocument;
