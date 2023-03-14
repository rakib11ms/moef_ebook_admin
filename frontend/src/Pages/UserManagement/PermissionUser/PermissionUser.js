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
            <h5>ব্যবহারকারীর পারমিশন ব্যবস্থাপনা </h5>
            <div className="">
              <div className="tab-serchInput-icon-div">
                <SearchIcon />
                <input type="search" className="gsearch" />
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

      <section></section>
    </div>
  );
};

export default PermissionUser;
