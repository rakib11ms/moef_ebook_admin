import React, { useState, useEffect } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import bookLogoImg from "../../../images/book.png";
import "./UpdateNewsAndNotice.css";
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
import { useParams } from "react-router-dom";

const UpdateNewsAndNotice = () => {
  //get the notice id from the url
  // const { noticeID } = useParams();
  // console.log(noticeID);
  const params = useParams();
  const noticeID = params.id;

  const navigate=useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [content, setContent] = useState('');

  const $user = JSON.parse(localStorage.getItem('user'));

  const [Title, setTitle] = useState('');

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  async function fetchData() {
    axios.get(`/api/notice/${noticeID}`).then(res => {
      if (res.data.status === 200) {
        const notice = res.data.news_notice;
        // console.log(notice);
        setTitle(notice.Title);
        setContent(notice.Description);
      }
    }
    )
  }

  useEffect(() => {
    fetchData();
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    if(Title===''){
      Swal.fire('সব তথ্য পূরণ করুন', '', 'warning')
      return;
    } else if(content.trim()==='<p><br></p>' || content.trim()===''){
      Swal.fire('সব তথ্য পূরণ করুন', '', 'warning')
      return;
    }
    // console.log(Title, content);
    // const formData = new FormData();
    // formData.append("Title", Title);
    // formData.append("Description", content);

    const formData = {
      Title: Title,
      Description: content,
    }

    axios.put(`/api/notice/${noticeID}`, formData).then(res => {
      if (res.data.status === 200) {
        console.log(res.data);
        Swal.fire(res.data.message, 'সফলভাবে সম্পন্ন হয়েছে ', 'success')
        navigate('/all-news-notice')
      } else if (res.data.status === 400) {
        Swal.fire(res.data.message, '', 'warning')
      }
    })
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
                <h5>বিজ্ঞপ্তি সম্পাদনা</h5>

              </div>
              <hr />
              <div>
                <div class="mb-3">
                  <div className="my-3">
                  <input
                    type="text"
                    name="Title"
                    className="form-control-lg col-12 border-1 border-dark outline-0 ms-2 me-2 "
                    placeholder="টাইটেল যোগ করুন "
                    id="editInp"
                    value={Title}
                    onChange={onTitleChange}
                  />
                  </div>
          

                  <label for="exampleFormControlTextarea1" class="form-label">
                    <h5>এডিটর</h5>
                  </label>
                  <JoditEditor
                    className="news-jodit-editor"
                    spellcheck={false}
                    language="en"
                    toolbarAdaptive="false"
                    height="800"
                    autofocus="true"
                    value={content}
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => { }}
                  />
                </div>
                <div className="draft-prokas-buttons-div">
                  <button className="draft-prokas-button mx-2" onClick={handleSubmit}>সম্পাদনা করুন</button>
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
                      যারা দেখতে পারবেন
                    </label>
                    <br />
                    <select
                      className="form-select2 mb-4"
                      aria-label="Default select example"
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

export default UpdateNewsAndNotice; 