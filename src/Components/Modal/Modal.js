import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { DETAIL_URL } from "../../config.js";
import ModalPortal from "./Portal";

const Modal = ({ onClose, modalOn }) => {
  const [detailData, setDetailData] = useState([]);

  const handleFetch = (API, callback) => {
    fetch(API)
      .then(res => res.json())
      .then(data => callback(data));
  };

  const updateDetailData = data => {
    setDetailData(data.Result);
  };

  useEffect(() => {
    handleFetch(`${DETAIL_URL}`, updateDetailData);
  }, []);

  return (
    <ModalPortal>
      {modalOn && (
        <Background>
          <Content>
            <ContentInfo>
              <CloseBtn onClick={onClose}>X</CloseBtn>
              <ContentImg src="/images/contentsample.PNG" alt="img" />
              <H1>호텔델루나</H1>
              <ContentDetail>
                <ContentDetailLeft>
                  <p>
                    서울 도심에 수상한 호텔이 있다. 천년 영업에 숙박한 사람이
                    없다. 왜? 산 사람은 안 받으니까. 귀신만 묵는 그곳에 인간
                    지배인이 왔다. 알고 보면 심약한 이 남자, 고객 응대 잘
                    해낼까? 외모와 달리 괴팍한 사장은 어찌 감당하누.
                  </p>
                </ContentDetailLeft>
                <ContentDetailRight>
                  <p>장르 : 드라마</p>
                  <p>국가 : 한국</p>
                </ContentDetailRight>
              </ContentDetail>
            </ContentInfo>
            <ContentSeries>
              <H2>회차</H2>
              <SeriesInfo>
                <H3>1</H3>
                <H3>Chapter 2</H3>
                <SeriesDes>
                  보름달이 뜨면 손님으로 북적이는 호텔. 그곳의 사장 장만월.
                  호텔에 몰래 들어와 물건을 훔치려 한 손님을 큰맘 먹고
                  살려주기로 한다. 그의 아들을 데려오는 조건으로.
                </SeriesDes>
                <H3>122분</H3>
              </SeriesInfo>
            </ContentSeries>
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
  padding: 0 0 50px 50px;
`;

const H1 = styled.p`
  padding-left: 50px;
  margin: 20px 0 20px 0;
  color: white;
  text-align: left;
  font-weight: bold;
  font-size: 42px;
`;

const H2 = styled.p`
  margin: 10px 0;
  color: white;
  text-align: left;
  font-size: 28px;
  font-weight: bold;
`;

const H3 = styled.p`
  color: white;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

const SeriesDes = styled.div`
  width: 500px;
  text-align: left;
`;

const ContentDetailLeft = styled.div`
  width: 480px;
  color: white;
  text-align: left;
  font-size: 18px;
`;

const ContentDetailRight = styled.div`
  margin-left: 50px;
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

const ContentSeries = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 500px 50px;
`;

const SeriesInfo = styled.div`
  display: flex;
  color: white;
`;
