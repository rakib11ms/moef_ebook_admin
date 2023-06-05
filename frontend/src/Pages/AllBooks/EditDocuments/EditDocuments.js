import React, { useState, useEffect,useRef } from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./EditDocuments.css";
import JoditEditor from "jodit-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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

import { Box, ThemeProvider, createTheme } from '@mui/system';
const EditDocuments = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const prevPage = searchParams.get('page');
  const params = useParams();
  const id = params.id;
  const editor = useRef(null);

  const [allUsers, setAllUsers] = useState([]);

  const [targetUser, setTargetUser] = useState('');

  // console.log('check',targetUser)

  const [contactPerson, setcontactPerson] = React.useState('');

  function handlePersonChange(event, values) {
    let result = values.map(a => a.id);
    let arrString = result.join(',');
    setcontactPerson(arrString)

  }


  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const [noticeNewsCheckBoxStatus, setNoticeNewsCheckBoxStatus] = useState(false)

  const navigate = useNavigate();
  const [content, setContent] = useState();


  const [Title, setTitle] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const [editData, setEditData] = useState('');
  // console.log('edit data', editData)
  useEffect(() => {
    axios.get(`/api/get-single-document/${id}`).then(res => {
      if (res.data.status === 200) {
        // console.log(res.data.single_document);
        setTitle(res.data.single_document.title);
        setContent(res.data.single_document.contents);
        setEditData(res.data.single_document)
        setTargetUser(res.data.single_document.target_users)
        if(res.data.single_document.type=='both'){
          setNoticeNewsCheckBoxStatus(true)
          if(Array.isArray(res.data.single_document.target_users)){
            setTargetUser('অন্যান্য')
          }
        }
        else{
          setNoticeNewsCheckBoxStatus(false)

        }

      }
    })
    axios.get(`/api/get-all-user-info`).then(res => {
      if (res.data.status == 200) {
        setAllUsers(res.data.users);

      }
    })
  }, [id])



  async function handlePublish(e) {
    handleSubmit(e);
    await axios.post(`/api/publish-Single-Document/` + id).then(res => {
      if (res.data.status === 200) {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'সফলভাবে প্রকাশিত হয়েছে',
          showConfirmButton: false,
          timer: 1500
        })
        if (prevPage === '/my-area') {
          navigate('/my-area');
        } else {
          navigate('/all-documents');
        }
      }
    }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    const currentPage = searchParams.get('page');
    // console.log(currentPage);



    const formData = new FormData();
    formData.append('title', Title);
    formData.append('contents', content);
    formData.append('file', selectedFile)
    formData.append('created_by', editData.created_by)
    formData.append('category', editData.category)
    formData.append('type', noticeNewsCheckBoxStatus ? 'both' : 'single_document')
    formData.append('target_users', targetUser == 'অন্যান্য' ? contactPerson : targetUser
    )

    axios.post(`/api/update-single-document/${id}`, formData, config).then(res => {
      if (res.data.status === 200) {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'সফলভাবে সংশোধন করা হয়েছে',
          showConfirmButton: false,
          timer: 1500
        })
        if (currentPage === '/my-area') {
          navigate('/my-area');
        } else {
          navigate('/all-documents');
        }
      }
    })
  }


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
              <li class="breadcrumb-item"><a href="/all-documents">সকল ডকুমেন্টস</a></li>
              <li class="breadcrumb-item active" aria-current="page">ডকুমেন্ট সম্পাদনা</li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-xl-12 col-lg-8 cpl-md-7 col-sm-12 col-12">
              <div className="all-news-notice-tags-input">
                <h5>ডকুমেন্ট সম্পাদনা</h5>
                <div className="draft-prokas-buttons-div" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="draft-prokas-button mx-2" onClick={handleSubmit}>আপডেট করুন </button>
                  {
                    prevPage === '/my-area' ?
                      (
                        <button className="draft-prokas-button mx-2" onClick={handlePublish}>প্রকাশ করুন</button>
                      ) : null
                  }
                </div>
              </div>
              <hr />
              <div>
                <div class="mb-3">
                  <div className="my-3">
                    <input
                      type="text"
                      name="Title"
                      className="form-control-lg col-12 border-1 border-dark outline-0 ms-2 me-2 "
                      placeholder="ডকুমেন্ট সম্পাদনা করুন "
                      id="editInp"
                      value={Title}
                      onChange={onTitleChange}
                    />
                  </div>

                  {
                    editData.contents !== null ?
                      <>
                        <label for="exampleFormControlTextarea1" class="form-label">
                          <h5>এডিটর</h5>
                        </label>
                        <JoditEditor
                      className="jodit-editor"
                      ref={editor}
                      value={content}
                      // config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setContent(newContent)} 
                      
                      id="add-doc-jodit-editor"
                    />

                        <div class="form-check mx-3 my-4">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                            checked={noticeNewsCheckBoxStatus} onChange={() => setNoticeNewsCheckBoxStatus(!noticeNewsCheckBoxStatus)}
                          />
                          <label class="form-check-label text-muted" for="flexCheckDefault">
                            এই ডকুমেন্ট প্রজ্ঞপন/ অফিস আদেশ/ নোটিশ আকারে প্রকাশিত হবে?
                          </label>

                          {noticeNewsCheckBoxStatus && (
                            <div>
                              <div className="doc-suchi-div col-3">


                                <div>
                                  <label
                                    for="exampleFormControlInput1"
                                    class="form-label"
                                  >
                                    যারা দেখতে পারবেন
                                  </label>
                                  <select
                                    className="form-select mb-4"
                                    aria-label="Default select example"
                                    id="add-docu-show"
                                    value={targetUser}

                                    onChange={(e) => setTargetUser(e.target.value)}                            >
                                    <option value="সকল">সকলের জন্য</option>
                                    <option value="সুপার এডমিন">সুপার এডমিন</option>
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
                                        defaultValue={Array.isArray(editData.target_users) ? editData.target_users : []}
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
                          )}
                        </div>
                      </>
                      :
                      <div className="my-4 mx-1">
                        <label htmlFor="fileInput" className=" d-block">
                          <h5 className="">ফাইল (ডকুমেন্ট) </h5>
                        </label>
                        <label htmlFor="fileInput" className="btn btn-warning">
                          <strong>ফাইল (ডকুমেন্ট) আপলোড করুন </strong>
                        </label>
                        <input
                          type="file"
                          className="ms-3"
                          id="fileInput"
                          name="file"
                          hidden
                          onChange={handleFileInputChange}

                        // style={{ display: "none" }}
                        />

                        <div class="form-check my-4">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                            checked={noticeNewsCheckBoxStatus} onChange={() => setNoticeNewsCheckBoxStatus(!noticeNewsCheckBoxStatus)}
                          />
                          <label class="form-check-label text-muted" for="flexCheckDefault">
                            এই ডকুমেন্ট প্রজ্ঞপন/ অফিস আদেশ/ নোটিশ আকারে প্রকাশিত হবে?
                          </label>

                          {noticeNewsCheckBoxStatus && (
                            <div>
                              <div className="doc-suchi-div col-3">


                                <div>
                                  <label
                                    for="exampleFormControlInput1"
                                    class="form-label"
                                  >
                                    যারা দেখতে পারবেন
                                  </label>
                                  <select
                                    className="form-select mb-4"
                                    aria-label="Default select example"
                                    id="add-docu-show"
                                    value={targetUser}
                                    onChange={(e) => setTargetUser(e.target.value)}                            >
                                    <option value="সকল">সকলের জন্য</option>
                                    <option value="সুপার এডমিন">সুপার এডমিন</option>
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
                          )}
                        </div>
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

export default EditDocuments; 