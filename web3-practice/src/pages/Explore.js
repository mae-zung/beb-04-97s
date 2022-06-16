import React, { useState, useEffect } from "react";
import TokenList from "../components/TokenList";
import axios from 'axios';



const Explore = ({ web3, account, erc721list, showAllNfts }) => {

  const [nft, setNft] = useState([]);

  useEffect(() => {
    showAllNfts()
    axios.get('http://localhost:5000/explore')
    .then((res) => {
      setNft(res.data)
    })
  }, []);
  
  return (
    <div>
      <h1>Explore NFTs</h1>
      <p>{nft.length} items</p>
      <TokenList web3={web3} account={account} erc721list={erc721list} nft={nft}/>
    </div>
  );
};

export default Explore;
