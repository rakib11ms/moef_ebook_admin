import React, { useEffect, useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./AllDocuments.css";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from '@mui/x-data-grid';
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import swal from "sweetalert";

import { Link } from "react-router-dom";
import axios from "axios";

const AllDocuments = () => {
  const [AllDocuments, setAllDocuments] = useState([]);

  useEffect(() => {
    axios.get(`/api/all-single-document`).then((res) => {
      if (res.data.status === 200) {
        setAllDocuments(res.data.single_document);
        // console.log("all books", res.data.single_document);
      } else {
        console.log("error");
      }
    })
  }, [])

  const columns = [
    { field: 'document_title', headerName: 'ডকুমেন্টের নাম', width: 250 },
    {
      field: 'edit',
      headerName: 'সম্পাদনা করুন ',
      width: 190,
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
      width: 190,
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
                  axios.delete(`/api/delete-single-document/${params.row.id}`).then((res) => {
                    if (res.data.status === 200) {
                      swal("ডকুমেন্টটি সফলভাবে ডিলিট করা হয়েছে", {
                        icon: "success",
                      });
                      axios.get(`/api/all-single-document`).then((res) => {
                        if (res.data.status === 200) {
                          setAllDocuments(res.data.single_document);
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
      field: 'view',
      headerName: 'দেখুন',
      width: 120,
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          <Link to={`/view-documents/${params.row.id}`}>
            <RemoveRedEyeIcon className="text-success" />
          </Link>
        </div>
      ),
    }
  ];

  const rows = [
    ...AllDocuments.map((data) => {
      return {
        id: data.id,
        document_title: data.document_title,
      };
    }),
  ];


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
                <div className="add-doc-div">
                  <AddIcon />
                  <Link to="/add-document">
                    <h6>ডকুমেন্ট যোগ করুন</h6>
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
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />

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