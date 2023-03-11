import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/reSellToken.module.css";
import formStyle from "../AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const reSellToken = () => {

  const router = useRouter();
  const { listingId,image } = router.query;
  const { delistNFT} = useContext(NFTMarketplaceContext);


  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>Delist your NFT</h1>
        <div className={Style.reSellToken_box_image}>
          {image && (
            <Image src={image} alt="list nft" width={400} height={400} />
          )}
        </div>
        <div className="mt-5">
          <Button btnName="Delist" handleClick={() => delistNFT(listingId)} />
        </div>
      </div>
    </div>
  );
};

export default reSellToken;
