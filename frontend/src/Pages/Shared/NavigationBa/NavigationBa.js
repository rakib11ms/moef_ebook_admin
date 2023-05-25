import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TranslateIcon from "@mui/icons-material/Translate";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "./NavigationBa.css";
import republicImg from "../../../images/Government of Bangladesh-logo.png";
// MUI Drawer
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

import ClearIcon from "@mui/icons-material/Clear";
import { Link, Navigate, useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from "sweetalert2";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const NavigationBa = () => {
  // Sub menu
  const [showSubmenu, setShowSubmenu] = useState(false);

  const [showSubmenu1, setShowSubmenu1] = useState(true);
  const [showSubmenu2, setShowSubmenu2] = useState(true);
  const [showSubmenu3, setShowSubmenu3] = useState(true);
  const [showSubmenu4, setShowSubmenu4] = useState(true);


  // console.log('submenu',showSubmenu1)


  var userData = JSON.parse(localStorage.getItem('user'));

  const [role_id, setRoleId] = useState('')
  // console.log('role id',role_id)

  const [permissionfromDatabase, setPermissionFromDatabase] = useState([]);
  console.log('check',permissionfromDatabase)

  useEffect(() => {
  
      axios.get(`api/get-all-permissions`).then((res) => {
        setPermissionFromDatabase(res.data.permissions)
      })
    

  }, [])


  let user_permissions = JSON.parse(localStorage.getItem('permissions'));

  // const hasPermission = permissionfromDatabase.some(permission => permission.includes(user_permissions));
  // const hasPermission = permissionfromDatabase.some(permission =>console.log('ww',permission));
  // const hasPermission = userPermissions.some(permission => permissions.includes(permission));


    const hasPermission = user_permissions.some(permission => permissionfromDatabase.includes(permission));


  console.log('a',hasPermission)


  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };
  const handleArrowClick = (e) => {
    e.stopPropagation();
    toggleSubmenu();
  };
  const toggleSubmenu1 = () => {
    setShowSubmenu1(!showSubmenu1);
  };
  const handleArrowClick1 = (e) => {
    e.stopPropagation();
    toggleSubmenu1();
  };
  const toggleSubmenu2 = () => {
    setShowSubmenu2(!showSubmenu2);
  };
  const handleArrowClick2 = (e) => {
    e.stopPropagation();
    toggleSubmenu2();
  };
  const toggleSubmenu3 = () => {
    setShowSubmenu3(!showSubmenu3);
  };
  const handleArrowClick3 = (e) => {
    e.stopPropagation();
    toggleSubmenu3();
  };
  const toggleSubmenu4 = () => {
    setShowSubmenu4(!showSubmenu4);
  };
  const handleArrowClick4 = (e) => {
    e.stopPropagation();
    toggleSubmenu4();
  };

  // MUI Drawer
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 320 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="sidebar-upper-list">
        <div className="upper-arrow">
          <ClearIcon />
        </div>
        <div className="d-flex justify-content-between m-3">
          <div className="">
            <ul className="sidebar-upper-ul" onClick={handleArrowClick}>
              আমার এরিয়া
              {showSubmenu ? (
                <KeyboardArrowUpIcon onClick={handleArrowClick}>
                  &#8593;
                </KeyboardArrowUpIcon>
              ) : (
                <KeyboardArrowDownIcon
                  className="arrow-btn"
                  onClick={handleArrowClick}
                >
                  &#8595;
                </KeyboardArrowDownIcon>
              )}
              {showSubmenu && (
                <ul>
                  <li className=" side-li-link1">
                    <Link to="/my-area">আমরা তথ্য</Link>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </div>
      </List>
      <List className="sidebar-lower-list">
        <div className="d-flex justify-content-between  sidebar-lower-div">
          <div className="sidebar-lower">
            <ul className="sidebar-lower-ul" onClick={handleArrowClick1}>
              ব্যবহারকারী ব্যবস্থাপনা
              {showSubmenu1 ? (
                <KeyboardArrowUpIcon onClick={handleArrowClick1}>
                  &#8593;
                </KeyboardArrowUpIcon>
              ) : (
                <KeyboardArrowDownIcon
                  className="arrow-btn"
                  onClick={handleArrowClick1}
                >
                  &#8595;
                </KeyboardArrowDownIcon>
              )}
              {showSubmenu1 && (

                <ul>
                  {
                    user_permissions.includes('view_user') && <li className=" side-li-link">
                      <Link to="/all-users">সকল ব্যবহারকারী</Link>
                    </li>
                  }


                  <li className=" side-li-link">
                    <Link to="/permission-users">
                      অনুমতি(পারমিশন) ব্যবস্থাপনা
                    </Link>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </div>



        <div className="sidebar-lower-div">
          {
           hasPermission
            && 


            <div className="sidebar-lower">
              <ul className="sidebar-lower-ul" onClick={handleArrowClick2} id="nav-library">
                লাইব্রেরি
                {showSubmenu2 ? (
                  <KeyboardArrowUpIcon onClick={handleArrowClick2}>
                    &#8593;
                  </KeyboardArrowUpIcon>
                ) : (
                  <KeyboardArrowDownIcon
                    className="arrow-btn"
                    onClick={handleArrowClick2}
                  >
                    &#8595;
                  </KeyboardArrowDownIcon>
                )}
                {showSubmenu2 && (
                  <ul>
                    {
                      user_permissions.includes('view_book') && <li className="side-li-link" id="nav-all-books">
                        <Link to="/all-books">সকল বই</Link>
                      </li>
                    }
                    {
                      user_permissions.includes('create_book') && <li className="side-li-link" id="nav-book-categories">
                        <Link to="/book-categories">বইয়ের ক্যটালগ</Link>
                      </li>
                    }
                    {
                      user_permissions.includes('view_document') && <li className="side-li-link" id="nav-all-documents">
                        <Link to="/all-documents">সকল ডকুমেন্টস</Link>
                      </li>
                    }



                  </ul>
                )}
              </ul>
            </div>
          }


        </div>


        {

          user_permissions.includes('create_notice_news' || 'view_notice_news' || 'update_notice_news' || 'delete_notice_news') &&
          <div className="sidebar-lower-news-div">
            <div className="sidebar-lower">

              <ul className="sidebar-lower-ul" onClick={handleArrowClick3}>

                বিজ্ঞপ্তি
                {showSubmenu3 ? (
                  <KeyboardArrowUpIcon onClick={handleArrowClick3}>
                    &#8593;
                  </KeyboardArrowUpIcon>
                ) : (
                  <KeyboardArrowDownIcon
                    className="arrow-btn"
                    onClick={handleArrowClick3}
                  >
                    &#8595;
                  </KeyboardArrowDownIcon>
                )}

                {showSubmenu3 && (
                  <ul>
                    {
                      user_permissions.includes('view_notice_news') && <li className="side-li-link">
                        <Link to="/all-news-notice">সকল বিজ্ঞপ্তি </Link>
                      </li>
                    }
                    {
                      user_permissions.includes('view_notice_news') && <li className="side-li-link">
                        <Link to="/categories-news">ক্যটেগরি</Link>
                      </li>
                    }
                    {
                      user_permissions.includes('create_notice_news') &&
                      <li className="side-li-link">
                        <Link to="/create-news-notice">বিজ্ঞপ্তি গঠন করুন</Link>
                      </li>
                    }

                  </ul>
                )}
              </ul>

            </div>

          </div>

        }
        {
          user_permissions.includes('create_meeting' || 'view_meeting' || 'update_meeting' || 'delete_meeting') &&

          <div className="sidebar-lower-div-vertual">
            <div className="sidebar-lower-vertual">
              <ul className="sidebar-lower-ul" onClick={handleArrowClick4}>
                ভার্চুয়াল মিটিং
                {showSubmenu4 ? (
                  <KeyboardArrowUpIcon onClick={handleArrowClick4}>
                    &#8593;
                  </KeyboardArrowUpIcon>
                ) : (
                  <KeyboardArrowDownIcon
                    className="arrow-btn"
                    onClick={handleArrowClick4}
                  >
                    &#8595;
                  </KeyboardArrowDownIcon>
                )}
                {showSubmenu4 && (
                  <ul>
                    <li className="side-li-link">
                      <Link to="/all-news-notice">মিটিং তৈরি করুন</Link>
                    </li>
                    <li className="side-li-link">
                      <Link to="/">যোগদান করুন</Link>
                    </li>
                    <li className="side-li-link">
                      <Link to="/create-news-notice">লগ দেখুন</Link>
                    </li>
                  </ul>
                )}
              </ul>
            </div>
          </div>

        }

      </List>
    </Box>
  );



  const navigate = useNavigate();
  const handleLogOut = (e) => {
    e.preventDefault();
    axios
      .post("/api/logout")
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.removeItem("auth_token", res.data.token);
          localStorage.removeItem("user", JSON.stringify(res.data.user));
          localStorage.removeItem("permissions");
          navigate("/");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };





  const [input, setInput] = useState('');


  const [searchArray, setSearchArray] = useState([]);



  let mappedData = searchArray.map(obj => {
    if (obj.type === "main_book") {
      return {
        id: obj.id,
        label: obj.book_master.Title,
        link: `/all-books`,
        type: obj.type
      };
    } else if (obj.type === "single_document") {
      return {
        id: obj.id,
        label: obj.document_title,
        link: `/all-documents`,
        type: obj.type

      };
    }
  });

  const top100Films = mappedData
  // console.log('search data', searchArray);
  console.log('mpped data', top100Films);

  async function getGlobalSearch() {
    if (input) {
      await axios.get("api/global-search-by-book-or-documents/" + input).then((res) => {
        setSearchArray(res.data.data);
        toast(`${res.data.main_book_count}। ${res.data.single_document_count}`);

      });
      // toast(`${documentOrBookCount.book_count}। ${documentOrBookCount.document_count}`);
    }
    else if (input == '') {
      setSearchArray([]);
    }

  }

  useEffect(() => {
    getGlobalSearch();
  }, [input])








  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex">
          <div>
            {[""].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                  <MenuOpenIcon className="menu-button" />
                  {anchor}
                </Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>
          <div className="d-flex align-items-center">
            <Link to="/home">
              <img className="nav-republic-img" src={republicImg} alt="" />
            </Link>
            <h6 className="nav-tags">
              পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়
            </h6>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="nav-rightside-div ">
            <div className="serchInput-icon-div ">
              <SearchIcon style={{ color: "#777777" }} />
              {/* <input
                id="nav-inputfield"
                type="search"
                className="gsearch-nav"
              /> */}

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                inputValue={input}
                onChange={(event, option) => {
                  navigate(option.link);
                }}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {
                      option.type == "main_book" ?
                        <img
                          loading="lazy"
                          width="25"
                          src="https://www.shutterstock.com/image-vector/open-book-vector-clipart-silhouette-260nw-795305758.jpg"
                          alt=""
                        />
                        :
                        <img
                          loading="lazy"
                          width="20"
                          src="https://media.istockphoto.com/id/1209500169/vector/document-papers-line-icon-pages-vector-illustration-isolated-on-white-office-notes-outline.jpg?s=612x612&w=0&k=20&c=Dt2k6dEbHlogHilWPTkQXAUxAL9sKZnoO2e055ihMO0="
                          alt=""
                        />

                    }

                    {option.label}
                  </Box>
                )}
                onInputChange={async (event, value) => {
                  // console.log("onInputChange", value);
                  setInput(value)
                }}
                sx={{
                  width: 300,
                }}
                renderInput={(params) => <TextField {...params} size="small" placeholder="Search.." />}

              />
            </div>

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              type="success"
            />

            <div className="icons-nav-div">
              <Link to="/all-news-notice">
                {" "}
                <MarkChatUnreadOutlinedIcon className="icons-nav" />
              </Link>
            </div>
            <div className="icons-nav-div  ">
              <Link to="/my-area">
                <PersonIcon className="icons-nav" />
              </Link>
            </div>
            <div className="icons-nav-div  " onClick={handleLogOut}>
              <LogoutIcon className="icons-nav text-success fw-bold" />
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default NavigationBa;
