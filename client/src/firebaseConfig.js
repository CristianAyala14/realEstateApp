import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD6cI7JtkEzyTHVkTwUpRvoxpdciN1VpDI",
    authDomain: "realstateapp-75c01.firebaseapp.com",
    projectId: "realstateapp-75c01",
    storageBucket: "realstateapp-75c01.appspot.com",
    messagingSenderId: "600936509864",
    appId: "1:600936509864:web:e683b4d3fe08d44e0ced9d"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
