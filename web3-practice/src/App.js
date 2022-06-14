import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import Navigator from "./pages/Navigator";
import { dummyNFTs } from "./dummyNFTs";

function App() {
  const [nfts, setNfts] = useState([dummyNFTs]);
  const onChange = (e) => {
    setNfts(...nfts, {
      id: nfts.length + 1,
      name: e.target.nftname,
      description: e.target.description,
      owner: "owner1",
      image: e.target.image,
      price: 0.6,
    });
  };
  return (
    <div>
      <Navigator />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<Create onChange={onChange} />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
