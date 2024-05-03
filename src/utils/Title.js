import { useEffect, useState } from "react";

const Title = (trackName, trackImage) => {
  useEffect(() => {
    document.title = `${trackName}`;
    document
      .querySelector("link[rel='icon']")
      .setAttribute("href", `${trackImage}`);
  }, [trackName, trackImage]);
};

export default Title;
