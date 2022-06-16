import React from "react";
import Button from "../components/Button";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";

const Wrapper = styled(Responsive)`
  font-style: normal;
  font-family: "Poppins";
  .nftimg {
    position: absolute;
    width: 500px;
    height: 500px;
    left: 170px;
    top: 200px;
  }

  .name {
    position: absolute;
    width: 627px;
    height: 121px;
    left: 829px;
    top: 170px;

    font-weight: bold;
    font-size: 50px;
    line-height: 60px;

    color: #000000;
  }
  .description {
    position: absolute;
    width: 609px;
    height: 127px;
    left: 829px;
    top: 256px;

    font-weight: 500;
    font-size: 32px;
    line-height: 48px;
  }

  .button1 {
    position: absolute;
    width: 394px;
    height: 84px;
    left: 829px;
    top: 617px;
    color: white;
    font-size: 30px;
    background: #2081e2;
  }
  .currentPrice {
    position: absolute;
    width: 609px;
    height: 127px;
    left: 829px;
    top: 450px;

    font-weight: 500;
    font-size: 22px;
    line-height: 48px;
    color: #969696;
  }
  .eth {
    position: absolute;
    left: 830px;
    top: 535px;

    font-weight: bold;
    font-size: 40px;
    line-height: 60px;

    color: #000000;
  }
  .price {
    position: absolute;
    left: 875px;
    top: 500px;

    font-weight: 500;
    font-size: 35px;
    line-height: 48px;
    color: #000000;
  }
`;

const info = () => {
  return (
    <Wrapper>
      <img
        src="https://lh3.googleusercontent.com/3cyQw6gbRERXDSbh9fqv-1zC9Cl2eIClHKEdlGoOx0QxEBAYA1pAiY0p_D8mzE8KdzvsxxVHs3KYozfZHIg_1g8C2pLZm1BUN1jK=w600"
        className="nftimg"
      />
      <h1 className="name">NFT name</h1>
      <p className="description">NFT description</p>
      <p className="currentPrice">Current Price</p>
      <FaEthereum className="eth" /> <p className="price">0.07</p>
      <Button className="button1">
        <MdAccountBalanceWallet />
        BUY NOW
      </Button>
    </Wrapper>
  );
};

export default info;
