import React, { useState } from "react";
import styled from "styled-components";

const NavInfoList = () => {
  const [searchHiddenBar, setSearchHiddenBar] = useState(true);
  const [bellHiddenBox, setBellHiddenBox] = useState(true);
  const [loginHiddenBox, setLoginHiddenBox] = useState(true);

  const handleSearch = () => {
    setSearchHiddenBar(searchHiddenBar => !searchHiddenBar);
  };

  const handleBellBox = () => {
    setBellHiddenBox(bellHiddenBox => !bellHiddenBox);
  };

  const handleLoginBox = () => {
    setLoginHiddenBox(loginHiddenBox => !loginHiddenBox);
  };

  return (
    <NavRightList>
      <NavRightLayout>
        {searchHiddenBar ? (
          <button onClick={handleSearch}>
            <NavRightIcon className="fas fa-search" />
          </button>
        ) : (
          <SearchBar>
            <SearchBarInput />
            <SearchBarIcon className="fas fa-search" onClick={handleSearch} />
          </SearchBar>
        )}
      </NavRightLayout>
      <NavRightLayout>
        <button onMouseEnter={handleBellBox}>
          <NavRightIcon className="fas fa-bell" />
        </button>
        {!bellHiddenBox && (
          <BellHiddenBox onMouseLeave={handleBellBox}>
            최근 알림 메시지가 없습니다.
          </BellHiddenBox>
        )}
      </NavRightLayout>
      <NavLogin>
        <button onMouseEnter={handleLoginBox}>
          <NavLoginImg src="/images/login.png" />
        </button>
        {!loginHiddenBox && <LoginHiddenBox onMouseLeave={handleLoginBox} />}

        <NavRightIcon className="fas fa-caret-down" />
      </NavLogin>
    </NavRightList>
  );
};

const NavRightList = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 60px;
`;

const NavRightLayout = styled.div`
  display: flex;
  position: relative;
  margin-right: 20px;
`;

const NavRightIcon = styled.i`
  font-size: 1.5em;
  color: ${({ theme }) => theme.buttonGray};
`;

const NavLogin = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const NavLoginImg = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 200px;
  height: 30px;
  border: 2px solid ${({ theme }) => theme.buttonGray};
`;

const SearchBarInput = styled.input`
  height: 24px;
  margin: 2px 0 0 29px;
`;

const SearchBarIcon = styled.i`
  position: absolute;
  top: 4px;
  left: 5px;
  font-size: 1.3em;
  color: ${({ theme }) => theme.buttonGray};
`;

const BellHiddenBox = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  width: 408px;
  height: 116px;
  background-color: black;
  opacity: 0.7;
`;

const LoginHiddenBox = styled.div`
  position: absolute;
  top: 60px;
  right: 65px;
  width: 179px;
  height: 288px;
  background-color: black;
`;

export default NavInfoList;
