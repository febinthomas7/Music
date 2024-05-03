import React, { useState, useEffect } from "react";
import { app, ImageDataBase } from "../../Database/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { LiaSpinnerSolid } from "react-icons/lia";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SlArrowLeft } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const db = getFirestore(app);
const Edit = () => {
  const [userid, setUserid] = useState("0UJRMeU6npgYZVEKnOT");
  const [userImage, setUserImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [img, setImg] = useState(JSON.parse(localStorage.getItem("userImage")));
  const [active, setActive] = useState(null);
  const [name, setName] = useState(localStorage.getItem("username"));

  useEffect(() => {
    setUserid(localStorage.getItem("userId"));
    setActive(localStorage.getItem("user"));
    setUsername(localStorage.getItem("username"));
    setUserImage(JSON.parse(localStorage.getItem("userImage")));
  }, []);

  window.addEventListener("load", () => {
    if (active == "false") {
      window.location.href = "/";
    }
  });

  const add = async () => {
    await setDoc(doc(db, "UserDetails", userid), {
      name: name,
      avatar: img,
    });

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/profile";
    }, 1000);
  };

  const handleUpload = (e) => {
    const imgs = ref(ImageDataBase, `${userid}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      getDownloadURL(data.ref).then((url) => {
        setImg(url);
      });
    });
  };

  return (
    <div className="bg-black w-full h-svh flex flex-col  relative">
      <h1 className="text-white text-center py-4">Edit Profile</h1>
      <div className="flex flex-col w-full h-[300px] bg-gradient-to-b  from-[#10132a] via-[#00061a] to-[#000000f9] bg-black p-5 shadow-sm shadow-white">
        <div className="w-full h-full flex items-center justify-center gap-4 rounded-full  ">
          <>
            <div className="relative">
              <img
                src={userImage ? userImage : "/avatar.webp"}
                alt="img"
                htmlFor="file"
                className=" w-[150px] h-[150px] object-cover bg-white rounded-full flex  "
              />
              <label
                htmlFor="file"
                className="text-white text-[30px] absolute bottom-[0px] right-[15px] bg-black shadow-sm shadow-white cursor-pointer"
              >
                <MdEdit />
              </label>
            </div>
          </>

          <input
            onChange={(e) => handleUpload(e)}
            className="w-[100px] hidden"
            type="file"
            name="file"
            id="file"
          />
        </div>

        <div className="   flex  w-full gap-2 pt-4">
          <label htmlFor="name" className="text-white">
            Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="text-[18px] w-full h-[25px] text-white bg-black outline-none"
          />
        </div>
      </div>
      <Link to="/profile">
        <SlArrowLeft className="text-gray-300 absolute text-[20px] top-6 left-4" />
      </Link>

      <button
        onClick={add}
        className="text-gray-300 absolute text-[15px] top-6 right-4"
      >
        {loading ? (
          <LiaSpinnerSolid className="animate-spin text-[20px]" />
        ) : (
          "Save"
        )}
      </button>
    </div>
  );
};

export default Edit;
