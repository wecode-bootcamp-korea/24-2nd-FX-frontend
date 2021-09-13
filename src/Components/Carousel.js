import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Card from "./Card";
import { MainAPI } from "../config.js";

const Carousel = () => {
  const [curXAxis, setCurXAxis] = useState(0);
  const [hiddenStatus, setHiddenStatus] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const ImgWidth = 180;
  const [TotalCount, setTotalCount] = useState("");

  useEffect(() => {
    fetch(
      `${MainAPI}/list?limit=18&category=movie&category=drama&genre=Action&genre=Adventure`
    )
      .then(res => res.json())
      .then(data => {
        setCardsData(data.Result);
        setTotalCount(data.Count);
      });
  }, []);

  const handleLeftArrow = () => {
    if (curXAxis < 0) {
      setCurXAxis(curXAxis + ImgWidth * 6);
    }
  };

  const handleRightArrow = () => {
    if (curXAxis > (TotalCount - 6) * -ImgWidth) {
      setCurXAxis(curXAxis - ImgWidth * 6);
    }
  };

  const ShowHiddenHeader = () => {
    setHiddenStatus(true);
  };

  const HideHiddenHeader = () => {
    setHiddenStatus(false);
  };
  return (
    <Container>
      <HeaderBox
        onMouseEnter={ShowHiddenHeader}
        onMouseLeave={HideHiddenHeader}
      >
        <Header>지금 뜨는 콘텐츠 </Header>
        <HiddenHeader hiddenStatus={hiddenStatus}>모두 보기 &#62;</HiddenHeader>
      </HeaderBox>

      <Slider>
        <LeftArrow onClick={handleLeftArrow}> &#60; </LeftArrow>
        <CardWrapper curXAxis={curXAxis}>
          {cardsData.map(card => {
            return <Card id={card.id} img={card.thumb_nail} />;
          })}
        </CardWrapper>
        <RightArrow onClick={handleRightArrow}> &#62; </RightArrow>
      </Slider>
    </Container>
  );
};

export default Carousel;

const fadein = keyframes`
  from { 
   opacity: 0%;
  }
  to {
    opacity: 100%;
  }
  `;

const Container = styled.div`
  padding: 30px 0px;
  background-color: #141414;
  overflow: hidden;
`;

const Slider = styled.div`
  display: flex;
  position: relative;
`;

const CardWrapper = styled.ul`
  display: flex;
  margin-left: 50px;
  z-index: 0;
  transform: translateX(${props => props.curXAxis}px);
  transition: all 0.7s ease-in-out;
`;
const HeaderBox = styled.div`
  margin-bottom: 15px;
  margin-left: 50px;
  color: #e5e5e5;
`;

const Header = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const HiddenHeader = styled.span`
  font-size: 12px;
  font-weight: 600;
  display: ${props => (props.hiddenStatus ? "inline-block" : "none")};
  animation: ${fadein} 0.3s;
`;

const LeftArrow = styled.button`
  position: absolute;
  top: 40px;
  left: 0px;
  color: #e5e5e5;
  opacity: 0.5;
  font-size: 60px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    opacity: 1;
  }
`;

const RightArrow = styled.button`
  position: absolute;
  top: 40px;
  right: 0px;
  color: #e5e5e5;
  opacity: 0.5;
  font-size: 60px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    opacity: 1;
  }
`;
