import React from 'react';
import { useState, useEffect , useRef} from 'react';
import { app } from '../Firebase/firebase';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

const Register = ({ setIsLoggedIn, setShowNav }) => {
  const [email, setEmail] = useState('');
  const password = useRef('');
  const passwordConfirm = useRef('');
  const toastId = useRef(null);
  const notify = () => toastId.current = toast("Hello", { autoClose: false });

  const handleAction = (e) => {
    e.preventDefault();
    const authentication = getAuth(app);

    createUserWithEmailAndPassword(authentication, email, password.current.value)
      .then((response) => {
        sendEmailVerification(authentication.currentUser)
          .then(() => {
            toast.success('Вашият акаунт е създаден, моля проверете вашият имейл адрес за потвърждение');
            sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            setIsLoggedIn(true);
            setShowNav(true);
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => { console.log(error) })

  }


  const getInput = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value)
    }
    if(password.current.value !== passwordConfirm.current.value){
      console.log("BEFORE", toastId);
      if(toastId.current === null)
      toastId.current = toast.error('паролите не съвпадат');
      else
        toast.update(toastId.current, { render: "паролите не съвпадат", type: "error" });
    }  
    if (password.current.value === passwordConfirm.current.value) {
      //toast.dismiss(toastId.current); // doesn't work because
      var e = document.getElementsByClassName("Toastify")[0];
        e.innerHTML = "";
      toastId.current = null;
    }
  }

  useEffect(() => {
    setShowNav(false);
  }, [])

  return (
    <div className='h-screen w-screen flex bg-gray-bg1 dark:text-white'>
      <div className='w-full max-w-md m-auto bg-white dark:bg-slate-900 rounded-lg border dark:border-slate-700 shadow-default py-10 px-16 divide-y divide-slate-600 space-y-4'>
        <div className='text-center flex items-center justify-center space-x-2'>
          <img src='sedubg.png' alt='logo' className='w-12' />
          <h1 className='text-2xl font-black'>sEDUbg</h1>
        </div>
        <div className=''>
          <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
            направи си акаунт 🔐
          </h1>

          <form onSubmit={handleAction}>
            <div className="flex space-x-5">
              <div>
                <label htmlFor='firstName'>име</label>
                <input
                  type='text'
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                  id='firstName'
                  placeholder='Иван'
                  onChange={getInput}
                />
              </div>
              <div>
                <label htmlFor='lastName'>фамилия</label>
                <input
                  type='text'
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                  id='lastName'
                  placeholder='Георгиев'
                  onChange={getInput}
                />
              </div>
            </div>
            <div>
              <label htmlFor='username'>потребителско име</label>
              <input
                type='text'
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                id='username'
                placeholder='username'
                onChange={getInput}
              />
            </div>
            <div>
              <label htmlFor='email'>имейл</label>
              <input
                type='email'
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                id='email'
                placeholder='твоя имейл адрес'
                onChange={getInput}
              />
            </div>
            <div>
              <label htmlFor='password'>парола</label>
              <input
                type='password'
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                id='password'
                placeholder='твоята парола'
                ref={password}
                onChange={getInput}
              />
            </div>
            <div>
              <label htmlFor='2ndpassword'>потвърди паролата си</label>
              <input
                type='password'
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                id='2ndpassword'
                placeholder='твоята парола'
                ref={passwordConfirm}
                onChange={getInput}
              />
            </div>
            <ToastContainer id='Toastify'/>
            <div className='flex justify-center items-center mt-6'>
              <button
                className={`dark:bg-slate-800 py-2 px-4 text-sm text-black dark:text-white rounded border dark:border-slate-700 focus:outline-none focus:border-green-dark`}
                onClick={handleAction}
              >
                регистрация
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
