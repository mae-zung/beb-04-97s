function Erc721({ erc721list }) {
  return (
    <div>
      {erc721list.map((token) => {
        return (
          <div className="erc721token">
            Name: <span className="name">{token.name}</span>(
            <span className="symbol">{token.symbol}</span>)
            <div className="nft">id: {token.tokenId}</div>
            <img src={token.tokenURI} alt="nft" width={300} />
          </div>
        );
      })}
    </div>
  );
}

export default Erc721;
