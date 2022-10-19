import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from 'axios';

import AOS from "aos";
import "./css/App.css";
import "aos/dist/aos.css";

import NavigationBar from "./partials/NavigationBar";
import VirtualRoutes from "./routes/Routes";


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
    AOS.refresh();
  });

  useEffect(() => {
    if (isLoggedIn === null) {
      console.log(sessionStorage.getItem("User ID"));
      if (
        sessionStorage.getItem("User ID") == null ||
        sessionStorage.getItem("User ID") == undefined ||
        sessionStorage.getItem("User ID") == "undefined" ||
        sessionStorage.getItem("User ID") == "null" ||
        sessionStorage.getItem("User ID") == ""
      ) {
        setIsLoggedIn(false);
      } else {
        // getAuth(app).onAuthStateChanged((user) => {
        //   console.log("BEFORE", user);
        //   setCurrentUser(user);
        //   console.log("AFTER", user);
        // });
        axios.get("http://localhost:8080/api/user/me", { withCredentials: true }).then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            var user = response.data.user;
            setCurrentUser(user);
          }
        });
      }
    }
    //setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  // USE LOCAL STORAGE WITH NEW BACKEND

  useEffect(() => {
    if (currentUser != null) {
      //   //console.log(currentUser)
      //   sessionStorage.setItem("User ID", currentUser.uid);
      //   const user_doc = doc(
      //     getFirestore(app),
      //     "StripeCustomers",
      //     currentUser.uid
      //   );
      //   getDoc(user_doc).then((response) => {
      //     sessionStorage.setItem("ImageUrl", response.data().profileUrl);
      //     sessionStorage.setItem(
      //       "User Name",
      //       response.data().FirstName + " " + response.data().LastName
      //     );
      //     sessionStorage.setItem("User Email", response.data().email);
      //   });
      //   setIsLoggedIn(true);
      //   setIsPremium(checkPremium(currentUser?.uid));

      sessionStorage.setItem("User ID", currentUser.ID);
      // sessionStorage.setItem("ImageUrl", response.data.profileUrl);
      sessionStorage.setItem(
        "User Name",
        currentUser.FirstName + " " + currentUser.LastName
      );
      sessionStorage.setItem("User Email", currentUser.Email);
      setIsLoggedIn(true);
      setIsPremium(currentUser.UserStatus.Premium);
      // setShowNav(true);

    } else if (
      sessionStorage.getItem("User ID") == null ||
      sessionStorage.getItem("User ID") == undefined
    ) {
      console.log("USER CHANGED!!!");
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen bg-white dark:bg-black dark:text-white">
        {
          showNav ? (
            <NavigationBar isLoggedIn={isLoggedIn} />
          ) : null /* Should be a NavigationSkeleton */
        }
      </div>
    );
  }

  // [TODO] Implement Protected Routes -> https://www.robinwieruch.de/react-router-private-routes/

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white">
      {showNav ? <NavigationBar isLoggedIn={isLoggedIn} /> : null}
      <main className="min-h-full">
        <VirtualRoutes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setShowNav={setShowNav}
        />
      </main>
    </div>
  );
};

export default App;
