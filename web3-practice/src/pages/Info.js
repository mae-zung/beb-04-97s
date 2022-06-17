import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import { FaEthereum } from "react-icons/fa";
import axios from "axios";
import Web3 from "web3";
import erc721Abi from "../components/erc721Abi";

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
    font-size: 25px;
    background: #2081e2;
  }
  .button2 {
    position: absolute;
    width: 394px;
    height: 84px;
    left: 829px;
    top: 617px;
    color: white;
    font-size: 25px;
    background: #969696;
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

//nft 구매 함수

const BuyNft = async (tokenId, price, owner, account, contractAddress) => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);

    try {
      const tokenContract = await new web3.eth.Contract(
        erc721Abi,
        contractAddress
      );
      //   const owner = await tokenContract.methods.ownerOf(tokenId);
      const balance = await web3.eth.getBalance(account);
      if (balance < price) {
        alert("잔고가 부족합니다.");
      } else {
        // 이더부터 보내기
        web3.eth
          .sendTransaction({
            from: account,
            to: owner,
            value: price,
          })
          .then((receipt) => {
            console.log("receipt", receipt);
          });
        //nft 받기
        tokenContract.methods
          .transferFrom(owner, account, tokenId)
          .send({
            from: owner,
          })
          .on("receipt", (receipt) => {
            console.log(receipt);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const Info = ({ account, contractAddress }) => {
  const [nft, setNft] = useState([]);

  let url = window.location.href.split("/");
  console.log(url[4]);

  useEffect(() => {
    axios.get("http://localhost:5000/info/" + url[4]).then((res) => {
      setNft(res.data);
    });
  }, []);

  return (
    <Wrapper>
      <img src={nft.ercURL} className="nftimg" />
      <h1 className="name">NFT name --- {nft.name}</h1>
      <p className="description">NFT description --- {nft.description}</p>
      <p className="currentPrice">NFT currentPrice --- {nft.sellPrice}</p>
      <FaEthereum className="eth" /> <p className="price">{nft.sellPrice}</p>
      <Button
        className={nft.sellType ? "button1" : "button2"}
        onClick={BuyNft(
          nft.tokenId,
          nft.sellPrice,
          nft.address,
          account,
          contractAddress
        )}
      >
        BUY NOW
      </Button>
    </Wrapper>
  );
};

export default Info;
