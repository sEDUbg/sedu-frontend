import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Logout = ({ setIsLoggedIn, setShowNav }) => {
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://monkfish-app-swhuo.ondigitalocean.app/api/auth/logout", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("User ID", "");
          localStorage.setItem("User Name", "");
          localStorage.setItem("User Email", "");
          localStorage.setItem("ImageUrl", "");
          setIsLoggedIn(false);
          setShowNav(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="h-screen w-screen flex bg-gray-bg1 dark:text-white p-5"></div>
  );
};

export default Logout;
