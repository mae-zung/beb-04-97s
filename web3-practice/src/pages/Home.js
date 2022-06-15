import React from "react";
import { Link } from "react-router-dom";
import Responsive from "../components/Responsive";
import styled from "styled-components";
import Button from "../components/Button";

const Wrapper = styled(Responsive)`
  font-style: normal;
  font-family: "Poppins";

  .thumbnail {
    position: absolute;
    width: 627px;
    height: 121px;
    left: 510px;
    top: 252px;

    font-weight: bold;
    font-size: 50px;
    line-height: 60px;

    color: #000000;
  }
  .thumbnail2 {
    position: absolute;
    width: 609px;
    height: 127px;
    left: 510px;
    top: 386px;

    font-weight: 500;
    font-size: 32px;
    line-height: 48px;

    color: #000000;
  }
  .button1 {
    position: absolute;
    width: 170px;
    height: 50px;
    left: 510px;
    top: 536px;
    color: white;
    background: #2081e2;
  }
  .button2 {
    position: absolute;
    width: 170px;
    height: 50px;
    left: 750px;
    top: 536px;
    color: #2081e2;v;
    background: #E3E3E3
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <h1 className="thumbnail">
        Discover, collect, and sell extraordinary NFTs
      </h1>
      <h3 className="thumbnail2">
        OpenSea is the world's first and largest NFT marketplace
      </h3>

      <Button to="/explore" className="button1">
        Explore
      </Button>

      <Button to="/create" className="button2">
        Create
      </Button>
    </Wrapper>
  );
};

export default Home;
