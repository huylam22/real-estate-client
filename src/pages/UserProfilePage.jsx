import React from "react";
import LayoutHome from "../layouts/LayoutHome";
import UserProfile from "../modules/user/UserProfile";
import RequiredAuthPage from "./RequiredAuthPage";
const UserProfilePage = () => {
  return (
    <LayoutHome>
      <RequiredAuthPage>
        <UserProfile></UserProfile>
      </RequiredAuthPage>
    </LayoutHome>
  );
};

export default UserProfilePage;
