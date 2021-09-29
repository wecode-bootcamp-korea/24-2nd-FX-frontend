import React from "react";
import styled from "styled-components";

const Series = props => {
  const { episode, detail_description, running_time, detail_thumb_nail } =
    props.data;

  return (
    <ContentSeries>
      <SeriesImg src={detail_thumb_nail} alt="img" />
      <SeriesDetail>
        <H3>{episode}</H3>
        <H4>{detail_description}</H4>
      </SeriesDetail>
      <H4>{running_time}min</H4>
    </ContentSeries>
  );
};

export default Series;

const ContentSeries = styled.div`
  display: flex;
  padding: 0 50px 50px 50px;
  border-bottom: 0.5px white;
`;

const Text = styled.p`
  margin: 20px 0 10px 0;
  color: white;
  text-align: left;
  font-weight: bold;
`;

const H3 = styled(Text)`
  font-size: 23px;
`;

const H4 = styled(Text)`
  font-size: 19px;
  font-weight: normal;
`;

const SeriesImg = styled.img`
  width: 130px;
`;

const SeriesDetail = styled.div`
  padding-left: 50px;
  margin-right: 50px;
`;
