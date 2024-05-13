import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../component/Loader";
import Title from "../../utils/Title";
import { SlArrowLeft } from "react-icons/sl";

const Music = () => {
  const location = useLocation();
  const [playlist, setPlaylist] = useState();
  const [loader, setLoader] = useState(true);

  const [token, setToken] = useState({
    token: location.state?.token,
  });
  const [id, setId] = useState({
    id: location.state?.data,
  });

  const trackName = `Ganabajao`;
  const trackImage = "/logo192.png";
  Title(trackName, trackImage);
  const _getPlaylist = async () => {
    const limit = 50;
    const result = await fetch(
      `https://api.spotify.com/v1/browse/categories/${id.id}/playlists?limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.token,
        },
      }
    );
    const data = await result.json();
    setPlaylist(data);
    setLoader(false);
  };
  useEffect(() => {
    _getPlaylist();
  }, []);

  return (
    <div className="fixed h-screen w-full bg-gradient-to-b  from-[#10132a] via-[#00061a] to-[#000000f9] bg-black">
      <Link to="/" className="p-2">
        <SlArrowLeft className="text-[20px] text-white  ml-2" />
      </Link>
      <div className="flex flex-wrap gap-5 justify-center pb-4  h-screen  overflow-y-auto">
        <h1 className="text-[25px] w-full text-white text-center py-4">
          {playlist?.message}
        </h1>
        {loader ? (
          <Loader />
        ) : playlist?.playlists.items.length <= 0 ? (
          <h1 className="text-white text-[20px]">Not Found</h1>
        ) : (
          playlist?.playlists.items.map((item, index) => {
            return (
              <Link
                to="/playlist"
                state={{ data: item, token: token }}
                key={index}
              >
                <img
                  className="w-[140px] sm:w-[200px] sm:h-[200px]"
                  src={item?.images[0].url}
                  alt=""
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Music;
