import React from "react";
import styled from "styled-components";

const Card = props => {
  const ImgContainer = styled.li`
    width: 215px;
    height: 150px;
  `;

  const ImgBox = styled.img`
    width: 200px;
    height: 150px;
    border-radius: 10px;
    margin-left: 5px;
  `;

  return (
    <ImgContainer>
      <ImgBox id={props.id} src={props.img} />
    </ImgContainer>
  );
};

export default Card;
