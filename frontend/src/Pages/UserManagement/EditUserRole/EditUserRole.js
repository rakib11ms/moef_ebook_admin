import React, { useState, useEffect } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./EditUserRole.css";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const EditUserRole = () => {

  const params = useParams();
  const userID = params.id;
  // console.log('userID', userID);

  const navigate=useNavigate();
  const [content, setContent] = useState();

  const [Title, setTitle] = useState('');
  const [Books, setBooks] = useState([]);

  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
    console.log(inputs);
  }

  const [roles, setRoles] = useState([]);

  async function fetchRoles() {
    await axios.get(`/api/get-all-roles`).then(res => {
      if (res.data.status === 200) {
        console.log(res.data.all_roles);
        setRoles(res.data.all_roles);
      }
    })
  }

  const [roleSelected, setRoleSelected] = useState('');
  const [userName, setUserName] = useState('');

  async function getUsersRole() {
    await axios.get(`/api/get-user-info/${userID}`).then(res => {
      if (res.data.status === 200) {
        const userRole = res.data.userInfo.userRole;
        setRoleSelected(userRole);
        setUserName(res.data.userInfo.UserName);
      }
    })
  }

  useEffect(() => {
    fetchRoles();
    getUsersRole();
  }, []);


  // useEffect(() => {
  //   axios.get(`/api/get-main-book/${bookID}`).then(res => {
  //     if (res.data.status === 200) {
  //       console.log(res.data);
  //       const book = res.data.data;
  //       console.log('book', book);
  //       setTitle(book.book_master.Title);
  //       setContent(book.book_content);
  //       setChapterSelected(book.book_chapter.ChapterName);
  //       setParagraphSelected(book.book_paragraph.ParagraphName);
  //     }
  //   },

  //   axios.get(`/api/books`).then(res => {
  //     if (res.data.status === 200) {
  //       // console.log(res.data.books_masters);
  //       setBooks(res.data.books_masters);
  //     }
  //   }),

  //   axios.get(`/api/bookChapter`).then(res => {
  //     if (res.data.status === 200) {
  //       // console.log(res.data.bookChapters);
  //       setChapter(res.data.bookChapters);
  //     }
  //   }),

  //   axios.get(`/api/bookParagraph`).then(res => {
  //     if (res.data.status === 200) {
  //       // console.log(res.data.book_paragraphs);
  //       setParagraph(res.data.book_paragraphs);
  //     }
  //   }),
  //   )
  // }, []);

  const searchParams = new URLSearchParams(window.location.search);
  const prevPage = searchParams.get('page');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('role_id', inputs.roleSelected);

    axios.post(`/api/change-User-Role/${userID}`, formData).then(res => {
      console.log(res.data);
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'ইউজার রোল সফলভাবে সম্পাদন হয়েছে',
      showConfirmButton: false,
      timer: 1500
    })
    navigate(`/all-users?page=${prevPage}`);

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
              <li class="breadcrumb-item"><a href="/all-users">সকল ইউজার</a></li>
              <li class="breadcrumb-item active" aria-current="page">ইউজার রোল সম্পাদনা</li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-xl-12 col-lg-8 cpl-md-7 col-sm-12 col-12">
              <div className="all-news-notice-tags-input">
                <h5>ইউজার রোল সম্পাদনা</h5>
                <div className="draft-prokas-buttons-div" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="draft-prokas-button mx-2" onClick={handleSubmit}>সংরক্ষণ করুন</button>
                </div>
              </div>
              <hr />
              <div>
                <div class="mb-3">
                  <div className="my-3">
                    <label for="exampleFormControlInput1" class="form-label">ইউজার নাম: {userName}</label>
                    <select
                      name="roleSelected"
                      onChange={handleChange}
                      className="form-select2 mb-4"
                      aria-label="Default select example"
                    >
                      <option
                        selected
                        disabled
                      >{roleSelected ?? 'ইউজার রোল নির্বাচন করুন'}</option>
                      {
                        roles.map((role, index) => {
                          return (
                            <option key={index} value={role.id}>
                              {role.name}
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

export default EditUserRole; 