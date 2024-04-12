import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import SearchBoard from "../SearchBoard";
import { token } from "../../Token";
const DashboardComponent = () => {
  const [genreId, setGenreId] = useState();
  const [loader, setLoader] = useState(true);
  const [_token, _setToken] = useState();
  const [search, setSearch] = useState([]);
  // const { albums, tracks, artists, shows, episodes } = search;
  // console.log(albums);

  const clientId = "5c09b41300224c0392112b2df26e0e35";
  const clientSecret = "e6ecbab94c6d48389f8a3dcaae020e8d";
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
    Search(data.access_token);
    test(data.access_token);
    console.log(data);
  };

  console.log(token());
  useEffect(() => {
    getToken();
  }, []);
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

  const Search = async (token) => {
    const result = await fetch(
      "https://api.spotify.com/v1/search?q=beyonce&type=album%2Ctrack%2Cartist%2Cshow%2Cepisode",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await result.json();
    console.log(data);
    setSearch(data);
  };
  const test = async (token) => {
    const result = await fetch(
      `https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await result.json();
    console.log(data);
  };

  return (
    <div className="w-full md:wide bg-black ">
      <div className="mt-28 p-5"></div>
      <div className="p-4 px-11">
        <h1 className="text-[40px]">Browse all</h1>
      </div>

      <div className="flex flex-wrap gap-5 justify-center py-7  items-center">
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
                <div key={index} className="max-w-[250px]">
                  <img loading="lazy" src={e.icons[0].url} alt="" />
                  <h1>{e.name}</h1>
                </div>
              </Link>
            );
          })
        )}
        {/* <SearchBoard search={search} /> */}
      </div>
    </div>
  );
};

export default DashboardComponent;
