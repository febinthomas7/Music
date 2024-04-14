import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import Debouncing from "../../Hooks/Debouncing";
import { app } from "../../Database/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(app);
import { signOut } from "firebase/auth";

import { CLIENT_ID, CLIENT_SECRET } from "../config";
const DashboardComponent = () => {
  const [genreId, setGenreId] = useState();
  const [loader, setLoader] = useState(true);
  const [_token, _setToken] = useState();
  const [search, setSearch] = useState([]);
  const [userid, setUserid] = useState("0UJRMeU6npgYZVEKnOT");
  const [active, setActive] = useState(null);

  const [userImage, setUserImage] = useState("");

  const clientId = CLIENT_ID;
  const clientSecret = CLIENT_SECRET;

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
    _setToken(data.access_token);
    _getGenres(data.access_token);
  };

  useEffect(() => {
    getToken();
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
    setGenreId(data.categories.items);
    setLoader(false);
  };

  useEffect(() => {
    setUserid(localStorage.getItem("userId"));
    setActive(localStorage.getItem("user"));
  }, []);

  const docRef = doc(db, "UserDetails", userid);
  const get = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      console.log(data);
      if (active == "true") {
        setUserImage(data.avatar);
      }

      if (data.name == "") {
        console.log("No such document!");
      }
    }
  };
  useEffect(() => {
    setTimeout(() => {
      get();
    }, 500);
  });

  const userSignOut = () => {
    signOut(auth)
      .then((e) => {
        console.log(e, "out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full sm:w-[80%] sm:ml-[20%] md:wide bg-[#101010] ">
      <div className="mt-5 py-4 px-4 md:px-11 gap-5 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center sm:hidden justify-center gap-2 p-4">
          <img src="/logo.png" alt="logo" className="w-[40px] sm:w-[60px]" />
          <h1 className="text-[30px] md:text-[30px]">GanaBajao</h1>
        </div>
        <div className="flex justify-between items-center w-full gap-4 flex-row-reverse sm:flex-row relative">
          <input
            type="text"
            onChange={(e) => setSongs(e.target.value)}
            value={songs}
            placeholder="Browse"
            className="h-[40px] w-full sm:w-[70%] bg-black rounded-lg outline-none border-2 focus:border-blue-900 focus:text-white text-black   p-2"
          />

          <div className="absolute top-[-110px] right-[-10px] sm:flex rounded-full sm:rounded-xl overflow-hidden">
            {active == "true" ? (
              <div
                onClick={userSignOut}
                className="bg-blue-950 text-white p-4 rounded-xl text-[15px] cursor-pointer"
              >
                signOut
              </div>
            ) : (
              <Link to="/signin">
                <div className="bg-blue-950 text-white p-4 rounded-xl text-[15px]">
                  SignIn
                </div>
              </Link>
            )}
          </div>
          <div className="flex items-center justify-center gap-2  w-[45px] h-[45px] sm:w-[60px] sm:h-[60px]">
            <Link to="/profile">
              <img
                src={
                  active == "true"
                    ? userImage == ""
                      ? "/avatar.webp"
                      : userImage
                    : "/avatar.webp"
                }
                alt=""
                className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] bg-black rounded-full ring-white ring-2 object-cover cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>

      {debounceSearch && (
        <div className="flex  gap-4 overflow-scroll HideScrollbar  sm:my-10 ">
          {search.albums?.items.map((e, index) => {
            return (
              <>
                {e.images.length <= 0 ? null : (
                  <Link
                    to="/search"
                    state={{ data: search?.tracks }}
                    key={index}
                  >
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
              </>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap gap-2 sm:gap-5 justify-center py-7  items-center">
        {loader ? (
          <Loader />
        ) : (
          genreId?.map((e, index) => {
            return (
              <Link
                to="/music"
                state={{ data: e.id, token: _token }}
                key={index}
              >
                <div key={index} className="w-[140px] sm:w-[250px]">
                  <img loading="lazy" src={e.icons[0].url} alt="" />
                  <h1>{e.name}</h1>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DashboardComponent;
