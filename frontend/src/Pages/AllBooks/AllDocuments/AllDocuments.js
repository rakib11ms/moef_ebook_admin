import React, { useEffect, useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./AllDocuments.css";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import swal from "sweetalert";

import { Link } from "react-router-dom";
import axios from "axios";

const AllDocuments = () => {
  const [AllDocuments, setAllDocuments] = useState([]);

  console.log('all documents',AllDocuments)

  async function fetchDocs() {
    await axios.get(`/api/all-single-document`).then((res) => {
      if (res.data.status === 200) {
        setAllDocuments(res.data.single_document);
        setIsLoading(false);
        console.log("all books", res.data.single_document);
      } else {
        console.log("error");
      }
    });
  }


  
  useEffect(() => {
    fetchDocs();
  }, []);
  const rows = [
    ...AllDocuments.map((data) => {
      return {
        id: data.id,
        title: data.title,
      };
    }),
  ];


  const columns = [
    { field: 'title', headerName: 'ডকুমেন্টের নাম', width: 400 },
    {
      field: 'edit',
      headerName: 'সম্পাদনা করুন ',
      width: 250,
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          <Link to={`/edit-document/${params.row.id}`}>
            <CreateOutlinedIcon className="text-warning" />
          </Link>
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'ডিলিট করুন ',
      width: 250,
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          {/* sweet alert for confirm delete */}
          <DeleteOutlineOutlinedIcon
            className="text-danger"
            onClick={() => {
              swal({
                title: "নিশ্চিত করুন",
                text: "আপনি কি ডকুমেন্টটি ডিলিট করতে চান? ",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  axios
                    .delete(`/api/delete-single-document/${params.row.id}`)
                    .then((res) => {
                      if (res.data.status === 200) {
                        swal("ডকুমেন্টটি সফলভাবে ডিলিট করা হয়েছে", {
                          icon: "success",
                        });
                        // axios.get(`/api/all-single-document`).then((res) => {
                        //   if (res.data.status === 200) {
                        //     setAllDocuments(res.data.single_document);
                        //   } else {
                        //     console.log("error");
                        //   }
                        // });
                        fetchDocs();
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
      field: 'view',
      headerName: 'দেখুন',
      width: 250,
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          <Link to={`/view-documents/${params.row.id}`} target="_blank">
            <RemoveRedEyeIcon className="text-success" />
          </Link>
        </div>
      ),
    },
  ];

  const [isLoading, setIsLoading] = useState(true);

 
  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section className="container-fluid">
        <div className="">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/home">হোম</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                সকল ডকুমেন্টস
              </li>
            </ol>
          </nav>
          <div className="">
            <div className="all-books-tags-input">
              <div>
                <h5>লাইব্রেরি </h5>
              </div>
              <div className="books-search-input-div">
                <div className="add-doc-div">
                  <AddIcon />
                  <Link to="/add-document">
                    <h6 className="mt-2">ডকুমেন্ট যোগ করুন</h6>
                  </Link>
                </div>
                {/* <div className="books-serchInput-icon-div">
                  <SearchIcon style={{ color: "#777777" }} />
                  <input type="search" className="gsearch-book" />
                </div> */}
              </div>
            </div>
            {/* <hr /> */}
            <>
              <p>সকল ডকুমেন্টস</p>
              {/* <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
              /> */}
              <div>
                {isLoading ? (
                  // Display loader here
                  <div className="d-flex justify-content-center">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    >
                      <span className=""></span>
                    </div>
                  </div>
                ) : (
                  // DataGrid component
                  <DataGrid
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
                )}
              </div>
            </>

            {/* <>
              <p>আমার সাথে শেয়ারকৃত</p>

            </> */}
          </div>
        </div>
      </section>

      <section></section>
    </div>
  );
};

export default AllDocuments;
