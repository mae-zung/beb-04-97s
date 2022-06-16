import erc721Abi from "./erc721Abi";
import { useState, useEffect } from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import Info from "../pages/Info";

const NFTeach = styled.img`
    width: 300px;
    height: 300px;
    margin: 10px;
`;


function Erc721({ web3, account, erc721list, nft}) {

  const [to, setTo] = useState("");
  const sendToken = async (tokenAddr, tokenId) => {
    const tokenContract = await new web3.eth.Contract(erc721Abi, tokenAddr, {
      from: account,
    });
    tokenContract.methods
      .transferFrom(account, to, tokenId)
      .send({
        from: account,
      })
      .on("receipt", (receipt) => {
        setTo("");
      });
  };

  return (
    <div className="erc721list">
      {nft.map((token) => {
        return (
        <NavLink to={"/Info/"+token._id}>
          <NFTeach className="erc721token" src={token.ercURL} />
        </NavLink>
        )
      })}
    </div>
  );
}

export default Erc721;
