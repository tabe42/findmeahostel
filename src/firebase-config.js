// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider,OAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzTDxXhnKe9CH6u_oLWJLwHLnWVZg4WaQ",
  authDomain: "finemeahostel.firebaseapp.com",
  projectId: "finemeahostel",
  storageBucket: "finemeahostel.appspot.com",
  messagingSenderId: "112724435736",
  appId: "1:112724435736:web:52fd669560cf56e8b4746d",
  measurementId: "G-LSZTFEL41M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app,);
export const provider = new GoogleAuthProvider();
export const yahooProvider = new OAuthProvider('yahoo.com');
