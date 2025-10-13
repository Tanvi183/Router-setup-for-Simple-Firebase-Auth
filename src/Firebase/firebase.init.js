// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCmR1Tf1O2iikG38a1qYSP_XC0xpVjYEA",
  authDomain: "simple-firebase-auth-7be21.firebaseapp.com",
  projectId: "simple-firebase-auth-7be21",
  storageBucket: "simple-firebase-auth-7be21.firebasestorage.app",
  messagingSenderId: "810326549365",
  appId: "1:810326549365:web:02f1f0ac55479da12ba93c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
