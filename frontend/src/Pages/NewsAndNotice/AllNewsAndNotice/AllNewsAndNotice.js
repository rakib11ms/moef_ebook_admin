import React, { useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./AllNewsAndNotice.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import swal from "sweetalert";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';



const AllNewsAndNotice = () => {

  const [allNoticeNews, setAllNoticeNews] = useState([]);

  async function fetchData () {
    try {
      await axios.get("/api/notice").then(res => {
        if (res.data.status === 200) {
          setAllNoticeNews(res.data.news_notices);
          console.log('notice news', res.data.news_notices);
          setIsLoading(false);
        } else {
          console.log('error');
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: 'newsNotice', headerName: 'বিজ্ঞপ্তি', width: 250 },
    // { field: 'category', headerName: 'বিজ্ঞপ্তির ধরন  ', width: 200 },
    // { field: 'sub_category', headerName: 'বিজ্ঞপ্তির উপ-ধরন', width: 200 },
    {
      field: 'edit',
      headerName: 'সম্পাদনা করুন ',
      width: 300,
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          <Link to={`/update-news-notice/${params.row.id}`}>
            <CreateOutlinedIcon className="text-warning" />
          </Link>
        </div>
      ),
    },
    {
      field: 'delete',
      headerName: 'ডিলিট করুন ',
      width: 400,
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          <DeleteOutlineOutlinedIcon
            className="text-danger"
            onClick={() => {
              swal({
                title: "নিশ্চিত করুন",
                text: "আপনি কি বিজ্ঞপ্তিটি ডিলিট করতে চান? ",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  axios.delete(`/api/delete-single-document/${params.row.id}`).then((res) => {
                    if (res.data.status === 200) {
                      swal("বিজ্ঞপ্তিটি সফলভাবে ডিলিট করা হয়েছে ", {
                        icon: "success",
                      });
                      // axios.get(`/api/notice`).then((res) => {
                      //   if (res.data.status === 200) {
                      //     setAllNoticeNews(res.data.news_notices);
                      //   } else {
                      //     console.log("error");
                      //   }
                      // });
                      fetchData();
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
          <Link to={`/view-news-notice/${params.row.id}`} target="_blank">
            <RemoveRedEyeIcon className="text-success" />
          </Link>
        </div>
      ),
    }
  ];

  const rows = [
    ...allNoticeNews.map((notice, index) => (
      {
        id: notice.id,
        newsNotice: notice.title,
        category: notice.category,
        // sub_category: notice.sub_category.Name,
        // set the edit button for each row edit field in columns array by using renderCell
        
      }
    ))
  ];
  const [isLoading, setIsLoading] = useState(true);

  // console.log('rows', rows);

  return (
    <div>
      <div>
        <section>
          <NavigationBa />
        </section>
        <section className="container-fluid">
          <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/home">হোম</a></li>
                  <li class="breadcrumb-item active" aria-current="page">সকল বিজ্ঞপ্তি</li>
                </ol>
            </nav>
          <div className="row">
            <div className="col-xl-12 col-lg-8 cpl-md-7 col-sm-12 col-12">
              <div className="all-news-notice-tags-input">
                <h5>বিজ্ঞপ্তি</h5>
                <div className="news-notice-search-input-div ">
                  <div className="news-notice-serchInput-icon-div">
                    <SearchIcon />
                    <input type="search" className="gsearch-news-notice" />
                  </div>
                  <div className="jog-korun-button-div">
                    <Link to="/create-news-notice">
                      <button className="jog-korun-button">যোগ করুন</button>
                      <AddIcon className="jog-korun-button-icon" />
                    </Link>
                  </div>
                </div>
              </div>
              <hr />
              <div className="container-fluid table-responsive-lg table-responsive-sm">
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
              </div>
            </div>
          
          </div>
        </section>
        {/* <section>
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
        </section> */}
      </div>
    </div>
  );
};

export default AllNewsAndNotice;
