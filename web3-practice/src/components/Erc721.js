import erc721Abi from "./erc721Abi";
import { useState } from "react";

function Erc721({ web3, account, erc721list }) {
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
      {erc721list.map((token) => {
        return (
          <img className="erc721token" src={token.tokenURI} width={300} />
        );
      })}
    </div>
  );
}

export default Erc721;
