import React from "react";
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

const AllNewsAndNotice = () => {
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
                    <input type="search" className="gsearch" />
                  </div>
                  <div className="jog-korun-button-div">
                    <button className="jog-korun-button">যোগ করুন</button>
                    <AddIcon className="jog-korun-button-icon" />
                  </div>
                </div>
              </div>
              <hr />
              <div className="container-fluid">
                <table className="table table-borderless">
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
                    <tr className="tr-div">
                      <th scope="row">১</th>
                      <td>
                        <strong>অফসি আদশে, তারখিঃ ০৯-০৩-২০২৩ (নতুন)</strong>
                      </td>
                      <td className="td-notice">নোটিশ/ অফিস নোটিশ</td>
                      <td>
                        <CreateOutlinedIcon />
                      </td>
                      <td>
                        <DeleteOutlineOutlinedIcon />
                      </td>
                    </tr>
                    <tr className="tr-div">
                      <th scope="row">২</th>
                      <td>
                        <strong>
                          র্কমশালার নোটশি, তারখিঃ ১২-০৩-২০২৩ (নতুন)
                        </strong>
                      </td>
                      <td>নোটিশ/ কর্মশালা </td>
                      <td>
                        <CreateOutlinedIcon />
                      </td>
                      <td>
                        <DeleteOutlineOutlinedIcon />
                      </td>
                    </tr>
                    <tr className="tr-div">
                      <th scope="row">৩</th>
                      <td>
                        <strong>
                          র্কমশালার নোটশি, তারখিঃ ১২-০৩-২০২৩ (নতুন)
                        </strong>
                      </td>
                      <td>নোটিশ/ কর্মশালা </td>
                      <td>
                        <CreateOutlinedIcon />
                      </td>
                      <td>
                        <DeleteOutlineOutlinedIcon />
                      </td>
                    </tr>
                    <tr className="tr-div">
                      <th scope="row">৪</th>
                      <td>
                        <strong>
                          র্কমশালার নোটশি, তারখিঃ ১২-০৩-২০২৩ (নতুন)
                        </strong>
                      </td>
                      <td>নোটিশ/ সভা </td>
                      <td>
                        <CreateOutlinedIcon />
                      </td>
                      <td>
                        <DeleteOutlineOutlinedIcon />
                      </td>
                    </tr>
                    <tr className="tr-div">
                      <th scope="row">৫</th>
                      <td>
                        {" "}
                        <strong>
                          র্কমশালার নোটশি, তারখিঃ ১২-০৩-২০২৩ (নতুন)
                        </strong>
                      </td>
                      <td>নোটিশ/ বিবিধ </td>
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
              {/* <div className="all-card-books-div">
                <div className="all-card-books">
                  <img src={bookLogoImg} alt="" />
                  <p className="all-books-card-p">পরিবেশ আইন সংকলন ১০১-২০০</p>
                </div>
                <div className="all-card-books">
                  <img src={bookLogoImg} alt="" />
                  <p className="all-books-card-p">জাতীয় পরিবেশ নীতি ২০১৮</p>
                </div>
                <div className="all-card-books">
                  <img src={bookLogoImg} alt="" />
                  <p className="all-books-card-p">পরিবেশ আইন সংকলন ২০০-৩৩৬</p>
                </div>
                <div className="all-card-books">
                  <img src={bookLogoImg} alt="" />
                  <p className="all-books-card-p">পরিবেশ আদালত আইন, ২০১০</p>
                </div>
                <div className="all-card-books">
                  <img src={bookLogoImg} alt="" />
                  <p className="all-books-card-p">১৯২৭ বন আইন</p>
                </div>
                <div className="all-card-books">
                  <img src={bookLogoImg} alt="" />
                  <p className="all-books-card-p">খসড়া বন আইন ২০১৯</p>
                </div>
              </div> */}
            </div>
            <div className="col-xl-3 col-lg-4 cpl-md-5 col-sm-12 col-12">
              <div className="all-books-add-card-div">
                <div className="all-books-side-tags">
                  অফসি আদশে, তারখিঃ ০৯-০৩-২০২৩ (নতুন)
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
                    <strong>নোটিশ/ অফিস নোটিশ</strong>
                  </p>
                  <p>ক্যাটেগরি/সাব ক্যাটেগরি </p>
                  <p>বিষয় বস্তু: </p>
                </div>
                <div className="all-books-buttons-ful-div">
                  <div className="all-news-notice-edit-div">
                    <button className="all-books-edit">এডিট করুন</button>
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
