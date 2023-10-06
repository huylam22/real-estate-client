import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

const RequiredAuthPage = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const { access_token } = getToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!access_token) {
      navigate("/sign-in");
    }
  }, [user]);
  if (!access_token) return null;
  return <>{children}</>;
};

export default RequiredAuthPage;
