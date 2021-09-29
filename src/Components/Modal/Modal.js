import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { DETAIL_URL } from "../../config.js";
import ModalPortal from "./Portal";
import Series from "./Series.js";

const Modal = ({ onClose, modalOn }) => {
  const [detailData, setDetailData] = useState([]);
  const { id, name, description, nation, detail } = detailData;

  const handleFetch = (API, callback) => {
    fetch(API)
      .then(res => res.json())
      .then(data => callback(data));
  };

  const updateDetailData = data => {
    setDetailData(data.Result);
  };

  useEffect(() => {
    handleFetch(`${DETAIL_URL}/12`, updateDetailData);
  }, []);

  return (
    <ModalPortal>
      {modalOn && (
        <Background>
          <Content>
            <ContentInfo>
              <CloseBtn onClick={onClose}>x</CloseBtn>
              <ContentImg src="/images/contentsample.PNG" alt="img" />
              <Title>{name}</Title>
              <ContentDetail>
                <ContentDetailLeft>
                  <H4>{description}</H4>
                </ContentDetailLeft>
                <ContentDetailRight>
                  <H4>국가 : {nation}</H4>
                </ContentDetailRight>
              </ContentDetail>
            </ContentInfo>
            <H2>회차</H2>

            {detail.map(data => (
              <Series key={id} data={data} />
            ))}
          </Content>
        </Background>
      )}
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

const ContentImg = styled.img`
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
`;

const H2 = styled(Text)`
  font-size: 30px;
`;

const H4 = styled(Text)`
  font-size: 20px;
  font-weight: revert;
`;

const ContentDetailLeft = styled.div`
  width: 600px;
  color: white;
  text-align: left;
  font-size: 18px;
`;

const ContentDetailRight = styled.div`
  color: white;
  text-align: left;
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
