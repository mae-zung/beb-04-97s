import React, { useState, useEffect } from "react";
import Responsive from "../components/Responsive";
import styled from "styled-components";
import TokenList from "../components/TokenList";
import axios from "axios";

const Wrapper = styled(Responsive)`
  font-style: normal;
  font-family: "Poppins";

  .address {
    position: absolute;
    width: 1000px;
    height: 48px;
    left: 108px;
    top: 250px;

    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    /* identical to box height */

    color: #000000;
  }
  .created {
    position: absolute;
    width: 1000px;
    height: 48px;
    left: 108px;
    top: 450px;

    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    /* identical to box height */

    color: #000000;
  }
`;

const NFTList = styled(Responsive)`
  position: absolute;

  left: 100px;
  top: 550px;
`;

const MyPage = ({ web3, account, erc721list, showMyNfts }) => {
  const [nft, setNft] = useState([]);
  let newArr = [];

  useEffect(() => {
    showMyNfts();
    axios.get("http://localhost:5001/mypage").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].address === account) {
          // console.log(res.data[i].address)
          newArr.push(res.data[i]);
        }
      }
      // console.log(res.data)
      // console.log(newArr)
      setNft(newArr);
    });
  }, []);

  return (
    <>
      <Wrapper>
        <p className="address">ADDRESS {account}</p>
        <p className="created">CREATED</p>
        <NFTList>
          <TokenList
            web3={web3}
            account={account}
            erc721list={erc721list}
            nft={nft}
          />
        </NFTList>
      </Wrapper>
    </>
  );
};

export default MyPage;
