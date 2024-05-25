import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig  = {
  apiKey: "AIzaSyBoCu-ZkUjJ7mY6xwJ2_f9_CH0qSUlzrsM",
  authDomain: "olx-original.firebaseapp.com",
  projectId: "olx-original",
  storageBucket: "olx-original.appspot.com",
  messagingSenderId: "121614219463",
  appId: "1:121614219463:web:452e4baee90122500ba6e2",
  measurementId: "G-E2EE6FCJ53"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
export { firestore, auth };




