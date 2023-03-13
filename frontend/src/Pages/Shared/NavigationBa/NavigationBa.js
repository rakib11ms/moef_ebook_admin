import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TranslateIcon from "@mui/icons-material/Translate";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "./NavigationBa.css";

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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="bg-warning">
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List className="bg-warning">
        <h1>Hello</h1>
      </List>
      <List className="bg-warning">
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List className="bg-success">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <div onClick={() => toggleNavItem(index)}>
                {item.isExpanded ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <ChevronRightIcon />
                )}{" "}
                {item.label}
              </div>
              {item.isExpanded && (
                <ul>
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex}>{child.label}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </List>
    </Box>
  );

  // SideBar Navigation
  const [navItems, setNavItems] = useState([
    {
      label: "Item 1",
      children: [{ label: "Sub-item 1" }, { label: "Sub-item 2" }],
      isExpanded: true,
    },
    {
      label: "Item 2",
      children: [
        { label: "Sub-item 1" },
        { label: "Sub-item 2" },
        { label: "Sub-item 3" },
      ],
      isExpanded: false,
    },
  ]);

  const toggleNavItem = (index) => {
    setNavItems((prevState) =>
      prevState.map((item, i) => {
        if (i === index) {
          return { ...item, isExpanded: !item.isExpanded };
        }
        return item;
      })
    );
  };

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
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