import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { app } from '../utils/Firebase/firebase';
import { doc, getDoc, getFirestore } from "firebase/firestore";

const UserSettings = () => {
  const [userData, setUserData] = useState(null);
  const { id } = useParams();

  const handleAction = (e) => {
    e.preventDefault();
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
    <div className='h-screen w-screen flex bg-gray-bg1 dark:text-white p-5'>
      <div className='w-full max-w-md m-auto bg-white dark:bg-slate-900 rounded-lg border dark:border-slate-700 shadow-default py-10 px-16 divide-y divide-slate-600 space-y-4'>
        <div className=''>
          <form onSubmit={handleAction}>
            <div>
              <label htmlFor=''>име</label>
              <input
                type='text'
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                id='fistName'
                placeholder='име'
                onChange={getInput}
                value={userData?.FirstName}
                readOnly={true}
              />
              <input
                type='text'
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                id='lastName'
                placeholder='фамилия'
                value={userData?.LastName}
                onChange={getInput}
                readOnly={true}
              />
            </div>
            <div>
              <input
                type='text'
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                id='lastName'
                placeholder='фамилия'
                value={userData?.LastName}
                onChange={getInput}
                readOnly={true}
              />
            </div>

            {/* <ToastContainer /> */}
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
  )
}

export default UserSettings;