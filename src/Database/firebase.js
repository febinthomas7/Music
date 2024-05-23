import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { doc, getFirestore, getDoc, onSnapshot } from "firebase/firestore";

const firebaseApiKey = import.meta.env.VITE_CLIENT_FIREBASE_API_KEY;
const firebaseConfig = {
  apiKey: firebaseApiKey,
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
export const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("user", "true");
    localStorage.setItem("userId", JSON.stringify(user.uid));
  } else {
    localStorage.setItem("user", "false");
    localStorage.removeItem("userId");
    localStorage.setItem("userImage", JSON.stringify("/avatar.webp"));
    localStorage.removeItem("username");
    localStorage.setItem("artistId", "[249531616,2495656]");
  }
});

let user = localStorage.getItem("userId");
let active = localStorage.getItem("user");

const docRef = doc(db, "UserDetails", user ? user : "122324234");
const get = async () => {
  const docSnap = await getDoc(docRef);

  let data = docSnap.data();
  if (active == "true") {
    if (data) {
      localStorage.setItem("userImage", JSON.stringify(data.avatar));
      localStorage.setItem("username", data.name);
    } else {
      localStorage.setItem("userImage", JSON.stringify("/avatar.webp"));
      localStorage.setItem("username", "your Name");
    }
  }
};
get();

const getUserLiked = () => {
  onSnapshot(doc(db, "userLikedDetails", user ? user : "122324234"), (doc) => {
    if (active == "true") {
      if (doc.data()?.artistId) {
        localStorage.setItem("artistId", JSON.stringify(doc.data()?.artistId));
      } else {
        localStorage.setItem(
          "artistId",
          JSON.stringify(["7ouMYWpwJ422jRcDASZB7P"])
        );
      }
    }
  });
};

getUserLiked();
