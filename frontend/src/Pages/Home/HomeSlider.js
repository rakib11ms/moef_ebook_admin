import React, { Component } from "react";
import Slider from "react-slick";
import AddIcon from "@mui/icons-material/Add";
import bookPlusImg from "../../images/book-plus.png";
import chapter1Img from "../../images/chapter1.png";
import onuchhedImg from "../../images/onuchhed.png";
import pagePlusImg from "../../images/page-plus.png";
import "./Home.css";

const HomeSlider = () => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mt-4 mb-4">
      <Slider {...settings}>
        <div className="single-slide-div">
          <img className="img-fluid slide-img" src={bookPlusImg} alt="" />
          <h6 className="text">বই যোগ করুন </h6>
          <AddIcon />
        </div>
        <div className="single-slide-div">
          <img className="img-fluid slide-img" src={chapter1Img} alt="" />
          <h6>অধ্যায় যোগ করুন</h6>
          <AddIcon />
        </div>
        <div className="single-slide-div">
          <img className="img-fluid slide-img" src={onuchhedImg} alt="" />
          <h6>অনুচ্ছেদ যোগ করু</h6>
          <AddIcon />
        </div>
        <div className="single-slide-div">
          <img className="img-fluid slide-img" src={pagePlusImg} alt="" />
          <h6>পেইজ যোগ করুন </h6>
          <AddIcon />
        </div>
        <div className="single-slide-div">
          <img className="img-fluid slide-img" src={bookPlusImg} alt="" />
          <h6 className="text">বই যোগ করুন </h6>
          <AddIcon />
        </div>
      </Slider>
    </div>
  );
};

export default HomeSlider;
