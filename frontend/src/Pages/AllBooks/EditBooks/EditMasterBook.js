import React, { useEffect, useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./EditMasterBook.css";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

const EditMasterBook = () => {
    const params = useParams();
    const masterBookID = params.id;

    const [activeButton, setActiveButton] = useState(null);
    const [chapter, setChapter] = useState("");
    const [page, setPage] = useState("");
    const [bookMaster, setBookMaster] = useState([]);
    const [content, setContent] = useState("");
    const [singleBookName, setSingleBookName] = useState("");

  const handleParagraphClick = (paragraph) => {
    setContent(paragraph);
  };

  const handleChapterclick = (chapter) => {
    setChapter(chapter);
  };
  console.log("chapter", chapter);

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

    const[chapterName, setChapterName] = useState("")

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

  return (
    <div>
      <div>
        <NavigationBa />
      </div>
      <section className="container-fluid">
        <h3>
            লাইব্রেরী / {singleBookName} <Button>Edit</Button>
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
                  <h6>অধ্যায় নাম:</h6>
                    <h6>
                        <input
                            id="chapter_name"
                            type="text"
                            value={chapter.chapter_name}
                            disabled
                            onChange={(e) => handlehapterNameChange(e.target.value)}
                        >
                        
                        </input>
                        <Button
                            onClick={() => handleEditChapter(chapter.chapter_name)}
                        >
                            Edit
                        </Button>
                    </h6>
                    <h6>অনুচ্ছেদ নাম:</h6>
                    <ul>
                      {chapter.paragraphs.map((paragraph) => (
                        <li
                          key={paragraph.paragraph_name}
                          onClick={() =>
                            handleParagraphClick(paragraph.book_content)
                          }
                        >
                          <Button>
                            {paragraph.paragraph_name}
                        </Button>
                        <Button>Edit</Button>
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
