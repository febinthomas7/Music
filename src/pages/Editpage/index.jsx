import React, { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../Database/firebase";
const auth = getAuth(app);
import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(app);
onAuthStateChanged(auth, (user) => {
  const url = new URL("https://edit/pathn?q=febin");
  console.log(url.pathname);
});
// const [userid, setUserid] = useState("user");

const Edit = () => {
  const [userid, setUserid] = useState("user");

  const [name, setName] = useState("");
  const add = async () => {
    await setDoc(doc(db, "UserDetails", userid), {
      name: name,
    });
  };

  return (
    <div className="bg-black w-full h-screen flex justify-center items-center">
      <input
        type="text"
        placeholder="Your name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="text-black"
      />
      <button onClick={add} className="text-white">
        {" "}
        submit
      </button>
    </div>
  );
};

export default Edit;
