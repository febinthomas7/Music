import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCtjkpkL1oXUl9tEooe7jDQLbVJY_Vwcmw",
  authDomain: "music-app-232ac.firebaseapp.com",
  projectId: "music-app-232ac",
  storageBucket: "music-app-232ac.appspot.com",
  messagingSenderId: "871712225022",
  appId: "1:871712225022:web:aa773d8b3f900f82ad17af",
  measurementId: "G-VR954MJTYX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
