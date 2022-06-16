import React from "react";
import { dummyNFTs } from "../components/dummyNFTs";
import styled from "styled-components";
import TokenList from "../components/TokenList";
import Responsive from "../components/Responsive";

const NFTList = styled(Responsive)`
  position: absolute;

  left: 100px;
  top: 550px;
`;

const Explore = ({ showMyNfts, web3, account, erc721list }) => {
  return (
    <div>
      <h1>Explore NFTs</h1>
      <p>{dummyNFTs.length} items</p>
      <button onClick={showMyNfts}>SHOW MY NFTs</button>
      <TokenList web3={web3} account={account} erc721list={erc721list} />
    </div>
  );
};

export default Explore;
