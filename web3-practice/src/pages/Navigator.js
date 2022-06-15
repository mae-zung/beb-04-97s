import React from "react";
import { Link } from "react-router-dom";
import Responsive from "../Responsive";
import styled from "styled-components";
import OpenSeaLogo from "../OpenSea-Logo.png";
import { MdAccountBalanceWallet } from "react-icons/md";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  backgroud: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    position: absolute;
    width: 200px;
    height: 44px;
    left: 54px;
    top: 27px;
  }
  .explore {
    /* Explore */

    position: absolute;
    width: 118px;
    height: 31.08px;
    left: 1135px;
    top: 33px;
  }
  .create {
    /* Create */

    position: absolute;
    width: 112px;
    height: 31.08px;
    left: 1295px;
    top: 33px;
  }
  .mypage {
    /* Mypage */

    position: absolute;
    width: 133px;
    height: 31.08px;
    left: 1449px;
    top: 33px;
  }
  .menu-common {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    text-align: center;
    text-decoration: none;

    color: #000000;
  }
`;

const Spacer = styled.div`
  height: 7rem;
`;

const Navigator = ({ connectWallet, account, showMyNfts }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/">
            <img src={OpenSeaLogo} alt="opensea_logo" className="logo" />
          </Link>
          <Link to="/explore" className="explore menu-common">
            Explore
          </Link>
          <Link to="/create" className="create menu-common">
            Create
          </Link>
          {account ? (
            <Link
              to="/mypage"
              className="mypage menu-common"
              onClick={showMyNfts}
            >
              My Page
            </Link>
          ) : (
            <MdAccountBalanceWallet
              className="mypage menu-common"
              onClick={connectWallet}
            />
          )}

          {/* <button onClick={connectWallet}>connect to MetaMask</button> */}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Navigator;
