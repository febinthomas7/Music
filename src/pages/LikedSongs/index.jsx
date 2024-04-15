import React, { useState, useEffect } from "react";

const LikedSongs = () => {
  const [data, SetData] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div>{/* <SearchPlayListItems items={data} loading={loading} /> */}</div>
  );
};

export default LikedSongs;
