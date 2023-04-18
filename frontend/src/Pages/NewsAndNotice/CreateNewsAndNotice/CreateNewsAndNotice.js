import React, { useState } from "react";
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
import { Link } from "react-router-dom";

const CreateNewsAndNotice = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [content, setContent] = useState("");
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
                <h5>নিউজ ও নোটিশ তৈরি করুন</h5>
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
                  <label for="exampleFormControlTextarea1" class="form-label">
                    <h5>এডিটর</h5>
                  </label>
                  <JoditEditor
                    value={content}
                    onChange={setContent}
                    height={400}
                    spellcheck={false}
                    language="en"
                  />
                  <button className="attached-button mt-3">
                    এটাচমেন্ট যোগ করুন
                  </button>
                </div>
                <div className="draft-prokas-buttons-div">
                  <Link to="/draft-documents">
                    <button className="draft-prokas-button">ড্রাফট করুন</button>
                  </Link>
                  <button className="draft-prokas-button">প্রকাশ করুন</button>
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
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      ক্যটেগরি
                    </label>
                    <div className="d-flex doc-select-1 mb-4">
                      <select
                        className="form-select "
                        aria-label="Default select example"
                      >
                        <option selected>নোটিশ</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <AddIcon className="doc-add-icon" />
                    </div>
                  </div>
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      সাব ক্যটেগরি
                    </label>
                    <select
                      className="form-select mb-4"
                      aria-label="Default select example"
                    >
                      <option selected>অফিস নোটিশ</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
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
                    <div className="prokash-date">
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
                    <input className=" link"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section>
          <div className="pagination-div">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link">Previous</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default CreateNewsAndNotice;
