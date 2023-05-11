import React, { useState, useEffect } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import bookLogoImg from "../../../images/book.png";
import "./ViewNewsAndNotice.css";
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
import Jodit from 'jodit';


const ViewNewsAndNotice = () => {
  const params = useParams();
  const noticeID = params.id;
  const [html, setHtml] = React.useState('');
  console.log('html', html);

  const navigate=useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [content, setContent] = useState();

  const $user = JSON.parse(localStorage.getItem('user'));

  const [Title, setTitle] = useState('');

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }


  useEffect(() => {
    // store the news notice id provided in the url
    axios.get(`/api/notice/${noticeID}`).then(res => {
      if (res.data.status === 200) {
        const notice = res.data.news_notice;
        // console.log(notice);
        setTitle(notice.Title);
        setContent(notice.Description);
      }
    }
    )
  }, [])

  const editor = React.useRef(null);
  React.useEffect(() => {
    if (editor.current) {
      const jodit = new Jodit(editor.current, {
        readonly: true,
        toolbar: false,
      });
      setHtml(jodit.value);
    }
  }, [content]);

  return (
    <div>
      <div>
        <section>
          <NavigationBa />
        </section>
        <section className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-lg-8 cpl-md-7 col-sm-12 col-12">
              <div className="all-news-notice-tags-input">
                <h5>বিজ্ঞপ্তি</h5>
              </div>
              <hr />
              <div>
                <div class="mb-3">
                  <div className="my-3">
                  <p>বিজ্ঞপ্তির শিরোনাম:- <b>{Title}</b></p>
                  </div>

                  <div className="my-3">
                    <p>বিজ্ঞপ্তির বিস্তারিত:-</p>
                    <JoditEditor
                      className="news-jodit-editor"
                      spellcheck={false}
                      language="en"
                      autofocus="true"
                      value={content}
                      toolbar={false}
                      // make all editors hidden
                      
                      config={{ readonly: true }}
                    />
                    {/* <div className="news-jodit-editor" dangerouslySetInnerHTML={{ __html: content }}></div> */}
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

export default ViewNewsAndNotice; 