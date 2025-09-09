// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIYBTEnQOzIEuR_9LSih_5hwItWLY-xzU",
  authDomain: "happywheel-91ecb.firebaseapp.com",
  projectId: "happywheel-91ecb",
  storageBucket: "happywheel-91ecb.firebasestorage.app",
  messagingSenderId: "164670191100",
  appId: "1:164670191100:web:e61238426a96cb0fd6ee79",
  measurementId: "G-KFVNT8F1MS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();