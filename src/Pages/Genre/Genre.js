import React from "react";
import MainVideo from "../../Components/MainVideo";
import Carousel from "Components/Carousel";
import SLIDE_DATA from "../../Pages/Main/slideData";

const Genre = () => {
  return (
    <>
      <MainVideo />
      {SLIDE_DATA.map(slide => (
        <Carousel key={slide.id} title={slide.title} url={slide.url} />
      ))}
    </>
  );
};

export default Genre;
