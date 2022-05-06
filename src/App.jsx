import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css";

import NavigationBar from './components/NavigationBar';
import LandingPage from './components/Home/LandingPage';
import Home from './components/Home/Home';
import Materials from './components/Materials/Materials';
import Trend from './components/Trend/Trend';
import User from './components/User/User';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import Register from './components/Register/Register';
import Upload from './components/Upload/Upload';
import Present from './components/Presentation/Present';

import { Error404 } from './components/Errors/Errors';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [user, setUser] = useState();
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
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      setIsLoggedIn(true)
      let usr = sessionStorage.getItem('User ID');
      console.log(usr);
      setUser(usr)
      console.log("hmm", user)
    } else {
      setIsLoggedIn(false)
      setUser(null)
    }


  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-white">
      {showNav ? <NavigationBar isLoggedIn={isLoggedIn} /> : null}
      <main className='min-h-full'>
        <Routes className='min-h-full'>
          <Route path="/" element={(isLoggedIn) ? <Home /> : <LandingPage />} />
          <Route path="/presentations" element={<Present />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/trend" element={<Trend />} />

          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} setUser={setUser} />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} setUser={setUser} />} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} />} />
          <Route path="/user/id=:id" element={<User />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;

