// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByKfXvWSu8cyE8qT7P0xtTKx92H9ui6Zs",
  authDomain: "ecommerce-92823.firebaseapp.com",
  projectId: "ecommerce-92823",
  storageBucket: "ecommerce-92823.appspot.com",
  messagingSenderId: "333121819072",
  appId: "1:333121819072:web:10b897d1006257dd9ff825"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=getFirestore(app);

