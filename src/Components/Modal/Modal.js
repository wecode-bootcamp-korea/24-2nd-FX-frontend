import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { DETAIL_URL, WISH_URL, WISH_TOKEN } from "../../config.js";
import ModalPortal from "./Portal";
import Series from "./Series.js";
import Streaming from "Components/Streaming.js";
import { handleFetch } from "../../utils/index";

const Modal = ({ onClose, currentId }) => {
  const [detailData, setDetailData] = useState({});
  const [isWishAdd, setIsWishAdd] = useState(false);

  useEffect(() => {
    const updateModalVideo = data => {
      setDetailData(data.Result);
    };

    handleFetch(`${DETAIL_URL}${currentId}`, updateModalVideo);
  }, [currentId]);

  const movieTitle = detailData.name;
  const movieId = detailData.id;
  const movieDes = detailData.description;
  const movieNation = detailData.nation;
  const movieDetail = detailData.detail ?? [];
  const thumbnailVideoId = detailData.detail?.[0].detail_id;

  const fetchWishList = useCallback(() => {
    fetch(WISH_URL, {
      method: "PATCH",
      headers: {
        Authorization: localStorage.getItem("flix_token") ?? WISH_TOKEN,
      },
      body: JSON.stringify({
        content_id: detailData.id,
      }),
    })
      .then(res => res.json())
      .then(res => {
        const wishListResult = res.Result.like;
        setIsWishAdd(wishListResult);
      });
  }, [detailData]);

  useEffect(() => {
    setIsWishAdd(detailData.wishlist);
  }, [detailData.wishlist]);

  useEffect(() => {
    fetchWishList();
  }, [fetchWishList]);

  return (
    <ModalPortal>
      <Background>
        <Content>
          <ContentInfo>
            <CloseBtn onClick={onClose}>X</CloseBtn>
            <ContentVideo>
              {thumbnailVideoId && <Streaming streamId={thumbnailVideoId} />}
            </ContentVideo>
            <Title>
              <Left>{movieTitle}</Left>
              <Right onClick={fetchWishList}>
                <i className={`${isWishAdd ? "far" : "fas"} fa-heart`} />
              </Right>
            </Title>
            <ContentDetail>
              <ContentDetailLeft>
                <H4>{movieDes}</H4>
              </ContentDetailLeft>
              <ContentDetailRight>
                <H4>국가 : {movieNation}</H4>
              </ContentDetailRight>
            </ContentDetail>
          </ContentInfo>
          <H2>회차</H2>
          {movieDetail.map(data => (
            <Series key={movieId} data={data} />
          ))}
        </Content>
      </Background>
    </ModalPortal>
  );
};

export default Modal;

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Content = styled.div`
  margin-top: 70px;
  z-index: 1001;
  height: 100%;
  width: 950px;
  position: relative;
  background: #141414;
  overflow: scroll;
`;

const ContentInfo = styled.div`
  color: white;
`;

const ContentVideo = styled.div`
  width: 950px;
`;

const ContentDetail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 50px 50px 0;
`;

const Text = styled.p`
  padding-left: 50px;
  margin: 20px 0 20px 0;
  color: white;
  text-align: left;
  font-weight: bold;
`;

const Title = styled(Text)`
  font-size: 45px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.span`
  width: 480px;
  color: white;
  text-align: left;
`;

const Right = styled.span`
  margin-right: 50px;
  color: red;
  text-align: left;
`;

const H2 = styled(Text)`
  margin: 10px 0;
  color: white;
  text-align: left;
  font-size: 30px;
  font-weight: bold;
`;

const H4 = styled(Text)`
  font-size: 20px;
  font-weight: revert;
`;

const ContentDetailLeft = styled(Left.withComponent("div"))`
  width: 600px;
  color: white;
  text-align: left;
  font-size: 18px;
`;

const ContentDetailRight = styled(Right.withComponent("div"))`
  margin-left: 50px;
  color: white;
  font-size: 18px;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  color: #141414;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
`;
