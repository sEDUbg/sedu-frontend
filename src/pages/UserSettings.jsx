import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'

import { app } from '../utils/Firebase/firebase';
import { doc, getDoc, getFirestore } from "firebase/firestore";

const UserSettings = () => {
  const [userData, setUserData] = useState(null);
  const [userDataChange, setUserDataChange] = useState(false);
  const [button, setButton] = useState("промени");

  const { id } = useParams();

  const handleAction = (e) => {
    e.preventDefault();
    setUserDataChange(true);
    setButton("запази");
  }

  const getInput = (e) => {
    /*         if (e.target.id === 'email') {
              setEmail(e.target.value)
            }
            if (e.target.id === 'password') {
              setPassword(e.target.value)
            } */
  }

  const getData = async () => {
    const firestore = getFirestore(app);
    const docRef = doc(firestore, 'StripeCustomers', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setUserData(docSnap.data());
    } else {
      console.log('No such document!');
      setUserData(null);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='w-screen flex-col items-center justify-center bg-gray-bg1 dark:text-white p-5'>
      <img src={userData?.profileUrl || '/img/default.png'} className='m-auto rounded-full border w-44 dark:border-slate-800 -mb-24'/>
      <div className='w-full max-w-md m-auto bg-white dark:bg-slate-900 rounded-lg border dark:border-slate-700 shadow-default pt-28 py-10 sm:px-16 px-8 divide-y divide-slate-600 space-y-4'>
        <div className=''>
          <form onSubmit={handleAction}>
            <div>
              <div className='grid grid-cols-2 gap-5'>
                <div className=''>
                  <label htmlFor='fistName'>име</label>
                  <input
                    type='text'
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id='fistName'
                    placeholder='име'
                    onChange={getInput}
                    value={userData?.FirstName}
                    readOnly={!userDataChange}
                  />
                </div>
                <div className=''>
                  <label htmlFor='lastName'>фамилия</label>
                  <input
                    type='text'
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id='lastName'
                    placeholder='фамилия'
                    value={userData?.LastName}
                    onChange={getInput}
                    readOnly={!userDataChange}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div className=''>
                  <label htmlFor='school'>училище</label>
                  <input 
                    type='text'
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id='school'
                    placeholder='училище'
                    value={userData?.school}
                    onChange={getInput}
                    readOnly={!userDataChange}
                  />
                </div>
                <div className=''>
                  <label htmlFor='class'>клас</label>
                  <input
                    type='number'
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id='class'
                    placeholder='клас'
                    min='1'
                    max='12'
                    value={userData?.class}
                    onChange={getInput}
                    readOnly={!userDataChange}
                  />
                </div>
              </div>
              <div className='grid grid-cols-1'>
                <div className=''>
                  <label htmlFor='email'>имейл</label>
                  <input
                    type='email'
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id='email'
                    placeholder='имейл'
                    value={userData?.email}
                    onChange={getInput}
                    readOnly={true}
                  />
                </div>
                <div className=''>
                  <label htmlFor='username'>потребителско име</label>
                  <input
                    type='text'
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id='username'
                    placeholder='потребителско име'
                    value={userData?.Username}
                    onChange={getInput}
                    readOnly={true}
                  />
                </div>
                <label htmlFor='bio'>био</label>
                <textarea 
                  id='bio' 
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                  placeholder='био'
                  value={userData?.bio}
                > </textarea>
              </div>

            </div>
            <ToastContainer />
            <div className='flex justify-center items-center mt-6'>
              <button
                className={`dark:bg-slate-800 py-2 px-4 text-sm text-black dark:text-white rounded border dark:border-slate-700 focus:outline-none focus:border-green-dark`}
                onClick={handleAction}
              >
                {button}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserSettings;