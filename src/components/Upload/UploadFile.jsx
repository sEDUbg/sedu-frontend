import React, { useState, useRef } from "react";
import { FileDrop } from 'react-file-drop';

const fileTypes = ["JPG", "PNG", "GIF", "MP4", "PPTX", "PDF", "DOCX", "XLSX"];

const UploadFile = () => {
    const fileInputRef = useRef(null);
    const onFileInputChange = (event) => {
        const { files } = event.target;
        // do something with your files...
    }
    const onTargetClick = () => {
        fileInputRef.current.click()
    }

    return (
        <>
            <FileDrop onTargetClick={onTargetClick} className="flex justify-center items-center w-full h-32 px-4 transition bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-800 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 dark:hover:border-slate-700 focus:outline-none">
                <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-600">Drop files to Attach, or <span className="text-blue-600 underline">browse</span>
                    </span>
                </span>
            </FileDrop>
            <input
            onChange={onFileInputChange}
            ref={fileInputRef}
            type="file"
            className="hidden"
            />
        </>
    );
/*     const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
    };
    return (
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    ); */
/*     return (
        <div className="max-w-xl">
            <label
                className="flex justify-center w-full h-32 px-4 transition bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-800 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 dark:hover:border-slate-700 focus:outline-none">
                <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-600">Drop files to Attach, or <span className="text-blue-600 underline">browse</span>
                    </span>
                </span>
                <input type="file" name="file_upload" className="hidden" />
            </label>
        </div>
    ); */
}

export default UploadFile;