import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { FileDrop } from "react-file-drop";
import axios from "axios";

//import UploadFile from "../partials/Upload/UploadFile";

const subjects = [
  "Математика",
  "Български език",
  "Литература",
  "Химия",
  "Физика",
  "Биология",
  "История",
  "География",
  "Философия",
  "Гражданско образование",
  "ИТ",
  "Човекът и природата",
  "Човекът и обществото",
  "Околен свят",
  "Английски език",
  "Немски език",
  "Руски език",
  "Испански език",
  "Френски език",
  "Програмиране",
];

const typeList = [
  "презентация",
  "текстов документ",
  "анимация",
  "видео",
  "снимки",
  "друго",
];

const Upload = () => {
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState();
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const subject = useRef("");
  const type = useRef("");
  let navigate = useNavigate();

  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const handleAction = (e) => {
    e.preventDefault();
    toast.dismiss();
    if (
      !title ||
      !description ||
      !grade ||
      !subject.current ||
      !type.current ||
      !file
    ) {
      if (!toast.isActive("error")) {
        toast.error("Моля попълнете всички полета!", {
          toastId: "error",
          autoClose: 3000,
        });
      }
    } else {
      var path;
      if (type.current.value === "презентация") {
        path = "Presentations";
      } else if (type.current.value === "текстов документ") {
        path = "Documents";
      } else if (type.current.value === "анимация") {
        path = "Animations";
      } else if (type.current.value === "видео") {
        path = "Videos";
      } else if (type.current.value === "снимки") {
        path = "Pictures";
      } else {
        path = "Other";
      }

      console.log("FILE: ", file);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("grade", grade);
      formData.append("subject", subject.current.value);
      formData.append("type", type.current.value);
      formData.append("file", [file]);
      formData.append("tags", []);
      axios
        .post(
          "https://monkfish-app-swhuo.ondigitalocean.app/api/post/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getInput = (e) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    }
    if (e.target.id === "description") {
      setDescription(e.target.value);
    }
    if (e.target.id === "grade") {
      setGrade(e.target.value);
    }
    if (e.target.id === "subject") {
      subject.current = e.target;
    }
    if (e.target.id === "type") {
      type.current = e.target;
    }
  };

  const onFileInputChange = (event) => {
    const { files } = event.target;
    //console.log(files[0]);
    setFile(files[0]);
    setFileName(files[0].name);
  };

  const onDropFile = (event) => {
    //console.log(event[0]);
    setFile(event[0]);
    setFileName(event[0].name);
  };

  return (
    <div className="w-screen flex bg-gray-bg1 dark:text-white p-5">
      <div className="w-full max-w-xl m-auto bg-gray-100 dark:bg-slate-900 rounded-lg border dark:border-slate-700 shadow-default py-10 px-16 divide-y divide-neutral-200 dark:divide-slate-600 space-y-4">
        <div className="text-center flex items-center justify-center space-x-2">
          <img src="sedubg.png" alt="logo" className="w-12" />
          <h1 className="text-2xl font-black">качване на материал</h1>
        </div>
        <div className="">
          <form onSubmit={handleAction}>
            <div className="md:mt-4 md:flex md:space-x-4">
              <div>
                <div>
                  <label htmlFor="title">заглавие</label>
                  <input
                    type="text"
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id="title"
                    placeholder="интересно заглавие"
                    onChange={getInput}
                  />
                </div>
                <div>
                  <label htmlFor="type">вид</label>
                  <input
                    type="dropdown"
                    className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                    id="type"
                    placeholder="избери вид"
                    list="types"
                    ref={type}
                    onChange={getInput}
                  />
                  <datalist id="types">
                    {typeList.map((type, index) => (
                      <option value={type} key={index} />
                    ))}
                  </datalist>
                </div>
              </div>
              <div className="md:pb-5">
                <label htmlFor="description">описание</label>
                <textarea
                  type="text"
                  className={`w-full h-full resize-none p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                  id="description"
                  placeholder="описание на материала"
                  resizable="false"
                  onChange={getInput}
                />
              </div>
            </div>
            <div>
              <label htmlFor="subjects">предмет</label>
              <input
                type="dropdown"
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                id="subject"
                placeholder="предмет"
                list="subjects"
                ref={subject}
                onChange={getInput}
              />
              <datalist id="subjects">
                {subjects.map((subject, index) => (
                  <option value={subject} key={index} />
                ))}
              </datalist>
            </div>
            <div>
              <label htmlFor="grade">клас</label>
              <input
                type="number"
                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                id="grade"
                placeholder="клас"
                min="1"
                max="12"
                onChange={getInput}
              />
            </div>
            <FileDrop
              onTargetClick={onTargetClick}
              onDrop={onDropFile}
              className="flex justify-center items-center w-full h-32 px-4 transition bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-800 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 dark:hover:border-slate-700 focus:outline-none"
            >
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  Drop files to Attach, or{" "}
                  <span className="text-blue-600 underline">browse</span>
                </span>
              </span>
            </FileDrop>
            <input
              onChange={onFileInputChange}
              ref={fileInputRef}
              type="file"
              className="hidden"
            />
            <h1 className="text-2xl text-center font-black">{fileName}</h1>
            <h1 className="text-2xl text-center font-black">
              Upload : {progress}%
            </h1>
            <ToastContainer />
            <div className="flex justify-center items-center mt-6">
              <button
                className={`dark:bg-slate-800 py-2 px-4 text-sm text-black dark:text-white rounded border dark:border-slate-700 focus:outline-none focus:border-green-dark`}
                onClick={handleAction}
              >
                качване
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
