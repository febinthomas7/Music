import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlaylistItems from "../../component/PlaylistItems";

const Playlist = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState({
    token: location.state?.token,
  });
  const [id, setiid] = useState({
    id: location.state?.data.id,
  });
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

  return (
    <div>
      <PlaylistItems items={playlist?.items} loading={loading} />
    </div>
  );
};

export default Playlist;
