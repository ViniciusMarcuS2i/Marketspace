import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA2bqvZEJzRacDv_ERfD-APES2XMCjUXuc",
  authDomain: "marketspace-5d0a1.firebaseapp.com",
  projectId: "marketspace-5d0a1",
  storageBucket: "marketspace-5d0a1.firebasestorage.app",
  messagingSenderId: "500120234863",
  appId: "1:500120234863:web:19ac0bb26685448b10569a",
  measurementId: "G-17MHQF82YY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)