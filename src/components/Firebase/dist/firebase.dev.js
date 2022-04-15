"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = exports.app = exports.provider = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _storage = require("firebase/storage");

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAtMCmY4hm7wY8UiENPB2kbcnz1ExK-pUU",
  authDomain: "sedubg-2022.firebaseapp.com",
  projectId: "sedubg-2022",
  storageBucket: "sedubg-2022.appspot.com",
  messagingSenderId: "843342829716",
  appId: "1:843342829716:web:0c4d66c647cead8ca73c81",
  measurementId: "G-903L55PHW1"
};
var provider = new _auth.GoogleAuthProvider();
exports.provider = provider;
var app = (0, _app.initializeApp)(firebaseConfig);
exports.app = app;
var storage = (0, _storage.getStorage)(app);
exports.storage = storage;