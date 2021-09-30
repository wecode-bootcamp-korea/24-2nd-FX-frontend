import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { WISH_URL } from "config.js";
<<<<<<< HEAD
import Carousel from "Components/Carousel";
=======
import WishCard from "Pages/WishList/WishCard";
>>>>>>> ad56995 (Fix : withlist modal)

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
      <WishCard />;
    </Background>
  );
};

export default WishList;

const Background = styled.div`
  background-color: black;
`;
