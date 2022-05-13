import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { app } from '../utils/Firebase/firebase';
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword, } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// [TODO]: Implement https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/gister

const Login = ({ setIsLoggedIn, setShowNav, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleAction = (e) => {
    e.preventDefault();
    const authentication = getAuth(app);
    console.log(authentication);
    setPersistence(authentication, browserLocalPersistence)
      .then(() => {
        signInWithEmailAndPassword(authentication, email, password)
          .then((response) => {
            sessionStorage.setItem('User ID', authentication.currentUser.uid);
            const user_doc = doc(getFirestore(app), 'StripeCustomers', authentication.currentUser.uid);
            getDoc(user_doc)
              .then((response) => {
                sessionStorage.setItem('ImageUrl', response.data().profileUrl);
                sessionStorage.setItem('User Name', response.data().FirstName + ' ' + response.data().LastName);
                sessionStorage.setItem('User Email', email);
              });

            setIsLoggedIn(true);
            setShowNav(true);
            navigate('/');
          })
          .catch((error) => {
            console.log(error.code)
            if (error.code === 'auth/invalid-email' && !toast.isActive('invalid-email')) {
              toast.error('невалиден имейл адрес', { toastId: 'invalid-email' });
            }
            if (error.code === 'auth/user-not-found' && !toast.isActive('user-not-found')) {
              toast.error('грешен имейл адрес, моля опитайте отново', { toastId: 'user-not-found' });
            }
            if (error.code === 'auth/wrong-password' && !toast.isActive('wrong-password')) {
              toast.error('грешна парола, моля опитайте отново', { toastId: 'wrong-password' });
            }
          })
      }).catch((error) => {
        console.log(error.code, error.message);
      });


  }

  const getInput = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value)
    }
    if (e.target.id === 'password') {
      setPassword(e.target.value)
    }
  }

  const togglePassword = () => { setShowPassword(!showPassword); };

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
          <h1 className='text-2xl font-medium text-primary mt-4 mb-6 text-center'>
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
              <div className='flex items-center justify-between space-x-3'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                  id='password'
                  placeholder='твоята парола'
                  onChange={getInput}
                />
                <div className="input-group-btn">
                  <button className="btn btn-outline-primary flex items-center dark:text-white bg-gray-100 border dark:border-slate-700 dark:bg-slate-800 p-2 rounded-full" onClick={togglePassword} type="button">
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>
            </div>
            <div /* TODO */ className="text-sm text-gray-500 dark:hover:text-gray-200 text-center mt-3 cursor-pointer">
              <a>забравена парола?</a>
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