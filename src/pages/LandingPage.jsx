import React, { useEffect } from 'react';

import Welcome from '../partials/Home/Welcome';
import Features from '../partials/Home/Features';
import Plans from '../partials/Home/Plans';
import Footer from '../partials/Home/Footer';

const LandingPage = ({ setShowNav }) => {

  useEffect(() => {
    setShowNav(true);
  }, [])

  return (
  <>
    <Welcome />
    <Features />
    <Plans />
    <Footer />
  </>
);}

export default LandingPage;