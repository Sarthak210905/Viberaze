// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPExweh-ZQg09kh8wm0JTBZ-SdXAp9f_c",
  authDomain: "nice-gate-438817-f5.firebaseapp.com",
  projectId: "nice-gate-438817-f5",
  storageBucket: "nice-gate-438817.appspot.com",
  messagingSenderId: "80604289618",
  appId: "1:80604289618:web:b0de855f9fe8e1f60edd8b",
  
  measurementId: "G-T5RNPKWJ10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export {fireDB, auth, storage}