import React, { useEffect, useState } from "react";
const Downloader = ({ fileInput, fileName }) => {
  const [downloading, setDownloading] = useState(null);
  useEffect(() => {
    setDownloading(localStorage.getItem("user"));
  }, []);

  let download = (e) => {
    e.preventDefault();

    if (downloading == "true") fetchFile(fileInput);
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
    <>
      {downloading == "true" ? (
        <button
          onClick={download}
          className="shadow-[#6b2828] py-[2px] px-4 bg-black text-white rounded-md shadow-lg sm:shadow-[#6b2828] sm:shadow-2xl select-none"
        >
          Download
        </button>
      ) : (
        <a
          className="shadow-[#6b2828] py-[2px] px-4 bg-black text-white rounded-md shadow-lg sm:shadow-[#6b2828] sm:shadow-2xl select-none"
          href="/signin"
        >
          sign in
        </a>
      )}
    </>
  );
};

export default Downloader;
