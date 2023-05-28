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

const EditMasterBook = () => {
  const params = useParams();
  const masterBookID = params.id;

  const [chapter, setChapter] = useState("");
  const [bookMaster, setBookMaster] = useState([]);
  const [content, setContent] = useState("");
  const [singleBookName, setSingleBookName] = useState("");

  const handleParagraphClick = (paragraph) => {
    setContent(paragraph);
  };

  const handleEditBook = (e) => {
    // console.log("book");
    //set a tick mark instead of edit icon

    document.getElementById("book_name").disabled =
      !document.getElementById("book_name").disabled;
    document.getElementById("tick").hidden =
      !document.getElementById("tick").hidden;
    document.getElementById("edit_book").hidden =
      !document.getElementById("edit_book").hidden;
  };

  const handleBookNameChange = (book) => {
    setSingleBookName(book);
  };

  const handleChapterclick = (chapter) => {
    setChapter(chapter);
  };

  async function getBookMaster() {
    await axios
      .get("/api/get-All-Main-Book-By-Book-Master-ID/" + masterBookID)
      .then((res) => {
        console.log("Book", res.data.data);
        setBookMaster(res.data.data);
      });

    await axios.get("/api/books/" + masterBookID).then((res) => {
      console.log("Book_Title", res.data.books_master.Title);
      setSingleBookName(res.data.books_master.Title);
    });
  }

  const handleEditChapter = (chapter) => {
    // console.log("chapter", chapter);
    // document.getElementById("chapter_name").disabled = !document.getElementById("chapter_name").disabled;
  };

  const [chapterName, setChapterName] = useState("");

  const handlehapterNameChange = (chapter, i) => {
    setChapterName(chapter);
  };

  useEffect(() => {
    getBookMaster();
  }, []);

  // const handleButtonClick = (buttonNumber, buttonChapter, buttonPage) => {
  //   setActiveButton(buttonNumber);
  //   setChapter(buttonChapter);
  //   setPage(buttonPage);
  // };

  // Edit Tag name
  const [tagName, setTagName] = useState("বইয়ের-নাম");
  const [isEditing, setIsEditing] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    setNewTagName(tagName);
  };

  const handleCheckClick = () => {
    setIsEditing(false);
    setTagName(newTagName);
  };

  const handleInputChange = (e) => {
    setNewTagName(e.target.value);
  };

  // Edit Chapter Tag name
  const [tagNameChapter, setTagNameChapter] = useState("অনুচ্ছেদের নাম");
  const [isEditingChapter, setIsEditingChapter] = useState(false);
  const [newTagNameChapter, setNewTagNameChapter] = useState("");

  const handleEditClickChapter = () => {
    setIsEditingChapter(true);
    setNewTagNameChapter(tagNameChapter);
  };

  const handleCheckClickChapter = () => {
    setIsEditingChapter(false);
    setTagNameChapter(newTagNameChapter);
  };

  const handleInputChangeChapter = (e) => {
    setNewTagNameChapter(e.target.value);
  };

  return (
    <div>
      <div>
        <NavigationBa />
      </div>
      <section className="editMaster-tagname container-fluid">
        {/* <div>
          {isEditing ? (
            <input
              type="text"
              value={newTagName}
              onChange={handleInputChange}
            />
          ) : (
            <h3>{tagName}</h3>
          )}

          {isEditing ? (
            <CheckIcon onClick={handleCheckClick} />
          ) : (
            <EditIcon onClick={handleEditClick} />
          )}
        </div> */}
        <h3 className="">
          লাইব্রেরী /
          {/* <input
            // _dangerouslySetInnerHTML={{ __html: singleBookName }}
            type="text"
            id="book_name"
            className="input-field"
            value={singleBookName}
            onChange={(e) => handleBookNameChange(e.target.value)}
            disabled
          />
          <CreateOutlinedIcon
            id="edit_book"
            className="text-warning small-icon"
            onClick={(e) => handleEditBook(e)}
          >
            Edit
          </CreateOutlinedIcon>
          <Button id="tick" class="tick" hidden>
            &#10004;
          </Button> */}
        </h3>{" "}
        <span className="editMaster-tagname-span">
          {isEditing ? (
            <input
              id="editmaster-input"
              type="text"
              value={newTagName}
              onChange={handleInputChange}
            />
          ) : (
            <h3>{tagName}</h3>
          )}
          {isEditing ? (
            <CheckIcon
              className="editMaster-edit-icon"
              onClick={handleCheckClick}
            />
          ) : (
            <EditIcon
              className="editMaster-edit-icon"
              onClick={handleEditClick}
            />
          )}
        </span>
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
                    <h6>অধ্যায় নাম:</h6>

                    <span className="editMaster-chapter-tagname-span">
                      {isEditingChapter ? (
                        <input
                          id="editmaster-input"
                          type="text"
                          value={newTagNameChapter}
                          onChange={handleInputChangeChapter}
                        />
                      ) : (
                        <h3 className="editMaster-chapter-tagname">
                          {tagNameChapter}
                        </h3>
                      )}
                      {isEditingChapter ? (
                        <CheckIcon onClick={handleCheckClickChapter} />
                      ) : (
                        <EditIcon
                          className="editMaster-edit-icon"
                          onClick={handleEditClickChapter}
                        />
                      )}
                    </span>
                    {/* 
                    <h6>
                      <input
                        id="chapter_name"
                        type="text"
                        value={chapter.chapter_name}
                        className="input-field"
                        disabled
                        onChange={(e) => handlehapterNameChange(e.target.value)}
                      ></input>
                      <CreateOutlinedIcon
                        className="text-warning small-icon"
                        onClick={() => handleEditChapter(chapter.chapter_name)}
                      >
                        Edit
                      </CreateOutlinedIcon>
                    </h6> */}
                    {/* <h6>অনুচ্ছেদ নাম:</h6> */}
                    <ul>
                      {chapter.paragraphs.map((paragraph) => (
                        <li
                          key={paragraph.paragraph_name}
                          onClick={() =>
                            handleParagraphClick(paragraph.book_content)
                          }
                        >
                          <Button>{paragraph.paragraph_name}</Button>
                          <CreateOutlinedIcon className="text-warning small-icon">
                            Edit
                          </CreateOutlinedIcon>
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
                <div className="story-texts">
                  {<h5 dangerouslySetInnerHTML={{ __html: content }}></h5>}
                </div>

                <div className="TrendingFlatIcon-div">
                  {/* <TrendingFlatIcon className="TrendingFlatIcon" /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditMasterBook;
