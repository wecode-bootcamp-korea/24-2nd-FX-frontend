import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import Modal from "../../Components/Modal/Modal";
import ModalPortal from "../../Components/Modal/Portal";
import styled from "styled-components";
import { WISH_URL } from "../../config";

const WishCard = () => {
  const [currentId, setCurrnetId] = useState(1);
  const [wishList, setWishList] = useState([]);
  const [curXoffset, setCurXoffset] = useState(0);
  const firstTotalCount = 10;
  const [visibleCount, setvisibleCount] = useState(
    firstTotalCount - viewingCount
  );
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
  const handleModal = () => {
    setModalOn(!modalOn);
  };
  const GetWishList = () => {
    const TOKEN = localStorage.getItem("filx_token");
    fetch(WISH_URL, {
      headers: {
        Authorization: TOKEN,
      },
    })
      .then(res => res.json())
      .then(res => setWishList(res.Result));
  };
  useEffect(() => GetWishList(), []);
  return (
    <>
      <Container>
        <HeaderBox>
          <Header>내가 찜한 목록</Header>
        </HeaderBox>
        <Slider>
          {wishList.length > viewingCount && (
            <LeftArrow onClick={handleLeftArrow}>&#60;</LeftArrow>
          )}
          <CardWrapper curXoffset={curXoffset}>
            {wishList.map(card => {
              return (
                <Card
                  onMouseEnter={() => setCurrnetId(card.content_id)}
                  key={card.content_id}
                  id={card.content_id}
                  img={card.thumb_nail}
                  onClick={handleModal}
                />
              );
            })}
          </CardWrapper>
          {wishList.length > viewingCount && (
            <RightArrow onClick={handleRightArrow}>&#62;</RightArrow>
          )}
        </Slider>
        <ModalPortal>
          {modalOn && <Modal currentId={currentId} onClose={handleModal} />}
        </ModalPortal>
      </Container>
    </>
  );
};
export default WishCard;
const cardWidth = 210;
const viewingCount = 8;
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
