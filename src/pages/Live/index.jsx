import React, { useState, useEffect } from "react";
import { CiStreamOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import LiveSerachComponent from "../../component/LiveSearchComponent";
import { app } from "../../Database/firebase";
import { doc, getFirestore, collection, onSnapshot } from "firebase/firestore";
const db = getFirestore(app);
const Live = () => {
  const [active, setActive] = useState(null);
  const [userId, setUserId] = useState(null);
  const [liveData, setLiveData] = useState(null);

  useEffect(() => {
    setActive(localStorage.getItem("user"));
    setUserId(JSON.parse(localStorage.getItem("userId")));
  }, [active]);

  const goLive = () => {
    alert("sign in to go live");
  };

  const watchLive = () => {
    alert("sign in to go live");
  };

  const live = () => {
    onSnapshot(collection(db, "liveDetails"), (doc) => {
      setLiveData(doc.docs);
    });
  };
  useEffect(() => {
    live();
  });

  return (
    <div className="w-full h-screen bg-black text-white">
      <div className="flex justify-center items-center gap-3">
        <LiveSerachComponent />
        {active == "true" ? (
          <Link
            to={`/live/${userId}`}
            state={{ id: userId, role: "Host" }}
            className="p-5"
          >
            <div className="text-[20px] cursor-pointer text-red-700  flex justify-center items-center gap-1 px-2 py-1 rounded-sm outline outline-2 outline-offset-2 outline-gray-700 ">
              Live <CiStreamOn className="text-blue-900" />
            </div>
          </Link>
        ) : (
          <div
            onClick={goLive}
            className="text-[20px] cursor-pointer p-5 text-red-700  flex justify-center items-center gap-1 px-2 py-1 rounded-sm outline outline-2 outline-offset-2 outline-gray-700 "
          >
            Live <CiStreamOn className="text-blue-900" />
          </div>
        )}
      </div>
      <div className=" flex justify-center items-center gap-5 flex-col w-full ">
        {active == "true"
          ? liveData?.map((e, index) => {
              return (
                <Link
                  key={index}
                  to={`/live/${e.id}`}
                  state={{ id: e.id, role: "Audience" }}
                  className="bg-gray-600 rounded-md outline  outline-1 outline-offset-2 outline-blue-900 w-[80%] sm:w-[50%] h-[200px] sm:h-[300px]"
                >
                  <div></div>
                </Link>
              );
            })
          : liveData?.map((e, index) => {
              return (
                <div
                  key={index}
                  onClick={watchLive}
                  className="bg-gray-400 cursor-pointer rounded-md outline outline-1 outline-offset-2 outline-blue-900 w-[80%] sm:w-[50%] h-[200px] sm:h-[400px]"
                ></div>
              );
            })}
      </div>
    </div>
  );
};

export default Live;
