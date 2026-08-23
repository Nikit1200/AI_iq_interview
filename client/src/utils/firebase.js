// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "interviewiq-6fa48.firebaseapp.com",
  projectId: "interviewiq-6fa48",
  storageBucket: "interviewiq-6fa48.firebasestorage.app",
  messagingSenderId: "129851960693",
  appId: "1:129851960693:web:0befad3d0a1377e465f73c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth, provider}