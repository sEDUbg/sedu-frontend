import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

import { app } from '../utils/Firebase/firebase';
import { getAuth, signInWithEmailAndPassword, } from 'firebase/auth';
import { getFirestore, getDoc, doc, query } from "firebase/firestore";

import UploadFile from "../partials/Upload/UploadFile";

const subjects = [
    "Математика", "Български език", "Литература", "Химия", "Физика", "Биология", "История",
    "География", "Философия", "Гражданско образование", "ИТ", "Човекът и природата", "Човекът и обществото",
    "Околен свят", "Английски език", "Немски език", "Руски език", "Испански език", "Френски език", "Програмиране"
];

const typeList = [
    "презентация", "текстов документ", "анимация", "видео", "снимки", "друго"
];

const Upload = () => {
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState();
    const subject = useRef('');
    const type = useRef('');
    let navigate = useNavigate();

    const handleAction = (e) => {
        e.preventDefault();
        navigate('/upload_successful');
    }

    const getInput = (e) => {
        if (e.target.id === 'title') {
            setTitle(e.target.value)
        }
        if (e.target.id === 'grade') {
            setGrade(e.target.value)
        }
        if (e.target.id === 'subject') {
            subject.current = e.target
        }
        if (e.target.id === 'type') {
            type.current = e.target
        }
    }

    return (
        <div className="w-screen flex bg-gray-bg1 dark:text-white p-5">
            <div className='w-full max-w-xl m-auto bg-gray-100 dark:bg-slate-900 rounded-lg border dark:border-slate-700 shadow-default py-10 px-16 divide-y divide-neutral-200 dark:divide-slate-600 space-y-4'>
                <div className='text-center flex items-center justify-center space-x-2'>
                    <img src='sedubg.png' alt='logo' className='w-12' />
                    <h1 className='text-2xl font-black'>качване на материал</h1>
                </div>
                <div className=''>
                    <form onSubmit={handleAction}>
                        <div className='md:mt-4 md:flex md:space-x-4'>
                            <div>
                                <div>
                                    <label htmlFor='title'>заглавие</label>
                                    <input
                                        type='text'
                                        className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                                        id='title'
                                        placeholder='интересно заглавие'
                                        onChange={getInput}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='type'>вид</label>
                                    <input
                                        type='dropdown'
                                        className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                                        id='type'
                                        placeholder='избери вид'
                                        list='types'
                                        ref={type}
                                        onChange={getInput}
                                    />
                                    <datalist id='types'>
                                        {typeList.map((type, index) => (<option value={type} key={index} />))}
                                    </datalist>
                                </div>
                            </div>
                            <div className='md:pb-5'>
                                <label htmlFor='description'>описание</label>
                                <textarea
                                    type='text'
                                    className={`w-full h-full resize-none p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                                    id='description'
                                    placeholder='описание на материала'
                                    resizable='false'
                                    onChange={getInput}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='subjects'>предмет</label>
                            <input
                                type='dropdown'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                                id='subject'
                                placeholder='предмет'
                                list='subjects'
                                ref={subject}
                                onChange={getInput}
                            />
                            <datalist id='subjects'>
                                {subjects.map((subject, index) => (<option value={subject} key={index} />))}
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor='grade'>клас</label>
                            <input
                                type='number'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out my-4 text-black`}
                                id='grade'
                                placeholder='клас'
                                min='1'
                                max='12'
                                onChange={getInput}
                            />
                        </div>
                        <UploadFile />
                        <ToastContainer />
                        <div className='flex justify-center items-center mt-6'>
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
}

export default Upload;