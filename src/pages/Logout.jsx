import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { app } from '../utils/Firebase/firebase';
import { getAuth, } from 'firebase/auth';

const Logout = ({ setIsLoggedIn, setShowNav, setUser }) => {
    let navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(app);
        auth.signOut();
        console.log(auth);
        sessionStorage.setItem('Auth Token', '');
        sessionStorage.setItem('User ID', '');
        sessionStorage.setItem('User Name', '');
        sessionStorage.setItem('User Email', '');
        sessionStorage.setItem('ImageUrl', '');
        setUser(0);
        setIsLoggedIn(false);
        setShowNav(true);
        navigate('/');

    }, [])

    return (
        <div className='h-screen w-screen flex bg-gray-bg1 dark:text-white p-5'>

        </div>
    );
};

export default Logout;