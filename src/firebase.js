import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";


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