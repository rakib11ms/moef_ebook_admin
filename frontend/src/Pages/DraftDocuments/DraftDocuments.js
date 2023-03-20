import React, { useState } from "react";
import NavigationBa from "../Shared/NavigationBa/NavigationBa";
import "./DraftDocuments.css";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import JoditEditor from "jodit-react";

const DraftDocuments = () => {
  const [content, setContent] = useState("");

  return (
    <div>
      <section>
        <NavigationBa />
      </section>
      <secton className="">
        <div className="row container-fluid">
          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 col-12">
            <div className="khosra-tag-div">
              <h5>
                <span>
                  <PostAddIcon />
                </span>{" "}
                খসড়া সমূহ{" "}
              </h5>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6">
            <h5 className="kosra-h6">
              <span>
                <AutoStoriesIcon className="khosra-icon" />
              </span>
              সকল বই দেখুন{" "}
            </h5>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6">
            <h5 className="kosra-h6">
              <span>
                <LibraryBooksIcon className="khosra-icon" />
              </span>
              ইনডেক্স দেখুন{" "}
            </h5>
          </div>
        </div>
      </secton>
      <section className="container-fluid">
        <div className="all-draft-overlay-card">
          <div className="card-over">
            <div className="draft-overlay-card">
              <div className="draft-icons">
                <DeleteIcon />
                <ErrorOutlineIcon />
              </div>
              <p>
                বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা সাকিব-তামিমের
                মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি। নেতৃত্বে যখন ফাটল থাকবে,
                তখন দলে ফাটল ধরবে, এ তো নতুন কিছু নয়! তারপরও ক্রিকেটারদের
                ধন্যবাদ দিতে হয়,
              </p>
              <div class="overlay">
                <button className="edit-button">এডিট করুন </button>
              </div>
            </div>
          </div>
          <div className="card-over">
            <div className="draft-overlay-card">
              <div className="draft-icons">
                <DeleteIcon />
                <ErrorOutlineIcon />
              </div>
              <p>
                বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা সাকিব-তামিমের
                মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি। নেতৃত্বে যখন ফাটল থাকবে,
                তখন দলে ফাটল ধরবে, এ তো নতুন কিছু নয়! তারপরও ক্রিকেটারদের
                ধন্যবাদ দিতে হয়,
              </p>
              <div class="overlay">
                <button className="edit-button">এডিট করুন </button>
              </div>
            </div>
          </div>
          <div className="card-over">
            <div className="draft-overlay-card">
              <div className="draft-icons">
                <DeleteIcon />
                <ErrorOutlineIcon />
              </div>
              <p>
                বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা সাকিব-তামিমের
                মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি। নেতৃত্বে যখন ফাটল থাকবে,
                তখন দলে ফাটল ধরবে, এ তো নতুন কিছু নয়! তারপরও ক্রিকেটারদের
                ধন্যবাদ দিতে হয়,
              </p>
              <div class="overlay">
                <button className="edit-button">এডিট করুন </button>
              </div>
            </div>
          </div>
          <div className="card-over">
            <div className="draft-overlay-card">
              <div className="draft-icons">
                <DeleteIcon />
                <ErrorOutlineIcon />
              </div>
              <p>
                বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা সাকিব-তামিমের
                মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি। নেতৃত্বে যখন ফাটল থাকবে,
                তখন দলে ফাটল ধরবে, এ তো নতুন কিছু নয়! তারপরও ক্রিকেটারদের
                ধন্যবাদ দিতে হয়,
              </p>
              <div class="overlay">
                <button className="edit-button">এডিট করুন </button>
              </div>
            </div>
          </div>
          <div className="card-over">
            <div className="draft-overlay-card">
              <div className="draft-icons">
                <DeleteIcon />
                <ErrorOutlineIcon />
              </div>
              <p>
                বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা সাকিব-তামিমের
                মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি। নেতৃত্বে যখন ফাটল থাকবে,
                তখন দলে ফাটল ধরবে, এ তো নতুন কিছু নয়! তারপরও ক্রিকেটারদের
                ধন্যবাদ দিতে হয়,
              </p>
              <div class="overlay">
                <button className="edit-button">এডিট করুন </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid mt-5">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12 col-12 jodit-div">
            <h5>এডিটর </h5>
            <JoditEditor
              value={content}
              onChange={setContent}
              height={400}
              spellcheck={false}
              language="en"
            />
          </div>
          <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12 col-12">
            <h5>বই এর তথ্য যোগ করুন </h5>
            <div>
              <div className="d-flex draft-form-control-div">
                <select
                  className="form-select draft-form-control"
                  aria-label="Default select example"
                >
                  <option selected>বই এর নাম</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <AddIcon className="draft-form-control-icon" />
              </div>
              <select
                className="form-select draft-form-control2"
                aria-label="Default select example"
              >
                <option selected>অধ্যায়</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <select
                className="form-select draft-form-control2"
                aria-label="Default select example"
              >
                <option selected>অনুচ্ছেদ </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>{" "}
              <select
                className="form-select draft-form-control2"
                aria-label="Default select example"
              >
                <option selected>ক্যাটাগরি </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DraftDocuments;
