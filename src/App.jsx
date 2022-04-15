import './App.css';
import { useState , useEffect } from 'react';
import { Route, Routes , useNavigate } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import LandingPage from './components/Home/LandingPage';
import Home from './components/Home/Home';
import Materials from './components/Materials/Materials';
import Trend from './components/Trend/Trend';
import User from './components/User/User';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Upload from './components/Upload/Upload';

import { Error404 } from './components/Errors/Errors';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [user, setUser] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      setIsLoggedIn(true)
      let usr = sessionStorage.getItem('User ID').toString();
      console.log(usr);
      setUser(usr)
      console.log("hmm", user)
    } else {
      setIsLoggedIn(false)
      setUser(null)
    }


  }, [])

  return (
    <div className="min-h-full bg-white dark:bg-black">
      {showNav ? <NavigationBar isLoggedIn={isLoggedIn} userID={user}/> : null}
      <main className='md:flex'>
        <Routes>
          <Route path="/" element={(isLoggedIn) ? <Home /> : <LandingPage />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/trend" element={<Trend />} />

          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav} setUser={setUser}/>} />
          <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} setShowNav={setShowNav}/>} />
          <Route path="/user/:id" element={<User />}/>
          <Route path="*" element={<Error404 />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;

