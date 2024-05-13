import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Stream from "../../component/Stream";
import { app } from "../../Database/firebase";

import { doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(app);

const WatchStream = () => {
  const location = useLocation();
  const [img, setImg] = useState(JSON.parse(localStorage.getItem("userImage")));
  const [id, setId] = useState({
    id: location.state?.id,
  });
  const [role, setRole] = useState({
    role: location.state?.role,
  });

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
    <div>
      <Stream id={id.id} role={role.role} />
    </div>
  );
};

export default WatchStream;
