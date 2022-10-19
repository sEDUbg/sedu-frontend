import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Logout = ({ setIsLoggedIn, setShowNav }) => {
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/user/logout", { withCredentials: true }).then((response) => {
      if (response.status === 200) {
        sessionStorage.setItem("User ID", "");
        sessionStorage.setItem("User Name", "");
        sessionStorage.setItem("User Email", "");
        sessionStorage.setItem("ImageUrl", "");
        setIsLoggedIn(false);
        setShowNav(true);
        navigate("/");
      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="h-screen w-screen flex bg-gray-bg1 dark:text-white p-5"></div>
  );
};

export default Logout;
