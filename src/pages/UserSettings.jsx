import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FileDrop } from "react-file-drop";
import { app } from "../utils/Firebase/firebase";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import axios from "axios";

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
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const school = useRef("");
  const fileInputRef = useRef(null);

  const onDropFile = (event) => {
    //console.log(event[0]);
    setFile(event[0]);
    setFileName(event[0].name);
  };

  const onFileInputChange = (event) => {
    const { files } = event.target;
    //console.log(files[0]);
    setFile(files[0]);
    setFileName(files[0].name);
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (file != null) setImage(URL.createObjectURL(file));
  }, [file]);

  const handleAction = (e) => {
    e.preventDefault();
    // console.log(file)
    if (userDataChange) {
      var user = {
        first_name: firstName,
        last_name: lastName,
        school: school.current.value,
        grade: grade,
        email: email,
        username: username,
        bio: bio,
        avatar: image
      };
      setUserDataChange(false);
      setButton("промени");
      axios.post(`https://monkfish-app-swhuo.ondigitalocean.app/api/user/edit`, user, { withCredentials: true })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      setUserDataChange(true);
      setButton("запази");
    }
  };

  const getInput = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    }
    if (e.target.id === "firstName") {
      setFirstName(e.target.value);
    }
    if (e.target.id === "lastName") {
      setLastName(e.target.value);
    }
    if (e.target.id === "username") {
      setUsername(e.target.value);
    }
    if (e.target.id === "school") {
      school.current = e.target;
    }
    if (e.target.id === "class") {
      setGrade(e.target.value);
    }
    if (e.target.id === "bio") {
      setBio(e.target.value);
    }
  };

  useEffect(() => {
    axios
      .get("https://monkfish-app-swhuo.ondigitalocean.app/api/user/me", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setEmail(response.data.user.Email);
          setUsername(response.data.user.Username);
          setFirstName(response.data.user.FirstName);
          setLastName(response.data.user.LastName);
          setGrade(response.data.user.UsersInfo.Grade);
          setBio(response.data.user.UsersInfo.Bio);
          setImage(response.data.user.UsersInfo.Avatar);
          school.current.value = response.data.user.UsersInfo.School.Name;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-screen flex-col items-center justify-center bg-gray-bg1 dark:text-white p-5">
      {!userDataChange ? (
        <img
          src={image || "/img/default.png"}
          className="m-auto rounded-full border w-44 dark:border-slate-800 -mb-24 aspect-square"
        />
      ) : (
        <div>
          {" "}
          <FileDrop onTargetClick={onTargetClick} onDrop={onDropFile}>
            <img
              src={image || "/img/default.png"}
              className="m-auto rounded-full border w-44 h-44 dark:border-slate-800 -mb-24 aspect-square"
            />
          </FileDrop>
          <input
            onChange={onFileInputChange}
            ref={fileInputRef}
            type="file"
            className="hidden"
          />{" "}
        </div>
      )}
      <div className="w-full max-w-md m-auto bg-white dark:bg-slate-900 rounded-lg border dark:border-slate-700 shadow-default pt-28 py-10 sm:px-16 px-8 divide-y divide-slate-600 space-y-4">
        <div className="">
          <form onSubmit={handleAction}>
            <div>
              <div className="grid grid-cols-2 gap-5">
                <div className="">
                  <label htmlFor="fistName">име</label>
                  <input
                    type="text"
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id="firstName"
                    placeholder="име"
                    onChange={getInput}
                    value={firstName}
                    disabled={!userDataChange}
                  />
                </div>
                <div className="">
                  <label htmlFor="lastName">фамилия</label>
                  <input
                    type="text"
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id="lastName"
                    placeholder="фамилия"
                    value={lastName}
                    onChange={getInput}
                    disabled={!userDataChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="school">училище</label>
                  <input
                    type="dropdown"
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id="school"
                    placeholder="избери училище"
                    list="schools"
                    ref={school}
                    onChange={getInput}
                    disabled={!userDataChange}
                  />
                  <datalist id="schools">
                    {schooList.map((type, index) => (
                      <option value={type} key={index} />
                    ))}
                  </datalist>
                </div>
                <div className="">
                  <label htmlFor="class">клас</label>
                  <input
                    type="number"
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id="class"
                    placeholder="клас"
                    min="1"
                    max="12"
                    value={grade}
                    onChange={getInput}
                    disabled={!userDataChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="">
                  <label htmlFor="email">имейл</label>
                  <input
                    type="email"
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id="email"
                    placeholder="имейл"
                    value={email}
                    onChange={getInput}
                    disabled={true}
                  />
                </div>
                <div className="">
                  <label htmlFor="username">потребителско име</label>
                  <input
                    type="text"
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id="username"
                    placeholder="потребителско име"
                    value={username}
                    onChange={getInput}
                    disabled={true}
                  />
                </div>
                <label htmlFor="bio">био</label>
                <textarea
                  id="bio"
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                  placeholder="био"
                  value={bio}
                  onChange={getInput}
                  disabled={!userDataChange}
                >
                  {" "}
                </textarea>
              </div>
            </div>
            <ToastContainer />
            <div className="flex justify-center items-center mt-6">
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
  );
};

export default UserSettings;
