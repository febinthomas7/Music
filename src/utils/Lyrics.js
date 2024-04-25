import { useState, useEffect } from "react";

const Lyrics = (artistName, songName) => {
  const [data, setData] = useState("");

  useEffect(() => {
    try {
      const getlyrics = async () => {
        const result = await fetch(
          `https://api.lyrics.ovh/v1/${artistName}/${songName}`
        );
        const data = await result.json();
        setData(data.lyrics);
      };

      getlyrics();
    } catch (error) {
      console.log(error, "error");
    }
  }, [artistName, songName]);

  return data;
};

export default Lyrics;
