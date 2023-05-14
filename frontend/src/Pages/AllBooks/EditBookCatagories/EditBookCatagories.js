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
  const [catagoryName, setCatagoryName] = useState("");

  const navigate=useNavigate();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCatagoryName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const catagory = {
      CategoryName: catagoryName,
    };
    axios.put(`/api/book-category/${id}`, catagory).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.message);
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
  };

  useEffect(() => {
    axios.get(`/api/book-category/${id}`).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.bookcategory);
        setCatagoryName(res.data.bookcategory.CategoryName);
      }
    });
  }, [id]);

  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
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
              <form onSubmit={handleSubmit}>
                <div className="categories-div">
                  <input
                    className="catogories-input"
                    id="books-categories-inputs"
                    type="text"
                    placeholder="ক্যাটাগরি নাম"
                    name="CatagoryName"
                    value={catagoryName}
                    onChange={handleInputChange}
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