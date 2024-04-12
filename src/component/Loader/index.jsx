import React from "react";

const loader = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <>
      <div className="w-full flex flex-wrap gap-5 justify-center items-center">
        {arr.map((e, i) => {
          return (
            <div
              key={i}
              className="border border-blue-300 shadow rounded-md p-1  w-[250px] h-[250px] "
            >
              <div className="animate-pulse flex flex-col gap-3  h-full">
                <div className=" bg-slate-700 h-full w-full"></div>
                <div className="w-full h-[20px]">
                  <div className="h-[20px] w-full bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default loader;
