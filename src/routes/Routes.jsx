import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";

import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Register from "../pages/Register";

import Materials from "../pages/Materials";
import Present from "../partials/Presentation/Present";
import Trend from "../pages/Trend";
import UserSettings from "../pages/UserSettings";

import Referral from "../pages/Referral";

import Upload from "../pages/Upload";

import TOS from "../pages/Legal/TOS";
import Privacy from "../pages/Legal/Privacy";
import Search from "../pages/Search";

import { Error404 } from "../utils/Errors";
import ProtectedRoutes from "./ProtectedRoutes";

const VirtualRoutes = ({ isLoggedIn, setIsLoggedIn, setShowNav }) => {
  return (
    <Routes className="min-h-full">
      <Route
        path="/"
        element={
          isLoggedIn ? <Home /> : <LandingPage setShowNav={setShowNav} />
        }
      />
      <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
        <Route
          path="/presentations"
          element={<Materials groupBy="презентация" />}
        />
        <Route path="/plans" element={<Materials groupBy="текстов документ" />} />
        <Route path="/materials" element={<Materials groupBy="снимки" />} /> {/* should be grouped by all */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/trending" element={<Trend />} />

        <Route path="/materials/token=:token" element={<Present />} />
        <Route path="/user/edit" element={<UserSettings />} />
        <Route path="/search" element={<Search />} />
      </Route>

      <Route
        path="/referral/uuid=:uuid"
        element={
          <Referral setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} />
        }
      />
      <Route
        path="/register"
        element={
          <Register setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} />
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

      <Route path="/tos" element={<TOS />} />
      <Route path="/privacy" element={<Privacy />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default VirtualRoutes;
