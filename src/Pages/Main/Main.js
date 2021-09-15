import Carousel from "Components/Carousel";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Main = () => {
  const [isImgDisplay, setIsImgDisplay] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const onMouseEnterHandeler = () =>
    setTimeout(() => {
      setIsImgDisplay(true);
    }, 5000);

  const onMouseLeaveHandeler = () => setIsImgDisplay(false);

  useEffect(() => {
    const timer = onMouseEnterHandeler();
    return () => {
      clearTimeout(timer);
    };
  }, [isImgDisplay]);

  useEffect(() => {
    fetch(
      "http://211.110.167.131:8000/content/list?order-by=-hot&limit=20&nation=USA"
    )
      .then(response => response.json())
      .then(data => setMovieList(data.Result[0]));
  }, []);

  console.log(movieList);
  return (
    <MainImgLayout onMouseEnter={onMouseEnterHandeler}>
      <MainImg src={movieList.thumb_nail} isImgDisplay={isImgDisplay} />
      <div
        style={{ width: "100%", height: "945px" }}
        onMouseLeave={onMouseLeaveHandeler}
      >
        <div>
          <video
            autoPlay
            muted
            src="/data/Part 1.mov"
            width="100%"
            style={{ marginTop: "-70px" }}
          />
        </div>
      </div>
      <MainInfoLayout>
        <MainTitle isImgDisplay={isImgDisplay}>{movieList.name}</MainTitle>
        <MainInfo isImgDisplay={isImgDisplay}>{movieList.description}</MainInfo>
        <PlayButtonLayout>
          <PlayButton>
            <PlayIcon className="fas fa-play" />
            <span>재생</span>
          </PlayButton>
          <InfoButton>
            <InfoIcon className="fas fa-info-circle" />
            <span>상세 정보</span>
          </InfoButton>
        </PlayButtonLayout>
      </MainInfoLayout>
    </MainImgLayout>
  );
};

const MainImgLayout = styled.div``;

const MainInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50px;
  bottom: 200px;
  z-index: 998;
`;

const MainTitle = styled.div`
  color: rgb(255, 255, 255);
  margin-bottom: ${props => (props.isImgDisplay ? "-120px" : 0)};
  font-size: ${props => (props.isImgDisplay ? "49px" : "100px")};
  transition: all 0.7s;
`;

const MainInfo = styled.div`
  width: 500px;
  font-size: 23px;
  color: rgb(255, 255, 255);
  opacity: ${props => (props.isImgDisplay ? 0 : 1)};
  transition: all 0.7s;
`;

const PlayButtonLayout = styled.div`
  display: flex;
  margin-top: 41px;
`;

const PlayButton = styled.div`
  width: 152px;
  height: 57px;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 2.4rem;
  background-color: rgb(255, 255, 255);
  text-align: center;
  border-radius: 3%;
  margin-right: 30px;
  padding-top: 10px;
`;

const PlayIcon = styled.i`
  margin-right: 10px;
`;

const InfoIcon = styled.i`
  margin-right: 10px;
`;

const InfoButton = styled.div`
  width: 197px;
  height: 57px;
  font-weight: bold;
  line-height: 2.4rem;
  font-size: 1.6rem;
  background-color: rgb(80, 73, 70);
  text-align: center;
  color: rgb(255, 255, 255);
  border-radius: 3%;
  padding-top: 10px;
`;

const MainImg = styled.img`
  width: 100%;
  height: 80%;
  position: absolute;
  top: 0px;
  display: ${props => (props.isImgDisplay ? "none" : "block")};
  z-index: 997;
`;

export default Main;
