import React from "react";
import { CiStreamOn } from "react-icons/ci";
import Stream from "../../../component/Stream";
import LiveSerachComponent from "../../../component/LiveSearchComponent";
const Live = () => {
  const goLive = (e) => {
    alert("yes you are live");
  };
  return (
    <div className="w-full h-screen bg-black text-white">
      <div className="flex justify-center items-center gap-3">
        <LiveSerachComponent />
        <button
          onClick={goLive}
          className="text-[20px] text-red-700  flex justify-center items-center gap-1 px-2 py-1 rounded-sm outline outline-2 outline-offset-2 outline-gray-700 "
        >
          Live <CiStreamOn className="text-blue-900" />
        </button>
      </div>
      <Stream />
    </div>
  );
};

export default Live;
