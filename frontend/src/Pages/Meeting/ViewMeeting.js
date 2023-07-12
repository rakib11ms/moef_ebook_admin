import React, { useEffect, useState } from "react";
import NavigationBa from "../Shared/NavigationBa/NavigationBa";
// import "./AllMeetings.css";
// import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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


const ViewMeeting = () => {
  const [loading, setLoading] = useState(true);


  const [allMeetings, setAllMeetings] = useState([]);
  const [allOldMeetings, setAllOldMeetings] = useState([]);


  console.log('all old meetings', allOldMeetings)


  async function fetchUser() {
    await axios.get("/api/upcoming-meetings").then((res) => {
      if (res.data.status === 200) {
        setAllMeetings(res.data.upcoming_meetings);
        setLoading(false);


      } else {
        console.log("error");
      }
    });
  }

  useEffect(() => {
    fetchUser();

  }, []);


  async function allOldMeetingsFunc() {
    await axios.get("/api/all-old-meetings").then((res) => {
      if (res.data.status === 200) {
        setAllOldMeetings(res.data.data);
        setLoading(false);


      } else {
        console.log("error");
      }
    });
  }
  useEffect(() => {
    allOldMeetingsFunc();
  },[])

  const columns = [

    { field: 'meeting_title', headerName: 'মিটিং টাইটেল', width: 230, resizable: true, },
    { field: 'meeting_date', headerName: 'তারিখ', width: 250, resizable: true, },
    { field: 'meeting_time', headerName: 'সময়', width: 170 },
    {
      field: 'meeting_link', headerName: 'মিটিং লিংক', width: 250,
      renderCell: (params) => {
        <div className="bg-danger">
          <a href={params.row.meeting_link} target="_blank" rel="noopener noreferrer">
            {params.row.meeting_link}
          </a>

        </div>
      }
    },
    {
      field: 'edit', headerName: 'সম্পাদনা', width: 100,
      renderCell: (params) => (
        <div className="d-flex justify-content-center align-items-center">
          <Link to={``} className="btn">
            <CreateOutlinedIcon className="text-warning" />
          </Link>
        </div>
      )
    },
    {
      field: 'delete', headerName: 'মিটিং ডিলিট করুন', width: -1,
      renderCell: (params) => (
        <div className="d-flex justify-content-center align-items-center">
          <DeleteIcon
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
                    axios.delete(`/api/delete-meeting/${params.row.id}`).then((res) => {
                      if (res.data.status === 200) {
                        window.location.reload();
                        swal(res.data.message, {
                          icon: "success",
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
    ...allMeetings.map((item) => (
      {
        id: item.id,
        meeting_link: item.meeting_link,
        meeting_title: item.meeting_title,
        meeting_date: item.meeting_date,
        meeting_time: item.meeting_time,

        // userType: user.userRole ? user.userRole : "N/A", 
      }
    ))
  ];

  const rows2 = [
    ...allOldMeetings.map((item) => (
      {
        id: item.id,
        meeting_link: item.meeting_link,
        meeting_title: item.meeting_title,
        meeting_date: item.meeting_date,
        meeting_time: item.meeting_time,

        // userType: user.userRole ? user.userRole : "N/A", 
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

        <div className="d-flex justify-content-end">
          <button className="songrokkhon-button ">
            <Link to="/create-meeting" className="text-white">
              মিটিং তৈরি করুন

            </Link>
          </button>
        </div>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "#DBD7D8 " }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="আসন্ন মিটিং গুলো" {...a11yProps(0)} />
              <Tab label="পূর্ববর্তী মিটিংগুলো" {...a11yProps(1)} />
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
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  >
                    <span className=""></span>
                  </div>
                </div> // Render a loading message or spinner
              ) : (
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
              )}

            </section>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <section className="m-0 border-0 table-responsive-md table-responsive-sm">
              {/* Table */}
              <DataGrid
                rows={rows2}
                columns={allOldMeetings}
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
        </Box>
      </div>
    </div>
  );

};

export default ViewMeeting;
