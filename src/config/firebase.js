import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth" // bejelentkezéshez
import {getFirestore} from "firebase/firestore"   // db-hez

// firebase oldalról másolva - ez minden projektnél más
const firebaseConfig = {
  apiKey: "AIzaSyBsB0aXsjYxWF7NN0C_OKqy-bNfDvrrsAg",
  authDomain: "shopping-list-24586.firebaseapp.com",
  databaseURL: "https://shopping-list-24586-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shopping-list-24586",
  storageBucket: "shopping-list-24586.firebasestorage.app",
  messagingSenderId: "922029933360",
  appId: "1:922029933360:web:50b238d06982f21ceabef5",
  measurementId: "G-3W9ZGJNX05"
};

const app = initializeApp(firebaseConfig);

// bejelenzkezéshez
export const auth = getAuth(app)    
export const googleProvider = new GoogleAuthProvider()

// db-hez
export const db = getFirestore(app)