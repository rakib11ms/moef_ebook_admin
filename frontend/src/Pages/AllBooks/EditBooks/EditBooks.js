import React, { useState, useEffect } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./EditBooks.css";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const EditBooks = () => {
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
    console.log(inputs);
  }

  // async function handlePublish() {
  //   await axios.post(`/api/update-main-book/${bookID}`, {
  //     chapter_id: ChapterSelected.id,
  //     paragraph_id: ParagraphSelected.id,
  //     title: Title,
  //     content: content,
  //     isPublished: "1",
  //   }).then((res) => {
  //     if (res.data.status === 200) {
  //       console.log(res.data);
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Book Published Successfully',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       if(prevPage === '/my-area') {
  //         navigate('/my-area');
  //       } else {
  //         navigate('/all-documents');
  //       }
  //     }
  //   })
  // }

  async function handlePublish(e) {
    handleSubmit(e);

    await axios.post('/api/publish-Main-Book/' + bookID).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Book Published Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        if(prevPage === '/my-area') {
          navigate('/my-area');
        } else {
          navigate('/all-documents');
        }
      }
    })
  }


  useEffect(() => {
    axios.get(`/api/get-main-book/${bookID}`).then(res => {
      if (res.data.status === 200) {
        console.log(res.data);
        const book = res.data.data;
        console.log('book', book);
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
  }, []);

  const searchParams = new URLSearchParams(window.location.search);
  const prevPage = searchParams.get('page');

  const handleSubmit = (e) => {
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
        if(prevPage === '/my-area') {
          navigate('/my-area');
        } else {
          navigate('/all-books');
        }
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
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/home">হোম</a></li>
              <li class="breadcrumb-item"><a href="/all-books">সকল বই</a></li>
              <li class="breadcrumb-item active" aria-current="page">বই সম্পাদনা</li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-xl-9 col-lg-8 cpl-md-7 col-sm-12 col-12">
              <div className="all-news-notice-tags-input">
                <h5>বই সম্পাদনা</h5>
                <div className="draft-prokas-buttons-div" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="draft-prokas-button mx-2" onClick={handleSubmit}>সংরক্ষণ করুন</button>
                  {
                    prevPage==='/my-area' ?
                    (
                      <button className="draft-prokas-button mx-2" onClick={handlePublish}>প্রকাশ করুন</button>
                    ) : null
                  }
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
                {/* <div className="draft-prokas-buttons-div">
                  <button className="draft-prokas-button mx-2" onClick={handleSubmit}>সম্পাদনা করুন</button>
                  {
                    prevPage==='/my-area' ?
                    (
                      <button className="draft-prokas-button mx-2" onClick={handlePublish}>প্রকাশ করুন</button>
                    ) : null
                  }
                </div> */}
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