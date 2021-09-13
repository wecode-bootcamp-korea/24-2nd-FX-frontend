import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Card from "./Card";
import ModalPortal from "../Components/Modal/Portal";
import Modal from "./Modal/Modal";
import { MainAPI } from "../config.js";

const Carousel = () => {
  const [curXAxis, setCurXAxis] = useState(0);
  const [hiddenStatus, setHiddenStatus] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const [modalOn, setModalOn] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(paramsString);

    const updateCardsData = data => {
      setCardsData(data.Result);
    };

    const setParams = (param, value) => {
      searchParams.set(param, value);
      return searchParams.toString();
    };

    const appendParams = (param, value) => {
      searchParams.append(param, value);
      return searchParams.toString();
    };

    const deleteParams = (param, value) => {
      searchParams.delete(param, value);
      return searchParams.toString();
    };

    handleFetch(`${MainAPI}/list?${paramsString}`, updateCardsData);
  }, []);

  const handleFetch = (API, callback) => {
    fetch(API)
      .then(res => res.json())
      .then(data => callback(data));
  };

  const handleLeftArrow = () => {
    if (curXAxis < 0) {
      setCurXAxis(curXAxis + imgWidth * 8);
    }
  };

  const handleRightArrow = () => {
    if (curXAxis > (totalCount - 8) * -imgWidth) {
      setCurXAxis(curXAxis - imgWidth * 8);
    }
  };

  const showHiddenHeader = () => {
    setHiddenStatus(true);
  };

  const hideHiddenHeader = () => {
    setHiddenStatus(false);
  };

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      <Container>
        <HeaderBox
          onMouseEnter={showHiddenHeader}
          onMouseLeave={hideHiddenHeader}
        >
          <Header>지금 뜨는 콘텐츠 </Header>
          <HiddenHeader hiddenStatus={hiddenStatus}>
            모두 보기 &#62;
          </HiddenHeader>
          <button onClick={handleModal}>모달열기</button>
        </HeaderBox>
        <Slider>
          <LeftArrow onClick={handleLeftArrow}>&#60;</LeftArrow>
          <CardWrapper curXAxis={curXAxis}>
            {cardsData.map(card => {
              return (
                <Card
                  id={card.id}
                  img={card.thumb_nail}
                  onClick={handleModal}
                />
              );
            })}
          </CardWrapper>
          <RightArrow onClick={handleRightArrow}>&#62;</RightArrow>
        </Slider>

        <ModalPortal>
          <Modal onClose={handleModal} modalOn={modalOn} />
        </ModalPortal>
      </Container>
    </>
  );
};

export default Carousel;

const imgWidth = 180;
const totalCount = 21;

export const paramsString =
  "limit=21&category=movie&category=movie&genre=Action&genre=Adventure";

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
  z-index: 0;
  margin-left: 50px;
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

const Arrow = styled.button`
  position: absolute;
  top: 100px;
  direction: ${props => props.direction};
  color: #e5e5e5;
  opacity: 0.5;
  font-size: 60px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    opacity: 1;
  }
`;

const LeftArrow = styled(Arrow.withComponent("button"))`
  left: 0px;
`;

const RightArrow = styled(Arrow.withComponent("button"))`
  right: 0px;
`;
