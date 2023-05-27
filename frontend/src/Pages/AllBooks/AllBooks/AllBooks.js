import React, { useEffect, useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./AllBooks.css";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [BookID, setBookID] = useState("");
  const [books, setBooks] = useState([]);
  const [ChapterID, setChapterID] = useState("");
  const [chapters, setchapters] = useState([]);

  // async function fetchBooks() {
  //   const res = await axios.get(`/api/get-all-main-book`);
  //   if (res.data.status === 200) {
  //     setAllBooks(res.data.data);
  //     setBooks(res.data.data);
  //     setchapters(res.data.data);
  //     console.log("all books", res.data.data);
  //   } else {
  //     console.log("error");
  //   }
  // }

  async function fetchBookDetails() {
    const res = await axios.get(`/api/get-main-book-by-count`);
    if (res.data.status === 200) {
      console.log("all books1", res.data.data);
      setAllBooks(res.data.data);
      // setBooks(res.data.data);
      // setchapters(res.data.data);
    } else {
      console.log("error");
    }
  }

  // async function fetchChapters() {
  //   await axios.get(`/api/get-dependent-chapter-by-main-book-id/${BookID}`).then((res) => {
  //     if (res.data.status === 200) {
  //       setchapters(res.data.data);
  //       console.log("all chapters", res.data.data);
  //     } else {
  //       console.log("error");
  //     }
  //   });
  // }

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const handleBookChange = (e) => {
    // console.log(e.target.value);
    if (e.target.value !== "") {
      setchapters([]);
      setBookID(e.target.value);
      axios
        .get(`/api/get-dependent-chapter-by-main-book-id/${e.target.value}`)
        .then((res) => {
          if (res.data.status === 200) {
            setchapters(res.data.data);
            // console.log("all chapters", res.data.data);
          } else {
            console.log("error");
          }
        });
    }

    if (e.target.value === "") {
      setchapters([]);
      setBookID("");
    }
  };

  const searchBook = (e) => {
    // console.log(BookID, ChapterID);
    if (BookID !== "" && ChapterID !== "") {
    }
  };

  const columns = [
    { field: "book_name", headerName: "বইয়ের নাম ", width: 250 },
    { field: "chapter_count", headerName: "অধ্যায়ের সংখ্যা", width: 190 },
    { field: "paragraph_count", headerName: "অনুচ্ছেদের সংখ্যা", width: 190 },
    {
      field: "edit",
      headerName: "সম্পাদনা করুন ",
      width: 190,
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          <Link to={`/edit-master-book/${params.row.book_id}`}>
            <CreateOutlinedIcon className="text-warning" />
          </Link>
        </div>
      ),
    },
    {
      field: "delete",
      headerName: "ডিলিট করুন ",
      width: 190,
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          {/* sweet alert for confirm delete */}
          <DeleteOutlineOutlinedIcon
            className="text-danger"
            onClick={() => {
              swal({
                title: "নিশ্চিত করুন",
                text: "বইটি ডিলিট করার ফলে সংযোজিত সকল অধ্যায় এবং অনুচ্ছেদ মুছে  যাবে। ডিলিট করতে চান? ",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  axios.delete(`/api/delete-book-master-with-main-book/${params.row.book_id}`).then((res) => {
                    if (res.data.status === 200) {
                      swal("বইটি সফলভাবে ডিলিট করা হয়েছে", {
                        icon: "success",
                      });
                      // axios.get(`/api/get-all-main-book`).then((res) => {
                      //   if (res.data.status === 200) {
                      //     setAllBooks(res.data.data);
                      //   } else {
                      //     console.log("error");
                      //   }
                      // });
                      // fetchBooks();
                      fetchBookDetails();
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
      field: "view",
      headerName: "দেখুন",
      width: 120,
      renderCell: (params) => (
        <div className="d-flex justify-content-around align-items-center">
          <Link to={`/view-book-master/${params.row.book_id}`} target="_blank">
            <RemoveRedEyeIcon className="text-success" />
          </Link>
        </div>
      ),
    },
  ];

  const rows = [
    ...allBooks.map((book) => ({
      id: book.id,
      book_id: book.book_id,
      book_name: book.book_title,
      chapter_count: book.chapter_count,
      paragraph_count: book.paragraph_count,
    })),
  ];

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
                সকল বই
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
                  <Link to="/home">
                    <h6 className="btn-add-book">বই যোগ করুন</h6>
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
              <p>আমার ফাইল</p>
              <div className="books-serchInput-icon-div col-6">
                {/* <div className="select-category-div col-6">
                <lebel >বই নির্নয় করুন * </lebel> <br />
                <select
                  style={{ border: '1px solid #000', padding: '5px' }}
                  required
                  class="form-select select-category allField"
                  aria-label="Default select example"
                  value={BookID}
                  onChange={(e) => handleBookChange(e)}
                  name="BookID"
                  id="add-page-book-selection"
                >
                  <option selected value="">
                    বই নির্বাচন করুন
                  </option>
                  {books.map((item) => {
                    return (
                      <>
                        <option value={item.book_master.id}>
                          {item.book_master.Title}{" "}
                        </option>
                      </>
                    );
                  })}
                </select>
                <div>
                  <Link to="">
                    {" "}
                  </Link>
                </div>
                <lebel> অধ্যায় নির্নয় করুন * </lebel> <br />

                  <select
                    style={{ border: '1px solid #000', padding: '5px' }}
                    required
                    class="form-select select-category allField"
                    aria-label="Default select example"
                    value={ChapterID}
                    onChange={(e) => setChapterID(e.target.value)}
                    name="ChapterID"
                    id="add-page-chapter-selection"
                  >
                    <option selected value="">
                      অধ্যায় নির্বাচন করুন
                    </option>
                    {chapters.map((item, i) => {
                      return (
                        <>
                          <option value={item.id}>
                            {item.book_chapter.ChapterName}{" "}
                          </option>
                        </>
                      );
                    })}
                  </select>
                  <div>
                    <Link to="">
                      {" "}
                    </Link>
                  </div>

                  <button className="search-btn btn btn-primary btn-sm" onClick={searchBook}>
                    <SearchIcon style={{ color: "#777777" }} onClick={fetchBookDetails} />
                  </button>
                </div> */}
              </div>
              <hr />
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

export default AllBooks;
