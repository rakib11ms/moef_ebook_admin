import React from "react";
import NavigationBa from "../Shared/NavigationBa/NavigationBa";
import "./DraftDocuments.css";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const DraftDocuments = () => {
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
          <div className="draft-overlay-card">
            <div className="draft-icons">
              <DeleteIcon />
              <ErrorOutlineIcon />
            </div>
            <p>
              বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা সাকিব-তামিমের
              মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি। নেতৃত্বে যখন ফাটল থাকবে,
              তখন দলে ফাটল ধরবে, এ তো নতুন কিছু নয়! তারপরও ক্রিকেটারদের ধন্যবাদ
              দিতে হয়,
            </p>
          </div>
          <div className="draft-overlay-card">
            <div className="draft-icons">
              <DeleteIcon />
              <ErrorOutlineIcon />
            </div>
            <p>
              বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা সাকিব-তামিমের
              মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি। নেতৃত্বে যখন ফাটল থাকবে,
              তখন দলে ফাটল ধরবে, এ তো নতুন কিছু নয়! তারপরও ক্রিকেটারদের ধন্যবাদ
              দিতে হয়,
            </p>
          </div>
          <div className="draft-overlay-card">
            <div className="draft-icons">
              <DeleteIcon />
              <ErrorOutlineIcon />
            </div>
            <p>
              বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা সাকিব-তামিমের
              মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি। নেতৃত্বে যখন ফাটল থাকবে,
              তখন দলে ফাটল ধরবে, এ তো নতুন কিছু নয়! তারপরও ক্রিকেটারদের ধন্যবাদ
              দিতে হয়,
            </p>
          </div>
          <div className="draft-overlay-card">
            <div className="draft-icons">
              <DeleteIcon />
              <ErrorOutlineIcon />
            </div>
            <p>
              বাংলাদেশ দলে এখন যে গ্রুপিংয়ের কথা বলা হচ্ছে, সেটা সাকিব-তামিমের
              মধ্যে কথা না বলার সম্পর্ক থেকে সৃষ্টি। নেতৃত্বে যখন ফাটল থাকবে,
              তখন দলে ফাটল ধরবে, এ তো নতুন কিছু নয়! তারপরও ক্রিকেটারদের ধন্যবাদ
              দিতে হয়,
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DraftDocuments;
