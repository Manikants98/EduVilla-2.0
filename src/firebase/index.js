import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZRmJ1Q3StM9cB3lLx1jwOlKCngNo3fbM",
  authDomain: "elearning-mkx.firebaseapp.com",
  databaseURL:
    "https://elearning-mkx-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "elearning-mkx",
  storageBucket: "elearning-mkx.appspot.com",
  messagingSenderId: "1066984308510",
  appId: "1:1066984308510:web:f72ac2cef585074f4d530f",
  measurementId: "G-9X2XBY7SVW",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
