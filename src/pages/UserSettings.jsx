import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'

import { app } from '../utils/Firebase/firebase';
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

const schooList = [
  "91 Немска езикова гимназия 'Професор Константин Гълъбов'",
  "73 СУ с преподаване на чужди езици 'Владислав Граматик'",
  "164 гимназия с преподаване на испански език 'Мигел де Сервантес'",
  "Американски колеж София",
  "Езикова гимназия Пловдив",
  "Частно езиково средно училище 'Дорис Тенеди'",
  "Технологично училище 'Електронни Системи' към ТУ - София",
  "Софийска математическа гимназия 'Паисий Хилендарски'",
  "Първа частна математическа гимназия",

];

const UserSettings = () => {
  const [userData, setUserData] = useState(null);
  const [userDataChange, setUserDataChange] = useState(false);
  const [button, setButton] = useState("промени");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [grade, setGrade] = useState("");
  const [bio, setBio] = useState("");
  const school = useRef("");

  const { id } = useParams();

  const handleAction = (e) => {
    e.preventDefault();
    if (!userDataChange) {
      setUserDataChange(true);
      setButton("запази");
    } else {
      setUserDataChange(false);
      setButton("промени");
      console.log({ firstName: firstName, lastName: lastName, school: school, grade: grade, bio: bio });
      const firestore = getFirestore(app);
      const docRef = doc(firestore, 'StripeCustomers', id);
      updateDoc(docRef, { FirstName: firstName, LastName: lastName, school: school.current.value, class: grade, bio: bio });
    }
  }

  const getInput = (e) => {

    if (e.target.id === 'email') {
      setEmail(e.target.value)
    }
    if (e.target.id === 'firstName') {
      setFirstName(e.target.value)
    }
    if (e.target.id === 'lastName') {
      setLastName(e.target.value)
    }
    if (e.target.id === 'username') {
      setUsername(e.target.value)
    }
    if (e.target.id === 'school') {
      school.current = e.target;
    }
    if (e.target.id === 'class') {
      setGrade(e.target.value)
    }
    if (e.target.id === 'bio') {
      setBio(e.target.value)
    }

  }

  const getData = async () => {
    const firestore = getFirestore(app);
    const docRef = doc(firestore, 'StripeCustomers', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data());
      // setUserData(docSnap.data());
      setFirstName(docSnap.data().FirstName)
      setLastName(docSnap.data().LastName)
      setEmail(docSnap.data().email)
      setUsername(docSnap.data().Username)
      school.current.value = docSnap.data().school;
      setGrade(docSnap.data().class)
      setBio(docSnap.data().bio)

    } else {
      console.log('No such document!');
      setUserData(null);
    }
  }

  useEffect(() => {
    getData().then(() => {
      console.log(userData)
    })
  }, []);

  return (
    <div className='w-screen flex-col items-center justify-center bg-gray-bg1 dark:text-white p-5'>
      <img src={userData?.profileUrl || '/img/default.png'} className='m-auto rounded-full border w-44 dark:border-slate-800 -mb-24' />
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
                    id='firstName'
                    placeholder='име'
                    onChange={getInput}
                    value={firstName}
                    disabled={!userDataChange}
                  />
                </div>
                <div className=''>
                  <label htmlFor='lastName'>фамилия</label>
                  <input
                    type='text'
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id='lastName'
                    placeholder='фамилия'
                    value={lastName}
                    onChange={getInput}
                    disabled={!userDataChange}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div>
                  <label htmlFor='school'>училище</label>
                  <input
                    type='dropdown'
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id='school'
                    placeholder='избери училище'
                    list='schools'
                    ref={school}
                    onChange={getInput}
                    disabled={!userDataChange}
                  />
                  <datalist id='schools'>
                    {schooList.map((type, index) => (<option value={type} key={index} />))}
                  </datalist>
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
                    value={grade}
                    onChange={getInput}
                    disabled={!userDataChange}
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
                    value={email}
                    onChange={getInput}
                    disabled={true}
                  />
                </div>
                <div className=''>
                  <label htmlFor='username'>потребителско име</label>
                  <input
                    type='text'
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id='username'
                    placeholder='потребителско име'
                    value={username}
                    onChange={getInput}
                    disabled={true}
                  />
                </div>
                <label htmlFor='bio'>био</label>
                <textarea
                  id='bio'
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                  placeholder='био'
                  value={bio}
                  onChange={getInput}
                  disabled={!userDataChange}
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