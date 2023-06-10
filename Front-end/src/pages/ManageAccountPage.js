import React from "react";
import AccountSettings from "../components/ProfileManagement/index";
import { NavBarDev } from "../components/NavBar/index-2";
import { Banner } from "../components/Global/GlobalComponents";

const ManageAccountPage = ({ user, log }) => {
  return (
    <div>
      <NavBarDev />
      <AccountSettings user={user} log={log} />
    </div>
  );
};

export default ManageAccountPage;
