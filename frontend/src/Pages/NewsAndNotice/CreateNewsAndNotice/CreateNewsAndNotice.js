import React, { useState, useEffect } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import bookLogoImg from "../../../images/book.png";
import "./CreateNewsAndNotice.css";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ReactDatePicker from "react-datepicker";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { Box, ThemeProvider, createTheme } from '@mui/system';
import { styled } from '@mui/system';
import {
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
  Stack,
  Select,
  Chip,
  MenuItem,
  makeStyles,
} from '@mui/material';

const CreateNewsAndNotice = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [content, setContent] = useState("");

  const $user = JSON.parse(localStorage.getItem("user"));
  const [allUsers, setAllUsers] = useState([]);

  const [targetUser, setTargetUser] = useState('সকল')
  const [contactPerson, setcontactPerson] = React.useState('');

  function handlePersonChange(event, values) {
    let result = values.map(a => a.id);
    let arrString = result.join(',');
    setcontactPerson(arrString)

  }
  const [fileUploadCheckBox, setFileUploadCheckBox] = useState(false)




  useEffect(() => {
    axios.get(`/api/get-all-user-info`).then(res => {
      if (res.data.status == 200) {
        setAllUsers(res.data.users);

      }
    })
  }, [])

  const [selectedFile, setSelectedFile] = useState('');
  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };




  const [title, settitle] = useState("");

  const ontitleChange = (e) => {
    settitle(e.target.value);
  };

  // const [isPublished, setisPublished] = useState(false);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || content === "<p><br></p>" || content === "") {
      Swal.fire("সব তথ্য পূরণ করুন", "", "warning");
      return;
    }

    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("contents", content);
    // formData.append("updated_by", "");
    formData.append("isPublished", 1);
    formData.append("created_by", $user.id);
    formData.append('file', selectedFile)
    formData.append('type','news_notice')

    formData.append('target_users', targetUser == 'অন্যান্য' ? contactPerson : targetUser
    )

    axios.post(`/api/save-single-document`, formData,config).then((res) => {
      if (res.data.status === 200) {
        Swal.fire("সফলভাবে সম্পন্ন হয়েছে", "", "success");
        navigate("/all-news-notice");
      } else if (res.data.status === 400) {
        Swal.fire(res.data.message, "", "warning");
      }
    });
  };

  const handleDraftSubmit = (e) => {
    e.preventDefault();


    if (title === "" || content === "<p><br></p>" || content === "") {
      Swal.fire("সব তথ্য পূরণ করুন", "", "warning");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("contents", content);
    formData.append("isPublished", 0);
    formData.append('type','news_notice')
    formData.append('file', selectedFile)

    formData.append("created_by", $user.id);
    formData.append('target_users', targetUser == 'অন্যান্য' ? contactPerson : targetUser
    )

    axios.post(`/api/save-single-document`, formData).then((res) => {
      if (res.data.status === 200) {
        Swal.fire("সফলভাবে সম্পন্ন হয়েছে", "", "success");
        navigate("/all-news-notice");
      } else if (res.data.status === 400) {
        Swal.fire(res.data.message, "", "warning");
      }
    });
  };

  return (
    <div>
      <div>
        <section>
          <NavigationBa />
        </section>
        <section className="container-fluid">
          <div className="row">
            <div className="col-xl-9 col-lg-8 cpl-md-7 col-sm-12 col-12">
              <div className="all-news-notice-tags-input">
                <h5>বিজ্ঞপ্তি তৈরি করুন </h5>
                <div className="draft-prokas-buttons-div">
                  <Link>
                    <button
                      className="draft-button"
                      onClick={handleDraftSubmit}
                    >
                      খসড়া করুন
                    </button>
                  </Link>
                  <button className="prokas-button mx-2" onClick={handleSubmit}>
                    প্রকাশ করুন
                  </button>
                </div>
                {/* <div className="news-notice-search-input-div ">
                  <div className="news-notice-serchInput-icon-div">
                    <SearchIcon />
                    <input type="search" className="gsearch" />
                  </div>
                  <div className="jog-korun-button-div">
                    <button className="jog-korun-button">যোগ করুন</button>
                    <AddIcon className="jog-korun-button-icon" />
                  </div>
                </div> */}
              </div>
              <hr />
              <div>
                <div class="mb-3">
                  <div className="my-3">
                    <input
                      required
                      type="text"
                      id="biggopti-title-input"
                      name="title"
                      className="form-control-lg col-12 border-1 border-dark outline-0 ms-2 me-2 "
                      placeholder="টাইটেল যোগ করুন "
                      value={title}
                      onChange={ontitleChange}
                    />
                  </div>
                  <div class="form-check my-4">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
          checked={fileUploadCheckBox} onChange={() => setFileUploadCheckBox(!fileUploadCheckBox)}
        />
        <label class="form-check-label" for="flexCheckDefault">
          আপনি কি ফাইল আপলোড দিতে চাচ্ছেন?
        </label>
      </div>
      {
        fileUploadCheckBox ?
          <div className="mt-3">
            <div className="my-2  mx-3">
              <label htmlFor="fileInput" className="btn btn-warning">
                <strong>ফাইল (ডকুমেন্ট) আপলোড করুন </strong>
              </label>
              <input
                type="file"
                className="ms-3"
                id="fileInput"
                name="file"
                hidden
                accept=".doc,.docx,.pdf"
                onChange={handleFileInputChange}

              // style={{ display: "none" }}
              />
            </div>
        
          </div>
          :
                    <>
                  <label for="exampleFormControlTextarea1" class="form-label">
                    <h5>এডিটর</h5>
                  </label>
                  <JoditEditor
                    className="news-jodit-editor"
                    id="biggopti-editor-input"
                    spellcheck={false}
                    language="en"
                    toolbarAdaptive="false"
                    height="800"
                    autofocus="true"
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) => setContent(newContent)}
                  />
                  </>
}
                  {/* <button className="attached-button mt-3">
                    এটাচমেন্ট যোগ করুন
                  </button> */}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 cpl-md-5 col-sm-12 col-12">
              <div className="all-news-notice-card-div">
                <div>
                  <h6 className="all-create-news-side-tags">পাবলিকেশন তথ্য</h6>
                </div>
                <hr />

                <div className="suchi-div">


                  <div>
                    <label for="exampleFormControlInput1" class="form-label">
                      যারা দেখতে পারবেন
                    </label>
                    <br />
                    <select
                      className="form-select2 mb-4"
                      aria-label="Default select example"
                      id="user-selection"
                      onChange={(e) => setTargetUser(e.target.value)}

                    >
                      <option selected value="সকল">সকলের জন্য</option>
                      <option value="এডমিন">এডমিন</option>
                      <option value="মডারেটর">মডারেটর</option>
                      <option value="ইউজার">ইউজার</option>
                      <option value="অন্যান্য">অন্যান্য </option>
                    </select>
                  </div>
                  {
                    targetUser == 'অন্যান্য'
                    &&
                    <div class="">
                      <Stack spacing={5} sx={{ width: '100%', paddingTop: '7px' }}>
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={allUsers}
                          getOptionLabel={(option) => option.UserName}
                          // defaultValue={[allUsers[1]]}
                          onChange={handlePersonChange}
                          renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                              {
                                option.userImage === 'default.png' ?
                                  <img
                                    loading="lazy"
                                    width="25"
                                    src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
                                    alt=""
                                  />
                                  :
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={`https://test.austtaa.com/server/public/images/user/${option.userImage}`}
                                    alt=""
                                  />

                              }

                              {option.UserName}
                            </Box>
                          )}
                          getOptionSelected={(option, value) =>
                            option.id === value.id
                          }

                          renderInput={(params) => (

                            <TextField


                              {...params}
                              // variant="standard"
                              // label="Multiple values"
                              placeholder="Search..."
                            />
                          )}

                        />
                      </Stack>

                    </div>
                  }


                
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateNewsAndNotice;
