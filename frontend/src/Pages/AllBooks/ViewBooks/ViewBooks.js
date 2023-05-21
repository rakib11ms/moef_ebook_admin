import React, { useState, useEffect } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import bookLogoImg from "../../../images/book.png";
import "./ViewBooks.css";
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

const ViewBooks = () => {
  //get the notice id from the url
  // const { noticeID } = useParams();
  // console.log(noticeID);
  const params = useParams();
  const bookID = params.id;

  const navigate=useNavigate();
  const [content, setContent] = useState();
  
  const [Title, setTitle] = useState('');
  const [chapter, setChapter] = useState([]);
  const [Books, setBooks] = useState([]);
  const [Paragraph, setParagraph] = useState([]);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }


  useEffect(() => {
    // store the news notice id provided in the url
    axios.get(`/api/get-main-book/${bookID}`).then(res => {
      if (res.data.status === 200) {
        const book = res.data.data;
        setTitle(book.book_master.Title);
        setContent(book.book_content);
        setChapter(book.book_chapter.ChapterName);
        setParagraph(book.book_paragraph.ParagraphName);
      }
    },
    )
  }, [])

  console.log(inputs);

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
                <h5>বই দেখুন</h5>
                <div className="d-flex justify-content-around align-items-center">
                  <Link to={`/edit-books/` + bookID}>
                    <CreateOutlinedIcon className="text-warning" />
                  </Link>
                </div>
              </div>
              <hr />
              <div>
                <div class="mb-3">
                  <div className="my-3">
                  {/* <input
                    type="text"
                    name="Title"
                    className="form-control-lg col-12 border-1 border-dark outline-0 ms-2 me-2 "
                    placeholder="বই সম্পাদনা করুন "
                    id="editInp"
                    value={Title}
                    onChange={onTitleChange}
                  /> */}

                  </div>
          
                  <label for="exampleFormControlInput1" class="form-label">
                    <strong>বইয়ের নাম:-</strong>  <p>{Title}</p>
                  </label>
                  <br />
                  <br />
                  {/* <JoditEditor
                    className="news-jodit-editor"
                    spellcheck={false}
                    language="en"
                    autofocus="true"
                    value={content}
                    toolbar={false}
                    // make all editors hidden
                    
                    config={{ readonly: true }}
                  /> */}
                  <strong>বইয়ের বিবরণ:-</strong>
                  <div dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 cpl-md-5 col-sm-12 col-12">
              <div className="all-news-notice-card-div">
                <div>
                  {/* <h6 className="all-create-news-side-tags">পাবলিকেশন তথ্য</h6> */}
                </div>
                <hr />

                <div className="suchi-div">
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      <strong>অধ্যায় :-</strong> {chapter}
                    </label>
                    <br />
                  </div>
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      <strong>অনুচ্ছেদ :-</strong> {Paragraph}
                    </label>
                    <br />
                    {/* <select
                      name="paragraph_id"
                      onChange={handleChange}
                      className="form-select2 mb-4"
                      aria-label="Default select example"
                    >
                      <option selected>{Paragraph}</option>
                    </select>  */}
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

export default ViewBooks; 