import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlaylistItems from "../../component/PlaylistItems";

const Playlist = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  console.log(location.state?.data);
  const [token, setToken] = useState({
    token: location.state?.token,
  });
  console.log(token.token.token);
  const [id, setiid] = useState({
    id: location.state?.data.id,
  });
  console.log(id.id);
  const [playlist, setPlaylist] = useState();

  const track = async () => {
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${id.id}/tracks`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.token.token,
        },
      }
    );
    const data = await result.json();
    setPlaylist(data);
    setLoading(false);
  };

  useEffect(() => {
    track();
  }, []);

  console.log(playlist);
  return (
    <div>
      {/* <h1>{location.state?.data.name}</h1>
      <p>{location.state?.data.description}</p> */}
      <PlaylistItems items={playlist?.items} loading={loading} />
    </div>
  );
};

export default Playlist;
