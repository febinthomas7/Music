import React, { useState, useEffect } from "react";
import { CiStreamOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { RiLoader2Fill } from "react-icons/ri";
import { SlArrowLeft } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app } from "../../Database/firebase";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
const db = getFirestore(app);
const Live = () => {
  const [active, setActive] = useState(localStorage.getItem("user"));
  const [userId, setUserId] = useState(null);
  const [liveData, setLiveData] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("userId")));
  }, [active]);

  const goLive = () => {
    toast.warn("sign in to go live");
  };

  const watchLive = () => {
    toast.warn("sign in to watch live");
  };
  const deleteLive = () => {
    deleteDoc(doc(db, "liveDetails", userId));
  };

  const live = () => {
    onSnapshot(collection(db, "liveDetails"), (doc) => {
      setLiveData(doc.docs);
      setLoader(false);
    });
  };
  useEffect(() => {
    live();
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b  from-[#10132a] via-[#00061a] to-[#000000f9] bg-black  text-white ">
      <div>
        <ToastContainer />
      </div>
      <div className="flex justify-between items-center gap-3 w-full fixed">
        <Link to="/" className="p-2">
          <SlArrowLeft className="text-[20px] " />
        </Link>

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
          <div className="p-5">
            <div
              onClick={goLive}
              className="text-[20px] cursor-pointer text-red-700  flex justify-center items-center gap-1 px-2 py-1 rounded-sm outline outline-2 outline-offset-2 outline-gray-700 "
            >
              Live <CiStreamOn className="text-blue-900" />
            </div>
          </div>
        )}
      </div>
      <div className=" flex justify-center items-center gap-5 flex-col w-full   py-[100px] ">
        {active == "true"
          ? liveData?.map((e, index) => {
              return (
                <div
                  className="w-full flex justify-center items-center "
                  key={index}
                >
                  <Link
                    to={`/live/${e.id}`}
                    state={{ id: e.id, role: "Audience" }}
                    className="bg-gray-600 rounded-md  outline flex justify-center items-center outline-1 outline-offset-2 outline-blue-900 w-[80%] sm:w-[50%] h-[200px] sm:h-[300px]"
                  >
                    <img
                      className="w-[70px] h-[70px] rounded-full"
                      src={
                        e?._document.data.value.mapValue.fields.userImg
                          ?.stringValue
                      }
                      alt="user"
                    />
                  </Link>
                  {e.id == userId ? (
                    <div className="bg-gray-800 bottom-0  fixed  w-full p-3 flex justify-center items-center">
                      <button
                        onClick={deleteLive}
                        className=" bg-black text-white p-2 rounded-md cursor-pointer"
                      >
                        end live
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })
          : liveData?.map((e, index) => {
              return (
                <div
                  key={index}
                  onClick={watchLive}
                  className="bg-gray-600 flex justify-center items-center cursor-pointer rounded-md outline outline-1 outline-offset-2 outline-blue-900 w-[80%] sm:w-[50%] h-[200px] sm:h-[400px]"
                >
                  <img
                    className="w-[70px] h-[70px] rounded-full"
                    src={
                      e?._document.data.value.mapValue.fields.userImg
                        ?.stringValue
                    }
                    alt="user"
                  />
                </div>
              );
            })}
      </div>
      {liveData?.length == 0 ? (
        <div className="p-5  flex justify-center items-center h-[200px] text-yellow-500 gap-3">
          No one is live <CiStreamOn className="text-blue-900 text-[25px]" />
        </div>
      ) : null}

      {loader && (
        <div className="text-center flex justify-center">
          <RiLoader2Fill className="text-white text-[25px] animate-spin" />{" "}
        </div>
      )}
    </div>
  );
};

export default Live;
