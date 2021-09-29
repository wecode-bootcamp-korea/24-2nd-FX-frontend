import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterBox>
      <FooterLayout>
        <FooterIconLayout>
          <Icon>
            <IconSize className="fab fa-facebook-square" />
          </Icon>
          <Icon>
            <IconSize className="fab fa-instagram-square" />
          </Icon>
          <Icon>
            <IconSize className="fab fa-twitter" />
          </Icon>
          <Icon>
            <IconSize className="fab fa-youtube" />
          </Icon>
        </FooterIconLayout>
        <InfoLayout>
          <ul>
            <InfoList>자막 및 음성</InfoList>
            <InfoList>미디어 센터</InfoList>
            <InfoList>개인정보</InfoList>
            <InfoList>문의하기</InfoList>
          </ul>
          <ul>
            <InfoList>음성지원</InfoList>
            <InfoList>투자 정보</InfoList>
            <InfoList>법적 고지</InfoList>
          </ul>
          <ul>
            <InfoList>고객 센터</InfoList>
            <InfoList>입사 정보</InfoList>
            <InfoList>쿠키설정</InfoList>
          </ul>
        </InfoLayout>

        <CompanyInfoLayout>
          <CompanyInfo>
            플릭스서비시스코리아 플릭스회사 판매신고업번호: 위워크
          </CompanyInfo>
          <CompanyInfo>대표: 플릭스팀</CompanyInfo>
          <CompanyInfo>이메일 주소 : tmdckszm@naver.com</CompanyInfo>
          <CompanyInfo>
            주소 : 서울특별시 강남구 선릉 2호점 위워크 타워
          </CompanyInfo>
          <CompanyInfo>사업자 등록번호 : 11111-11111-11111</CompanyInfo>
          <CompanyInfo>클라우드 호스팅 : AWS</CompanyInfo>
        </CompanyInfoLayout>
      </FooterLayout>
    </FooterBox>
  );
};

const FooterBox = styled.div`
  background-color: black;
  margin-top: -20px;
`;

const FooterLayout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 980px;
  margin: 20px auto 0;
  padding: 0 4%;
  color: grey;
`;

const FooterIconLayout = styled.ul`
  display: flex;
  margin-bottom: 1em;
`;

const Icon = styled.li`
  height: 25px;
  width: 36px;
  color: gray;
`;

const IconSize = styled.i`
  font-size: 30px;
`;

const InfoLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 14px 0;
  font-size: 13px;
`;

const InfoList = styled.li`
  line-height: 3;
`;

const CompanyInfoLayout = styled.ul`
  display: flex;
  flex-direction: column;
`;

const CompanyInfo = styled.li`
  font-size: 11px;
  line-height: 2;
`;
export default Footer;
