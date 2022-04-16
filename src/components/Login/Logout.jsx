import React from 'react';
import { useState, useEffect } from 'react';
import { app } from '../Firebase/firebase';
import { getAuth, } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

const Logout = ({ setIsLoggedIn, setShowNav, setUser }) => {
    let navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth(app);
        auth.signOut();
        console.log(auth);
        sessionStorage.setItem('Auth Token', '');
        sessionStorage.setItem('User ID', '');
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