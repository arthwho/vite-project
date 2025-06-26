import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoY06h55-Hedcveqx1MDhB0v_djkITsLg",
  authDomain: "seer-58f18.firebaseapp.com",
  projectId: "seer-58f18",
  storageBucket: "seer-58f18.firebasestorage.app",
  messagingSenderId: "464867424194",
  appId: "1:464867424194:web:4fb477db430e2b1af0085b",
  measurementId: "G-4ZRRERXTE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Nome: Arthur Silva Ferreira Coelho
// Matrícula: 22.2.8100

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 