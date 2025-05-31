// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVLZtY8YxAcrFOXYzAVP7g2ypgzJTAugQ",
  authDomain: "first-project-df198.firebaseapp.com",
  projectId: "first-project-df198",
  storageBucket: "first-project-df198.firebasestorage.app",
  messagingSenderId: "754580517607",
  appId: "1:754580517607:web:35a682450115895735a842",
  measurementId: "G-5D3THC78VT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export default firebaseConfig;

