import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import NavigationBa from "../Shared/NavigationBa/NavigationBa"
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
function CreateMeeting() {
const navigate=useNavigate();
    const [createMeetingInputState, setCreateMeetingInputState] = useState({
        meeting_title: '',
        meeting_link: '',
        meeting_date: '',
        meeting_time: ''

    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setCreateMeetingInputState({
            ...createMeetingInputState,
            [name]: value
        });
    }


    const [allUsers, setAllUsers] = useState([]);

    const [targetUser, setTargetUser] = useState('সকল')
    console.log('target user', targetUser)

    const [contactPerson, setcontactPerson] = React.useState('');

    function handlePersonChange(event, values) {
        let result = values.map(a => a.id);
        let arrString = result.join(',');
        setcontactPerson(arrString)

    }
    useEffect(() => {
        axios.get(`/api/get-all-user-info`).then(res => {
            if (res.data.status == 200) {
                setAllUsers(res.data.users);

            }
        })
    }, [])

    const $user = JSON.parse(localStorage.getItem("user"));

    const submitData = {
        meeting_title: createMeetingInputState.meeting_title,
        // meeting_link: 'https://meet.google.com/iym-rrxg-jfc',
        meeting_date: createMeetingInputState.meeting_date,
        meeting_time: createMeetingInputState.meeting_time,
        participant_users: targetUser == 'অন্যান্য' ? contactPerson : targetUser,
        created_by:$user.id
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/create-meeting`, submitData).then((res) => {
            if (res.data.status === 200) {
                Swal.fire("সফলভাবে সম্পন্ন হয়েছে", "", "success");
                  navigate("/view-meeting");

                setCreateMeetingInputState({
                    meeting_title: '',
                    meeting_link: '',
                    meeting_date: '',
                    meeting_time: ''
                })
            } else if (res.data.status === 400) {
                Swal.fire(res.data.message, "", "warning");
            }
        });

    }

    return (
        <>
            <section>
                <NavigationBa />
            </section>

            <div className="py-3 px-4">
                <h3>মিটিং তৈরি করুন </h3>

                <div class="mb-3 mt-3">
                    <label for="exampleFormControlInput1" class="form-label fs-6 fw-normal" >মিটিং টাইটেল </label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" required value={createMeetingInputState.meeting_title} name="meeting_title" onChange={handleInputChange} />
                </div>
                {/* <div class="mb-3 mt-3">
                    <label for="exampleFormControlInput1" class="form-label fs-6 fw-normal">মিটিং লিংক</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" required value={createMeetingInputState.meeting_link} name="meeting_link" onChange={handleInputChange} />
                </div> */}
                <div className="row d-flex">
                <div class="mb-3 col-md-6">
                    <label for="exampleFormControlTextarea1" class="form-label" >তারিখ </label>
                    <input type="date" className="form-control" value={createMeetingInputState.meeting_date} required name="meeting_date" onInput={handleInputChange}
                    />
                </div>
                <div class="mb-3 col-md-6">
                    <label for="exampleFormControlTextarea1" class="form-label">সময়  </label>
                    <input type="time" className="form-control" value={createMeetingInputState.meeting_time} name="meeting_time" onChange={handleInputChange} required />
                </div>
                </div>
          
                <div className=" ">


                    <div>
                        <label for="exampleFormControlInput1" class="form-label me-4">
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
            <div className="mx-3 mb-3">
                <button className="prokas-button mx-2" onClick={handleSubmit}>
                    তৈরি করুন
                </button>
            </div>
        </>
    )
}

export default CreateMeeting