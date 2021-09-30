import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MAIN_URL } from "../config";
import Streaming from "./Streaming";
import { handleFetch } from "../utils/index";

const MainVideo = () => {
  const [isImgDisplay, setIsImgDisplay] = useState(false);
  const [movieList, setMovieList] = useState([]);

  const mainImgHandler = () =>
    setTimeout(() => {
      setIsImgDisplay(true);
    }, 5000);

  const mainImgLeaveHandler = () => setIsImgDisplay(false);

  const updateGenreListData = data => {
    setMovieList(data.Result[0]);
  };

  useEffect(() => {
    handleFetch(`${MAIN_URL}`, updateGenreListData);
  }, []);

  useEffect(() => {
    const timer = mainImgHandler();
    return () => {
      clearTimeout(timer);
    };
  }, [isImgDisplay]);

  return (
    <>
      <MainImgLayout onMouseEnter={mainImgHandler}>
        {isImgDisplay ? (
          <Streaming onMouseLeave={mainImgLeaveHandler} streamId={82} />
        ) : (
          <MainImg src="/images/netflix.png" />
        )}
        <MainInfoLayout>
          <MainTitle isImgDisplay={isImgDisplay}>{movieList.name}</MainTitle>
          <MainInfo isImgDisplay={isImgDisplay}>
            {movieList.description}
          </MainInfo>
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
    </>
  );
};

const MainImgLayout = styled.div`
  background-color: black;
`;

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
  margin-top: -70px;
  display: ${props => (props.isImgDisplay ? "none" : "block")};
  z-index: 997;
`;

export default MainVideo;
