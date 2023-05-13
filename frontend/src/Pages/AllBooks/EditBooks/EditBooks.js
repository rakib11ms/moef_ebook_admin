import React, { useState, useEffect } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import bookLogoImg from "../../../images/book.png";
import "./EditBooks.css";
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

const EditBooks = () => {
  //get the notice id from the url
  // const { noticeID } = useParams();
  // console.log(noticeID);
  const params = useParams();
  const bookID = params.id;

  const navigate=useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [content, setContent] = useState();

  const $user = JSON.parse(localStorage.getItem('user'));

  const [Title, setTitle] = useState('');
  const [chapter, setChapter] = useState([]);
  const [Books, setBooks] = useState([]);
  const [ChapterSelected, setChapterSelected] = useState('');
  const [Paragraph, setParagraph] = useState([]);
  const [ParagraphSelected, setParagraphSelected] = useState('');

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
        setChapterSelected(book.book_chapter.ChapterName);
        setParagraphSelected(book.book_paragraph.ParagraphName);
      }
    },

    axios.get(`/api/books`).then(res => {
      if (res.data.status === 200) {
        // console.log(res.data.books_masters);
        setBooks(res.data.books_masters);
      }
    }),

    axios.get(`/api/bookChapter`).then(res => {
      if (res.data.status === 200) {
        // console.log(res.data.bookChapters);
        setChapter(res.data.bookChapters);
      }
    }),

    axios.get(`/api/bookParagraph`).then(res => {
      if (res.data.status === 200) {
        // console.log(res.data.book_paragraphs);
        setParagraph(res.data.book_paragraphs);
      }
    }),

    )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    e.preventDefault();

    const formData = new FormData();
    if(inputs.book_id)
      formData.append('book_id', inputs.book_id);
    if(inputs.chapter_id)
      formData.append('chapter_id', inputs.chapter_id);
    if(inputs.paragraph_id)
      formData.append('paragraph_id', inputs.paragraph_id);
    if(content)
      formData.append('book_content', content);

    axios.post(`/api/update-main-book/${bookID}`, formData).then(res => {
      if (res.data.status === 200) {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'সফলভাবে সম্পাদন করা হয়েছে',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/all-books');
      }
    })
  }

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
                <h5>বই সম্পাদনা</h5>

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
                    <select
                      name="book_id"
                      onChange={handleChange}
                      className="form-select2 mb-4"
                      aria-label="Default select example"
                    >
                      <option selected>{Title}</option>
                      {
                        Books.map((book, index) => {
                          return (
                            <option key={index} value={book.id}>
                              {book.Title}
                            </option>
                          );
                        })
                      }
                    </select> 
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
                  {/* <h6 className="all-create-news-side-tags">পাবলিকেশন তথ্য</h6> */}
                </div>
                <hr />

                <div className="suchi-div">
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      অধ্যায় 
                    </label>
                    <br />
                    <select
                      name="chapter_id"
                      onChange={handleChange}
                      className="form-select2 mb-4"
                      aria-label="Default select example"
                    >
                      <option selected>{ChapterSelected}</option>
                      {
                        chapter.map((chapter, index) => {
                          return (
                            <option key={index} value={chapter.id}>
                              {chapter.ChapterName}
                            </option>
                          );
                        })
                      }
                    </select> 
                  </div>
                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      অনুচ্ছেদ  
                    </label>
                    <br />
                    <select
                      name="paragraph_id"
                      onChange={handleChange}
                      className="form-select2 mb-4"
                      aria-label="Default select example"
                    >
                      <option selected>{ParagraphSelected}</option>
                      {
                        Paragraph.map((paragraph, index) => {
                          return (
                            <option key={index} value={paragraph.id}>
                              {paragraph.ParagraphName}
                            </option>
                          );
                        })
                      }
                    </select> 
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

export default EditBooks; 