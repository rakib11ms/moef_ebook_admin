import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TranslateIcon from "@mui/icons-material/Translate";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "./NavigationBa.css";
import republicImg from "../../../images/Government of Bangladesh-logo.png";
// MUI Drawer
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const NavigationBa = () => {
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
        <div className="d-flex justify-content-between m-3">
          <div>
            <ul className="sidebar-upper-ul">
              আমার এরিয়া
              <li className="pt-2 pb-2">প্রোফাইল</li>
              <li className="pb-2">আমার বই</li>
              <li className="pb-2">বুকমার্কস</li>
              <li className="pb-2">ড্রাফট</li>
              <li className="pb-2">প্রকাশিত</li>
              <li className="pb-2">নোটিফিকেশন</li>
            </ul>
          </div>
          <RemoveIcon className="sidebar-icons-upper" />
        </div>
      </List>
      <List className="sidebar-lower-list">
        <div className="d-flex justify-content-between m-3">
          <div>
            <ul className="sidebar-lower-ul">
              ব্যবহারকারী ব্যবস্থাপনা
              <li className="pt-2 pb-2">নিবন্ধীত ব্যবহারকারী</li>
              <li className="pb-2">গেস্ট ব্যবহারকারী</li>
              <li className="pb-2">ভেরিফকেশনের জন্য আবেদন</li>
              <li className="pb-2">অনুমতি(পারমিশন) ব্যবস্থাপনা</li>
            </ul>
          </div>
          <RemoveIcon className="sidebar-icons" />
        </div>

        <div className="d-flex justify-content-between m-3">
          <div>
            <ul className="sidebar-lower-ul">
              লাইব্রেরি
              <li className="pb-2 pt-2">সকল বই</li>
              <li className="pb-2">বইয়ের ক্যটালগ</li>
            </ul>
          </div>
          <RemoveIcon className="sidebar-icons" />
        </div>
        <div className="d-flex justify-content-between m-3">
          <div>
            <ul className="sidebar-lower-ul">
              নিউজ ও নোটিশ
              <li className="pt-2 pb-2">সকল নিউজ ও নোটিশ</li>
              <li className="pb-2">নিউজ ও নোটিশ গঠন করুন</li>
            </ul>
          </div>
          <RemoveIcon className="sidebar-icons" />
        </div>
        <div className="d-flex justify-content-between m-3">
          <div>
            <ul className="sidebar-lower-ul">
              কনফারেন্স
              <li className="pt-2 pb-2">কনফারেন্স তৈরি করুন</li>
              <li className="pb-2">লগ দেখুন</li>
            </ul>
          </div>
          <RemoveIcon className="sidebar-icons" />
        </div>
      </List>
    </Box>
  );

  //   আমার এরিয়া                                            -
  // প্রোফাইল
  // আমার বই
  // বুকমার্কস
  // ড্রাফট
  // প্রকাশিত
  // নোটিফিকেশন

  // ব্যবহারকারী ব্যবস্থাপনা                              -
  // নিবন্ধীত ব্যবহারকারী
  // গেস্ট ব্যবহারকারী
  // ভেরিফকেশনের জন্য আবেদন
  // অনুমতি(পারমিশন) ব্যবস্থাপনা
  // লাইব্রেরি                                                    -
  // সকল বই
  // বইয়ের ক্যটালগ
  // নিউজ ও নোটিশ                                        -
  // সকল নিউজ ও নোটিশ
  // ক্যটেগরি
  // নিউজ ও নোটিশ গঠন করুন
  // কনফারেন্স
  // কনফারেন্স তৈরি করুন
  // লগ দেখুন

  // SideBar Navigation

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
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </div>
          <div className="d-flex align-items-center">
            <img className="nav-republic-img" src={republicImg} alt="" />
            <h6>পরিবেশ, বন ও জলবায়ু পরিবর্তন মন্ত্রণালয়</h6>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="nav-rightside-div">
            <div className="serchInput-icon-div">
              <SearchIcon />
              <input type="search" className="gsearch" />
            </div>

            <div className="icons-nav-div">
              <TranslateIcon className="icons-nav" />
            </div>
            <div className="icons-nav-div">
              <DarkModeIcon className="icons-nav" />
            </div>
            <div className="icons-nav-div">
              <MarkChatUnreadOutlinedIcon className="icons-nav" />
            </div>
            <div className="icons-nav-div">
              <PersonIcon className="icons-nav" />
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default NavigationBa;
