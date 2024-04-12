import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Loader from "../../component/Loader";
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

    // console.log(data);
  };
  useEffect(() => {
    _getPlaylist();
  }, []);

  return (
    <div>
      <h1>{playlist?.message}</h1>

      <div className="flex flex-wrap gap-5 justify-center py-7 items-center">
        {loader ? (
          <Loader />
        ) : (
          playlist?.playlists.items.map((item, index) => {
            return (
              <Link
                to="/playlist"
                state={{ data: item, token: token }}
                key={index}
              >
                <img
                  className="aspect-square w-[300px]"
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
