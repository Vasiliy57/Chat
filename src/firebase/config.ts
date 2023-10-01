// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuB6G_1vQEuVrJk6cp25ZogSnbXUACs0o",
  authDomain: "messenger-7a8c6.firebaseapp.com",
  projectId: "messenger-7a8c6",
  storageBucket: "messenger-7a8c6.appspot.com",
  messagingSenderId: "703148053411",
  appId: "1:703148053411:web:122722f31b98f8cace0016",
  measurementId: "G-FJXV30FWF2"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)