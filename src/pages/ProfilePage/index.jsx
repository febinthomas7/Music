import React, { useState, useEffect, useRef } from "react";
import { app } from "../../Database/firebase";
import { doc, setDoc, onSnapshot, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { useLocation } from "react-router-dom";
import { MdAccessTime, MdRefresh } from "react-icons/md";
import PlaylistLoader from "../../component/PlaylistLoader";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaPause } from "react-icons/fa6";
import { GiTireIronCross } from "react-icons/gi";
import { MdOutlineLyrics } from "react-icons/md";
import Downloader from "../../component/DownloadBtn";
import Lyrics from "../../utils/Lyrics";
import Title from "../../utils/Title";

import { FaForward, FaBackward, FaPlay } from "react-icons/fa";

const db = getFirestore(app);

const Profile = () => {
  const location = useLocation();
  const [userid, setUserid] = useState("0UJRMeU6npgYZVEKnOT");
  const [active, setActive] = useState(localStorage.getItem("user"));
  const [artistId, setArtistId] = useState([]);
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState("");
  const [items, SetItems] = useState([]);
  const [recommendations, setRecommendations] = useState(false);
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [songLyrics, setSongLyrics] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  let [selectSong, setSelectSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  let [currentSong, setCurrentSong] = useState({
    ...items[selectSong]?.preview_url,
    progress: 0,
    Length: 0,
    currentDuration: 0,
  });
  const [token, setToken] = useState({
    token: location.state?.token,
  });
  const audioElem = useRef();
  const clickRef = useRef();

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

  const songName = items[selectSong]?.name;
  const artistName = items[selectSong]?.artists[0]?.name;
  const lyrics = Lyrics(artistName, songName);

  useEffect(() => {
    setSongLyrics(lyrics);
  }, [songName, artistName]);

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
  const trackName = `${items[selectSong]?.name} - Ganabajao`;
  const trackImage = items[selectSong]?.album?.images[0]?.url;
  Title(trackName, trackImage);
  useEffect(() => {
    setUserid(localStorage.getItem("userId"));
    // setActive(localStorage.getItem("user"));
    setUsername(localStorage.getItem("username"));
    setUserImage(JSON.parse(localStorage.getItem("userImage")));
    setProfileLoading(false);
  }, []);

  const track = async () => {
    const result = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${
        artistId == undefined || artistId == ""
          ? "7ouMYWpwJ422jRcDASZB7P"
          : artistId?.toString()
      }`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );
    const data = await result.json();
    SetItems(data.tracks);
    setLoading(false);
    setRecommendations(false);
  };
  getUserLiked();
  useEffect(() => {
    track();
  }, [loading]);

  const recommendation = async () => {
    const result = await fetch(
      `https://api.spotify.com/v1/recommendations?limit=20&seed_tracks=${
        artistId == undefined || artistId == ""
          ? "7ouMYWpwJ422jRcDASZB7P"
          : artistId.filter((e, index) => index <= 4)
      }`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );

    const data = await result.json();
    SetItems(data.tracks);
    setRecommendations(true);
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

  return (
    <div className="flex flex-col bg-black h-dvh w-full relative">
      <div className=" bg-[#141414c2] flex flex-col-reverse w-full gap-4 bottom-0 p-4 z-10 absolute">
        <audio
          className="hidden"
          controlsList="nodownload"
          controls
          src={items[selectSong]?.preview_url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
        ></audio>

        <div className="flex  items-center flex-row justify-evenly  gap-1  ">
          <div className="flex  gap-4  ">
            <div className=" w-[60px] h-[60px] ">
              {loading ? (
                <div className="flex flex-col  animate-pulse sm:w-full h-full gap-4 rounded-full overflow-hidden">
                  <div
                    className="w-[60px] h-[60px] 
                 bg-slate-700 "
                  ></div>
                </div>
              ) : (
                <div className="relative h-full w-full justify-center flex items-center">
                  <img
                    className={` w-[60px] h-[60px] object-cover rounded-full shadow-[#1a1a1a] shadow-2xl  `}
                    src={items[selectSong]?.album?.images[1]?.url}
                    alt=""
                  />
                  <div
                    className={`absolute w-full h-full  outline-dotted outline-4  outline-offset-8 outline-blue-500  ${
                      isPlaying ? "animate-pulse" : "animate-none"
                    } rounded-full`}
                  ></div>
                  <div
                    className={`absolute w-full h-full  outline-dotted outline-4  outline-offset-4 outline-blue-500 ${
                      isPlaying ? "animate-pulse" : "animate-none"
                    }  rounded-full`}
                  ></div>
                </div>
              )}
            </div>

            <div className=" flex text-[20px] justify-center items-center gap-5">
              {loading ? (
                <div className="flex justify-center items-center  animate-pulse  gap-4  ">
                  <div
                    className=" rounded-full w-[40px] h-[40px]
                 bg-slate-700 "
                  ></div>
                  <div
                    className=" rounded-full w-[40px] h-[40px]
                 bg-slate-700 "
                  ></div>
                  <div
                    className=" rounded-full w-[40px] h-[40px]
                 bg-slate-700 "
                  ></div>
                </div>
              ) : (
                <>
                  <div
                    className="w-[40px] h-[40px]  text-white bg-[#676767] hover:text-black hover:bg-white rounded-full flex justify-center items-center cursor-pointer"
                    title="prev"
                    onClick={() => setSelectSong(prevSong)}
                  >
                    <FaBackward />
                  </div>
                  <div
                    className={`w-[40px] h-[40px]  text-${
                      isPlaying ? "black" : "white"
                    } ${
                      isPlaying ? "bg-white" : "bg-[#2d2d2d]"
                    }   rounded-full flex justify-center items-center cursor-pointer`}
                    title={isPlaying ? "pause" : "play"}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </div>
                  <div
                    className="w-[40px] h-[40px] text-white bg-[#676767] hover:text-black hover:bg-white rounded-full flex justify-center items-center cursor-pointer"
                    title="next"
                    onClick={() => setSelectSong(nextSong)}
                  >
                    <FaForward />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-4 items-center ">
            {loading ? (
              <div className="flex justify-center items-center  animate-pulse w-full  sm:w-[300px] gap-4  ">
                <div className="sm:flex hidden w-[100px] sm:w-full h-[40px] bg-slate-700 rounded-md"></div>
                <div className=" sm:flex hidden w-[100px] sm:w-full h-[30px] bg-slate-700 rounded-md"></div>
                <div className="w-[30px] h-[30px] bg-slate-700 rounded-md"></div>
              </div>
            ) : (
              <>
                <h1 className="text-yellow-200 text-[20px] hidden sm:flex md:text-[30px] line-clamp-1">
                  {items[selectSong]?.name}
                </h1>
                <div className="hidden sm:flex flex-wrap comma">
                  {items[selectSong]?.artists.map((e, index) => {
                    return (
                      <h1 className="text-white comma line-clamp-1" key={index}>
                        {e.name}
                      </h1>
                    );
                  })}
                </div>
                <div className="text-white text-[20px] flex   justify-center items-center gap-3 ">
                  <div className="flex gap-4">
                    {items[selectSong]?.id ==
                    artistId?.filter((e) => items[selectSong]?.id == e) ? (
                      <GoHeartFill
                        className="text-red-800 cursor-pointer"
                        onClick={remove}
                      />
                    ) : (
                      <GoHeart className="cursor-pointer" onClick={add} />
                    )}
                    <MdOutlineLyrics
                      className="cursor-pointer"
                      onClick={() => setIsLyricsOpen(!isLyricsOpen)}
                    />{" "}
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
                className={` h-2 bg-[#1b1616] rounded-[30px] hover:after:container flex justify-center items-center relative `}
              >
                <span className="bg-[gray] w-3 h-3 hidden rounded-full absolute right-0 group-hover:flex"></span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Link to="/" className="absolute">
        <SlArrowLeft className="text-gray-300 absolute text-[20px] top-6 left-4" />
      </Link>

      <div className="flex flex-col w-full h-[270px] px-8  py-5 bg-gradient-to-b  from-[#10132a] via-[#00061a] to-[#000000f9] bg-black shadow-sm shadow-white">
        <div className="h-full flex gap-5">
          <Link to="/edit">
            <div className="w-full h-full flex items-center justify-center  overflow-hidden">
              {profileLoading && (
                <div className="animate-pulse w-[150px] h-[150px] rounded-full bg-slate-700">
                  {" "}
                </div>
              )}
              {!profileLoading && (
                <img
                  src={
                    active == "true"
                      ? userImage == ""
                        ? "/avatar.webp"
                        : userImage
                      : "/avatar.webp"
                  }
                  alt=""
                  className=" w-[150px] h-[150px] object-cover  rounded-full bg-white"
                />
              )}
            </div>
          </Link>

          <div className="  h-full flex justify-center items-center w-[150px]">
            {profileLoading && (
              <div className="h-[60px] w-full bg-slate-700 animate-pulse"></div>
            )}

            {!profileLoading && (
              <h1 className="text-[20px] w-full p-4 text-white">
                {active == "true"
                  ? username == ""
                    ? "Your name"
                    : username
                  : "User"}
              </h1>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Link to="/edit">
            <button className="px-[10px] py-[4px] text-[15px] bg-transparent border-[1px] w-[70px] font-thin text-white rounded-3xl">
              Edit
            </button>
          </Link>

          <MdRefresh className="text-white" onClick={track} />
        </div>
      </div>
      <div className="flex   gap-3 bg-black p-4 text-white select-none">
        <h1
          onClick={track}
          className={`px-4 py-1 rounded-md  ${
            recommendations == false
              ? "outline outline-offset-2 outline-blue-950"
              : null
          }  cursor-pointer`}
        >
          Liked songs
        </h1>
        <h1
          onClick={recommendation}
          className={`px-4 py-1 rounded-md  ${
            recommendations == true
              ? "outline outline-offset-2  outline-blue-950"
              : null
          }  cursor-pointer`}
        >
          Recommended songs
        </h1>
      </div>
      <div className="h-full fixed mt-[324px] w-full">
        <div className="pb-[550px] h-screen overflow-auto">
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
          <div className="md:flex items-center hidden  w-full   text-white  p-[12px]">
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
              let d = new Date(item?.album?.release_date);

              let year = d.getFullYear();

              return (
                <div className="w-full  " key={index}>
                  <div className="w-full ">
                    <div>
                      {item?.preview_url === null ? (
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
                              src={item?.album?.images[2]?.url}
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
                            />
                            <div className="w-full flex flex-col gap-2">
                              <h1 className="text-yellow-200">{item?.name}</h1>
                              <div className="flex flex-wrap ">
                                {item?.artists.map((e, index) => {
                                  return (
                                    <h1
                                      className="text-white comma"
                                      key={index}
                                    >
                                      {e.name}
                                    </h1>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="flex-1 hidden sm:flex">
                            <h1 className="text-white">{item?.name}</h1>
                          </div>
                          <div className="flex-1 hidden sm:flex">
                            <h1 className="text-white ml-[50%]">{`${year}`}</h1>
                          </div>
                          <div className="flex-1 hidden sm:flex">
                            <h1 className="text-white ml-[75%]">
                              {Math.floor(
                                (item?.duration_ms % (1000 * 60 * 60)) /
                                  (1000 * 60)
                              )}
                              :
                              {Math.floor(
                                (item?.duration_ms % (1000 * 60)) / (1000 * 60)
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
    </div>
  );
};

export default Profile;
