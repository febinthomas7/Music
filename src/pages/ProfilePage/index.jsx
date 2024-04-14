import React, { useState, useEffect } from "react";
import { app } from "../../Database/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";
const db = getFirestore(app);
import { SlArrowLeft } from "react-icons/sl";

const Profile = () => {
  const [userid, setUserid] = useState("0UJRMeU6npgYZVEKnOT");
  const [active, setActive] = useState(null);

  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    setUserid(localStorage.getItem("userId"));
    setActive(localStorage.getItem("user"));
  }, []);

  const docRef = doc(db, "UserDetails", userid);
  const get = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      console.log(data, "data");
      if (active == "true") {
        setUsername(data.name);
        setUserImage(data.avatar);
      }

      if (data.name == "") {
        console.log("No such document!");
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      get();
    }, 500);
  });

  return (
    <div className="flex bg-black h-screen w-full relative">
      <Link to="/" className="absolute">
        <SlArrowLeft className="text-gray-300 absolute text-[20px] top-6 left-4" />
      </Link>
      <div className="flex flex-col w-full h-[350px] bg-black p-5 bg-gradient-to-b from-[#ee3050] from-10% via-[#881327] via-40% to-black to-90% shadow-sm shadow-white">
        <div className="h-full flex">
          <Link to="/edit">
            <div className="w-[150px] h-full flex items-center justify-center  overflow-hidden">
              <img
                src={
                  active == "true"
                    ? userImage == ""
                      ? "/avatar.webp"
                      : userImage
                    : "/avatar.webp"
                }
                alt=""
                className=" w-[150px] h-[150px] object-cover  rounded-full"
              />
            </div>
          </Link>

          <div className="  h-full flex justify-center items-center w-[150px]">
            <h1 className="text-[20px] w-full p-4 text-white">
              {active == "true"
                ? username == ""
                  ? "Your name"
                  : username
                : "User"}
            </h1>
          </div>
        </div>
        <Link to="/edit">
          <button className="px-[10px] py-[4px] text-[15px] bg-transparent border-[1px] w-[70px] font-thin text-white rounded-3xl">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
