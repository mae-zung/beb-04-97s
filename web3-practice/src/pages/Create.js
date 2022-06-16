import React, { useState } from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import Button from "../components/Button";
import { create } from "ipfs-http-client";
import erc721Abi from "../components/erc721Abi";
import Web3 from "web3";

const Wrapper = styled(Responsive)`
  font-family: "Poppins";
  font-style: normal;
  color: #000000;

  .title {
    position: absolute;
    width: 543px;
    height: 96px;
    left: 418px;
    top: 120px;

    font-weight: 600;
    font-size: 64px;
    line-height: 96px;
  }
  .Image {
    position: absolute;
    width: 77px;
    height: 36px;
    left: 421px;
    top: 250px;

    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }
  .name {
    position: absolute;
    width: 77px;
    height: 36px;
    left: 421px;
    top: 370px;

    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }
  .description {
    position: absolute;
    width: 77px;
    height: 36px;
    left: 421px;
    top: 470px;

    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }
  .description_contents {
    position: absolute;
    width: 600px;
    height: 36px;
    left: 421px;
    top: 515px;

    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
  }
  .inputName {
    font-size: 1.4rem;
    font-family: "poppins";
    position: absolute;
    width: 400px;
    height: 36px;
    left: 421px;
    top: 430px;
  }
  .inputDesc {
    font-size: 1.4rem;
    font-family: "poppins";
    position: absolute;
    width: 800px;
    height: 100px;
    left: 421px;
    top: 570px;
  }
  .inputImg {
    position: absolute;
    width: 800px;
    height: 100px;
    left: 421px;
    top: 320px;
  }
  .createButton {
    position: absolute;
    width: 170px;
    height: 50px;
    left: 740px;
    top: 750px;
    color: white;
    background: #2081e2;
  }
`;

const MintFunc = async (address, imgurl, contractAdress) => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      const myContract = new web3.eth.Contract(erc721Abi, contractAdress);
      const gasPrice = await web3.eth.getGasPrice();
      const itemID = await myContract.methods
        .mintNFT(address, JSON.stringify(imgurl))
        .send({
          from: address,
          gas: 2000000,
          gasPrice,
        });
      console.log("민팅 완료");
      return itemID;
    } catch (error) {
      console.log(error);
    }
  }
};
const client = create("https://ipfs.infura.io:5001/api/v0");

const Create = ({ account, contractAddress }) => {
  const [metadata, setMetadata] = useState({
    address: "",
    name: "",
    ercURL: "",
    createdAT: "",
    description: "",
    sellType: false,
    sellPrice: "",
  });

  async function handleUrl(e) {
    const img = e.target.files[0];
    try {
      const added = await client.add(img); //파일 업로드
      const url = `ipfs.infura.io/ipfs/${added.path}`;

      setMetadata({ ...metadata, ercURL: url });
    } catch (error) {
      console.log("img 업로드 에러: ", error);
    }
    console.log(metadata);
  }

  const handleChange = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
    console.log(metadata);
  };

  const handleSell = () => {
    setMetadata({ ...metadata, sellType: !metadata.sellType });
    console.log(metadata);
  };

  const handleClick = () => {
    //metadata 완성하기 => address, createdAT
    if (account) {
      setMetadata({ ...metadata, address: account, createdAT: Date() });
      console.log(metadata);
    }
    // 컨트랙 함수 실행
    MintFunc(account, metadata.ercURL, contractAddress);
    // Post 요청: DB 저장
  };

  return (
    <Wrapper>
      <h1 className="title">Create New Item</h1>
      <p className="Image">IMAGE</p>
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        className="inputImg"
        onChange={handleUrl}
      />
      <p className="name">NAME</p>
      <input
        type="text"
        name="name"
        className="inputName"
        onChange={handleChange}
      />
      <p className="description">DESCRIPTION</p>
      <p className="description_contents">
        The description will be included on the item's detail page underneath
        its image.
      </p>
      <input
        type="textarea"
        name="description"
        className="inputDesc"
        onChange={handleChange}
      />
      <Button name="sellType" onClick={handleSell}>
        Sell?
      </Button>
      {metadata.sellType ? (
        <input type="number" name="sellPrice" onChange={handleChange} />
      ) : null}
      <Button className="createButton" onClick={handleClick}>
        Create
      </Button>
    </Wrapper>
  );
};

export default Create;
