import React, { useRef, useEffect, useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import SearchIcon from "@mui/icons-material/Search";
import "./EditBookCatagories.css";
import InterestsIcon from "@mui/icons-material/Interests";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Category } from "@mui/icons-material";
import axios from "axios";
import swal from "sweetalert";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const EditBookCatagories = () => {
  //use params
  const { id } = useParams();
  const [CategoryName, setCateoryName] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCateoryName(value);
  };

  const [CategoryIcon, setCatagoryIcon] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0]; // Get the selected file

    if (file && file.type === "image/png") {
      const img = new Image();
      img.onload = function () {
        setCatagoryIcon(file);
      };
      img.src = URL.createObjectURL(file); // Load the image data
    } else {
      console.log("Please select a PNG image.");
    }
  }

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const formData = new FormData();
  if (CategoryName) {
    formData.append("CategoryName", CategoryName);
  }
  if (CategoryIcon) {
    formData.append("CategoryIcon", CategoryIcon);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('formData', formData.get('CategoryName'));
    if (id) {
      axios.post(`/api/update-book-category/${id}`, formData, config).then((res) => {
        if (res.data.status === 200) {
          console.log('res.data.message', res.data.data);
          swal({
            title: "সফলভাবে সংরক্ষন করা হয়েছে",
            icon: "success",
          });
          navigate("/book-categories");

        } else {
          console.log(res.data.message);
          swal({
            title: "সংরক্ষন করা হয়নি",
            icon: "error",
          });
        }
      }).catch((err) => {
        swal({
          title: "সংরক্ষন করা হয়নি",
          icon: "error",
        });
      });
    }
  };

  useEffect(() => {
    axios.get(`/api/get-book-category/${id}`).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.bookcategory);
        setCateoryName(res.data.bookcategory.CategoryName);
        setCatagoryIcon(res.data.bookcategory.CategoryIcon)
      }
    });
  }, [id]);

  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/home">হোম</a></li>
            <li class="breadcrumb-item"><a href="/book-categories">বইয়ের ক্যাটাগরি</a></li>
            <li class="breadcrumb-item active" aria-current="page">বইয়ের ক্যাটাগরি সম্পাদনা</li>
          </ol>
        </nav>
        <div className="categories-top-div">
          <h5>বইয়ের ক্যাটাগরি/ক্যটেলগ সম্পাদনা করুন  </h5>

          <div className="categories-serchInput-icon-div">
            <SearchIcon style={{ color: "#8d8d8d" }} />
            <input type="search" className="gsearch-categories" />
          </div>
        </div>
      </section>
      <hr />
      <section className="container-fluid">
        <div className="row ">
          <div className="col-xl-6 col-lg-7 col-md-7 col-sm-12 col-12 categories-input-div">
            <div className="mb-3">
              <lebel>ক্যটেগরি নাম </lebel> <br />
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="categories-div">
                  <input
                    className="catogories-input"
                    id="books-categories-inputs"
                    type="text"
                    placeholder="ক্যাটাগরি নাম"
                    name="CatagoryName"
                    value={CategoryName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="categories-">
                  <div className="">
                  <lebel>ক্যটেগরি Icon </lebel> <br />

                    </div>

                  <div className="mt-2">
                    <img
                      src={`${global.imageURL}/uploads/bookcategory/${CategoryIcon}`}
                      alt="pic"
                      className="img-fluid"
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}

                    />
                  </div>


                  <input
                    name="CategoryIcon"
                    className="catogories-input"
                    id="books-categories-inputs-icon"
                    accept=".png"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  // onClick={handleAddTodo}
                  className="songrokkhon-button"
                  type="submit"
                >
                  সংরক্ষন করুন
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section></section>
    </div>
  );
};

export default EditBookCatagories;