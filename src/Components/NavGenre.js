import React from "react";
import styled from "styled-components";
import useReactRouter from "use-react-router";

const NavGenre = () => {
  const { history } = useReactRouter();

  const changePage = path => {
    history.push(path);
  };

  return (
    <List>
      <Logo>
        <LogoLink>
          <LogoImg src="/images/logo.png" />
        </LogoLink>
      </Logo>
      <GenreList>
        <Listcusor onClick={() => changePage("/main")}>홈</Listcusor>
      </GenreList>
      <GenreList>
        <Listcusor onClick={() => changePage("/genre/drama")}>
          TV 프로그램
        </Listcusor>
      </GenreList>
      <GenreList>
        <Listcusor onClick={() => changePage("/genre/movie")}>영화</Listcusor>
      </GenreList>
      <GenreList>
        <Listcusor onClick={() => changePage("/wishlists")}>
          내가 찜한 콘텐츠
        </Listcusor>
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

const Listcusor = styled.div`
  cursor: pointer;
`;

export default NavGenre;
