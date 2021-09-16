import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LoginInput from "./LoginInput";
import { FLIX_SIGNIN_URL, KAKAO_URL } from "../../config";
const { Kakao } = window;

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");
  const history = useHistory();
  const emailCheck = userEmail !== "" && !userEmail.includes("@");
  const pwCheck = userPw !== "" && userPw.length < 7;
  const check = userEmail.includes("@") && userPw.length > 7;

  const LoginDatas = [
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

  useEffect(() => {
    if (localStorage.flix_access_token) localStorage.clear();
  });

  const handleBtn = () => {
    fetch(FLIX_SIGNIN_URL, {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPw,
        signup_type: "flix",
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.flix_access_token) {
          localStorage.setItem("flix_token", res.flix_access_token);
          alert(`Flix의 재미를 느껴보세요!`);
          history.push("/");
        } else {
          alert("이메일 및 비밀번호를 올바르게 기입해주세요.");
        }
      });
  };

  const handleKakao = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        fetch(KAKAO_URL, {
          method: "POST",
          headers: {
            Authorization: authObj.access_token,
          },
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            localStorage.setItem("kakao_access_token", authObj.access_token);
            localStorage.setItem("kakao_refresh_token", authObj.refresh_token);
            localStorage.setItem("flix_access_token", res.flix_access_token);
            if (res.flix_access_token) {
              alert("Flix의 재미를 느껴보세요!");
              history.push("/");
            } else alert("다시 카카오 로그인을 해주세요.");
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <Whole>
      <Logo>
        <img src="./images/logo.png" alt="제발나와라" />
      </Logo>
      <LoginContainer>
        <Title>로그인</Title>
        {LoginDatas.map((LoginData, idx) => {
          return <LoginInput key={idx} data={LoginData} />;
        })}
        <Btn
          backColor="red"
          textColor="white"
          disabled={!check}
          onClick={handleBtn}
        >
          로그인
        </Btn>
        <Help>
          <a href="https://www.netflix.com/kr/LoginHelp">
            도움이 필요하신가요?
          </a>
        </Help>
        <Footer>
          <Btn backColor="transparent" onClick={handleKakao}>
            <img src="./images/kakaoBtn.png" alt="kakaoBtn" />
          </Btn>
          <p>
            Flix 회원이 아니신가요?{" "}
            <White onClick={() => history.push("/signup")}>
              지금 가입하세요
            </White>
          </p>
          <p>이 페이지에 안들어가면 후회하실겁니다!</p>
        </Footer>
      </LoginContainer>
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
  width: 120px;
  height: 80px;
  top: 50px;
  left: 50px;
  background-color: transparent;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  width: 440px;
  padding: 70px;
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
  width: 300px;
  height: 50px;
  margin-top: 20px;
  border-radius: 5px;
  color: ${props => props.textColor};
  background-color: ${props => props.backColor};
  font-size: large;
  padding: ${props => props.padding};
  :focus {
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
  height: 150px;
  color: #939393;
  text-align: left;
  font-weight: 500;
  font-size: large;
`;

const White = styled.span`
  color: white;
  text-decoration: none;
  font-weight: 800;

  &:hover {
    cursor: pointer;
  }
`;

export default Login;
