import React from "react";
import NavigationBa from "../Shared/NavigationBa/NavigationBa";
import peopleRepublice from "../../images/Government of Bangladesh-logo.png";
import notfound from "../../images/notfound.png";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <div className="container">
        <div className="top-img-tags">
          <img className="notfound-republic-img" src={peopleRepublice} alt="" />
          <h6>পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়</h6>
        </div>
        <div className="top-img-tags">
          <img className="notfound-img" src={notfound} alt="" />
          <h6 className="sorry-text">দুঃখিত , কোন তথ্য পাওয়া যায় নাই </h6>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
