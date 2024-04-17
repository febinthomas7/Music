import React, { useEffect, useRef, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaForward, FaBackward, FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import PlaylistLoader from "../PlaylistLoader";
import { MdAccessTime } from "react-icons/md";
import Downloader from "../DownloadBtn";
import { app } from "../../Database/firebase";
import { doc, onSnapshot, setDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const PlaylistItems = ({ items = [], loading }) => {
  const [like, setLike] = useState(false);
  const [userid, setUserid] = useState("0UJRMeU6npgYZVEKnOT");
  const [active, setActive] = useState(null);
  const [artistId, setArtistId] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  let [selectSong, setSelectSong] = useState(0);
  let [currentSong, setCurrentSong] = useState({
    ...items[selectSong]?.track?.preview_url,
    progress: 0,
    Length: 0,
    currentDuration: 0,
  });

  const audioElem = useRef();
  const clickRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (currentSong.Length === currentSong.currentDuration) {
      setIsPlaying(false);
    } else {
      null;
    }
  }, [currentSong.progress]);

  useEffect(() => {
    setUserid(localStorage.getItem("userId"));
    setActive(localStorage.getItem("user"));
  }, []);

  const onPlaying = () => {
    const duration = audioElem.current.duration;

    const currentDuration = audioElem.current.currentTime;
    setCurrentSong({
      ...items[selectSong]?.track?.preview_url,
      progress: (currentDuration / duration) * 100,
      Length: duration,
      currentDuration: currentDuration,
    });
  };

  const nextSong = () => {
    setCurrentSong({
      ...items[selectSong]?.track.preview_url,
      progress: 0,
      Length: 0,
      currentDuration: 0,
    });
    if (items[selectSong]?.track.preview_url === null) {
      setIsPlaying(false);
    }
    return selectSong === items.length - 1
      ? (selectSong = 0)
      : (selectSong += 1);
  };
  const prevSong = () => {
    setCurrentSong({
      ...items[selectSong]?.track.preview_url,
      progress: 0,
      Length: 0,
      currentDuration: 0,
    });
    if (items[selectSong]?.track.preview_url === null) {
      setIsPlaying(false);
    }

    return selectSong === 0
      ? (selectSong = items.length - 1)
      : (selectSong -= 1);
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divProgress = (offset / width) * 100;
    audioElem.current.currentTime = (divProgress / 100) * currentSong.Length;
  };
  const getUserLiked = () => {
    onSnapshot(doc(db, "userLikedDetails", userid), (doc) => {
      if (active == "true") {
        setArtistId(doc.data()?.artistId);
      }
      console.log(doc);
    });
  };

  useEffect(() => {
    getUserLiked();
  }, []);

  const add = async () => {
    await setDoc(doc(db, "userLikedDetails", userid), {
      artistId: [items[selectSong]?.track?.id, ...artistId],
    });
  };

  const likedSongs = () => {
    // setArtistId(items[selectSong]?.track?.id);
    setLike(true);
    add();
  };

  return (
    <div className="flex flex-col  gap-3 bg-black p-4">
      <div className="fixed bg-black w-full top-0 left-0 p-4 bg-gradient-to-b from-[#ee3050] from-10% via-[#881327] via-40% to-black to-90% ">
        <audio
          className="hidden"
          controlsList="nodownload"
          controls
          src={items[selectSong]?.track?.preview_url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
        ></audio>

        <div className="flex  items-center flex-row sm:items-baseline gap-6 sm:p-7">
          <div className="flex flex-col gap-6">
            <div className="w-[100px] sm:w-[250px] sm:h-[250px]">
              {loading ? (
                <div className="flex flex-col  animate-pulse sm:w-full h-full gap-4  ">
                  <div
                    className="w-[100px] h-[100px] sm:w-full sm:h-full rounded-full
                 bg-slate-700 "
                  ></div>
                </div>
              ) : (
                <img
                  className={`h-full w-full object-cover rounded-full shadow-[#1a1a1a] shadow-2xl ${
                    isPlaying ? "animate-spin-slow" : "animate-none"
                  } `}
                  src={items[selectSong]?.track?.album?.images[1]?.url}
                  alt=""
                />
              )}
            </div>

            <div className=" flex text-[20px] justify-center items-center gap-5">
              {loading ? (
                <div className="flex justify-center items-center  animate-pulse  gap-4  ">
                  <div
                    className=" rounded-full w-[50px] h-[50px]
                 bg-slate-700 "
                  ></div>
                  <div
                    className=" rounded-full w-[70px] h-[70px]
                 bg-slate-700 "
                  ></div>
                  <div
                    className=" rounded-full w-[50px] h-[50px]
                 bg-slate-700 "
                  ></div>
                </div>
              ) : (
                <>
                  <div
                    className="w-[50px] h-[50px]  text-white bg-[#7f7171] hover:text-black hover:bg-white rounded-full flex justify-center items-center cursor-pointer"
                    title="prev"
                    onClick={() => setSelectSong(prevSong)}
                  >
                    <FaBackward />
                  </div>
                  <div
                    className={`w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] text-${
                      isPlaying ? "black" : "white"
                    }   bg-[${
                      isPlaying ? "#fbfbfb" : "#7f7171"
                    }] rounded-full flex justify-center items-center cursor-pointer`}
                    title={isPlaying ? "pause" : "play"}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </div>
                  <div
                    className="w-[50px] h-[50px]  text-white bg-[#7f7171] hover:text-black hover:bg-white rounded-full flex justify-center items-center cursor-pointer"
                    title="next"
                    onClick={() => setSelectSong(nextSong)}
                  >
                    <FaForward />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="flex flex-col  animate-pulse w-full min-w-[300px] max-w-[500px] gap-4  ">
                <div className="w-[100px] sm:w-full h-[40px] bg-slate-700 rounded-md"></div>
                <div className="w-[100px] sm:w-full h-[30px] bg-slate-700 rounded-md"></div>
                <div className="w-[30px] h-[30px] bg-slate-700 rounded-md"></div>
              </div>
            ) : (
              <>
                <h1 className="text-yellow-200 text-[20px] md:text-[30px] line-clamp-1">
                  {items[selectSong]?.track?.name}
                </h1>
                <div className="flex flex-wrap comma">
                  {items[selectSong]?.track?.artists.map((e, index) => {
                    return (
                      <h1 className="text-white comma line-clamp-1" key={index}>
                        {e.name}
                      </h1>
                    );
                  })}
                </div>
                <div className="text-white text-[20px] flex flex-col sm:flex-row  justify-start sm:items-center gap-3 ">
                  {like ||
                  items[selectSong]?.track?.id ==
                    artistId?.filter(
                      (e) => items[selectSong]?.track?.id == e
                    ) ? (
                    <GoHeartFill className="text-red-800 cursor-pointer" />
                  ) : (
                    <GoHeart className="cursor-pointer" onClick={likedSongs} />
                  )}
                  <Downloader
                    fileInput={items[selectSong]?.track?.preview_url}
                    fileName={items[selectSong]?.track?.name}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-full mt-[6px] sm:mt-0">
          {!loading && (
            <div className="text-white flex justify-between">
              <h1>
                0.
                {Math.floor(currentSong.currentDuration) <= 9
                  ? "0" + Math.floor(currentSong.currentDuration)
                  : Math.floor(currentSong.currentDuration)}
              </h1>
              <h1>
                0.
                {currentSong.Length == 0 || isNaN(currentSong.Length)
                  ? "29"
                  : Math.floor(currentSong.Length)}
              </h1>
            </div>
          )}
          {loading ? (
            <div className=" animate-pulse w-full gap-4  h-[10px] ">
              <div className="w-full h-full bg-slate-700 rounded-md"></div>
            </div>
          ) : (
            <div
              className="w-full  bg-[#b9b9b9] rounded-[30px] cursor-pointer group "
              onClick={checkWidth}
              ref={clickRef}
            >
              <div
                style={{ width: `${currentSong?.progress}%` }}
                className={` h-2 bg-[#2f2828] rounded-[30px] hover:after:container flex justify-center items-center relative `}
              >
                <span className="bg-[gray] w-3 h-3 hidden rounded-full absolute right-0 group-hover:flex"></span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-[230px] sm:mt-[464px]">
        {loading && <PlaylistLoader />}
        <div className="md:flex items-center hidden  w-full h-full  text-white  p-[12px]">
          <div className="  flex-[1/2] p-4 ">
            <h1>#</h1>
          </div>
          <div className=" flex-[2] ">
            <h1>Title</h1>
          </div>
          <div className="flex-1 ">
            <h1>Album</h1>
          </div>
          <div className="flex-1">
            <h1 className="ml-[50%]">Date</h1>
          </div>
          <div className="flex-1 ">
            <h1 className="ml-[75%]">
              <MdAccessTime />
            </h1>
          </div>
        </div>

        {!loading &&
          items?.map((item, index) => {
            let d = new Date(item.added_at);
            let hour = d.getUTCHours();
            let min = d.getUTCMinutes();
            let sec = d.getUTCSeconds();

            return (
              <div className="w-full h-full " key={index}>
                <div className="w-full ">
                  <div>
                    {item.track?.preview_url === null ? (
                      <div
                        className={`flex items-center p-3 cursor-pointer hover:bg-[#292929] rounded-md ${
                          index === selectSong ? "bg-[#323232] " : null
                        }`}
                      >
                        <div className="flex-[1/2] p-4">
                          <h1 className="text-white">{index + 1}</h1>
                        </div>
                        <div className="flex-[2] flex gap-[26px] items-center">
                          <img
                            src={item?.track.album.images[2]?.url}
                            alt=""
                            className=" h-[50px] w-[50px]"
                            loading="lazy"
                          />
                          <div className="w-1/2 flex flex-col gap-2">
                            <div className="p-4 h-[40px] text-white bg-red-500 flex justify-center items-center ">
                              <>Not Available</>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 hidden sm:flex">
                          <h1 className="text-white">{item.track.name}</h1>
                        </div>
                        <div className="flex-1 hidden sm:flex">
                          <h1 className="text-white ml-[50%]">{`${hour}:${min}:${sec}`}</h1>
                        </div>
                        <div className="flex-1 hidden sm:flex">
                          <h1 className="text-white ml-[75%]">
                            {Math.floor(
                              (item.track.duration_ms % (1000 * 60 * 60)) /
                                (1000 * 60)
                            )}
                            :
                            {Math.floor(
                              (item.track.duration_ms % (1000 * 60)) /
                                (1000 * 60)
                            )}
                          </h1>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`flex items-center p-3 cursor-pointer hover:bg-[#292929] rounded-md ${
                          index === selectSong ? " bg-[#323232]" : null
                        }`}
                        onClick={() => {
                          setSelectSong(index);
                          setIsPlaying(!isPlaying);
                        }}
                      >
                        <div className="flex-[1/2] p-4">
                          <h1 className="text-white">{index + 1}</h1>
                        </div>
                        <div className="flex-[2] flex gap-[26px] items-center">
                          <img
                            src={item?.track?.album.images[2]?.url}
                            alt=""
                            className=" h-[50px] w-[50px]"
                            loading="lazy"
                          />
                          <div className="w-full flex flex-col gap-2">
                            <h1 className="text-yellow-200">
                              {item.track?.name}
                            </h1>
                            <div className="flex flex-wrap ">
                              {item.track?.artists.map((e, index) => {
                                return (
                                  <h1 className="text-white comma" key={index}>
                                    {e.name}
                                  </h1>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 hidden sm:flex">
                          <h1 className="text-white">{item.track?.name}</h1>
                        </div>
                        <div className="flex-1 hidden sm:flex">
                          <h1 className="text-white ml-[50%]">
                            {`${hour}:${min}:${sec}`}
                          </h1>
                        </div>
                        <div className="flex-1 hidden sm:flex">
                          <h1 className="text-white ml-[75%]">
                            {Math.floor(
                              (item.track?.duration_ms % (1000 * 60 * 60)) /
                                (1000 * 60)
                            )}
                            :
                            {Math.floor(
                              (item.track?.duration_ms % (1000 * 60)) /
                                (1000 * 60)
                            )}
                          </h1>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlaylistItems;
