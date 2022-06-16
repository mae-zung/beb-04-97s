import "./App.css";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import erc721Abi from "./components/erc721Abi";
import { Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import Navigator from "./pages/Navigator";

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  const newErc721addr = "0x70d609C2250DC188930dcf94eC2052c27EE9e81f";
  const [erc721list, setErc721list] = useState([]); // 자신의 NFT 정보를 저장할 토큰
  const [allErc721list, setAllErc721list] = useState([]); // 모든 NFT 정보를 저장할 토큰

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      // window.ethereum이 있다면
      try {
        const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
        setWeb3(web);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const connectWallet = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);
  };

  const showMyNfts = () => {
    addNewErc721Token();
  };

  const addNewErc721Token = async () => {
    const tokenContract = await new web3.eth.Contract(erc721Abi, newErc721addr);
    const name = await tokenContract.methods.name().call();
    const symbol = await tokenContract.methods.symbol().call();
    const totalSupply = await tokenContract.methods.totalSupply().call();
    let arr = [];
    for (let i = 1; i <= totalSupply; i++) {
      arr.push(i);
    }

    console.log(1);
    for (let tokenId of arr) {
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
      let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
      setAllErc721list((prevState) => {
        return [...prevState, { name, symbol, tokenId, tokenURI }];
      });
      if (String(tokenOwner).toLowerCase() === account) {
        setErc721list((prevState) => {
          return [...prevState, { name, symbol, tokenId, tokenURI }];
        });
      }
    }
  };

  return (
    <div>
      <Navigator
        connectWallet={connectWallet}
        account={account}
        showMyNfts={showMyNfts}
      />
      <Routes>
        <Route exact={true} path="/" element={<Home />} />
        <Route
          path="/explore"
          element={
            <Explore
              showMyNfts={showMyNfts}
              account={account}
              web3={web3}
              erc721list={allErc721list}
            />
          }
        />
        <Route
          path="/create"
          element={<Create account={account} contractAddress={newErc721addr} />}
        />
        <Route
          path="/mypage"
          element={
            <MyPage account={account} web3={web3} erc721list={erc721list} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
