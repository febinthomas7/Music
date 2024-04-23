import { useState, useEffect } from "react";

const Lyrics = (artistName, songName) => {
  const [data, setData] = useState("");

  useEffect(() => {
    const getlyrics = async () => {
      const result = await fetch(
        `https://api.lyrics.ovh/v1/${artistName}/${songName}`
      );
      const data = await result.json();
      setData(data.lyrics);
      //   console.log(data.lyrics);
    };
    getlyrics();
  }, [artistName, songName]);

  return data;
};

export default Lyrics;
