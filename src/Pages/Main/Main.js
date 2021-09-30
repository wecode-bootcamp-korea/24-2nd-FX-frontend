import React from "react";
import Carousel from "Components/Carousel";
import MainVideo from "Components/MainVideo";
import SLIDE_DATA from "./slideData.js";

const Main = () => {
  return (
    <>
      <MainVideo />
      {SLIDE_DATA.map(slide => (
        <Carousel key={slide.id} title={slide.title} url={slide.url} />
      ))}
    </>
  );
};

export default Main;
