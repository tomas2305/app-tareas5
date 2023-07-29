// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '${{secrets.FIREBASE_API_KEY}}',
  authDomain: '${{secrets.FIREBASE_AUTH_DOMAIN}}',
  databaseURL: '${{secrets.FIREBASE_DATABASE_URL}}',
  projectId: 'app-tareas5',
  storageBucket: '${{secrets.FIREBASE_STORAGE_BUCKET}}',
  messagingSenderId: '${{secrets.FIREBASE_MESSAGING_SENDER_ID}}',
  appId: '${{secrets.FIREBASE_APP_ID}}'
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);