import React, { useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import bookLogoImg from "../../../images/book.png";
import "./AllNewsAndNotice.css";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddIcon from "@mui/icons-material/Add";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const AllNewsAndNotice = () => {
  const [selectedText, setSelectedText] = useState("");
  const [selectedNotice, setSelectedNotice] = useState("");
  function handleParagraphClick(event) {
    setSelectedText(event.target.innerText);
  }
  function handleNoticeClick(event) {
    setSelectedNotice(event.target.innerText);
  }

  const [allNoticeNews, setAllNoticeNews] = useState([]);

  console.log('notice news', allNoticeNews)

  useEffect(() => {
    axios.get(`/api/notice`).then(res => {

      if (res.data.status == 200) {
        setAllNoticeNews(res.data.news_notices);
        // setLoading(false);
      }
    })

  }, [])
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
                <h5>নিউজ ও নোটিশ </h5>
                <div className="news-notice-search-input-div ">
                  <div className="news-notice-serchInput-icon-div">
                    <SearchIcon />
                    <input type="search" className="gsearch-news-notice" />
                  </div>
                  <div className="jog-korun-button-div">
                    <Link to="/create-news-notice">
                      <button className="jog-korun-button">যোগ করুন</button>
                      <AddIcon className="jog-korun-button-icon" />
                    </Link>

                  </div>
                </div>
              </div>
              <hr />
              <div className="container-fluid table-responsive-lg table-responsive-sm">
                <table className="table table-borderless ">
                  <thead>
                    {/* <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">h4</th>
                      <th scope="col">Handle</th>
                    </tr> */}
                  </thead>
                  <tbody>
                    {
                      allNoticeNews.map((item, i) => {
                        return (
                          <tr className="tr-div" key={i}>
                            <th scope="row">১</th>
                            <td onClick={handleParagraphClick}>
                              <strong>
                                {item.Title}, তারিখ ০৯-০৩-২০২৩ (নতুন)</strong>
                            </td>
                            <td onClick={handleNoticeClick} className="td-notice">

                              {
                                item.category.Name
                              }
                              /
                              {
                                item.sub_category.Name
                              }

                            </td>
                            <td>
                              <CreateOutlinedIcon />
                            </td>
                            <td>
                              <DeleteOutlineOutlinedIcon />
                            </td>
                          </tr>
                        )
                      })
                    }

                    <tr className="tr-div">
                      <th scope="row">২</th>
                      <td onClick={handleParagraphClick}>
                        <strong>
                          র্কমশালার নোটিশ, তারিখ ০২-০৩-২০২৩ (নতুন)
                        </strong>
                      </td>
                      <td onClick={handleNoticeClick}>নোটিশ/ কর্মশালা </td>
                      <td>
                        <CreateOutlinedIcon />
                      </td>
                      <td>
                        <DeleteOutlineOutlinedIcon />
                      </td>
                    </tr>
                
                  </tbody>
                </table>
              </div>

            </div>
            <div className="col-xl-3 col-lg-4 cpl-md-5 col-sm-12 col-12">
              <div className="all-notice-news-add-card-div">
                <div className="all-notice-news-side-tags">
                  {selectedText && <p>{selectedText}</p>}
                  <span className="icon-pen">
                    <CreateIcon />
                  </span>
                </div>
                <hr />
                <div className="download-icon-div">
                  <DownloadForOfflineRoundedIcon className="download-icon" />
                </div>
                <div className="suchi-div">
                  <p>
                    <strong>{selectedNotice && <p>{selectedNotice}</p>}</strong>
                  </p>

                  <p>বিষয় বস্তু: </p>
                </div>
                <div className="all-books-buttons-ful-div">
                  <div className="all-news-notice-edit-div">
                    <Link to="/create-news-notice">
                      <button className="all-books-edit">এডিট করুন</button>
                    </Link>
                  </div>
                  {/* <div className="all-books-edit-div mt-2">
                    <button className="all-books-content">
                      <span>
                        <AddRoundedIcon />
                      </span>{" "}
                      কন্টেন্ট যোগ করুন{" "}
                    </button>
                  </div> */}
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </section>
        <section>
          <div className="pagination-div">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                  <a className="page-link">Previous</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllNewsAndNotice;
