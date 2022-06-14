const getRandomNumber = (min, max) => {
  return parseInt(Math.random() * (Number(max) - Number(min) + 2));
};

const dummyNFTs = [
  {
    id: 1,
    name: "CryptoPig",
    description: "created by me",
    owner: "owner1",
    image: `https://picsum.photos/id/${getRandomNumber(1, 1000)}/200/200`,
    price: 0.6,
  },
  {
    id: 2,
    name: "CryptoPig",
    description: "created by me",
    owner: "owner1",
    image: `https://picsum.photos/id/${getRandomNumber(1, 1000)}/200/200`,
    price: 0.6,
  },
  {
    id: 3,
    name: "CryptoPig",
    description: "created by me",
    owner: "owner1",
    image: `https://picsum.photos/id/${getRandomNumber(1, 1000)}/200/200`,
    price: 0.6,
  },
  {
    id: 4,
    name: "CryptoPig",
    description: "created by me",
    owner: "owner1",
    image: `https://picsum.photos/id/${getRandomNumber(1, 1000)}/200/200`,
    price: 0.6,
  },
  {
    id: 5,
    name: "CryptoPig",
    description: "created by me",
    owner: "owner1",
    image: `https://picsum.photos/id/${getRandomNumber(1, 1000)}/200/200`,
    price: 0.6,
  },
  {
    id: 6,
    name: "CryptoPig",
    description: "created by me",
    owner: "owner1",
    image: `https://picsum.photos/id/${getRandomNumber(1, 1000)}/200/200`,
    price: 0.6,
  },
  {
    id: 7,
    name: "CryptoPig",
    description: "created by me",
    owner: "owner1",
    image: `https://picsum.photos/id/${getRandomNumber(1, 1000)}/200/200`,
    price: 0.6,
  },
  {
    id: 8,
    name: "CryptoPig",
    description: "created by me",
    owner: "owner1",
    image: `https://picsum.photos/id/${getRandomNumber(1, 1000)}/200/200`,
    price: 0.6,
  },
  {
    id: 9,
    name: "CryptoPig",
    description: "created by me",
    owner: "owner1",
    image: `https://picsum.photos/id/${getRandomNumber(1, 1000)}/200/200`,
    price: 0.6,
  },
];

export { dummyNFTs };
