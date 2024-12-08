import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";



// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
    apiKey: "AIzaSyADsHfpF-D7xfr_Cun3XNDlQUKmWQUbQHo",
    authDomain: "cafe-neon.firebaseapp.com",
    projectId: "cafe-neon",
    storageBucket: "cafe-neon.firebasestorage.app",
    messagingSenderId: "6554373993",
    appId: "1:6554373993:web:7ee2707b2f325abb4bb7f8",
    measurementId: "G-XG8K8JRHN3"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;