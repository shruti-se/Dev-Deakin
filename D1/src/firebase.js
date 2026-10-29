import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMQeC7PF447BBXgvNfj_1UuyuD_9wPCRg",
  authDomain: "dev-deakin-pr.firebaseapp.com",
  projectId: "dev-deakin-pr",
  storageBucket: "dev-deakin-pr.firebasestorage.app",
  messagingSenderId: "856404886846",
  appId: "1:856404886846:web:4a52986ab1344f647bd86f",
  measurementId: "G-FNDWW2T3J5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);