import React, { useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../Database/firebase";
// const auth = getAuth(app);

const Downloader = ({ fileInput, fileName }) => {
  // const [file, setFile] = useState(false);

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setFile(false);
  //   }
  // });

  console.log("h");
  const download = (e) => {
    e.preventDefault();
    fetchFile(fileInput);
  };

  const fetchFile = (url) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        let temp = URL.createObjectURL(blob);
        let aTag = document.createElement("a");
        aTag.href = temp;
        aTag.download = `${fileName}`;
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  return (
    <button
      onClick={download}
      className="shadow-[#6b2828] py-[2px] px-4 bg-black text-white rounded-md shadow-lg sm:shadow-[#6b2828] sm:shadow-2xl"
    >
      {/* {file ? "Download" : "sign in"} */}
      Download
    </button>
  );
};

export default Downloader;
