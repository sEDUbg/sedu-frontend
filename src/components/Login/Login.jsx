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
    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        // response.user.uid;
        console.log(response.user.uid);
        // const firestore = getFirestore(app);
        // const docRef = doc(firestore, 'User_info', response.user.uid);
        // getDoc(docRef)
        //   .then((doc) => {
        //     console.log(doc.data);
        //   });
      })
      .catch((error) => {
        console.log(error.code)
        if (error.code === 'auth/wrong-password') {
          toast.error('Please check the Password');
        }
        if (error.code === 'auth/user-not-found') {
          toast.error('Please check the Email');
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
    <div className='h-full flex bg-gray-bg1 dark:text-white'>
      <div className='w-full max-w-md m-auto bg-white dark:bg-slate-900 rounded-lg border dark:border-slate-700 shadow-default py-10 px-16'>
        <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
          Log in to your account 🔐
        </h1>

        <form onSubmit={handleAction}>
          <div>
            <label htmlFor='email'>email</label>
            <input
              type='email'
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
              id='email'
              placeholder='Your Email'
              onChange={getInput}
            />
          </div>
          <div>
            <label htmlFor='password'>password</label>
            <input
              type='password'
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
              id='password'
              placeholder='Your Password'
              onChange={getInput}
            />
          </div>

          <div className='flex justify-center items-center mt-6'>
            <button
              className={`dark:bg-slate-800 py-2 px-4 text-sm text-black dark:text-white rounded border dark:border-slate-700 focus:outline-none focus:border-green-dark`}
              onClick={handleAction}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;