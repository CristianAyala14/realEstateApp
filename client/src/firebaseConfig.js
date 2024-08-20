import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD0uYN94max9RueUwQdMhAmWNdKxf78zdk",
    authDomain: "real-state-app-45a34.firebaseapp.com",
    projectId: "real-state-app-45a34",
    storageBucket: "real-state-app-45a34.appspot.com",
    messagingSenderId: "137830447497",
    appId: "1:137830447497:web:67e4cb6a13771537f24958"
  };

 export const appFB = initializeApp(firebaseConfig)