import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Service.module.css";
import images from "../../img";
const Service = () => {
  return (
    <div className={Style.service}>
      <div className={Style.service_box}>
        <div>
          <Image
            className="ml-12 sm:ml-20"
            src={images.service1}
            alt="Filter & Discover"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 1</span>
          </p>
          <h3>Filter & Discover</h3>
          <p>
            Filters and Discover NFTs

          </p>
        </div>
        <div>
          <Image
            className="ml-6 sm:ml-20"
            src={images.service2}
            alt="Connect Wallet"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 2</span>
          </p>
          <h3>Connect Wallet</h3>
          <p>
            Connect your Web3 wallet
          </p>
        </div>
        <div>
          <Image
            className="ml-12 sm:ml-20"
            src={images.service3}
            alt="Mint"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 3</span>
          </p>
          <h3>Mint</h3>
          <p>
            Simple steps to convert images/videos/audio/video to NFT
          </p>
        </div>
        <div>
          <Image
            className="ml-6 sm:ml-20"
            src={images.service1}
            alt="Trade"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 4</span>
          </p>
          <h3>Trade</h3>
          <p>
            Buy NTFs, sell and Trade NFTs
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;
