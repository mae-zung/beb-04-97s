import React from "react";
import { dummyNFTs } from "../components/dummyNFTs";
const Explore = ({ showMyNfts }) => {
  return (
    <div>
      <h1>Explore NFTs</h1>
      <p>{dummyNFTs.length} items</p>
      <button onClick={showMyNfts}>SHOW MY NFTs</button>
      {/* {dummyNFTs.map((NFT) => {
        return (
          <li key={NFT.id}>
            <img src={NFT.image} alt="nft_image" />
            <div>{NFT.name}</div>
            <div>{NFT.price}</div>
          </li>
        );
      })} */}
    </div>
  );
};

export default Explore;
