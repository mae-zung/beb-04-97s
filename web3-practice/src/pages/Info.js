import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaEthereum } from "react-icons/fa";
import axios from 'axios';

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

    font-weight: bold;.split('/')
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

const Info = () => {

  const [nft, setNft] = useState([]);

  let url = window.location.href.split('/')
  console.log(url[4])

  useEffect(() => {
  axios.get('http://localhost:5000/info/'+url[4])
  .then((res) => {
    setNft(res.data)
  })
  }, []);

  return (
    <Wrapper>
      <img
        src={nft.ercURL}
        className="nftimg"
      />
      <h1 className="name">NFT name --- {nft.name}</h1>
      <p className="description">NFT description --- {nft.description}</p>
      <p className="currentPrice">NFT currentPrice --- {nft.sellPrice}</p>
      <FaEthereum className="eth" /> <p className="price">{nft.sellPrice}</p>
      <Button className="button1">
        <MdAccountBalanceWallet />
        BUY NOW
      </Button>
    </Wrapper>
  );
};

export default Info;
