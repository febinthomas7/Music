import React from "react";

const LiveSerachComponent = () => {
  return (
    <div className="w-2/3 p-5">
      <input
        type="text"
        className="text-white bg-transparent w-full p-2 outline outline-2 outline-offset-1 focus:ring focus:outline-none outline-gray-500 rounded-md focus:border-blue-500"
        placeholder="Search live music"
      />
    </div>
  );
};

export default LiveSerachComponent;
