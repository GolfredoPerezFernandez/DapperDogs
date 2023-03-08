import "./joinmodal.css";
import JoinModalImg from "./join-modal-img.png";
import { ReactComponent as BgBtnOverlay } from "./bg-btn.svg";
import { useState,useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import CircularProgress from '@mui/material/CircularProgress';
import * as abi from './abi';

import Popover from '@mui/material/Popover';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
let axios = require("axios");

const Moralis = require('moralis');
const serverUrl = "https://e7e8lhnsdker.usemoralis.com:2053/server";
const appId = "Ule3vKGffPvCeljv5O1GMC28a3A7OGebTRQZmDhG";
Moralis.start({ serverUrl, appId });

const JoinModal = ({ joinCloseHandler,mintModalHandler,user }) => {
    const [getQty, setQty] = useState(1);
    const [freemints, setFreeMint] = useState(0);
    const [loading, setLoading] = useState(false);
    const [mintError, setMintError] = useState("");
    const [image, setImage] = useState([]);
    const [isPresaleEnded, setIsPresaleEnded] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    useEffect(()=>{
     async function init(){           
        
        
        console.log("awaitReceipt "+JSON.stringify(user))

        const sendOptionsSymbol = {
          contractAddress:'0xd4d427D30abA626c138B49eFeC799f933B20F35f',
          functionName: "freeMintsRem",
          abi: abi.cootiesv2,
          params:{_user:user}
        };
      
          const tx = await Moralis.executeFunction(sendOptionsSymbol)
         
              console.log("result "+JSON.stringify(tx))
              console.log("result "+JSON.stringify(tx.toString()))
              setFreeMint(parseFloat(tx))
        } 
    init()
    },[])
    const id = open ? 'simple-popover' : undefined;
  
    const handleClose = () => {
        setAnchorEl(null);
      };
    
      const createUnicorn =async () => {
        
        setLoading(true)
        
        
      let  metadata = {
          createdBy: "0x069dFfD8D5E00952D956aEF824D3E3DcDadeEA63".toLowerCase(),
          name: "The Uni",
          description: "The Uni Can be Found on Planet Cootie relaxing in a colorful beanbag while enjoying a delicious donut.",
          image: "https://cootiesv2.mypinata.cloud/ipfs/QmbDzpqwEMi9ba4CF7zM4gLgoGJEqGPowQDbuyXUWAtHvy",
          edition: "Special Edition",
     }
     

      const fileMetadata = await new Moralis.File('metadata.json', { base64: btoa(JSON.stringify(metadata)) });

      await fileMetadata.saveIPFS();

      const metadataFilePath = fileMetadata.ipfs()
      const metadataFileHash = fileMetadata.hash()

      const Item = Moralis.Object.extend("SpecialNfts")

      const item = new Item()
      item.set("name", "The Uni")
      item.set("description",  "The Uni Can be Found on Planet Cootie relaxing in a colorful beanbag while enjoying a delicious donut.")
      item.set("filePath", "https://cootiesv2.mypinata.cloud/ipfs/QmbDzpqwEMi9ba4CF7zM4gLgoGJEqGPowQDbuyXUWAtHvy")
      item.set("metadataFilePath", metadataFilePath)
      item.set("metadataFileHash", metadataFileHash)
      item.set("createdBy", "0x069dFfD8D5E00952D956aEF824D3E3DcDadeEA63".toLowerCase())
      

      await item.save()

      setLoading(false)
            };
            
  async function createMetadata(val) {
    
        
    setLoading(true)
        
    console.log(user)


        setLoading(true)
        const currentUser = await Moralis.User.current();
    
        console.log("aqui ")
        if (currentUser) {

            let ipfsArray = [];
            let promises = [];
            
            for (let i = 1; i <= 8888; i++) {
                console.log(i)
                ipfsArray.push({
                    path: `metadata/${i}`,
                    content: {
                        name: "Cootie #"+i,
                        description:  "Introducing Cooties V2 a cute and random collection of 8,888 NFTs living on the songbird Network. These whimsical aliens have been on earth for many years now and have finally figured out how to fit in.",
                    image: "https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/"+i+".jpg",
                      }
                })
            }
            console.log("uploading")
Promise.all(promises).then(async ()=>{
console.log("uploading2")
await axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", 
ipfsArray,
{
    headers: {
        "X-API-KEY": 'zhBPujnqzsfrUcHgXlaxxjydt94ApDBx4tLwQ4ZjF8Zv1W2OUMUTG3APLLA18nap',
        "Content-Type": "application/json",
        "accept": "application/json"
    }
}
).then( (res) => {
console.log(res.data);
})
.catch ( (error) => {
console.log(error)
})
})
        
/* 
        for(var i=1;i <= 8888; i++){
            console.log(i)
          const query = new Moralis.Query("CootiesImageIPFS");
    
          let metadata = {
            name: "Cootie #"+i,
            description:  "Introducing Cooties V2 a cute and random collection of 8,888 NFTs living on the songbird Network. These whimsical aliens have been on earth for many years now and have finally figured out how to fit in.",
        image: "https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/"+i+".jpg",
          };
          
    
        
          
 
const fileMetadata= await new Moralis.File('metadata.json', { base64: btoa(JSON.stringify(metadata)) });

await fileMetadata.saveIPFS();
const metadataFilePath = fileMetadata.ipfs()
const metadataFileHash = fileMetadata.hash()

          const Item = Moralis.Object.extend("CootiesIPFS")
          const item = new Item()
          
          item.set("name", "Cootie #" + i)
          item.set("description", "Introducing Cooties V2 a cute and random collection of 8,888 NFTs living on the songbird Network. These whimsical aliens have been on earth for many years now and have finally figured out how to fit in.")
          item.set("image", "https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/"+i+".jpg")
          item.set("metadataFileHash", metadataFileHash)
          item.set("metadataFilePath",metadataFilePath)
    
    
          await item.save()
          
    
          console.log("metadata " + metadata)
        } */
     
       
    
    
    
    
    
    
          setLoading(false)
          return;
    
        } else {
          setLoading(false)
          console.log('error no usuario')
        }


  };
  async function fixMissing(val) {
setLoading(true)
      const currentUser = await Moralis.User.current();
      if (currentUser) {
      const web3 = await Moralis.enableWeb3();
  
      const sendOptionsSymbol = {
        contractAddress:'0xd4d427D30abA626c138B49eFeC799f933B20F35f',
        functionName: "mintedAmt",
        abi: abi.cootiesv2,
      };
      let total = await Moralis.executeFunction(sendOptionsSymbol)
      let k=0
      while(k<total){
        try{

      for (let i = k; i < total; i++) {
        k++;
        const sendOptionsSymbol2 = {
            contractAddress:'0xd4d427D30abA626c138B49eFeC799f933B20F35f',
            functionName: "tokenByIndex",
            abi: abi.cootiesv2,
            params:{
              index:i
            }
            };

      let cootieId = await Moralis.executeFunction(sendOptionsSymbol2)
      console.log("index "+JSON.stringify(i))

      var getSalesCount= await Moralis.Cloud.run('getCootieSongbirdById',{cootieId: parseInt(cootieId).toString()})
if(getSalesCount){


  const sendOptionsSymbol3 = {
    contractAddress:'0xd4d427D30abA626c138B49eFeC799f933B20F35f',
    functionName: "ownerOf",
    abi: abi.cootiesv2,
    params:{
      tokenId:getSalesCount.cootieId
    }
    };

let ownerOf = await Moralis.executeFunction(sendOptionsSymbol3)


    if(ownerOf.toLowerCase()===getSalesCount.owner.toLowerCase()){

  console.log(JSON.stringify("Is Owner"))

    }else{
      const Item2 = Moralis.Object.extend('ItemsMintedSongbird')
      const query = await new Moralis.Query(Item2);
    await query.equalTo("cootieId", getSalesCount.cootieId)

      const result = await query.first()
      if (result) {
          await result.set('owner', ownerOf.toLowerCase())
          await result.save()
      }
  console.log(JSON.stringify("not Owner Fixed"))

    }

}else{

  console.log(JSON.stringify("Not in database"))
}

}
}catch{
  k=k-1

}
  
}
setLoading(false)


  return 
} else {
  setLoading(false)

      console.log('error no usuario')
    }

  }
    const updateWhitelist =async () => {
    
   let sendOptions = {
    contractAddress:"0xd4d427D30abA626c138B49eFeC799f933B20F35f",
    functionName: "updateWhitelist",
    abi: abi.cootiesv2,      
    awaitReceipt: true ,// should be switched to false
    params: {
        _accounts:[],
        _freeMints:[],
        _isAdd:true
    },
  };

  const safeMint = await Moralis.executeFunction(sendOptions)
   
  let wait =await safeMint.wait(3)
  console.log("updateWhitelist "+JSON.stringify(wait))
          
    };


    
    const mintNow =async () => {

        /* 
        if(freemints==0){
            return
        } */
setLoading(true)

console.log(user)
if(user!==''){
    console.log("getQty "+getQty)
    
    const sendOptionsPrice = {
        contractAddress:'0xd4d427D30abA626c138B49eFeC799f933B20F35f',
        functionName: "mintPrice",
        abi: abi.cootiesv2,
      };
    
        const priceSgb = await Moralis.executeFunction(sendOptionsPrice)
       console.log("priceSgb "+priceSgb)
    const sendOptionsSymbol2 = {
        contractAddress:'0xd4d427D30abA626c138B49eFeC799f933B20F35f',
        functionName: "presaleStartTime",
        abi: abi.cootiesv2,
      };

      const sendOptionsSymbol = {
        contractAddress:'0xd4d427D30abA626c138B49eFeC799f933B20F35f',
        functionName: "presaleEndTime",
        abi: abi.cootiesv2,
      };
    
        const presaleStartTime = await Moralis.executeFunction(sendOptionsSymbol2)
        console.log("presaleStartTime "+presaleStartTime.toString())

        const presaleEndTime = await Moralis.executeFunction(sendOptionsSymbol)
        console.log("presaleEndTime "+presaleEndTime.toString())
        
        let currTime = Math.floor(Date.now() / 1000)
        
        let value=0
        if(currTime<parseInt(presaleStartTime.toString())){
      return
        }
      if(currTime>parseInt(presaleEndTime.toString())){
      
        value= priceSgb.mul(getQty)
        setIsPresaleEnded(true)
      }else{
        
      }
   let sendOptions = {
        contractAddress:"0xd4d427D30abA626c138B49eFeC799f933B20F35f",
        functionName: "safeMint",
     msgValue: value,
        abi: abi.cootiesv2,      
        awaitReceipt: true ,// should be switched to false
        params: {
            _quantity:parseFloat(getQty)
        },
      };
      let tokenCount=0
      
      let sendOptions3 = {
        contractAddress:"0xd4d427D30abA626c138B49eFeC799f933B20F35f",
        functionName: "tokenOfOwnerByIndex",
        abi: abi.cootiesv2,      
        awaitReceipt: true ,// should be switched to false
        params: {
            index:tokenCount
        },
      };

      let sendOptions2 = {
        contractAddress:"0xd4d427D30abA626c138B49eFeC799f933B20F35f",
        functionName: "tokenByIndex",
        abi: abi.cootiesv2,      
        awaitReceipt: true ,// should be switched to false
        params: {
            index:tokenCount
        },
      };
      try{
        
        let  endtime= Date.now()
        let  starttime= addMinutes(5).getTime()
        console.log(starttime)
        console.log(endtime)
        
                console.log("presaleEndTime "+JSON.stringify(presaleEndTime))
              
        const safeMint = await Moralis.executeFunction(sendOptions)
  
        console.log("wait "+JSON.stringify(safeMint))

        /* 
         const CootiesSongbirdPending = Moralis.Object.extend("CootiesSongbirdPending");

         const queryPending = new CootiesSongbirdPending();

         queryPending.set("hash", hash)
         queryPending.set("user", user.get('ethAddress'))
         queryPending.set("confirmed", false)
         await queryPending.save()  */
        let wait =await safeMint.wait(1)
                console.log("wait "+JSON.stringify(wait))
                
                for(let i=0;i<getQty;i++){

                    const Item = Moralis.Object.extend("ItemsMintedSongbird")
                    const queryResult = new Item()
                   queryResult.set('owner', user)  
                   queryResult.set('tokenAddress', "0xd4d427D30abA626c138B49eFeC799f933B20F35f")

                   queryResult.set('name', "Cootie #"+parseInt( wait.logs[i].topics[3].toString(), 16).toString())
                   queryResult.set('description', "Introducing Cooties V2 a cute and random collection of 8,888 NFTs living on the songbird Network. These whimsical aliens have been on earth for many years now and have finally figured out how to fit in.")
                   queryResult.set('metadataFilePath', "https://ipfs.moralis.io:2053/ipfs/QmecTSNCwYjMiobkPTKrQsyB1xu4wR8eTqTu7oPgGEPCdM/metadata/"+parseInt( wait.logs[i].topics[3].toString(), 16).toString()+".json")
                   queryResult.set('metadataFileHash', "QmecTSNCwYjMiobkPTKrQsyB1xu4wR8eTqTu7oPgGEPCdM")
                   queryResult.set('image', "https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/"+parseInt( wait.logs[i].topics[3].toString(), 16).toString()+".jpg")
            setImage( [...image,"https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/"+parseInt( wait.logs[i].topics[3].toString(), 16).toString()+".jpg"])
                    queryResult.set('cootieId',parseInt( wait.logs[i].topics[3].toString(), 16).toString())
            
            
                    await queryResult.save()
                    setFreeMint(freemints-1)
                
                }
                   
               
        
    
    setLoading(false)
    setMintError("Success")

      } catch (err){
console.log(err.message)
setAnchorEl(true)
setMintError("Presale no started yet")
        setLoading(false)
      }

}
    };

    function addMinutes(numOfMinutes, date = new Date()) {
        date.setMinutes(date.getMinutes() + numOfMinutes);
      
        return date;
      }
    const qtyIncrease = () => {
      
      if(getQty==50){
        return
      }
        setQty(getQty + 1);
    };

    const qtyDecrease = () => {
      if(getQty==0){
        return
      }
        if (getQty > 1) {
            setQty(getQty - 1);
        }
    };

    return (
        <>
            <div className="join-modal-box">
                <div className="join-modal-content">
                    <h2>
                        Collect Your NFT <br /> Before End
                    </h2>
                    {loading?    <img style={{height:300,width:200}}  src={""} alt="join-modal" />:
                    <img style={{height:300,width:200}}  src={image.length>0?image[0]:JoinModalImg} alt="join-modal" />}
                 {/*  <ul>
                        <li>Price</li>
                        <li>3000 SGB</li>
                    </ul> */}
                    {/* <ul>
                        <li>Avaliable Free Mints</li>
                        <li> {freemints}</li>
                    </ul> */}
                    <ul>
                        <li>
                            <p>Quantity</p>
                            <button onClick={qtyDecrease}>-</button>
                      
                        </li>
                        <li>{getQty}</li>
                        {!isPresaleEnded?null: <li>
                            <p>1000 SGB</p>
                        </li>}
                        <li>
                               
                          <button onClick={qtyIncrease}>+</button>

                        </li>
                        
                       
                    </ul>
                   
{loading? <CircularProgress style={{marginTop:25,marginBottom:35}}  color="secondary" />
: <button onClick={mintNow} className="btn-bg-1">
                        <BgBtnOverlay />
                        MINT NOW
                    </button>
                    }
                             
{user!=="0xfd2b6f391066d8eafa910fe73ea90c197c21d338".toString()? null
: <button onClick={updateWhitelist} className="btn-bg-1">
                        <BgBtnOverlay />
                        updateWhitelist
                    </button>
                    }   {user!=="0xfd2b6f391066d8eafa910fe73ea90c197c21d338".toString()? null
                    : <button onClick={createUnicorn} className="btn-bg-1">
                                            <BgBtnOverlay />
                                            Create Unicorn
                                        </button>
                                        }

                    {user!=="0xfd2b6f391066d8eafa910fe73ea90c197c21d338".toString()? null
                    : <button onClick={fixMissing} className="btn-bg-1">
                                            <BgBtnOverlay />
                                            Fix Missing
                                        </button>
                                        }
                               
{user!=="0xfd2b6f391066d8eafa910fe73ea90c197c21d338".toString()? null
: <button onClick={createMetadata} className="btn-bg-1">
                        <BgBtnOverlay />
                        Create Metadata
                    </button>
                    }
                    <p>Presale & Whitelist : Soldout</p>
                    <div className="join-close-btn">
                        <button onClick={joinCloseHandler}>
                            <RiCloseLine />
                        </button>
                    </div>
                </div> <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
       <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
   <strong>{""}</strong>
</Alert>
      </Popover>
            </div>
        </>
    );
};

export default JoinModal;
