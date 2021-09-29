import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Card from "./Card";
import ModalPortal from "../Components/Modal/Portal";
import Modal from "./Modal/Modal";

const Carousel = props => {
  const [curXoffset, setCurXoffset] = useState(0);
  const [cardsData, setCardsData] = useState([]);
  const firstTotalCount = 10;
  const [visibleCount, setvisibleCount] = useState(
    firstTotalCount - viewingCount
  );
  const [hiddenStatus, setHiddenStatus] = useState(false);
  const [modalOn, setModalOn] = useState(false);

  const curCount = firstTotalCount - visibleCount;
  const passedCount = curCount - viewingCount;
  const maxXOffset = 0;

  const handleLeftArrow = () => {
    if (curXoffset < maxXOffset) {
      if (passedCount >= viewingCount) {
        setCurXoffset(curXoffset + cardWidth * viewingCount);
        setvisibleCount(visibleCount + viewingCount);
      } else if (passedCount < viewingCount) {
        setCurXoffset(curXoffset + cardWidth * passedCount);
        setvisibleCount(visibleCount + passedCount);
      }
    }
  };

  const handleRightArrow = () => {
    if (visibleCount >= viewingCount) {
      setCurXoffset(curXoffset - cardWidth * viewingCount);
      setvisibleCount(visibleCount - viewingCount);
    } else if (visibleCount < viewingCount) {
      setCurXoffset(curXoffset - cardWidth * visibleCount);
      setvisibleCount(0);
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

  const handleFetch = (API, callback) => {
    fetch(API)
      .then(res => res.json())
      .then(data => callback(data));
  };

  const updateCardsData = data => {
    setCardsData(data.Result);
  };

  useEffect(() => {
    handleFetch(`${props.url}`, updateCardsData);
  }, [props.url]);

  return (
    <>
      <Container>
        <HeaderBox
          onMouseEnter={showHiddenHeader}
          onMouseLeave={hideHiddenHeader}
        >
          <Header>{props.title} </Header>
          <HiddenHeader hiddenStatus={hiddenStatus}>
            모두 보기 &#62;
          </HiddenHeader>
        </HeaderBox>
        <Slider>
          {cardsData.length > viewingCount && (
            <LeftArrow onClick={handleLeftArrow}>&#60;</LeftArrow>
          )}
          <CardWrapper curXoffset={curXoffset}>
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
          {cardsData.length > viewingCount && (
            <RightArrow onClick={handleRightArrow}>&#62;</RightArrow>
          )}
        </Slider>
        <ModalPortal>
          <Modal onClose={handleModal} modalOn={modalOn} />
        </ModalPortal>
      </Container>
    </>
  );
};

export default Carousel;

const cardWidth = 210;

const viewingCount = 8;

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
  margin-left: 25px;
  margin-right: 25px;
  transform: translateX(${props => props.curXoffset}px);
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
