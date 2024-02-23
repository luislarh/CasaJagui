import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyA3uWK-jsynv_fo6Elr1atvkjF0WcNAVXg",
  // authDomain: "casajagui-b91a4.firebaseapp.com",
  // projectId: "casajagui-b91a4",
  // storageBucket: "casajagui-b91a4.appspot.com",
  // messagingSenderId: "929805443945",
  // appId: "1:929805443945:web:c0317c3f132d57f27f93f8",
  apiKey: "AIzaSyA3uWK-jsynv_fo6Elr1atvkjF0WcNAVXg",
  authDomain: "casajagui-b91a4.firebaseapp.com",
  projectId: "casajagui-b91a4",
  storageBucket: "casajagui-b91a4.appspot.com",
  messagingSenderId: "929805443945",
  appId: "1:929805443945:web:ec9749feedc79bb77f93f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);