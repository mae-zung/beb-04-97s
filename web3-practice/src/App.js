import "./App.css";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import erc721Abi from "./erc721Abi";
import { Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import Navigator from "./pages/Navigator";

function App() {
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
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

  return (
    <div>
      <Navigator />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<Create />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <button
        className="metaConnect"
        onClick={() => {
          connectWallet();
        }}
      >
        connect to MetaMask
      </button>
      <div className="userInfo">주소: {account}</div>
    </div>
  );
}

export default App;
