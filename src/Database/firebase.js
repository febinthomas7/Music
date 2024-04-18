import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { doc, getFirestore, getDoc, onSnapshot } from "firebase/firestore";
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
export const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("user", "true");
    localStorage.setItem("userId", JSON.stringify(user.uid));
  } else {
    localStorage.setItem("user", "false");
    localStorage.setItem("userId", "");
    localStorage.setItem("userImage", "");
    localStorage.setItem("username", "");
    localStorage.setItem("artistId", "");
  }

  console.log("load");
});

let user = localStorage.getItem("userId");
let active = localStorage.getItem("user");

const docRef = doc(db, "UserDetails", user ? user : "122324234");
const get = async () => {
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let data = docSnap.data();
    if (active == "true") {
      localStorage.setItem("userImage", JSON.stringify(data.avatar));
      localStorage.setItem("username", data.name);
    }

    if (data.name == "") {
      console.log("No such document!");
    }
  }
};
get();

const getUserLiked = () => {
  onSnapshot(doc(db, "userLikedDetails", user ? user : "122324234"), (doc) => {
    if (active == "true") {
      localStorage.setItem("artistId", JSON.stringify(doc.data()?.artistId));
    }
  });
};

getUserLiked();
