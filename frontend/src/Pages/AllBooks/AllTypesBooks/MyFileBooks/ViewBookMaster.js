import React, { useEffect, useState } from "react";
import NavigationBa from "../../../Shared/NavigationBa/NavigationBa";
import "./MyTypesBooks.css";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

const ViewBookMaster = () => {
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
    console.log(chapter);
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
          লাইব্রেরী / <span>{singleBookName}</span>
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
                    <h6>{chapter.chapter_name}</h6>
                    <ul>
                      {chapter.paragraphs.map((paragraph) => (
                        <li
                          key={paragraph.paragraph_name}
                          onClick={() =>
                            handleParagraphClick(paragraph.book_content)
                          }
                        >
                          <Button>{paragraph.paragraph_name}</Button>
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

export default ViewBookMaster;
