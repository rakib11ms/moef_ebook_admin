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
const NavigationBa = () => {
  // Sub menu
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showSubmenu1, setShowSubmenu1] = useState(true);
  const [showSubmenu2, setShowSubmenu2] = useState(true);
  const [showSubmenu3, setShowSubmenu3] = useState(true);
  const [showSubmenu4, setShowSubmenu4] = useState(false);

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
                  <li className=" side-li-link">
                    <Link to="/all-users">সকল ব্যবহারকারী</Link>
                  </li>
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
          <div className="sidebar-lower">
            <ul className="sidebar-lower-ul" onClick={handleArrowClick2}>
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
                  <li className="side-li-link">
                    <Link to="/all-books">সকল বই</Link>
                  </li>
                  <li className="side-li-link">
                    <Link to="/book-categories">বইয়ের ক্যটালগ</Link>
                  </li>
                  <li className="side-li-link">
                    <Link to="/all-documents">সকল ডকুমেন্টস</Link>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </div>
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
                  <li className="side-li-link">
                    <Link to="/all-news-notice">সকল বিজ্ঞপ্তি </Link>
                  </li>
                  {/* <li className="side-li-link">
                    <Link to="/categories-news">ক্যটেগরি</Link>
                  </li> */}
                  <li className="side-li-link">
                    <Link to="/create-news-notice">বিজ্ঞপ্তি গঠন করুন</Link>
                  </li>
                </ul>
              )}
            </ul>
          </div>
        </div>

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
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };





  const [input, setInput] = useState('');


  const [searchArray, setSearchArray] = useState([]);
  const[documentOrBookCount,setDocumentOrBookCount]=useState({
    book_count:0,
    document_count:0
  })


  console.log("documentOrBookCount", documentOrBookCount);

  const mappedData = searchArray.map(obj => {
    if (obj.type === "main_book") {
      return {
        id: obj.id,
        label: obj.book_master.Title,
        link: `/edit-books/${obj.id}`
      };
    } else if (obj.type === "single_document") {
      return {
        id: obj.id,
        label: obj.document_title,
        link: `/edit-document/${obj.id}`
      };
    }
  });
  

  console.log('new array', mappedData)


  // const top100Films = [
  //   // { label: 'Check', link: '/check' },
  //   mappedData

  // ];
  const top100Films = mappedData


  useEffect(() => {
    if(input){
         axios.get("api/global-search-by-book-or-documents/" +input).then((res) => {
          setSearchArray(res.data.data);
          setDocumentOrBookCount({
            book_count:res.data.main_book_count,
            document_count:res.data.single_document_count
          })       
        });

        // setTimeout(function() {
        //   Swal.fire({
        //     // icon: 'success',
        //     html: `${documentOrBookCount.book_count}<br>${documentOrBookCount.document_count}`
        //   });
        // }, 4000);
 
      }
    
  
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
                  // window.location.href = option.link;

                  // history.push(redirect);
                  navigate(option.link);
                }}
                onInputChange={async (event, value) => {
                  console.log("onInputChange",value);
                  setInput(value)
                }}
                sx={{
                  width: 300,
                }}
                renderInput={(params) => <TextField {...params} size="small" placeholder="" />}

              />
            </div>

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
