import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const ImageDataBase = getStorage(app);
export const TextDataBase = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("user", "true");
  } else {
    localStorage.setItem("user", "false");
  }
});
