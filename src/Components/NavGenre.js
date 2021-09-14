import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavGenre = () => {
  return (
    <List>
      <Logo>
        <LogoLink>
          <LogoImg src="/images/logo.png" />
        </LogoLink>
      </Logo>
      <GenreList>
        <Link>홈</Link>
      </GenreList>
      <GenreList>
        <Link>TV 프로그램</Link>
      </GenreList>
      <GenreList>
        <Link>영화</Link>
      </GenreList>
      <GenreList>
        <Link>내가 찜한 콘텐츠</Link>
      </GenreList>
    </List>
  );
};

const List = styled.ul`
  display: flex;
  align-items: center;
`;

const Logo = styled.li`
  margin: 15px 0 0 60px;
`;

const LogoLink = styled.a`
  height: 68px;
`;

const LogoImg = styled.img`
  width: 92px;
  height: 31px;
`;

const GenreList = styled.li`
  color: #b3b3b3;
  font-size: 14px;
  margin: 5px 0 0 60px;
`;

export default NavGenre;
