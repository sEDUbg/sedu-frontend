// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtMCmY4hm7wY8UiENPB2kbcnz1ExK-pUU",
  authDomain: "sedubg-2022.firebaseapp.com",
  projectId: "sedubg-2022",
  storageBucket: "sedubg-2022.appspot.com",
  messagingSenderId: "843342829716",
  appId: "1:843342829716:web:0c4d66c647cead8ca73c81",
  measurementId: "G-903L55PHW1",
};

export const provider = new GoogleAuthProvider();
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app);
