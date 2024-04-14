import React, { useState, useEffect } from "react";
import { app, ImageDataBase, TextDataBase } from "../../Database/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SlArrowLeft } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const db = getFirestore(app);
const Edit = () => {
  const [userid, setUserid] = useState(null);
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    setUserid(localStorage.getItem("userId"));
  }, []);

  const [name, setName] = useState("");
  const add = async () => {
    await setDoc(doc(db, "UserDetails", userid), {
      name: name,
      avatar: img,
    });
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
    <div className="bg-black w-full h-screen flex flex-col  relative">
      <h1 className="text-white text-center py-4">Edit Profile</h1>
      <div className="flex flex-col w-full h-[300px] bg-black p-5 shadow-sm shadow-white">
        <div className="w-full h-full flex items-center justify-center gap-4 rounded-full  ">
          <>
            <div className="relative">
              <img
                src={img ? img : "/avatar.webp"}
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

          <input onChange={(e) => setTxt(e.target.value)} className="hidden" />
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
        {" "}
        Save
      </button>

      {/* <input type="file" name="file" id="file" />
      <label htmlFor="file">Choose a file (Click me)</label> */}
    </div>
  );
};

export default Edit;
