import React, { useState } from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import Button from "../components/Button";
import { create } from "ipfs-http-client";
import erc721Abi from "../components/erc721Abi";
import Web3 from "web3";
import axios from "axios";

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
    color: #969696;
  }
  .sellornot {
    position: absolute;
    width: 600px;
    height: 36px;
    left: 421px;
    top: 680px;

    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }
  .setPrice {
    position: absolute;
    width: 600px;
    height: 36px;
    left: 1040px;
    top: 743px;

    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    color: #969696;
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
    top: 850px;
    color: white;
    background: #2081e2;
  }
  .inputPrice {
    font-size: 1.4rem;
    font-family: "poppins";
    position: absolute;
    width: 100px;
    height: 36px;
    left: 1123px;
    top: 750px;
  }
`;
const ToggleContainer = styled.div`
  position: absolute;
  left: 1180px;
  top: 710px;

  cursor: pointer;
  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: #8b8b8b;
    transition: all 0.2s ease;
    &.toggle--checked {
      background-color: #2081e2;
    }
  }
  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #fafafa;
    transition: all 0.25s ease;
    &.toggle--checked {
      left: 27px;
    }
  }
`;

const Spacer = styled.div`
  height: 60rem;
`;

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

  const MintFunc = async (address, imgurl, contractAddress) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const myContract = new web3.eth.Contract(erc721Abi, contractAddress);
        const gasPrice = await web3.eth.getGasPrice();
        const tx = await myContract.methods.mintNFT(address, imgurl).send({
          from: address,
          gas: 2000000,
          gasPrice,
        });
        return tx;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const databaseSend = async (itemID) => {
    try {
      axios
        .put("http://localhost:5001/create", {
          ercURL: metadata.ercURL, // ????????? ??????
          tokenHash: itemID,
        })
        .then((res) => {
          console.log(res);
          alert("??????");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      return console.log(error);
    }
  };

  async function handleUrl(e) {
    const img = e.target.files[0];
    try {
      const added = await client.add(img); //?????? ?????????
      const url = ` https://ipfs.io/ipfs/${added.path}`;

      setMetadata({ ...metadata, ercURL: url });
    } catch (error) {
      console.log("img ????????? ??????: ", error);
    }
    console.log(metadata);
  }

  const handleChange = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
    //console.log(metadata);
  };

  const handleSell = () => {
    setMetadata({ ...metadata, sellType: !metadata.sellType });
    console.log(metadata);
  };

  const handleClick = () => {
    //metadata ???????????? => address, createdAT
    if (!account) {
      //   setMetadata({ ...metadata, address: account, createdAT: Date() });
      //   console.log(metadata);
      alert("????????? ???????????????");
    }

    // ????????? ?????? ??????
    MintFunc(account, metadata.ercURL, contractAddress)
      .then((tx) => {
        console.log({ tokenId: tx.events.Transfer.returnValues.tokenId });
        return tx.events.Transfer.returnValues.tokenId;
      })
      .then((tokenId) => databaseSend(tokenId));
    // console.log(account);
    // console.log(Date);
    // Post ??????: DB ??????
    try {
      axios
        .post("http://localhost:5001/create", {
          address: account, // ????????? ??????
          name: metadata.name, // NFT ??????
          ercURL: metadata.ercURL, // NFT URL
          createdAT: Date(), // NFT ?????????
          description: metadata.description, // NFT ??????
          sellType: metadata.sellType, // ????????????
          sellPrice: metadata.sellPrice, // ??????
        })
        .then((res) => {
          //console.log(res);
          //   alert("??????????????? ?????????????????????.");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <>
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
        <p className="sellornot">NFT STATUS</p>

        <ToggleContainer name="sellType" onClick={handleSell}>
          <div
            className={`toggle-container ${
              metadata.sellType ? "toggle--checked" : ""
            }`}
          />
          <div
            className={`toggle-circle ${
              metadata.sellType ? "toggle--checked" : ""
            }`}
          />
        </ToggleContainer>
        {metadata.sellType ? (
          <>
            <p className="setPrice">Set Price</p>
            <input
              type="number"
              name="sellPrice"
              className="inputPrice"
              onChange={handleChange}
            />
          </>
        ) : null}
        <Button className="createButton" onClick={handleClick}>
          Create
        </Button>
      </Wrapper>
      <Spacer />
    </>
  );
};

export default Create;
