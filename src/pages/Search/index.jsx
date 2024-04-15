import React, { useState } from "react";
import SearchPlayListItems from "../../component/SearchPlaylistItems";
import { useLocation } from "react-router-dom";
const Search = () => {
  const location = useLocation();
  const [data, SetData] = useState(location.state?.data);
  const [loading, setLoading] = useState(false);
  console.log(data);

  return (
    <div>
      <SearchPlayListItems items={data?.items} loading={loading} />
    </div>
  );
};

export default Search;
