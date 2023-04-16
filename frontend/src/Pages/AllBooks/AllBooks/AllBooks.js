import React, { useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import bookLogoImg from "../../../images/book.png";
import "./AllBooks.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link } from "react-router-dom";

const AllBooks = () => {
  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <div className="">
          <div className="">
            <div className="all-books-tags-input">
              <div>
                <h5>লাইব্রেরি </h5>
              </div>
              <div className="books-search-input-div">
                <div className="books-serchInput-icon-div">
                  <AddIcon />
                  <h6>
                    <strong>ডকুমেন্ট যোগ করুন</strong>
                  </h6>
                </div>
                {/* <div className="books-serchInput-icon-div">
                  <SearchIcon style={{ color: "#777777" }} />
                  <input type="search" className="gsearch-book" />
                </div> */}
              </div>
            </div>
            {/* <hr /> */}
            <p>আমার ফাইল</p>
            <div className="all-card-books-div">
              <div className="all-card-books">
                <img src={bookLogoImg} alt="" />
                <p className="all-books-card-p">পরিবেশ আইন সংকলন ১০১-২০০</p>
                <div className="overlay1">
                  <EditIcon className="edit-icon" />
                  <DeleteForeverIcon className="delete-icon" />
                </div>
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
            </div>
            <>
              <p>আমার সাথে শেয়ারকৃত</p>
              <div className="all-card-books-div">
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
              </div>
            </>
          </div>
          {/* <div className="col-xl-3 col-lg-4 cpl-md-5 col-sm-12 col-12">
            <div className="all-books-add-card-div1">
              {data && (
                <div className="all-books-side-tags">
                  <h6>{data.id}</h6>

                  <span className="icon-pen">
                    <CreateIcon />
                  </span>
                </div>
              )}
              <hr />
              <div className="download-icon-div">
                <DownloadForOfflineRoundedIcon className="download-icon" />
              </div>
              {data && (
                <div className="suchi-div">
                  <p>
                    <strong>অধ্যায় সংখ্যা:</strong> {data.chapter}
                  </p>
                  <p>
                    <strong>পৃষ্ঠা সংখ্যা:</strong> {data.pageNumber}{" "}
                  </p>
                  <p>
                    <strong>প্রথম প্রকাশ কাল :</strong> {data.productionDate}
                  </p>
                  <p>
                    <strong>প্রকাশক :</strong> {data.publicer}
                  </p>
                  <p>
                    <strong>সূচীপত্র:</strong> {data.repartory}
                  </p>
                </div>
              )}
              <div className="all-books-buttons-ful-div">
                <div className="all-books-edit-div">
                  <Link to="/book-categories">
                    <button className="all-books-edit">এডিট করুন</button>
                  </Link>
                </div>
                <div className="all-books-edit-div mt-2">
                  <Link to="/draft-documents">
                    {" "}
                    <button className="all-books-content">
                      <span>
                        <AddRoundedIcon />
                      </span>{" "}
                      কন্টেন্ট যোগ করুন{" "}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <section></section>

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
  );
};

export default AllBooks;
