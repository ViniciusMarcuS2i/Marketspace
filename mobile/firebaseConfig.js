import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: "marketspace-5d0a1.firebaseapp.com",
  projectId: "marketspace-5d0a1",
  storageBucket: "marketspace-5d0a1.firebasestorage.app",
  messagingSenderId: "500120234863",
  appId: "1:500120234863:web:19ac0bb26685448b10569a",
  measurementId: "G-17MHQF82YY"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const firestore = getFirestore(app)