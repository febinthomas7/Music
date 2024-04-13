import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../Database/firebase";
const auth = getAuth(app);
import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(app);

// Add a new document in collection "cities"

const Profile = () => {
  const [userid, setUserid] = useState("user");
  const add = async () => {
    await setDoc(doc(db, "UserDetails", userid), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
    });
  };

  onAuthStateChanged(auth, (user) => {
    setUserid(user.uid);
  });

  console.log(userid);
  return (
    <div>
      <div>
        <button onClick={add}>
          <h1>click</h1>
        </button>
        <img src="" alt="" />
      </div>
      <div>
        <h1>Febin</h1>
        <h1>email</h1>
      </div>
    </div>
  );
};

export default Profile;
