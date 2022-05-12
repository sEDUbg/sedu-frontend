import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';

import './css/App.css';
import "aos/dist/aos.css";

import NavigationBar from './partials/NavigationBar';

import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';

import Materials from './pages/Materials';
import Present from './partials/Presentation/Present';
import Trend from './pages/Trend';
import UserSettings from './pages/UserSettings';

import Upload from './pages/Upload';

import TOS from './pages/Legal/TOS';
import Privacy from './pages/Legal/Privacy';
import Search from './pages/Search';

import { Error404 } from './utils/Errors';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth'
import { app } from './utils/Firebase/firebase';

const App = () => {
  const [user, loading, error] = useAuthState(getAuth(app));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [User, setUser] = useState();
  let navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
    AOS.refresh();
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    console.log(user);
    if (user !== null) {
      setIsLoggedIn(true)
      setUser(user.uid)
    } else {
      setIsLoggedIn(false)
      setUser(null)
    }


  }, [user])

  // [TODO] Implement Protected Routes -> https://www.robinwieruch.de/react-router-private-routes/

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white">
      {showNav ? <NavigationBar isLoggedIn={isLoggedIn} /> : null}
      <main className='min-h-full'>
        <Routes className='min-h-full'>
          <Route path="/" element={(isLoggedIn) ? <Home /> : <LandingPage setShowNav={setShowNav} />} />
          <Route path="/presentations" element={<Materials groupBy="presentations" />} />
          <Route path="/plans" element={<Materials groupBy="plans" />} />
          <Route path="/materials" element={<Materials groupBy="all" />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/trending" element={<Trend />} />

          <Route path="/materials/uuid=:uuid" element={<Present />} />

          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} setUser={setUser} />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} setUser={setUser} />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} />} />
          <Route path="/user/id=:id" element={<UserSettings />} />

          <Route path="/tos" element={<TOS />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/search" element={<Search />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;

