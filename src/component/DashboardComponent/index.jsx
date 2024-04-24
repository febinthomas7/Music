import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import Debouncing from "../../utils/Debouncing";
import { app } from "../../Database/firebase";
import { IoMdMic } from "react-icons/io";
import { GiTireIronCross } from "react-icons/gi";
import { signOut, getAuth } from "firebase/auth";
import { RiSpeakLine } from "react-icons/ri";
const auth = getAuth(app);
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

const DashboardComponent = () => {
  const [genreId, setGenreId] = useState();
  const [loader, setLoader] = useState(true);
  const [_token, _setToken] = useState();
  const [search, setSearch] = useState([]);
  const [active, setActive] = useState(null);
  const [navColor, setNavColor] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [songs, setSongs] = useState("");
  const getToken = async () => {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    });

    const data = await result.json();
    _setToken(data?.access_token);
    _getGenres(data?.access_token);
  };

  useEffect(() => {
    getToken();
    setActive(localStorage.getItem("user"));
  }, []);

  const debounceSearch = Debouncing(songs, 500);

  useEffect(() => {
    const Search = async () => {
      const result = await fetch(
        `https://api.spotify.com/v1/search?q=${debounceSearch}&type=album%2Ctrack%2Cartist%2Cshow%2Cepisode`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + _token,
          },
        }
      );
      const data = await result.json();
      setSearch(data);
    };

    if (debounceSearch) Search();
  }, [debounceSearch]);

  const _getGenres = async (token) => {
    const result = await fetch(
      "https://api.spotify.com/v1/browse/categories?limit=50",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await result.json();
    setGenreId(data?.categories.items);
    setLoader(false);
  };

  const userSignOut = () => {
    signOut(auth)
      .then((e) => {
        setActive("false");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const {
    listening,
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();

    SpeechRecognition.startListening({ language: "en-IN" });
    setSongs(transcript);
  };
  const stopListening = () => {
    SpeechRecognition.stopListening();
  };
  useEffect(() => {
    setSongs(transcript);
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  window.addEventListener("scroll", () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  });

  useEffect(() => {
    setUserImage(JSON?.parse(localStorage.getItem("userImage")));
  }, [active]);

  return (
    <div className="w-full h-svh sm:w-[80%] sm:ml-[20%] md:wide  ">
      <div className="fixed w-full h-screen top-0 bg-gradient-to-b  from-[#10132a] via-[#00061a] to-[#000000f9] bg-black z-0"></div>
      {listening && (
        <div className="fixed h-[250px] w-[250px] ring-1 z-20 md:w-[400px] md:h-[400px]  top-[35%] sm:top-[20%] rounded-full left-[18%] md:left-[45%] justify-center flex items-center bg-[#9898985d] backdrop:blur-xl">
          <div className="w-full flex justify-center gap-2  items-center absolute top-10">
            <h1 className="text-blue-950 font-bold text-[30px] select-none">
              talk
            </h1>
            <RiSpeakLine className="text-white text-[30px] animate-pulse" />
          </div>

          {transcript ? (
            <h1 className="text-[25px]">{transcript}</h1>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <div className="h-[50px] w-[20px] bg-slate-500 animate-bounce"></div>
              <div className="h-[40px] w-[20px] bg-slate-500 animate-bounce"></div>
              <div className="h-[40px] w-[20px] bg-slate-500 animate-bounce"></div>
              <div className="h-[50px] w-[20px] bg-slate-500 animate-bounce"></div>
            </div>
          )}
        </div>
      )}

      <div
        className={`pt-5 bg-black ${
          navColor ? "bg-black" : "bg-transparent"
        } transition-all w-full sm:w-[80%] fixed py-4 px-4 md:px-11 gap-5 flex flex-col sm:flex-row justify-between items-center z-10 `}
      >
        <div className="flex items-center sm:hidden justify-start  gap-2 p-4 w-full select-none">
          <img src="/logo.png" alt="logo" className="w-[40px] sm:w-[60px]" />
          <h1 className="text-[30px] md:text-[30px] ">GanaBajao</h1>
        </div>
        <div className="flex justify-between items-center w-full gap-4 flex-row-reverse sm:flex-row relative">
          <div className="w-full flex gap-2 items-center justify-end sm:justify-start">
            <div
              className={`w-[80%] ${active ? "w-[70%]" : "w-[80%]"} relative`}
            >
              <input
                type="text"
                onChange={(e) => setSongs(e.target.value)}
                value={songs}
                placeholder="Browse"
                className={`h-[40px] w-full  bg-transparent rounded-lg outline-none border-2 text-white focus:border-blue-900 focus:text-white   p-2`}
              />
              {songs && (
                <GiTireIronCross
                  onClick={() => setSongs("")}
                  className="absolute right-3 top-[12px] cursor-pointer"
                />
              )}
            </div>

            {!listening ? (
              <div
                onClick={startListening}
                className="w-[45px] h-[45px] flex justify-center items-center bg-[#5a5a5a5d] rounded-full cursor-pointer hover:bg-[#8080805d]"
              >
                <IoMdMic />
              </div>
            ) : (
              <div
                onClick={stopListening}
                className="w-[45px] h-[45px] relative  flex justify-center items-center  rounded-full cursor-pointer"
              >
                <span className="animate-ping absolute  h-[20px] w-[20px] rounded-full bg-sky-400 opacity-75"></span>
                <span className="  rounded-full h-3 w-3 bg-sky-500"></span>
              </div>
            )}
          </div>

          <div className="absolute sm:static top-[-85px] right-[-10px] sm:flex w-[87px] sm:rounded-xl overflow-hidden">
            {active == "true" ? (
              <div
                onClick={userSignOut}
                className="bg-blue-950 text-white p-3  rounded-xl text-[15px] cursor-pointer text-center select-none"
              >
                signOut
              </div>
            ) : (
              <Link to="/signin">
                <div className="bg-blue-950 text-white p-3 rounded-xl text-[15px] cursor-pointer text-center select-none">
                  SignIn
                </div>
              </Link>
            )}
          </div>
          {active == "true" ? (
            <Link to="/profile" state={{ token: _token }}>
              <div className="w-[45px] h-[45px] flex justify-center items-center bg-[#5a5a5a5d] rounded-full cursor-pointer hover:bg-[#8080805d] text-[30px] overflow-hidden">
                <img
                  src={userImage ? userImage : "/avatar.webp"}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              </div>
            </Link>
          ) : (
            <img
              src={userImage ? userImage : "/avatar.webp"}
              onClick={() => {
                alert("sign in to view profile");
              }}
              className="cursor-pointer w-[45px] h-[45px] object-cover rounded-full text-[30px]"
              alt="profile"
            />
          )}
        </div>
      </div>

      {debounceSearch && (
        <div className="flex  gap-4 overflow-scroll HideScrollbar mt-[150px] sm:mt-[105px] sticky z-[1]">
          {search.albums?.items.map((e, index) => {
            return (
              <div key={index}>
                {e.images.length <= 0 ? null : (
                  <Link to="/search" state={{ data: search?.tracks }}>
                    <div
                      className="flex flex-col gap-2 items-center justify-center w-[200px] sm:w-[250px] h-[250px] "
                      key={index}
                    >
                      <img
                        className=" rounded-full h-[140px] w-[140px] sm:w-[200px] sm:h-[200px]"
                        src={e?.images[1]?.url}
                        alt="avatar"
                      />
                      <div className="flex flex-col items-center justify-center">
                        <h1 className="text-[15px] sm:text-[20px]  line-clamp-1 text-center">
                          {e?.name}
                        </h1>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div
        className={`flex flex-wrap gap-2 sm:gap-5 ${
          !debounceSearch ? "mt-[200px] sm:mt-[100px]" : null
        } justify-center py-7  items-center z-[1] sticky`}
      >
        {loader ? (
          <Loader />
        ) : (
          genreId?.map((e, index) => {
            return (
              <div key={index}>
                <Link to="/music" state={{ data: e.id, token: _token }}>
                  <div key={index} className="w-[140px] sm:w-[250px]">
                    <img loading="lazy" src={e.icons[0].url} alt="" />
                    <h1>{e.name}</h1>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DashboardComponent;
