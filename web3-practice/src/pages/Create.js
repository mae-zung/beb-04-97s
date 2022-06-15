import React from "react";
import styled from "styled-components";
import Responsive from "../components/Responsive";

const Wrapper = styled(Responsive)`
  font-family: "Poppins";
  font-style: normal;
  color: #000000;

  .title {
    position: absolute;
    width: 543px;
    height: 96px;
    left: 418px;
    top: 136px;

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
    top: 400px;

    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }
  .description {
    position: absolute;
    width: 77px;
    height: 36px;
    left: 421px;
    top: 600px;

    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }
  .description_contents {
    position: absolute;
    width: 600px;
    height: 36px;
    left: 421px;
    top: 650px;

    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
  }
  .
`;

const Create = ({ onchange }) => {
  return (
    <Wrapper>
      <h1 className="title">Create New Item</h1>
      <p className="Image">Image</p>
      <p className="name">Name</p>
      <input type="text" name="nftname" />
      <p className="description">Description</p>
      <p className="description_contents">
        The description will be included on the item's detail page underneath
        its image.
      </p>
      <input type="text" name="nftname" />
    </Wrapper>
  );
};

export default Create;
