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

  const navigate=useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [content, setContent] = useState("");


  const [allNoticeNewsCategories, setAllNoticeNewsCategories] = useState([]);
  const [allNoticeNewsSubCategories, setAllNoticeNewsSubCategories] = useState([]);



  useEffect(() => {

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


  const [documentTitle, setdocumentTitle] = useState('');

  const [notice_news_category_id, setnotice_news_category_id] = useState('');
  const [notice_news_subcategory_id, setnotice_news_subcategory_id] = useState('');
  const [redirect_url, setredirect_url] = useState('');

  const data = {
    Description: content,
    Title: documentTitle,
    CategoryId: notice_news_category_id,
    subCatId: notice_news_subcategory_id,
    redirect_url: redirect_url,
    created_by: 1,


  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content == '') {
      Swal.fire("Please fill up fileds", '', 'warning');
    }
    else {
      axios.post(`/api/notice`, data).then(res => {
        if (res.data.status == 200) {
          Swal.fire(res.data.message, '', 'success')

          setContent('');
          setdocumentTitle('')
          navigate('/all-news-notice')


        }
        // else if (res.data.status == 400) {
        //     setjobDesc({ ...jobDesc, error_list: res.data.errors });
        //     Swal.fire(jobDesc.error_list.job_id[0], '', 'error')

        // }
      })
    }

  }






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
                  <div className="my-3">
                  <input type="text" className="form-control-lg col-12 border-1 border-dark outline-0 ms-2 me-2 " placeholder="টাইটেল যোগ করুন " id="editInp" value={documentTitle} onChange={(e) => setdocumentTitle(e.target.value)
              } />
                  </div>
          

                  <label for="exampleFormControlTextarea1" class="form-label">
                    <h5>এডিটর</h5>
                  </label>
                  <JoditEditor
                    className="news-jodit-editor"
                    value={content}
                    onChange={setContent}
                    spellcheck={false}
                    language="en"
                    toolbarAdaptive="false"
                    height="800"
                    autofocus="true"
                  />
                  {/* <button className="attached-button mt-3">
                    এটাচমেন্ট যোগ করুন
                  </button> */}
                </div>
                <div className="draft-prokas-buttons-div">
                  <Link >
                    <button className="draft-prokas-button">ড্রাফট করুন</button>
                  </Link>
                  <button className="draft-prokas-button mx-2" onClick={handleSubmit}>প্রকাশ করুন</button>
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
                  </div>

                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      যারা দেখতে পারবেন
                    </label>
                    <br />
                    <select
                      className="form-select2 mb-4"
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

      </div>
    </div>
  );
};

export default CreateNewsAndNotice;
