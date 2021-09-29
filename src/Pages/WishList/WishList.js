import React, { useState, useEffect } from "react";
// import WishCard from "Pages/WishList/WishCard";
import { WISH_URL, FLIX_TOKEN } from "config.js";
import Carousel from "Components/Carousel";

const WishList = () => {
  const [wishList, setWishList] = useState([]);
  useEffect(() => GetWishList(), []);

  const GetWishList = () => {
    fetch(WISH_URL, {
      headers: {
        Authorization: FLIX_TOKEN,
      },
    })
      .then(res => res.json())
      .then(res => setWishList(res.Result));
  };

  return <Carousel url={WISH_URL} />;
};

export default WishList;
