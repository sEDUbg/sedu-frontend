import React from 'react';
import { useState , useEffect } from 'react';
import { app } from '../Firebase/firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

const Login = ({setIsLoggedIn, setShowNav}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    let navigate = useNavigate();

    const handleAction = (id) => {
        const authentication = getAuth();
        if (id === 1) {
          signInWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                setIsLoggedIn(true)
                setShowNav(true)
                navigate('/')
              
              sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
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
        if (id === 2) {
          createUserWithEmailAndPassword(authentication, email, password)
            .then((response) => {
                setIsLoggedIn(true)
                setShowNav(true)
                navigate('/')
              sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            })
            .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                toast.error('Email Already in Use');
              }
            })
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

                <form onSubmit={handleAction(1)}>
                    <div>
                        <label htmlFor='email'>email</label>
                        <input
                            type='email'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                            id='email'
                            placeholder='Your Email'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>password</label>
                        <input
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                            id='password'
                            placeholder='Your Password'
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className={`dark:bg-slate-800 py-2 px-4 text-sm text-black dark:text-white rounded border dark:border-slate-700 focus:outline-none focus:border-green-dark`}
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