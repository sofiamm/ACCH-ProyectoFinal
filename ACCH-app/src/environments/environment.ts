// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF0pl2A_f4nh8dzg8xg5vZjiq5f-pybOo",
  authDomain: "ccdh-proyecto.firebaseapp.com",
  projectId: "ccdh-proyecto",
  storageBucket: "ccdh-proyecto.appspot.com",
  messagingSenderId: "434854050657",
  appId: "1:434854050657:web:071334f8802aa01fe7e320",
  measurementId: "G-772NLXS62F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);