import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { app } from "../utils/Firebase/firebase";
import { getAuth } from "firebase/auth";

const Logout = ({ setIsLoggedIn, setShowNav }) => {
  let navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    auth.signOut();
    sessionStorage.setItem("User ID", "");
    sessionStorage.setItem("User Name", "");
    sessionStorage.setItem("User Email", "");
    sessionStorage.setItem("ImageUrl", "");
    setIsLoggedIn(false);
    setShowNav(true);
    navigate("/");
  }, []);

  return (
    <div className="h-screen w-screen flex bg-gray-bg1 dark:text-white p-5"></div>
  );
};

export default Logout;
