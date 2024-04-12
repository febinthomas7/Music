import React from "react";

const SearchBoard = ({ search }) => {
  const { albums, tracks, artists, shows, episodes } = search;
  console.log(shows);
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <h1 className="text-[30px] p-5">artist</h1>
        <div className="flex  gap-4 overflow-scroll HideScrollbar">
          {artists?.items.map((e, index) => {
            return (
              <>
                {e.images.length <= 0 ? null : (
                  <div
                    className="flex flex-col items-center justify-center min-w-[250px] min-h-[250px] "
                    key={index}
                  >
                    <img
                      className=" rounded-full"
                      src={e?.images[1]?.url}
                      alt="avatar"
                    />
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-2xl font-bold">{e?.name}</h1>
                      {/* <p className="text-gray-600 text-sm">{search.user.email}</p> */}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col overflow-hidden">
        <h1 className="text-[30px] p-5">albums</h1>
        <div className="flex  gap-4 overflow-scroll HideScrollbar">
          {albums?.items.map((e, index) => {
            return (
              <div
                className="flex flex-col items-center justify-center min-w-[250px] "
                key={index}
              >
                <img
                  className=" rounded-full"
                  src={e.images[1].url}
                  alt="avatar"
                />
                <div className="flex flex-col items-center justify-center">
                  {/* <h1 className="text-2xl font-bold">{e?.name}</h1> */}
                  {/* <p className="text-gray-600 text-sm">{search.user.email}</p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchBoard;
