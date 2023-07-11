// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABwWfSHtrscOdcuvqLhIFiIlNfrbrSZHI",
  authDomain: "react-chat-app-c7488.firebaseapp.com",
  projectId: "react-chat-app-c7488",
  storageBucket: "react-chat-app-c7488.appspot.com",
  messagingSenderId: "601307698708",
  appId: "1:601307698708:web:66f41ca9ba36082b3c7901",
  measurementId: "G-0PFW6KEGLS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const storage =getStorage(app)
export const db =getFirestore(app)