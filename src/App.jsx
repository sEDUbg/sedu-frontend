import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";

import "./css/App.css";
import "aos/dist/aos.css";

import NavigationBar from "./partials/NavigationBar";

import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";

import Materials from "./pages/Materials";
import Present from "./partials/Presentation/Present";
import Trend from "./pages/Trend";
import UserSettings from "./pages/UserSettings";

import Referral from "./pages/Referral";

import Upload from "./pages/Upload";

import TOS from "./pages/Legal/TOS";
import Privacy from "./pages/Legal/Privacy";
import Search from "./pages/Search";

import { Error404 } from "./utils/Errors";
import { getAuth } from "firebase/auth";
import { app } from "./utils/Firebase/firebase";
import checkPremium from "./utils/stripe/checkPremium";

import { getFirestore, getDoc, doc } from "firebase/firestore";
import { FaTruckLoading } from "react-icons/fa";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showNav, setShowNav] = useState(true);
  let navigate = useNavigate();

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
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

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
        getAuth(app).onAuthStateChanged((user) => {
          console.log("BEFORE", user);
          setCurrentUser(user);
          console.log("AFTER", user);
        });
      }
    }
    //setIsLoggedIn(false);
  }, []);

  // USE LOCAL STORAGE WITH NEW BACKEND

  useEffect(() => {
    if (currentUser != null) {
      //console.log(currentUser)
      sessionStorage.setItem("User ID", currentUser.uid);
      const user_doc = doc(
        getFirestore(app),
        "StripeCustomers",
        currentUser.uid
      );
      getDoc(user_doc).then((response) => {
        sessionStorage.setItem("ImageUrl", response.data().profileUrl);
        sessionStorage.setItem(
          "User Name",
          response.data().FirstName + " " + response.data().LastName
        );
        sessionStorage.setItem("User Email", response.data().email);
      });
      setIsLoggedIn(true);
      setIsPremium(checkPremium(currentUser?.uid));
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
        {showNav ? <NavigationBar isLoggedIn={isLoggedIn} /> : null}
      </div>
    );
  }

  // [TODO] Implement Protected Routes -> https://www.robinwieruch.de/react-router-private-routes/

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white">
      {showNav ? <NavigationBar isLoggedIn={isLoggedIn} /> : null}
      <main className="min-h-full">
        <Routes className="min-h-full">
          <Route
            path="/"
            element={
              isLoggedIn ? <Home /> : <LandingPage setShowNav={setShowNav} />
            }
          />
          <Route
            path="/presentations"
            element={<Materials groupBy="Presentations" />}
          />
          <Route path="/plans" element={<Materials groupBy="Documents" />} />
          <Route path="/materials" element={<Materials groupBy="Pictures" />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/trending" element={<Trend />} />

          <Route
            path="/materials/type=:type/uuid=:uuid"
            element={<Present />}
          />

          <Route
            path="/referral/uuid=:uuid"
            element={
              <Referral setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} />
            }
          />
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} />
            }
          />
          <Route
            path="/logout"
            element={
              <Logout setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} />
            }
          />
          <Route
            path="/register"
            element={
              <Register setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} />
            }
          />
          <Route path="/user/id=:id" element={<UserSettings />} />

          <Route path="/tos" element={<TOS />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/search" element={<Search />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
