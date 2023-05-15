import React from "react";
import NavigationBa from "../../Shared/NavigationBa/NavigationBa";
import "./PermissionUser.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const PermissionUser = () => {
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
          <div className="permission-head-buttons container-fluid">
            <button className="Jog-button">
              যোগ করুন{" "}
              <span>
                <AddIcon />
              </span>
            </button>
            <button className="sonrokkhon-button">সংরক্ষণ করুন</button>
          </div>
        </div>
      </section>

      <section className="bg-light container-fluid mt-4">
        <div className="row container-fluid permission-card-div">
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 permmission-card">
            <h5>সুপার এডমিন</h5>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault crud"
              />
              <label class="form-check-label" for="flexCheckDefault">
                সকল ধরণের (CRUD)
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault user-permission"
              />
              <label class="form-check-label" for="flexCheckDefault">
                ব্যবহারকারী ব্যাবস্থাপনা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-book"
              />
              <label class="form-check-label" for="flexCheckDefault ">
                বই যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-chapter"
              />
              <label class="form-check-label" for="flexCheckDefault">
                অধ্যায় যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-genaral-content"
              />
              <label class="form-check-label" for="flexCheckDefault">
                সাধারণ কন্টেন্ট যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault notice-news"
              />
              <label class="form-check-label" for="flexCheckDefault">
                নোটিশ ও নিউজ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault conferance"
              />
              <label class="form-check-label" for="flexCheckDefault">
                কনফারেন্স
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault etc">
                অন্যান্য
              </label>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 permmission-card">
            <h5>এডমিন</h5>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault crud2"
              />
              <label class="form-check-label" for="flexCheckDefault">
                সকল ধরণের (CRUD)
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault user-permission2"
              />
              <label class="form-check-label" for="flexCheckDefault">
                ব্যবহারকারী ব্যাবস্থাপনা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-book2"
              />
              <label class="form-check-label" for="flexCheckDefault">
                বই যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-chapter2"
              />
              <label class="form-check-label" for="flexCheckDefault">
                অধ্যায় যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-genaral-content2"
              />
              <label class="form-check-label" for="flexCheckDefault">
                সাধারণ কন্টেন্ট যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault notice-news2"
              />
              <label class="form-check-label" for="flexCheckDefault">
                নোটিশ ও নিউজ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault conferance2"
              />
              <label class="form-check-label" for="flexCheckDefault">
                কনফারেন্স
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                অন্যান্য
              </label>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 permmission-card">
            <h5>মডারেটর</h5>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault crud3"
              />
              <label class="form-check-label" for="flexCheckDefault">
                সকল ধরণের (CRUD)
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault user-permission3"
              />
              <label class="form-check-label" for="flexCheckDefault">
                ব্যবহারকারী ব্যাবস্থাপনা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-book3"
              />
              <label class="form-check-label" for="flexCheckDefault">
                বই যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-chapter3"
              />
              <label class="form-check-label" for="flexCheckDefault">
                অধ্যায় যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-genaral-content3"
              />
              <label class="form-check-label" for="flexCheckDefault">
                সাধারণ কন্টেন্ট যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault notice-news3"
              />
              <label class="form-check-label" for="flexCheckDefault">
                নোটিশ ও নিউজ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault conferance3"
              />
              <label class="form-check-label" for="flexCheckDefault">
                কনফারেন্স
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                অন্যান্য
              </label>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 permmission-card">
            <h5>পাবলিশার্স</h5>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault crud4"
              />
              <label class="form-check-label" for="flexCheckDefault">
                সকল ধরণের (CRUD)
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault user-permission4"
              />
              <label class="form-check-label" for="flexCheckDefault">
                ব্যবহারকারী ব্যাবস্থাপনা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-book4"
              />
              <label class="form-check-label" for="flexCheckDefault">
                বই যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-chapter4"
              />
              <label class="form-check-label" for="flexCheckDefault">
                অধ্যায় যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-genaral-content4"
              />
              <label class="form-check-label" for="flexCheckDefault">
                সাধারণ কন্টেন্ট যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault notice-news4"
              />
              <label class="form-check-label" for="flexCheckDefault">
                নোটিশ ও নিউজ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault conferance4"
              />
              <label class="form-check-label" for="flexCheckDefault">
                কনফারেন্স
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                অন্যান্য
              </label>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 permmission-card">
            <h5>সাধারণ ব্যবহারকারী</h5>
            <hr />
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault crud5"
              />
              <label class="form-check-label" for="flexCheckDefault">
                সকল ধরণের (CRUD)
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault user-permission5"
              />
              <label class="form-check-label" for="flexCheckDefault">
                ব্যবহারকারী ব্যাবস্থাপনা
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-book5"
              />
              <label class="form-check-label" for="flexCheckDefault">
                বই যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-chapter5"
              />
              <label class="form-check-label" for="flexCheckDefault">
                অধ্যায় যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault add-genaral-content5"
              />
              <label class="form-check-label" for="flexCheckDefault">
                সাধারণ কন্টেন্ট যোগ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault notice-news5"
              />
              <label class="form-check-label" for="flexCheckDefault">
                নোটিশ ও নিউজ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault conferance5"
              />
              <label class="form-check-label" for="flexCheckDefault">
                কনফারেন্স
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                অন্যান্য
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PermissionUser;
