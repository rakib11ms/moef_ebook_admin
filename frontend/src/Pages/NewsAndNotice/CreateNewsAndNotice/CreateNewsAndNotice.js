import React, { useState, useEffect } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import bookLogoImg from "../../../images/book.png";
import "./CreateNewsAndNotice.css";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ReactDatePicker from "react-datepicker";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const CreateNewsAndNotice = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [content, setContent] = useState("");

  const $user = JSON.parse(localStorage.getItem("user"));
  // console.log($user.id);

  // const [data, setData] = useState({
  //   Title: "",
  //   Description: content,
  //   CategoryId: "1",
  //   subCatId: "1",
  //   redirect_url: "/" + $user.id,
  //   created_by: "",
  //   updated_by: "",
  //   isPublished: false,
  // });

  // const handleInputChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setData({ ...data, [name]: value });
  // };

  const [Title, setTitle] = useState("");

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // const [isPublished, setisPublished] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Title === "" || content === "<p><br></p>" || content === "") {
      Swal.fire("সব তথ্য পূরণ করুন", "", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("Description", content);
    formData.append("CategoryId", "1");
    formData.append("subCatId", "1");
    formData.append("redirect_url", "/" + $user.id);
    formData.append("updated_by", "");
    formData.append("isPublished", 1);
    formData.append("created_by", $user.id);

    axios.post(`/api/notice`, formData).then((res) => {
      if (res.data.status === 200) {
        Swal.fire("সফলভাবে সম্পন্ন হয়েছে", "", "success");
        navigate("/all-news-notice");
      } else if (res.data.status === 400) {
        Swal.fire(res.data.message, "", "warning");
      }
    });
  };

  const handleDraftSubmit = (e) => {
    e.preventDefault();

    if (Title === "" || content === "<p><br></p>" || content === "") {
      Swal.fire("সব তথ্য পূরণ করুন", "", "warning");
      return;
    }
    const formData = new FormData();
    formData.append("Title", Title);
    formData.append("Description", content);
    formData.append("CategoryId", "1");
    formData.append("subCatId", "1");
    formData.append("redirect_url", "/" + $user.id);
    formData.append("updated_by", "");
    formData.append("isPublished", 0);
    formData.append("created_by", $user.id);

    axios.post(`/api/notice`, formData).then((res) => {
      if (res.data.status === 200) {
        Swal.fire("সফলভাবে সম্পন্ন হয়েছে", "", "success");
        navigate("/all-news-notice");
      } else if (res.data.status === 400) {
        Swal.fire(res.data.message, "", "warning");
      }
    });
  };

  return (
    <div>
      <div>
        <section>
          <NavigationBa />
        </section>
        <section className="container-fluid">
          <div className="row">
            <div className="col-xl-9 col-lg-8 cpl-md-7 col-sm-12 col-12">
              <div className="all-news-notice-tags-input">
                <h5>বিজ্ঞপ্তি তৈরি করুন </h5>
                <div className="draft-prokas-buttons-div">
                  <Link>
                    <button
                      className="draft-button"
                      onClick={handleDraftSubmit}
                    >
                      খসড়া করুন
                    </button>
                  </Link>
                  <button className="prokas-button mx-2" onClick={handleSubmit}>
                    প্রকাশ করুন
                  </button>
                </div>
                {/* <div className="news-notice-search-input-div ">
                  <div className="news-notice-serchInput-icon-div">
                    <SearchIcon />
                    <input type="search" className="gsearch" />
                  </div>
                  <div className="jog-korun-button-div">
                    <button className="jog-korun-button">যোগ করুন</button>
                    <AddIcon className="jog-korun-button-icon" />
                  </div>
                </div> */}
              </div>
              <hr />
              <div>
                <div class="mb-3">
                  <div className="my-3">
                    <input
                      required
                      type="text"
                      id="biggopti-title-input"
                      name="Title"
                      className="form-control-lg col-12 border-1 border-dark outline-0 ms-2 me-2 "
                      placeholder="টাইটেল যোগ করুন "
                      value={Title}
                      onChange={onTitleChange}
                    />
                  </div>

                  <label for="exampleFormControlTextarea1" class="form-label">
                    <h5>এডিটর</h5>
                  </label>
                  <JoditEditor
                    className="news-jodit-editor"
                    id="biggopti-editor-input"
                    spellcheck={false}
                    language="en"
                    toolbarAdaptive="false"
                    height="800"
                    autofocus="true"
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) => setContent(newContent)}
                  />
                  {/* <button className="attached-button mt-3">
                    এটাচমেন্ট যোগ করুন
                  </button> */}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 cpl-md-5 col-sm-12 col-12">
              <div className="all-news-notice-card-div">
                <div>
                  <h6 className="all-create-news-side-tags">পাবলিকেশন তথ্য</h6>
                </div>
                <hr />

                <div className="suchi-div">
                  {/* <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      ক্যটেগরি
                    </label>
                    <div className="d-flex categories-select-1 mb-4">
                    <select
                            className="form-select "
                            aria-label="Default select example"
                            onChange={(e) => setnotice_news_category_id(e.target.value)}
                          >
                        <option selected disabled>  ক্যটেগরি নির্বাচন করুন</option>

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
                      <AddIcon className="doc-add-icon" />
                    </div>
                  </div>
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      সাব ক্যটেগরি
                    </label>
                    <br />
                    <select
                            className="form-select "
                            aria-label="Default select example"
                            onChange={(e) => setnotice_news_subcategory_id(e.target.value)}
                          >
                      <option selected disabled>সাব ক্যটেগরি নির্বাচন করুন</option>
                      {
                        allNoticeNewsSubCategories.map((item) => {
                          return (
                            <>
                              <option value={item.id} >{item.Name}</option>

                            </>
                          )
                        })
                      }
                    </select>
                  </div> */}

                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      যারা দেখতে পারবেন
                    </label>
                    <br />
                    <select
                      className="form-select2 mb-4"
                      aria-label="Default select example"
                      id="user-selection"
                    >
                      <option selected>সকলের জন্য</option>
                      <option value="1">এডমিন ইউজার </option>
                      <option value="2">অফিস ইউজার </option>
                      <option value="3">নরমাল ইউজার</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <lebel> প্রকাশ কাল </lebel> <br />
                    <div className="prokash-date">
                      <ReactDatePicker
                        className="create-news-calander-input "
                        id="biggopti-date-publish"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                      <CalendarTodayIcon className="calander-icon" />
                    </div>
                  </div>
                  <div>
                    <lebel> লিংক </lebel> <br />
                    <input id="biggopti-link" className=" link"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateNewsAndNotice;
