import React, { useState } from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";
import Button from "../components/Button";
import { create } from "ipfs-http-client";

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
const client = create("https://ipfs.infura.io:5001/api/v0");

const Create = () => {
  const [imgURl, updateimgUrl] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [metadataUrl, setmetadataUrl] = useState("");

  async function onChange(e) {
    const img = e.target.files[0];
    try {
      const added = await client.add(img); //파일 업로드
      const url = `ipfs.infura.io/ipfs/${added.path}`;
      updateimgUrl(url);
      console.log(imgURl);
    } catch (error) {
      console.log("Error uploading img: ", error);
    }
  }
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
      />
      <p className="name">NAME</p>
      <input type="text" name="nftname" className="inputName" />
      <p className="description">DESCRIPTION</p>
      <p className="description_contents">
        The description will be included on the item's detail page underneath
        its image.
      </p>
      <input type="textarea" name="nftname" className="inputDesc" />
      <Button className="createButton" onChange={onChange}>
        Create
      </Button>
    </Wrapper>
  );
};

export default Create;
