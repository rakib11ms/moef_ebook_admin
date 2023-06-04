import React, { useRef, useEffect, useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import SearchIcon from "@mui/icons-material/Search";
import "./BooksCatagories.css";
import axios from "axios";
import swal from "sweetalert";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const BooksCatagories = () => {
  const $user = JSON.parse(localStorage.getItem("user"));
  const [catagoryName, setCatagoryName] = useState("");
  const [allCatagories, setAllCatagories] = useState([]);

  const rows = [
    ...allCatagories.map((catagory) => {
      return {
        id: catagory.id,
        CategoryName: catagory.CategoryName,
        CategoryIcon: catagory.CategoryIcon,
        updated_at: catagory.updated_at,
      };
    }),
  ];

  // console.log('all catagories', allCatagories);

  const columns = [
    {file: "CategoryIcon", headerName: "ক্যাটাগরির আইকন", width: 150, renderCell: (params) => (
      <div className="d-flex justify-content-around align-items-center">
        <img
          src={`${global.imageURL}/uploads/bookcategory/${params.row.CategoryIcon}`}
          alt="pic"
          className="img-fluid"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          // onError={(e) => {
          //   e.target.onerror = null;
          //   e.target.src = `${global.imageURL}/images/user/default.png`;
          // }}
        />
      </div>
    )
    },
    { field: "CategoryName", headerName: "ক্যাটাগরির নাম", width: 190 },
    {
      field: "edit",
      headerName: "সম্পাদনা করুন ",
      width: 180,
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          <Link
            to={`/edit-book-categories/${params.row.id}`}
            className="text-decoration-none"
          >
            <CreateOutlinedIcon className="text-warning" />
          </Link>
        </div>
      ),
    },
    {
      field: "delete",
      headerName: "ডিলিট করুন ",
      width: 180,
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          {/* sweet alert for confirm delete */}
          <DeleteOutlineOutlinedIcon
            className="text-danger"
            onClick={() => {
              swal({
                title: "নিশ্চিত করুন",
                text: "আপনি কি ক্যাটেগরিটি ডিলিট করতে চান? ",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  axios
                    .delete(`/api/delete-book-category/${params.row.id}`)
                    .then((res) => {
                      if (res.data.status === 200) {
                        swal("ক্যাটেগরিটি সফলভাবে ডিলিট করা হয়েছে ", {
                          icon: "success",
                        });
                        axios.get(`/api/book-category`).then((res) => {
                          if (res.data.status === 200) {
                            console.log(res.data.bookcategories);
                            setAllCatagories(res.data.bookcategories);
                          } else {
                            console.log("error");
                          }
                        });
                      } else {
                        swal("Oops! Something went wrong, Please try again");
                      }
                    });
                }
              });
            }}
          />
        </div>
      ),
    },
    {
      field: "updated_at", headerName: "সর্বশেষ সম্পাদনা", width: 350
    }
  ];

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCatagoryName(value);
  };

  const [CategoryIcon, setCatagoryIcon] = useState(null);


  function handleFileChange(event) {
    const file = event.target.files[0]; // Get the selected file
    const maxSize = 24; // Maximum allowed size in pixels
  
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
  formData.append("CategoryName", catagoryName);
  formData.append("Created_by", $user.id);
  formData.append("CategoryIcon", CategoryIcon);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const catagory = {
    //   CategoryName: catagoryName,
    //   Created_by: $user.id,
    //   CategoryIcon: categoryIcon,
    // };
    // console.log(catagory);

    axios
      .post(`/api/store-book-category`, formData, config)
      .then((res) => {
        // console.log(res);
        if (res.data.status === 200) {
          console.log(res.data.message);
          swal({
            title: "সফলভাবে সংরক্ষন করা হয়েছে",
            icon: "success",
          });
          axios.get(`/api/book-category`).then((res) => {
            if (res.data.status === 200) {
              console.log(res.data.bookcategories);
              setAllCatagories(res.data.bookcategories);
            }
          });
        } else {
          console.log(res.data.message);
          swal({
            title: "সংরক্ষন করা হয়নি",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        swal({
          title: "সংরক্ষন করা হয়নি",
          icon: "error",
        });
      });
  };

  async function fetchData () {
    await axios.get(`/api/book-category`).then((res) => {
      if (res.data.status === 200) {
        console.log('all categories', res.data.bookcategories);
        setAllCatagories(res.data.bookcategories);
      } else {
        console.log("error");
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);
  

  // console.log(allCatagories);

  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/home">হোম</a></li>
            <li class="breadcrumb-item active" aria-current="page">বইয়ের ক্যাটাগরি</li>
          </ol>
        </nav>
        <div className="categories-top-div">
          <h5>বইয়ের ক্যাটাগরি/ক্যটেলগ</h5>

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
              <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
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

                <div className="categories-div">
                  <label htmlFor="books-categories-inputs-icon" className="btn btn-warning">ক্যটেগরি আইকন সিলেক্ট করতে এখানে ক্লিক করুন </label>
                  <br />
                  <div className="file-input-container">
                    <input
                      name="CategoryIcon"
                      className="catogories-input"
                      id="books-categories-inputs-icon"
                      accept=".png"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <button
                  // onClick={handleAddTodo}
                  className="songrokkhon-button"
                  type="submit"
                  id="books-categories-btn"
                >
                  সংরক্ষন করুন
                </button>
              </form>
            </div>
          </div>
          <div className="col-xl-6 col-lg-5 col-md-5 col-sm-12 col-12">
            <div>
              <lebel>ক্যাটাগরি লিস্ট</lebel> <br />
              <DataGrid
                id="book-categories-datagrid"
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
              />
            </div>
          </div>
        </div>
      </section>

      <section></section>
    </div>
  );
};

export default BooksCatagories;
