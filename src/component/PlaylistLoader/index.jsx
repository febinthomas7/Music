import React from "react";

const PlaylistLoader = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="flex flex-col gap-4">
      {arr.map((e, index) => {
        return (
          <div className=" shadow  p-1 " key={index}>
            <div className="flex animate-pulse w-full gap-4  h-[60px] px-5">
              <div className="flex-[1/2]  bg-slate-700 w-4 rounded-md"></div>
              <div className="flex flex-[2] gap-3 ">
                <div className="bg-slate-700 w-[50px] h-full rounded-md"></div>
                <div className="w-full flex flex-col gap-2">
                  <div className="bg-slate-700 w-full h-[50px] rounded-md"></div>
                  <div className="bg-slate-700 w-full h-[50px] rounded-md"></div>
                </div>
              </div>
              <div className="flex-1 bg-slate-700 rounded-md "></div>
              <div className="flex-1 bg-slate-700 rounded-md "></div>
              <div className="flex-1 bg-slate-700 rounded-md"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistLoader;
