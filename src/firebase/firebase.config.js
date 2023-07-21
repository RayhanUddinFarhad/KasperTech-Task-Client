// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyC0qKBhht1iADRGvUhuw08Di9kZxgCVpr4",
  authDomain: "kaspertech-7fcad.firebaseapp.com",
  projectId: "kaspertech-7fcad",
  storageBucket: "kaspertech-7fcad.appspot.com",
  messagingSenderId: "743303649546",
  appId: "1:743303649546:web:ca65cfd034242c7b8402f3",
  measurementId: "G-JR04FZXFG7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
