import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';


import NavigationBar from './components/NavigationBar';
import LandingPage from './components/Home/LandingPage';
import Home from './components/Home/Home';
import Materials from './components/Materials/Materials';
import Trend from './components/Trend/Trend';
import User from './components/User/User';

import { Error404 } from './components/Errors/Errors';

const App = () => {
  const [logged, setLogged] = useState(false);


  return (
    <div className="min-h-full bg-white dark:bg-black">
      <NavigationBar />
      <main className='md:flex'>
        <Routes>
          <Route path="/" element={(logged) ? <Home /> : <LandingPage />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/trend" element={<Trend />} />
          <Route path="/user/:id" element={<User />}/>
          <Route path="*" element={<Error404 />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;

