import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const buttonStyle = css`
  border: none;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  text-align: center;
  outline: none;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #8bbff2;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
