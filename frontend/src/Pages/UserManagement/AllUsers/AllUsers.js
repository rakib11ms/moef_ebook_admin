import React, { useEffect, useState } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./AllUsers.css";
// import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dpImg from "../../../images/dp.png";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import SearchIcon from "@mui/icons-material/Search";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ShortTextIcon from "@mui/icons-material/ShortText";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { DataGrid } from '@mui/x-data-grid';
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import swal from "sweetalert"
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


const AllUsers = () => {

  const [allUsers, setAllUsers] = useState([]);
  // console.log('all users',allUsers)
  const [allDeactiveUsers, setAllDeactiveUsers] = useState([]);
  // console.log('all deactive users',allDeactiveUsers)

  async function fetchUser() {
    await axios.get("/api/get-all-user-info").then((res) => {
      if (res.data.status === 200) {
        setAllUsers(res.data.users);

        setAllDeactiveUsers(res.data.deactive_users);
        // console.log('activeUsers', activeUsers);
      } else {
        console.log("error");
      }
    });
  }

  useEffect(() => {
    fetchUser();

  }, []);

  const columns = [
    {
      field: 'userPhoto', headerName: 'ছবি', width: 100, resizable: true,
      renderCell: (params) => (
        // <div className="d-flex justify-content-center align-items-center">
        //   {/* show default.png if userPhoto is null */}
        //   <img src={`${global.imageURL}/images/user/${params.row.userPhoto}`} alt="" className="img-fluid" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
        // </div>
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={`${global.imageURL}/images/user/${params.row.userPhoto}`}
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
    { field: 'userName', headerName: 'ব্যবহারকারীর নাম', width: 230, resizable: true, },
    { field: 'userEmail', headerName: 'ইমেইল', width: 250, resizable: true, },
    { field: 'userPhone', headerName: 'ফোন নম্বর', width: 170 },
    { field: 'userID', headerName: 'আইডি', width: 120 },
    { field: 'userType', headerName: 'ব্যবহারকারীর ধরণ', width: 150 },
    { field: 'officeID', headerName: 'অফিস আইডি', width: 150 },
    { field: 'officeInfo', headerName: 'অফিসের তথ্য', width: 150 },
    { field: 'creationTime', headerName: 'তৈরীর সময়', width: 180 },
    { field: 'lastUsageTime', headerName: 'সর্বশেষ ব্যবহারের সময়', width: 180 },
    {
      field: 'edit', headerName: 'সম্পাদনা', width: 120,
      renderCell: (params) => (
        <div className="d-flex justify-content-center align-items-center">
          <Link to={`/edit-user-role/${params.row.id}`} className="btn">
            <CreateOutlinedIcon className="text-warning" />
          </Link>
        </div>
      )
    },
    {
      field: 'delete', headerName: 'ব্যবহারকারী নিষ্ক্রিয় করুন', width: 180,
      renderCell: (params) => (
        <div className="d-flex justify-content-center align-items-center">
          <PersonRemoveIcon
            className="text-danger" 
            onClick={
              () => {
                swal({
                  title: "নিশ্চিত করুন",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    axios.put(`/api/delete-user/${params.row.id}`).then((res) => {
                      if (res.data.status === 200) {
                        swal("ব্যবহারকারী নিষ্ক্রিয় করা হয়েছে", {
                          icon: "success",
                        });
                        axios.get("/api/get-all-user-info").then((res) => {
                          if (res.data.status === 200) {
                            const activeUsers = res.data.users.filter((user) => user.activeStatus === 1);
                            const deactiveUsers = res.data.users.filter((user) => user.activeStatus === 0);
                            setAllUsers(activeUsers);
                            setAllDeactiveUsers(deactiveUsers);
                          } else {
                            console.log("error");
                          }
                        });
                      } else {
                        swal("ব্যবহারকারী নিষ্ক্রিয় করা যায়নি", {
                          icon: "error",
                        });
                      }
                    });
                  }
                })
              }
            }
          />
        </div>
      )
    },
  ];

  const rows = [
    ...allUsers.map((user) => (
      {
        id: user.id,
        userID: user.userID,
        userName: user.UserName,
        userEmail: user.userEmail,
        userPhone: user.userPhone,
        officeID: user.officeID ? user.officeID : "N/A",
        officeInfo: user.officeInfo ? user.officeInfo : "N/A",
        lastUsageTime: user.lastLogin ? user.lastLogin: "N/A",
        creationTime: new Date(user.created_at).toLocaleString(),
        userPhoto: user.userImage,
        userType: user.userRole ? user.userRole : "N/A", 
      }
    ))
  ];

  const deactiveUsersColums = [
    {
      field: 'userPhoto', headerName: 'ছবি', width: 100, resizable: true,
      renderCell: (params) => (
        // <div className="d-flex justify-content-center align-items-center">
        //   {/* show default.png if userPhoto is null */}
        //   <img src={`${global.imageURL}/images/user/${params.row.userPhoto}`} alt="" className="img-fluid" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
        // </div>
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={`${global.imageURL}/images/user/${params.row.userPhoto}` || `${global.imageURL}/images/user/default.png` }
            alt="pic"
            className="img-fluid"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        </div>
      )
    },
    {
      field: 'delete', headerName: 'ব্যবহারকারী সক্রিয় করুন', width: 180,
      renderCell: (params) => (
        <div className="d-flex justify-content-center align-items-center">
          <PersonAddAlt1Icon
            className="text-success"
            onClick={
              () => {
                swal({
                  title: "নিশ্চিত করুন",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willDelete) => {
                  if (willDelete) {
                    axios.put(`/api/active-User/${params.row.id}`).then((res) => {
                      if (res.data.status === 200) {
                        swal("ব্যবহারকারী সক্রিয় করা হয়েছে", {
                          icon: "success",
                        });
                        axios.get("/api/get-all-user-info").then((res) => {
                          if (res.data.status === 200) {
                            const deacticeUsers = res.data.users.filter((user) => user.activeStatus === 0);
                            const activeUsers = res.data.users.filter((user) => user.activeStatus === 1);
                            setAllDeactiveUsers(deacticeUsers);
                            setAllUsers(activeUsers);
                            setAllUsers(res.data.users);
                          } else {
                            console.log("error");
                          }
                        });
                      } else {
                        swal("ব্যবহারকারী সক্রিয় করা যায়নি", {
                          icon: "error",
                        });
                      }
                    });
                  }
                })
              }
            }
          />
        </div>
      )
    },
    { field: 'userName', headerName: 'ব্যবহারকারীর নাম', width: 230, resizable: true, },
    { field: 'userEmail', headerName: 'ইমেইল', width: 250, resizable: true, },
    { field: 'userPhone', headerName: 'ফোন নম্বর', width: 170 },
    { field: 'userID', headerName: 'আইডি', width: 120 },
    { field: 'userType', headerName: 'ব্যবহারকারীর ধরণ', width: 150 },
    { field: 'officeID', headerName: 'অফিস আইডি', width: 150 },
    { field: 'officeInfo', headerName: 'অফিসের তথ্য', width: 150 },
    { field: 'creationTime', headerName: 'তৈরীর সময়', width: 180 },
    { field: 'lastUsageTime', headerName: 'সর্বশেষ ব্যবহারের সময়', width: 180 },
    // {
    //   field: 'edit', headerName: 'সম্পাদনা', width: 120,
    //   renderCell: (params) => (
    //     <div className="d-flex justify-content-center align-items-center">
    //       <CreateOutlinedIcon className="text-warning" />
    //     </div>
    //   )
    // },
  ];
  
  const deactiveUsersRows = [
    ...allDeactiveUsers.map((user) => (
      {
        id: user.id,
        userID: user.userID,
        userName: user.UserName,
        userEmail: user.userEmail,
        userPhone: user.userPhone,
        officeID: user.officeID ? user.officeID : "N/A",
        officeInfo: user.officeInfo ? user.officeInfo : "N/A",
        lastUsageTime: user.lastLogin ? user.lastLogin: "N/A",
        creationTime: new Date(user.created_at).toLocaleString(),
        userPhoto: user.userImage,
        userType: user.userRole ? user.userRole : "N/A",
      }
    ))
  ];

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <div className="container-fluid">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "#DBD7D8 " }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="নিবন্ধিত ব্যবহারকারী" {...a11yProps(0)} />
              <Tab label="ইনএকটিভ ইউজার" {...a11yProps(2)} />
              {/* <Tab label="ভেরিফিকেশনের জন্য আবেদনকৃত" {...a11yProps(2)} /> */}
            </Tabs>
            <div className="tab-search-input-div">
              <div className="tab-serchInput-icon-div">
                <SearchIcon />
                <input type="search" className="gsearch-tab" />
              </div>
            </div>
          </Box>

          <TabPanel value={value} index={0}>
            <div className="varify-top-div">
              <ShortTextIcon />
            </div>
            <section className="m-0 border-0 table-responsive-md table-responsive-sm">
              {/* Table */}
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 15 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
              />

            </section>
  
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="varify-top-div">
              <ShortTextIcon />
            </div>
            <section className="m-0 border-0 table-responsive-md table-responsive-sm">
              {/* Table */}
              <DataGrid
                rows={deactiveUsersRows}
                columns={deactiveUsersColums}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={false}
              />

            </section>
          </TabPanel>
          {/* <TabPanel value={value} index={2}>
            <div className="varify-top-div">
              <div className="dropdown me-1">
                <button type="button" className="varify-button1 ">
                  Verify now
                </button>
              </div>
              <DeleteIcon className="varify-icon" />
              <ShortTextIcon />
            </div>
            <section className="m-0 border-0 table-responsive-md table-responsive-sm bd-example varification-div">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">ছবি</th>
                    <th scope="col">ব্যক্তিগত তথ্য</th>
                    <th scope="col">ইমেইল</th>
                    <th scope="col">নিবন্ধনের সময়</th>
                    <th scope="col"> অফিসের তথ্য</th>
                    <th scope="col"> সর্বশেষ ব্যবহার</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  <tr>
                    <th scope="row">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                    </th>
                    <img className="dp-img" src={dpImg} alt="" />
                    <td>
                      <div className="personal-information">
                        <p>
                          Md Fazla Arafat{" "}
                          <span>
                            <CancelOutlinedIcon className="varified-cancel" />
                          </span>{" "}
                        </p>
                        <p>++01717998754</p>
                        <p>ID 3322113</p>
                      </div>
                      <div className="dropdown me-1">
                        <button type="button" className="varify-button2 ">
                          Verify now
                        </button>
                      </div>
                    </td>
                    <td>arafat@moef.gov.bd </td>
                    <td>10 Feb 2023 </td>
                    <td>
                      <p>Not verified </p>
                    </td>
                    <td>8 Mar 2023| 11:30</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                    </th>
                    <img className="dp-img" src={dpImg} alt="" />
                    <td>
                      <div className="personal-information">
                        <p>
                          Md Fazla Arafat
                          <span>
                            <CancelOutlinedIcon className="varified-cancel" />
                          </span>{" "}
                        </p>

                        <p>++01717998754</p>
                        <p>ID 3322113</p>
                      </div>
                      <div className="dropdown me-1">
                        <button type="button" className="varify-button2 ">
                          Verify now
                        </button>
                      </div>
                    </td>
                    <td>arafat@moef.gov.bd </td>
                    <td>10 Feb 2023 </td>
                    <td>
                      <p>Not verified </p>
                    </td>
                    <td>8 Mar 2023| 11:30</td>
                  </tr>
                </tbody>
              </table>
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
          {/* </TabPanel> */} 
        </Box>
      </div>
    </div>
  );
};

export default AllUsers;
