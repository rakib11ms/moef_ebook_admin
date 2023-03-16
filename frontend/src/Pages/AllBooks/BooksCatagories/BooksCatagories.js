import React from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import SearchIcon from "@mui/icons-material/Search";
import "./BooksCatagories.css";
import InterestsIcon from "@mui/icons-material/Interests";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";

const BooksCatagories = () => {
  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <div className="categories-top-div">
          <h5>বইয়ের ক্যাটাগরি/ক্যটেলগ</h5>

          <div className="books-categories-serchInput-icon-div">
            <SearchIcon />
            <input type="search" className="gsearch" />
          </div>
        </div>
      </section>
      <hr />
      <section className="container-fluid">
        <div className="row ">
          <div className="col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 categories-input-div">
            <div>
              <lebel>ক্যটেগরি নাম </lebel> <br />
              <input className="catogories-input" type="text" />
            </div>
            <div>
              <lebel>সাব ক্যাটেগরি </lebel> <br />
              <input className="catogories-input" type="text" />
            </div>
            <button className="songrokkhon-button">সংরক্ষন করুন</button>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-5 col-sm-12 col-12">
            <div>
              <div className="catagories-topics-div">
                <div className="catagories-topics">
                  <InterestsIcon />
                  <p>আইন ও বিধি</p>
                  <CreateIcon />
                  <CloseIcon />
                </div>
                <div className="catagories-topics">
                  <InterestsIcon />
                  <p>সাধারণ</p>
                  <CreateIcon />
                  <CloseIcon />
                </div>
                <div className="catagories-topics">
                  <InterestsIcon />
                  <p>শ্বেতপত্র</p>
                  <CreateIcon />
                  <CloseIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BooksCatagories;
