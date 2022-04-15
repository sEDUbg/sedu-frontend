import React from 'react';
import { useState, useEffect } from 'react';
import { app } from '../Firebase/firebase';
import { getAuth, signInWithEmailAndPassword, } from 'firebase/auth';
import { getFirestore, getDoc, doc, query } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

const Login = ({ setIsLoggedIn, setShowNav }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  let navigate = useNavigate();

  const handleAction = (e) => {
    e.preventDefault();
    const authentication = getAuth(app);
    console.log(authentication);
    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        // response.user.uid;
        //console.log(response.user.uid);
        sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        setIsLoggedIn(true);
        setShowNav(true);
        navigate('/');
        // const firestore = getFirestore(app);
        // const docRef = doc(firestore, 'User_info', response.user.uid);
        // getDoc(docRef)
        //   .then((doc) => {
        //     console.log(doc.data);
        //   });
      })
      .catch((error) => {
        console.log(error.code)
        if (error.code === 'auth/invalid-email') {
          console.log("AAAAAAAA")
          toast.error('невалиден имейл адрес');
        }
        if (error.code === 'auth/user-not-found') {
          toast.error('грешен имейл адрес, моля опитайте отново');
        }
        if (error.code === 'auth/wrong-password') {
          toast.error('грешна парола, моля опитайте отново');
        }
      })

  }

  const getInput = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value)
    }
    if (e.target.id === 'password') {
      setPassword(e.target.value)
    }
  }


  useEffect(() => {
    setShowNav(false);
  }, [])

  return (
    <div className='h-screen w-screen flex bg-gray-bg1 dark:text-white p-5'>
      <div className='w-full max-w-md m-auto bg-white dark:bg-slate-900 rounded-lg border dark:border-slate-700 shadow-default py-10 px-16 divide-y divide-slate-600 space-y-4'>
        <div className='text-center flex items-center justify-center space-x-2'>
          <img src='sedubg.png' alt='logo' className='w-12' />
          <h1 className='text-2xl font-black'>sEDUbg</h1>
        </div>
        <div className=''>
          <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
            влез с акаунта си 🔐
          </h1>

          <form onSubmit={handleAction}>
            <div>
              <label htmlFor='имейл'>имейл</label>
              <input
                type='email'
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                id='email'
                placeholder='твоя имейл адрес'
                onChange={getInput}
              />
            </div>
            <div>
              <label htmlFor='парола'>парола</label>
              <input
                type='password'
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                id='password'
                placeholder='твоята парола'
                onChange={getInput}
              />
            </div>
            <ToastContainer />
            <div className='flex justify-center items-center mt-6'>
              <button
                className={`dark:bg-slate-800 py-2 px-4 text-sm text-black dark:text-white rounded border dark:border-slate-700 focus:outline-none focus:border-green-dark`}
                onClick={handleAction}
              >
                вход
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;