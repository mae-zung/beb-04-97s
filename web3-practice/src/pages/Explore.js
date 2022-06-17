import React, { useState, useEffect } from "react";
import TokenList from "../components/TokenList";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  font-style: normal;
  font-family: "Poppins";

  .thumbnail {
    position: absolute;
    width: 627px;
    height: 121px;
    left: 670px;
    top: 150px;

    font-weight: bold;
    font-size: 50px;
    line-height: 60px;

    color: #000000;
  }
  .numberofitems {
    position: absolute;
    width: 609px;
    height: 127px;
    left: 100px;
    top: 250px;

    font-weight: 500;
    font-size: 20px;
    line-height: 48px;

    color: #000000;
  }
`;
const NFTList = styled.div`
  position: absolute;
  top: 310px;
  left: 92px;
`;

const Explore = ({ web3, account, erc721list, showAllNfts }) => {
  const [nft, setNft] = useState([]);

  useEffect(() => {
    showAllNfts();
    axios.get("http://localhost:5000/explore").then((res) => {
      setNft(res.data);
    });
  }, []);

  return (
    <Wrapper>
      <h1 className="thumbnail">Explore All NFTs</h1>
      <p className="numberofitems">{nft.length} items</p>
      <NFTList>
        <TokenList
          web3={web3}
          account={account}
          erc721list={erc721list}
          nft={nft}
        />
      </NFTList>
    </Wrapper>
  );
};

export default Explore;
