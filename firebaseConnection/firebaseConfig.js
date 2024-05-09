// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwdT25t5_qabqSPgq4Si9mexxzcGiSV1Y",
  authDomain: "proyecto-web-2-react-native.firebaseapp.com",
  projectId: "proyecto-web-2-react-native",
  storageBucket: "proyecto-web-2-react-native.appspot.com",
  messagingSenderId: "427280416027",
  appId: "1:427280416027:web:bcba4abe4ce06dc66ee7be",
  measurementId: "G-QB57E21X6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);