import React, { useEffect, useState } from "react";
import { PiDownloadSimpleDuotone } from "react-icons/pi";
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
        <PiDownloadSimpleDuotone
          className=" text-white cursor-pointer"
          onClick={download}
        />
      ) : (
        <PiDownloadSimpleDuotone
          className=" text-white cursor-pointer"
          onClick={() => {
            alert("sign in to download");
          }}
        />
      )}
    </>
  );
};

export default Downloader;
