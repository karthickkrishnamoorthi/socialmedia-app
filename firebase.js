// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "connect-media-app-8d40d.firebaseapp.com",
  projectId: "connect-media-app-8d40d",
  storageBucket: "connect-media-app-8d40d.appspot.com",
  messagingSenderId: "355352517426",
  appId: "1:355352517426:web:523a0ceea074967eaed52b",
  measurementId: "G-6MS6T25WY2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);