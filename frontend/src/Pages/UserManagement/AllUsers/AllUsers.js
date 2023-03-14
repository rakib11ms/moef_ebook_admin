import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./AllUsers.css";
import * as React from "react";
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
              <Tab label="গেস্ট ব্যবহারকারী" {...a11yProps(1)} />
              <Tab label="ভেরিফিকেশনের জন্য আবেদনকৃত" {...a11yProps(2)} />
            </Tabs>
            <div className="tab-search-input-div">
              <div className="tab-serchInput-icon-div">
                <SearchIcon />
                <input type="search" className="gsearch" />
              </div>
            </div>
          </Box>

          <TabPanel value={value} index={0}>
            <div className="varify-top-div">
              <ShortTextIcon />
            </div>
            <section className="m-0 border-0 bd-example">
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
                          Md Fazla Arafat
                          <CheckCircleOutlineRoundedIcon className="varified-tick" />{" "}
                        </p>
                        <p>++01717998754</p>
                        <p>ID 3322113</p>
                      </div>
                      <div className="dropdown me-1">
                        <button
                          type="button"
                          className="super-admin dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          data-bs-offset="10,20"
                        >
                          Super admin
                        </button>
                        <ul class="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              Admin
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              Modarator
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              User
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>arafat@moef.gov.bd </td>
                    <td>10 Feb 2023 </td>
                    <td>
                      <p>Ministry of Environment and forest</p>
                      <p>Peoples Republic of Bangladesh</p>
                    </td>
                    <td>8 Mar 2023| 11:30</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section>
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
            </section>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="varify-top-div">
              <ShortTextIcon />
            </div>
            <section className="m-0 border-0 bd-example">
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
                        <p>Md Fazla Arafat </p>
                      </div>
                    </td>
                    <td>arafat@moef.gov.bd </td>
                    <td>10 Feb 2023 </td>
                    <td>
                      <p>Not found</p>
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
                        <p>Md Fazla Arafat </p>
                      </div>
                    </td>
                    <td>arafat@moef.gov.bd </td>
                    <td>10 Feb 2023 </td>
                    <td>
                      <p>Not found</p>
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
                        <p>Md Fazla Arafat </p>
                      </div>
                    </td>
                    <td>arafat@moef.gov.bd </td>
                    <td>10 Feb 2023 </td>
                    <td>
                      <p>Not found</p>
                    </td>
                    <td>8 Mar 2023| 11:30</td>
                  </tr>
                </tbody>
              </table>
            </section>
            <section>
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
            </section>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="varify-top-div">
              <div className="dropdown me-1">
                <button type="button" className="varify-button ">
                  Verify now
                </button>
              </div>
              <DeleteIcon className="varify-icon" />
              <ShortTextIcon />
            </div>
            <section className="m-0 border-0 bd-example varification-div">
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
                        <button type="button" className="varify-button ">
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
                        <button type="button" className="varify-button ">
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
            <section>
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
            </section>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default AllUsers;
