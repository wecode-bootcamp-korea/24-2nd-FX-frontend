import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { WISH_URL } from "config.js";
import Carousel from "Components/Carousel";

const WishList = () => {
  const [wishList, setWishList] = useState({});

  useEffect(() => GetWishList(), []);

  const GetWishList = () => {
    const TOKEN = localStorage.getItem("filx_token");
    fetch(WISH_URL, {
      headers: {
        Authorization: TOKEN,
      },
    })
      .then(res => res.json())
      .then(res => setWishList(res.Result));
  };

  return (
    <Background>
      <Carousel url={WISH_URL} wishList={wishList} />;
    </Background>
  );
};

export default WishList;

const Background = styled.div`
  background-color: black;
`;
