import React from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import bookLogoImg from "../../../images/book.png";
import "./AllBooks.css";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const AllBooks = () => {
  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <div className="row">
          <div className="col-xl-9 col-lg-8 cpl-md-7 col-sm-12 col-12">
            <div className="all-books-tags-input">
              <h5>সকল বই </h5>
              <div className="books-search-input-div">
                <div className="books-serchInput-icon-div">
                  <SearchIcon />
                  <input type="search" className="gsearch-book" />
                </div>
              </div>
            </div>
            <hr />
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
          </div>
          <div className="col-xl-3 col-lg-4 cpl-md-5 col-sm-12 col-12">
            <div className="all-books-add-card-div1">
              <div className="all-books-side-tags">
                পরিবেশ আইন সংকলন ১০১-২০০
                <span className="icon-pen">
                  <CreateIcon />
                </span>
              </div>
              <hr />
              <div className="download-icon-div">
                <DownloadForOfflineRoundedIcon className="download-icon" />
              </div>
              <div className="suchi-div">
                <p>অধ্যায় সংখ্যা: ১২</p>
                <p>পৃষ্ঠা সংখ্যা: ২১২ </p>
                <p>প্রথম প্রকাশ কাল : ২০১৯</p>
                <p>প্রকাশক :</p>
                <h5>সূচীপত্র</h5>
              </div>
              <div className="all-books-buttons-ful-div">
                <div className="all-books-edit-div">
                  <button className="all-books-edit">এডিট করুন</button>
                </div>
                <div className="all-books-edit-div mt-2">
                  <button className="all-books-content">
                    <span>
                      <AddRoundedIcon />
                    </span>{" "}
                    কন্টেন্ট যোগ করুন{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
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
