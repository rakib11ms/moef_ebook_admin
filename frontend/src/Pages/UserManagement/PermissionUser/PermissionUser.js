// import React from "react";
import axios from "axios";

import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./PermissionUser.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const PermissionUser = () => {
  const [allRoles, setAllRoles] = useState([])
  useEffect(() => {
    axios.get("api/get-all-roles").then((res) => {
      setAllRoles(res.data.all_roles);
    });
  }, [])

  const [role_id, setRole_id] = useState(1)
  console.log('role id change', role_id)
  const [permissions, setPermissions] = useState({
    create_user: false,
    view_user: false,
    update_user: false,
    delete_user: false,
    create_notice_news: false,
    view_notice_news: false,
    update_notice_news: false,
    delete_notice_news: false,
    create_meeting: false,
    view_meeting: false,
    edit_meeting: false,
    delete_meeting: false,
    create_book: false,
    view_book: false,
    update_book: false,
    delete_book: false,
    create_document: false,
    view_document: false,
    update_document: false,
    delete_document: false,
  });

  console.log('permission states check', permissions)

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('data', permissions)
    axios.post(`api/assign-permission-via-role/${role_id}`, permissions).then((res) => {
      if (res.data.status == 200) {

        Swal.fire("সফলভাবে সম্পন্ন হয়েছে", "", "success");
        localStorage.removeItem("permissions",JSON.stringify(res.data.permissions));

        localStorage.setItem("permissions", JSON.stringify(res.data.permissions));
      }

    });
  };

  const [permissionfromDatabase, setPermissionFromDatabase] = useState([]);
  console.log('permission from db', permissionfromDatabase)

  useEffect(() => {
    axios.get(`api/get-permission-via-role/${role_id}`).then((res) => {
      setPermissionFromDatabase(res.data.permissions)
      setPermissions(res.data.permissions)
      if (res.data.permissions.includes('create_user')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          create_user: true,

        }))
      }
      if (res.data.permissions.includes('view_user')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          view_user: true,

        }))
      }
      if (res.data.permissions.includes('update_user')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          update_user: true,

        }))
      }
      if (res.data.permissions.includes('delete_user')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          delete_user: true,

        }))
      }
      if (res.data.permissions.includes('create_notice_news')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          create_notice_news: true,

        }))
      }
      if (res.data.permissions.includes('view_notice_news')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          view_notice_news: true,

        }))
      }
      if (res.data.permissions.includes('update_notice_news')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          update_notice_news: true,

        }))
      }
      if (res.data.permissions.includes('delete_notice_news')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          delete_notice_news: true,

        }))
      }
      if (res.data.permissions.includes('create_meeting')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          create_meeting: true,

        }))
      }
      if (res.data.permissions.includes('view_meeting')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          view_meeting: true,

        }))
      }
      if (res.data.permissions.includes('update_meeting')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          update_meeting: true,

        }))
      }
      if (res.data.permissions.includes('delete_meeting')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          delete_meeting: true,

        }))
      }
      if (res.data.permissions.includes('create_book')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          create_book: true,

        }))
      }
      if (res.data.permissions.includes('view_book')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          view_book: true,

        }))
      }
      if (res.data.permissions.includes('update_book')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          update_book: true,

        }))
      }
      if (res.data.permissions.includes('delete_book')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          delete_book: true,

        }))
      }
      if (res.data.permissions.includes('create_document')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          create_document: true,

        }))
      }
      if (res.data.permissions.includes('view_document')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          view_document: true,

        }))
      }
      if (res.data.permissions.includes('update_document')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          update_document: true,

        }))
      }
      if (res.data.permissions.includes('delete_document')) {
        setPermissions((prevPermissions) => ({
          ...prevPermissions,
          delete_document: true,

        }))
      }
    });



  }, [role_id])


  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <section>
        <div className="">
          <div className="permission-top-tag container-fluid">
            <h5>ব্যবহারকারীর অনুমতি ব্যবস্থাপনা </h5>
            <div className="">
              <div className="tab-serchInput-icon-div">
                <SearchIcon />
                <input type="search" className="gsearch-permission" />
              </div>
            </div>
          </div>
          <hr />
          {/* <div className="permission-head-buttons container-fluid">
            <button className="Jog-button">
              যোগ করুন{" "}
              <span>
                <AddIcon />
              </span>
            </button>
            <button className="sonrokkhon-button">সংরক্ষণ করুন</button>
          </div> */}

          <div className="mt-3 container w-25">
            <select class="form-select" aria-label="Default select example" value={role_id} onChange={(e) => setRole_id(e.target.value)}>
              <option selected value="" disabled>Choose Role</option>
              {
                allRoles.map((item, i) => {
                  return (
                    <option value={item.id}>{item.name}</option>

                  )
                })
              }

            </select>
          </div>
        </div>
      </section>

      <section className="bg-light container-fluid mt-4">
        <div className="row container-fluid permission-card-div">
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 permmission-card">
            <h5>ইউজার  </h5>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="create_user"
                checked={permissions.create_user}
                onChange={handlePermissionChange}
              />

              <label class="form-check-label" for="flexCheckDefault">
                ইউজার তৈরি করা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="view_user"
                checked={permissions.view_user}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                ইউজার দেখা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="update_user"
                checked={permissions.update_user}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault ">
                ইউজার আপডেট করা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="delete_user"
                checked={permissions.delete_user}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                ইউজার ডিলিট করা
              </label>
            </div>

          </div>
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 permmission-card">
            <h5>নিউজ নোটিশ</h5>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="create_notice_news"
                checked={permissions.create_notice_news}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                নিউজ নোটিশ তৈরি করা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="view_notice_news"
                checked={permissions.view_notice_news}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                নিউজ নোটিশ দেখা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="update_notice_news"
                checked={permissions.update_notice_news}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                নিউজ নোটিশ আপডেট করা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="delete_notice_news"
                checked={permissions.delete_notice_news}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                নিউজ নোটিশ ডিলিট করা
              </label>
            </div>




          </div>
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 permmission-card">
            <h5>মিটিং </h5>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="create_meeting"
                checked={permissions.create_meeting}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                মিটিং তৈরি করুন
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="view_meeting"
                checked={permissions.view_meeting}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                মিটিং দেখুন
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="update_meeting"
                checked={permissions.update_meeting}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                মিটিং আপডেট করুন
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="delete_meeting"
                checked={permissions.delete_meeting}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                মিটিং ডিলিট করুন
              </label>
            </div>

          </div>

          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 permmission-card">
            <h5>বই এবং ডকুমেন্ট</h5>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="create_book"
                checked={permissions.create_book}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                বই তৈরি করা
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="view_book"
                checked={permissions.view_book}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                বই  দেখা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="update_book"
                checked={permissions.update_book}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                বই আপডেট করা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="delete_book"
                checked={permissions.delete_book}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                বই ডিলিট করা
              </label>
            </div>

            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="create_document"
                checked={permissions.create_document}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                ডকুমেন্ট তৈরি করা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="view_document"
                checked={permissions.view_document}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                ডকুমেন্ট দেখা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="update_document"
                checked={permissions.update_document}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                ডকুমেন্ট আপডেট করা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault crud"
                name="delete_document"
                checked={permissions.delete_document}
                onChange={handlePermissionChange}
              />
              <label class="form-check-label" for="flexCheckDefault">
                ডকুমেন্ট ডিলিট করা
              </label>
            </div>

          </div>
          <div className="w-25 align-self-end ">
            <button className="btn btn-success" type="button" onClick={handleSubmit}>আপডেট </button>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PermissionUser;
