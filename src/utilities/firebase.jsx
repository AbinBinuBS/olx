import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig  = {
  apiKey: "AIzaSyBoCu-ZkUjJ7mY6xwJ2_f9_CH0qSUlzrsM",
  authDomain: "olx-original.firebaseapp.com",
  projectId: "olx-original",
  storageBucket: "olx-original.appspot.com",
  messagingSenderId: "121614219463",
  appId: "1:121614219463:web:452e4baee90122500ba6e2",
  measurementId: "G-E2EE6FCJ53"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Export for use in other components
export { firestore, auth };
