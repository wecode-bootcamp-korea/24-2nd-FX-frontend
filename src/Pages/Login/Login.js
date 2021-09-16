import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LoginInput from "./LoginInput";
import {
  FLIX_SIGNIN_URL,
  KAKAO_URL,
  GOOGLE_URL,
  GOOGLE_CLIENT_ID,
} from "../../config";
const { Kakao } = window;

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");
  const history = useHistory();
  const emailCheck = userEmail !== "" && !userEmail.includes("@");
  const pwCheck = userPw !== "" && userPw.length < 7;
  const check = userEmail.includes("@") && userPw.length > 7;
  const googleLoginBtn = useRef();

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

  const fetchCallBack = data => {
    if (data.token) {
      localStorage.setItem("filx_token", data.token);
      alert(`Flix의 재미를 느껴보세요!`);
      history.push("/");
    } else {
      alert("로그인을 다시 해주세요.");
    }
  };

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  const handleBtn = () => {
    fetch(FLIX_SIGNIN_URL, {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPw,
        signup_type: "FLIX",
      }),
    })
      .then(res => res.json())
      .then(res => fetchCallBack(res));
  };

  const handleKakao = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        localStorage.setItem("kakao_access_token", authObj.access_token);
        localStorage.setItem("kakao_refresh_token", authObj.refresh_token);

        fetch(KAKAO_URL, {
          method: "POST",
          headers: {
            Authorization: authObj.access_token,
          },
          body: {
            signup_type: "KAKAO",
          },
        })
          .then(res => res.json())
          .then(res => fetchCallBack(res));
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  //SDK 초기 설정 및 내 API초기화
  const googleSDK = () => {
    window.googleSDKLoaded = () => {
      window.gapi.load("auth2", () => {
        const googleAuth = window.gapi.auth2.init({
          client_id: GOOGLE_CLIENT_ID,
          scope: "profile email",
        });
        //버튼 클릭시 사용자 정보 불러오기
        googleAuth.attachClickHandler(
          googleLoginBtn.current,
          {},
          googleUser => {
            const google_access_token = googleUser.getAuthResponse().id_token;
            const profile = googleUser.getBasicProfile();
            const google_id = profile.getId();
            const google_user_name = profile.getName();
            localStorage.setItem("google_access_token", google_access_token);

            fetch(GOOGLE_URL, {
              method: "POST",
              headers: {
                Authorization: google_access_token,
              },
              body: JSON.stringify({
                name: google_user_name,
                google_id: google_id,
                signup_type: "GOOGLE",
              }),
            })
              .then(res => res.json())
              .then(res => fetchCallBack(res));
          },
          error => {
            alert(JSON.stringify(error, undefined, 2));
          }
        );
      });
    };
    //구글 SDK 불러오기
    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "google-jssdk");
  };

  return (
    <Whole>
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
          <Btn backColor="transparent" onClick={handleKakao} padding="0">
            <img src="./images/kakaoBtn.png" alt="kakaoBtn" />
          </Btn>
          <GoogleBtn
            ref={googleLoginBtn}
            onClick={googleSDK}
            data-onsuccess="onSignIn"
            marginBottom="10px"
            backColor="orange"
            textColor="black"
          >
            <i class="fab fa-google"></i>
            <span>Google 로그인</span>
          </GoogleBtn>
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
  margin-top: 10px;
  margin-bottom: ${props => props.marginBottom};
  border-radius: 5px;
  color: ${props => props.textColor};
  background-color: ${props => props.backColor};
  font-size: large;
  padding: ${props => props.padding};
  :focus {
    cursor: pointer;
  }
`;

const GoogleBtn = styled(Btn.withComponent("div"))`
  display: flex;
  justify-content: center;
  align-items: center;
  :focus {
    cursor: pointer;
  }
  i {
    flex: 1;
    padding-left: 10px;
    text-align: center;
  }
  span {
    flex: 9;
    padding-right: 15px;
    text-align: center;
    font-size: 15px;
  }
`;

const Help = styled.div`
  height: 20px;
  margin: 10px 0;
  color: #939393;
  text-decoration: none;
  text-align: right;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
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
