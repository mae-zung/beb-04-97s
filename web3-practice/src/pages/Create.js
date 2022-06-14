import React from "react";
import styled from "styled-components";
import Responsive from "../Responsive";

const Wrapper = styled(Responsive)`
  font-family: "Poppins";
  font-style: normal;
  color: #000000;

  .title {
    /* Create New Item */

    position: absolute;
    width: 543px;
    height: 96px;
    left: 418px;
    top: 136px;

    font-weight: 600;
    font-size: 64px;
    line-height: 96px;
  }
  .metadata {
    position: absolute;
    width: 77px;
    height: 36px;
    left: 421px;
    top: 388px;

    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
  }
`;

const Create = ({ onchange }) => {
  return (
    <Wrapper>
      <h1 className="title">Create New Item</h1>
      <p>Image</p>
      <p>Name</p>
      <input type="text" name="nftname" />
      <p>Description</p>
      <p>
        The description will be included on the item's detail page underneath
        its image.
      </p>
      <input type="text" name="nftname" />
    </Wrapper>
  );
};

export default Create;
