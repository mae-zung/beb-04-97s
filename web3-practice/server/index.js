import express from 'express';
import cors from 'cors';
import { default as mongodb } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();

const MongoClient = mongodb.MongoClient;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let db;


MongoClient.connect('mongodb+srv://bingsu:12341234@cluster0.znrrl.mongodb.net/?retryWrites=true&w=majority',
  (error, client) => {
    if (error) {
      console.log(error);
    } else {
      db = client.db('97s');
      app.listen(process.env.PORT || 5000, () => {
        console.log('localhost:5000/');
      })
    }
  })
//test/
app.get('/', (req, res) => {
  res.send('beb-04-97s')
})
app.post('/test1', (req, res) => {
  const id = req.body.id;
  res.send('success')
})

// metadata <==> DB table
const input = {
  address: '', // 소유자 주소 
  name: '', // NFT 이름 
  ercURL: '', // NFT URL 
  createdAT: '', // NFT 생성일 
  description: '', // NFT 설명
  sellType: '', // 판매여부 
  sellPrice: '' // 가격 
};

function inputMeta(address, name, ercURL, createdAT, description, sellType, sellPrice) {
  input.address = address
  input.name = name
  input.ercURL = ercURL
  input.createdAT = createdAT
  input.description = description
  input.sellType = sellType
  input.sellPrice = sellPrice
}

//create page post
app.post('/create', (req, res) => {
  const account = req.body.account
  const tokenId = req.body.tokenId
  inputMeta(
    req.body.address,
    req.body.name,
    req.body.ercURL,
    req.body.createdAT,
    req.body.description,
    req.body.sellType,
    req.body.sellPrice,
  ) 

  db.collection('beb').insertOne({ address: input.address, name: input.name, ercURL: input.ercURL, createdAT: input.createdAT, description: input.description, sellType: input.sellType, sellPrice: input.sellPrice,}, (error, result) => {
          console.log(result);
        });

  //DB에 이미 한번 저장이 되어있는 지 확인하자  -- 저장되어있으면 update, 새로운사람이면 insertOne을 진행하자.
  //account:[[tokenId,type],[tokenId,type],[tokenId,type]....]
  //2. {type : {toeknId:metadata}}
  // if (account !== undefined) {
  //   db.collection('beb').find({ 'account': account }).toArray((error, result) => {

  //     if (result[0] !== undefined) {
  //       //DB에 이미 한번 저장이 되어있는 상태면 추가해주는 쿼리를 날린다.
  //       db.collection('beb').update({ account: account }, {
  //         "$push": { "tokenIds": { "tokenId": tokenId, 'type': input.type } },
  //       });
  //       //metadata저장하는 쿼리
  //       db.collection('beb').insertOne({ sellType: input.sellType, data: { account: account, tokenId: tokenId, metadata: input } })
  //       //res.send('tokenId && metadata input success')
  //     } else {
  //       //처음이라면 저장해주자.
  //       db.collection('beb').insertOne({ account: account, tokenIds: [{ tokenId: tokenId, sellType: input.sellType }] }, (error, result) => {
  //         console.log(result);
  //       });
  //       //metadata저장하는 쿼리
  //       db.collection('beb').insertOne({ sellType: input.type, data: { account: account, tokenId: tokenId, metadata: input } })
  //       //res.send('tokenId && metadata input success')
  //     }
  //   })
  // }
  res.send('success');

})

app.get('/explore',(req,res)=>{
  db.collection('beb').find({}).toArray((err,result)=>{
    console.log(result[0].data);
    res.send(result);
  })
})

app.get('/mypage',(req,res)=>{
  db.collection('beb').find({}).toArray((err,result)=>{
    console.log(result[0].data);
    res.send(result);
  })
})


//메타데이터를 보내주는 작업이 끝!! 
app.get('/info/:tokenId', (req, res) => {
  let tokenId = req.params.tokenId;
  db.collection('beb').find({ }).toArray((error, result) => {
    for(let i = 0; i < result.length; i++){
      if (tokenId === String(result[i]._id)){
        res.send(result[i]);
      }
    }
  })
})



// //소유권이전으로인해서 특정 값을 삭제하고 삭제 후 특정 계정에 값을 옮겨주는 작업.
// function deleteSeller(seller, tokenId) {
//   db.collection('NFTPOST').update(
//     {
//       "account": seller
//     },
//     {
//       "$pull": {
//         "tokenIds": { "tokenId": Number(tokenId) }
//       }
//     }
//   )
// }

// function changeOwner(seller, buyer) {
//   db.collection('Types').update(
//     {
//       "data.account": seller
//     },
//     {
//       "$set": {
//         "data.account": buyer
//       }
//     }
//   )

// }

// app.post('/buy', (req, res) => {

//   const buyer = req.body.buyer.toLowerCase();
//   const seller = req.body.seller.toLowerCase();
//   const tokenId = req.body.tokenId;
//   const type = req.body.type;







//   //buyer의 Db에 tokenId를 추가시킨다.
//   if (buyer !== undefined) {
//     db.collection('NFTPOST').find({ 'account': buyer }).toArray((error, result) => {

//       if (result[0] !== undefined) {
//         deleteSeller(seller, tokenId);
//         changeOwner(seller, buyer)
//         //DB에 이미 한번 저장이 되어있는 상태면 추가해주는 쿼리를 날린다.
//         db.collection('NFTPOST').update({ account: buyer }, {
//           "$push": { "tokenIds": { "tokenId": Number(tokenId), 'type': type } },
//         });

//       } else {
//         //처음이라면 저장해주자.
//         deleteSeller(seller, tokenId);
//         changeOwner(seller, buyer)
//         db.collection('NFTPOST').insertOne({ account: buyer, tokenIds: [{ tokenId: Number(tokenId), type: type }] }, (error, result) => {
//           console.log(result);
//         });
//       }
//     })
//   }

//   res.send('success');

// })


// app.get('/Main', (req, res) => {
//   db.collection('Types').find({}).toArray((err, result) => {
//     console.log(result[0].data.tokenId);
//     res.send(result);
//   })
// })


// app.post('/mypage', (req, res) => {


//   const account = req.body.account


//   console.log(account);

//   const change = account.toLowerCase();
//   console.log(change);

//   const mypageData = [];
//   db.collection('NFTPOST').find({ account: change }).toArray((err, result) => {


//     if (result[0] !== undefined) {


//       for (let i = 0; i < result[0].tokenIds.length; i++) {
//         mypageData.push(result[0].tokenIds[i].tokenId)
//       }

//       const sendData = [];

//       for (let i = 0; i < mypageData.length; i++) {
//         db.collection('Types').find({ 'data.tokenId': mypageData[i] }).toArray((err, result) => {
//           sendData.push(...result);
//         })
//       }

//       setTimeout(() => {
//         res.send(sendData)
//       }, 1000)

//     } else {
//       res.send([]);
//     }
//   })



// })