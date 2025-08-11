// Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOoHG3GexqhqHne_NVfZs_pfnvBQl_CHw",
  authDomain: "meeting-74e58.firebaseapp.com",
  projectId: "meeting-74e58",
  storageBucket: "meeting-74e58.firebasestorage.app",
  messagingSenderId: "64902785756",
  appId: "1:64902785756:web:57e109a126125be11ca219",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
