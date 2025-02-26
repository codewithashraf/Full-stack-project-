import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCQc5z2G7Hkpti0dRQp4pFN8XBVmFvgMfE",
  authDomain: "first-project-d0927.firebaseapp.com",
  projectId: "first-project-d0927",
  storageBucket: "first-project-d0927.firebasestorage.app",
  messagingSenderId: "1028323827066",
  appId: "1:1028323827066:web:a0bce63d570094339fcac3",
  databaseURL: "https://first-project-d0927-default-rtdb.firebaseio.com",
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const firestoreDb = getFirestore(app);