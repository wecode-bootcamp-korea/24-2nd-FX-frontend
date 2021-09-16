import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SignUpInput from "./SignUpInput";
import { FLIX_SIGNUP_UR } from "../../config";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");

  const history = useHistory();
  const nameCheck = userName !== "" && userName.length < 3;
  const emailCheck = userEmail !== "" && !userEmail.includes("@");
  const pwCheck = userPw !== "" && userPw.length < 7;
  const check =
    userName.length >= 2 && userEmail.includes("@") && userPw.length > 7;

  const SignUpDatas = [
    {
      name: userName,
      title: "회원이름",
      type: "text",
      validation: nameCheck,
      inputAlert: "두 글자 이상의 이름을 입력해주세요.",
      setName: setUserName,
    },
    {
      name: userEmail,
      title: "이메일주소",
      type: "email",
      validation: emailCheck,
      inputAlert: "정확한 이메일 주소으로 입력해주세요.",
      setName: setUserEmail,
    },
    {
      name: userPw,
      title: "비밀번호",
      type: "password",
      validation: pwCheck,
      inputAlert: "8자 이상 영문 대 소문자, 숫자, 특수문자를 사용하세요.",
      setName: setUserPw,
    },
  ];

  const handleBtn = () => {
    fetch(FLIX_SIGNUP_UR, {
      method: "POST",
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPw,
        signup_type: "flix",
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === "SUCCESS") {
          alert(`${userName}님, 가입을 환영합니다.`);
          history.push("/login");
        } else {
          alert("조건에 맞게 기입해주세요.");
        }
      });
  };

  return (
    <Whole>
      <Logo>
        <img src="./images/logo.png" alt="logo" />
      </Logo>
      <SignUpContainer>
        <Title>회원가입</Title>
        {SignUpDatas.map((SignUpData, idx) => {
          return <SignUpInput key={idx} data={SignUpData} />;
        })}
        <Btn disabled={!check} onClick={handleBtn}>
          회원가입
        </Btn>
        <Help>
          <a href="https://www.netflix.com/kr/LoginHelp">
            도움이 필요하신가요?
          </a>
        </Help>
        <Footer>
          <p>영화, TV 프로그램을 무제한으로.</p>
          <p>다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</p>
          <p>
            시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일
            주소를 입력하세요
          </p>
        </Footer>
      </SignUpContainer>
    </Whole>
  );
};

const Whole = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1545630478-cf62cdd247d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fG1vdmllc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60");
`;

const Logo = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  background-color: transparent;
  width: 170px;
  height: 80px;
  background-image: image("../../../public/images/logo.png");
  background-position: center;
  background-size: cover;
`;

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  width: 440px;
  padding: 50px;
  background-color: black;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
  font-size: xx-large;
  font-weight: 700;
  color: white;
`;

const Btn = styled.button`
  height: 50px;
  margin-top: 20px;
  border-radius: 5px;
  color: white;
  background-color: red;
  font-size: large;

  :hover {
    cursor: pointer;
  }
`;

const Help = styled.div`
  height: 20px;
  margin: 10px 0 60px 0;
  color: #939393;
  text-decoration: none;
  text-align: right;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  color: #939393;
  text-align: left;
  font-weight: 500;
`;

export default SignUp;
