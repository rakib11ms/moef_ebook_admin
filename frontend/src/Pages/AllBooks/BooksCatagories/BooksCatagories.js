import React from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import SearchIcon from "@mui/icons-material/Search";
import "./BooksCatagories.css";

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
    </div>
  );
};

export default BooksCatagories;
