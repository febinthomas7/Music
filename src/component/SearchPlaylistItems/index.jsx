import React, { useEffect, useRef, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaForward, FaBackward, FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import PlaylistLoader from "../PlaylistLoader";
import { MdAccessTime } from "react-icons/md";
import Downloader from "../DownloadBtn";
import { app } from "../../Database/firebase";
import { GiTireIronCross } from "react-icons/gi";
import { MdOutlineLyrics } from "react-icons/md";
import Title from "../../utils/Title";
import Lyrics from "../../utils/Lyrics";

import { doc, setDoc, getFirestore, onSnapshot } from "firebase/firestore";
const db = getFirestore(app);

const SearchPlayListItems = ({ items = [], loading }) => {
  const [userid, setUserid] = useState("0UJRMeU6npgYZVEKnOT");
  const [active, setActive] = useState(null);
  const [artistId, setArtistId] = useState([""]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [songLyrics, setSongLyrics] = useState("");
  let [selectSong, setSelectSong] = useState(0);
  let [currentSong, setCurrentSong] = useState({
    ...items[selectSong]?.preview_url,
    progress: 0,
    Length: 0,
    currentDuration: 0,
  });
  const fallbackImage = (e) => {
    e.src =
      "https://imgs.search.brave.com/iyRPT1-Ryk4AK_UqBbU4AQPJbJBvDcw-gQ98m622OYM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vcHJhY3RpY2Fs/ZGV2L2ltYWdlL2Zl/dGNoL3MtLUpRSkhq/N0c0LS0vY19saW1p/dCxmX2F1dG8sZmxf/cHJvZ3Jlc3NpdmUs/cV9hdXRvLHdfODAw/L2h0dHBzOi8vZGV2/LXRvLXVwbG9hZHMu/czMuYW1hem9uYXdz/LmNvbS91cGxvYWRz/L2FydGljbGVzLzdj/eHRxZTdyNWJ4aWs4/cHk1czd0LnBuZw";
  };

  const songName = items[selectSong]?.name;
  const artistName = items[selectSong]?.artists[0]?.name;
  const lyrics = Lyrics(artistName, songName);

  useEffect(() => {
    setSongLyrics(lyrics);
  }, [songName, artistName]);

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
  const trackName = `${items[selectSong]?.name} - Ganabajao`;
  const trackImage = items[selectSong]?.album?.images[0]?.url;
  Title(trackName, trackImage);
  const getUserLiked = () => {
    onSnapshot(
      doc(db, "userLikedDetails", userid ? userid : "122324234"),
      (doc) => {
        if (active == "true") {
          if (doc.data()?.artistId) {
            setArtistId(doc.data()?.artistId);
          }
        }
      }
    );
  };
  getUserLiked();
  useEffect(() => {
    setUserid(localStorage.getItem("userId"));
    setActive(localStorage.getItem("user"));
  }, []);
  const onPlaying = () => {
    const duration = audioElem.current.duration;

    const currentDuration = audioElem.current.currentTime;
    setCurrentSong({
      ...items[selectSong]?.preview_url,
      progress: (currentDuration / duration) * 100,
      Length: duration,
      currentDuration: currentDuration,
    });
  };

  const nextSong = () => {
    setCurrentSong({
      ...items[selectSong]?.preview_url,
      progress: 0,
      Length: 0,
      currentDuration: 0,
    });
    if (items[selectSong]?.preview_url === null) {
      setIsPlaying(false);
    }
    return selectSong === items.length - 1
      ? (selectSong = 0)
      : (selectSong += 1);
  };
  const prevSong = () => {
    setCurrentSong({
      ...items[selectSong]?.preview_url,
      progress: 0,
      Length: 0,
      currentDuration: 0,
    });
    if (items[selectSong]?.preview_url === null) {
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

  const add = async () => {
    await setDoc(doc(db, "userLikedDetails", userid), {
      artistId: [items[selectSong]?.id, ...artistId],
    });
  };
  const remove = async () => {
    await setDoc(doc(db, "userLikedDetails", userid), {
      artistId: artistId.filter((e) => e !== items[selectSong]?.id),
    });
  };

  const likedSongs = () => {
    if (active == "true") {
      add();
    } else {
      alert("sign in to like");
    }
  };

  const removeSongs = () => {
    remove();
  };

  return (
    <div className="flex flex-col  gap-3 bg-black p-4">
      <div className="fixed bg-black w-full top-0 left-0 p-4 bg-gradient-to-b from-[#ee3050] from-10% via-[#881327] via-40% to-black to-90%">
        <audio
          className="hidden"
          controls
          src={items[selectSong]?.preview_url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
        ></audio>

        <div className="flex  items-center flex-row sm:items-baseline gap-6 sm:p-7">
          <div className="flex flex-col gap-6">
            <div className="w-[100px] sm:w-[250px] sm:h-[250px]">
              {loading ? (
                <div className="flex flex-col  animate-pulse w-full h-full gap-4  ">
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
                  src={items[selectSong]?.album?.images[1]?.url}
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
                    className="w-[50px] h-[50px] text-white bg-[#676767] hover:text-black rounded-full flex justify-center items-center cursor-pointer"
                    title="prev"
                    onClick={() => setSelectSong(prevSong)}
                  >
                    <FaBackward />
                  </div>
                  <div
                    className={`w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] text-${
                      isPlaying ? "black" : "white"
                    }   ${
                      isPlaying ? "bg-white" : "bg-[#2d2d2d]"
                    }  rounded-full flex justify-center items-center cursor-pointer`}
                    title={isPlaying ? "pause" : "play"}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </div>
                  <div
                    className="w-[50px] h-[50px] text-white bg-[#676767] hover:text-black rounded-full flex justify-center items-center cursor-pointer"
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
                  {items[selectSong]?.name}
                </h1>
                <div className="flex flex-wrap comma">
                  {items[selectSong]?.artists.map((e, index) => {
                    return (
                      <h1 className="text-white comma" key={index}>
                        {e.name}
                      </h1>
                    );
                  })}
                </div>
                <div className="text-white text-[20px] flex flex-col sm:flex-row   sm:items-center gap-3 ">
                  <div className="flex gap-4">
                    {items[selectSong]?.id ==
                    artistId?.filter((e) => items[selectSong]?.id == e) ? (
                      <GoHeartFill
                        className="text-red-800 cursor-pointer"
                        onClick={removeSongs}
                      />
                    ) : (
                      <GoHeart
                        className="cursor-pointer"
                        onClick={likedSongs}
                      />
                    )}
                    <MdOutlineLyrics
                      className="cursor-pointer"
                      onClick={() => setIsLyricsOpen(!isLyricsOpen)}
                    />
                    <Downloader
                      fileInput={items[selectSong]?.preview_url}
                      fileName={items[selectSong]?.name}
                    />
                  </div>
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
        {isLyricsOpen && (
          <div className="text-white w-full fixed left-0 top-0 h-full bg-gray-500  flex justify-center">
            <div className="w-[80%] sm:w-[30%] overflow-y-auto flex justify-center sm:items-center my-6">
              <p>{songLyrics ? songLyrics : "not found"}</p>
            </div>
            <GiTireIronCross
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => setIsLyricsOpen(!isLyricsOpen)}
            />
          </div>
        )}
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
            let d = new Date(item.album.release_date);

            let year = d.getFullYear();

            return (
              <div className="w-full h-full " key={index}>
                <div className="w-full ">
                  <div>
                    {item.preview_url === null ? (
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
                            src={item?.album.images[2]?.url}
                            alt=""
                            className=" h-[50px] w-[50px]"
                            loading="lazy"
                            onError={fallbackImage}
                          />
                          <div className="w-1/2 flex flex-col gap-2">
                            <div className="p-4 h-[40px] text-white bg-red-500 flex justify-center items-center ">
                              <>Not Available</>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 hidden sm:flex">
                          <h1 className="text-white">{item.name}</h1>
                        </div>
                        <div className="flex-1 hidden sm:flex">
                          <h1 className="text-white ml-[50%]">{`${year}`}</h1>
                        </div>
                        <div className="flex-1 hidden sm:flex">
                          <h1 className="text-white ml-[75%]">
                            {Math.floor(
                              (item.duration_ms % (1000 * 60 * 60)) /
                                (1000 * 60)
                            )}
                            :
                            {Math.floor(
                              (item.duration_ms % (1000 * 60)) / (1000 * 60)
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
                            src={item?.album.images[2]?.url}
                            alt=""
                            className=" h-[50px] w-[50px]"
                            loading="lazy"
                            onError={fallbackImage}
                          />
                          <div className="w-full flex flex-col gap-2">
                            <h1 className="text-yellow-200">{item.name}</h1>
                            <div className="flex flex-wrap ">
                              {item.artists.map((e, index) => {
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
                          <h1 className="text-white">{item.name}</h1>
                        </div>
                        <div className="flex-1 hidden sm:flex">
                          <h1 className="text-white ml-[50%]">{`${year}`}</h1>
                        </div>
                        <div className="flex-1 hidden sm:flex">
                          <h1 className="text-white ml-[75%]">
                            {Math.floor(
                              (item.duration_ms % (1000 * 60 * 60)) /
                                (1000 * 60)
                            )}
                            :
                            {Math.floor(
                              (item.duration_ms % (1000 * 60)) / (1000 * 60)
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

export default SearchPlayListItems;
