import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Stream from "../../component/Stream";
import { app } from "../../Database/firebase";

import { doc, setDoc, getFirestore } from "firebase/firestore";
import { act } from "react-dom/test-utils";
const db = getFirestore(app);

const WatchStream = () => {
  const location = useLocation();
  const [active, setActive] = useState(localStorage.getItem("user"));
  const [img, setImg] = useState(JSON.parse(localStorage.getItem("userImage")));
  const [id, setId] = useState({
    id: location.state?.id,
  });
  const [role, setRole] = useState({
    role: location.state?.role,
  });
  useEffect(() => {
    if (active == "false") {
      window.location.href = "/live";
    }
  }, []);

  useEffect(() => {
    const add = async () => {
      await setDoc(doc(db, "liveDetails", id.id), {
        artistId: id.id,
        userImg: img == "" ? "/avatar.webp" : img,
      });
    };
    if (role.role == "Host") {
      add();
    }
  }, []);

  return (
    <div>{active == "true" && <Stream id={id.id} role={role.role} />}</div>
  );
};

export default WatchStream;
