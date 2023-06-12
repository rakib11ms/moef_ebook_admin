import React, { useEffect, useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./EditMasterBook.css";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";
const EditMasterBook = () => {
  const params = useParams();
  const masterBookID = params.id;
  const [activeParagraph, setActiveParagraph] = useState('');

  const [activeButton, setActiveButton] = useState(null);
  const [chapter, setChapter] = useState("");
  const [page, setPage] = useState("");
  const [bookMaster, setBookMaster] = useState([]);
  console.log('book details', bookMaster)
  const [content, setContent] = useState("");

  const [singleBookName, setSingleBookName] = useState("");

  const [documentTitle, setdocumentTitle] = useState("");


  const handleParagraphClick = (paragraph) => {
    setContent(paragraph);
  };
  const [isEditing, setIsEditing] = useState(false);

  // const handleEditClick = () => {
  //   setIsEditing(true);
  //   document.getElementById("editInp").focus();
  // };

  const handleChapterclick = (chapter) => {
    setChapter(chapter);
    console.log(chapter);
  };

  const [bookContentID, setBookContentID] = useState();

  async function getBookMaster() {
    await axios
      .get("/api/get-All-Main-Book-By-Book-Master-ID/" + masterBookID)
      .then((res) => {
        console.log("Book", res.data.data);
        setBookMaster(res.data.data);
        setActiveParagraph(res.data.data[0].paragraphs[0].main_book_id)
        setContent(res.data.data[0].paragraphs[0].book_content);
      });

    await axios.get("/api/books/" + masterBookID).then((res) => {
      console.log("Book_Title", res.data.books_master.Title);
      setSingleBookName(res.data.books_master.Title);
      setdocumentTitle(res.data.books_master.Title)
    });
  }
  useEffect(() => {
    getBookMaster();
  }, []);

  // const handleButtonClick = (buttonNumber, buttonChapter, buttonPage) => {
  //   setActiveButton(buttonNumber);
  //   setChapter(buttonChapter);
  //   setPage(buttonPage);
  // };


  

  const handleClick = (paragraphName) => {
    setActiveParagraph(paragraphName);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '50vw',
    },
  };

  useEffect(() => {
    Modal.setAppElement('body');

  }, [])

  const [chapterName, setChapterName] = useState('')
  // console.log('chapter name', chapterName)
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [dynamicData, setDynamicData] = useState({
    type: '',
    data: '',
    id: '',
    paragraph_name: ""
  })
  const [dynamicParagraphId, setDynamicParagraphId] = useState('');
  const [types, settypes] = useState('');
  const [dynamicChapterId, setdynamicChapterId] = useState('');
  const [dynamicParagraphName, setdynamicParagraphName] = useState('');

  console.log('paragraph info', dynamicParagraphId, types, dynamicChapterId, dynamicParagraphName)
  function openModal(type, id, data, paragraphname) {
    setIsOpen(true);
    setDynamicData({
      type: type,
      id: id,
      data: data,
      pargraph_name: paragraphname
    })
    setChapterName(data)
    settypes(type);
    setDynamicParagraphId(id)
    setdynamicParagraphName(paragraphname)
  }

  // console.log('check', dynamicData)

  function closeModal() {
    setIsOpen(false);
  }
  const chapterData = {
    ChapterName: chapterName,
    id: dynamicData.id,
    BookID: masterBookID

  }
  // console.log('chapter data',chapterData)
  const paragraphData = {
    ParagraphName: dynamicParagraphName,
    id: dynamicData.id,
    BookID: masterBookID,
    ChapterID: dynamicData.data

  }
  console.log('check', activeParagraph)

  const handleUpdate = (e) => {
    e.preventDefault();
    if (dynamicData.type == 'টাইটেল') {
      const data = {
        Title: documentTitle
      }
      axios.put(`/api/books/${dynamicData.id}`, data).then((res) => {
        if (res.data.status === 200) {
          Swal.fire("সফলভাবে সম্পন্ন হয়েছে", "", "success");
          window.location.reload();
        } else if (res.data.status === 400) {
          Swal.fire(res.data.message, "", "warning");
        }
      });
    }

    if (dynamicData.type == 'চ্যাপ্টার') {

      // console.log('data chapter',data)
      axios.put(`/api/bookChapter/${dynamicData.id}`, chapterData).then((res) => {
        if (res.data.status === 200) {
          Swal.fire("সফলভাবে সম্পন্ন হয়েছে", "", "success");
          window.location.reload();
        } else if (res.data.status === 400) {
          Swal.fire(res.data.message, "", "warning");
        }
      });
    }
    if (dynamicData.type == 'অনুচ্ছেদ') {

      // console.log('data ',paragraphData)
      axios.put(`/api/bookParagraph/${dynamicData.id}`, paragraphData).then((res) => {
        if (res.data.status === 200) {
          Swal.fire("সফলভাবে সম্পন্ন হয়েছে", "", "success");
          window.location.reload();
        } else if (res.data.status === 400) {
          Swal.fire(res.data.message, "", "warning");
        }
      });
    }
  }

  const handleContentEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("book_content", content);

    axios.post(`/api/update-main-book/` + activeParagraph, formData).then((res) => {
      if (res.data.status === 200) {
        Swal.fire("সফলভাবে সম্পন্ন হয়েছে", "", "success");
        window.location.reload();
      } else if (res.data.status === 400) {
        Swal.fire(res.data.message, "", "warning");
      }
    });

  }

  // console.log("new content", content);
  
  return (
    <div>
      <div>
        <NavigationBa />
      </div>
      <section className="container-fluid">
        <h3>
          লাইব্রেরী /
          {documentTitle}
          <EditIcon
            className="mb-1 mx-3 text-muted "
            style={{ cursor: "pointer" }}
            // onClick={handleEditClick}
            id="docu-edit-icon"
            onClick={() => openModal('টাইটেল', masterBookID, documentTitle)}
          />

          {/* <input
            type="text"

            className="form-control-sm border-1 border-secondary outline-0 ms-2 me-2 fs-4 "
            // placeholder="টাইটেল যোগ করুন "
            id="editInp"
            value={documentTitle}
            onChange={(e) => setdocumentTitle(e.target.value)}
          /> */}

        </h3>
      </section>
      <hr />
      <section className="container-fluid">
        <div className="">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2">
              <>
                <h5 className="suchipotro-h5">সূচীপত্র</h5>
                {bookMaster.map((chapter) => (
                  <div key={chapter.chapter_name}>
                    {/* <input type="text" className="form-control fw-bold " value={chapter.chapter_name}/> */}


                    <h6>{chapter.chapter_name}
                      <EditIcon
                        className="mb-1 mx-2 text-muted fs-6"
                        style={{ cursor: "pointer" }}
                        // onClick={handleEditClick}
                        id="docu-edit-icon"
                        onClick={() => openModal('চ্যাপ্টার', chapter.chapter_id, chapter.chapter_name)}

                      />
                    </h6>
                    <ul>
                      {chapter.paragraphs.map((item) => (
                        <li
                          key={item.paragraph_name}
                          onClick={() => {
                            handleParagraphClick(item.book_content)
                          }
                          }
                          
                        >
                          <a onClick={() => handleClick(item.main_book_id)}
                            className={item.main_book_id == activeParagraph ? 'activeColor' : ''}
                          >
                            {item.paragraph_name}
                            <EditIcon
                              className="mb-1 mx-2 text-muted fs-6"
                              style={{ cursor: "pointer" }}
                              onClick={() => openModal('অনুচ্ছেদ', item.paragraph_id, chapter.chapter_id, item.paragraph_name)}
                              id="docu-edit-icon"
                            />
                          </a>

                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            </div>

            <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-10">
              <div className="chapter-text-div">
                {/* <div className="chapter-text-header">
                  <h5>
                    {chapter} / {page}
                  </h5>
                </div> */}
                {/* <div className="story-texts ">
                  {<h5 dangerouslySetInnerHTML={{ __html: content }}></h5>}
                </div> */}

                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0 }}>
                    <EditIcon
                      id="editIcon"
                      className="mb-1 mx-2 text-primary fs-10" 
                      style={{ fontSize: '24px' }}
                      onClick = {handleContentEdit}
                      // hidden
                    />
                  </div>
                  <div style={{ paddingTop: '40px' }}>
                    <JoditEditor
                      value={content}
                      onChange= {(newContent) => {
                        setContent(newContent);
                      }}
                    />
                  </div>
                </div>

                <div className="TrendingFlatIcon-div">
                  {/* <TrendingFlatIcon className="TrendingFlatIcon" /> */}
                </div>
              </div>
            </div>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >

              <div className='card-body '>
                <span className='float-end' style={{ fontSize: "20px", cursor: "pointer" }} onClick={closeModal}><i class="fa fa-times"></i></span>

                <h5 className="">{dynamicData.type}</h5>
                <hr />

                <div className="row">

                  <div className="col-12 ">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label">নাম </label>
                      {
                        dynamicData.type == 'টাইটেল' &&
                        <input type="text" class="form-control fs-5" value={documentTitle} id="exampleFormControlInput1"
                          onChange={(e) => setdocumentTitle(e.target.value)}
                        />
                      }
                      {
                        dynamicData.type == 'চ্যাপ্টার' &&
                        <input type="text" class="form-control fs-5" value={chapterName} id="exampleFormControlInput1"
                          onChange={(e) => setChapterName(e.target.value)}
                        />
                      }
                      {
                        dynamicData.type == 'অনুচ্ছেদ' &&
                        <input type="text" class="form-control fs-5" value={dynamicParagraphName} id="exampleFormControlInput1"
                          onChange={(e) => setdynamicParagraphName(e.target.value)}
                        />
                      }

                    </div>
                    <div className="draft-prokas-buttons-div">
                      <button className="draft-prokas-button mx-2" onClick={handleUpdate}>আপডেট করুন</button>
                    </div>
                  </div>

                </div>
              </div>

            </Modal>




          </div>
        </div>
      </section>
    </div>
  );
};

export default EditMasterBook;
