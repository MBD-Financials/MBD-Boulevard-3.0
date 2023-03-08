import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";

const NFTCard = ({ NFTData }) => {
  // const CardArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  // ];

  const [like, setLike] = useState(true);

  const likeNft = () => {
    if (!like) {
      setLike(true);
    } else {
      setLike(false);
    }
  };

  // console.log(NFTData);
  return (
    <div className={Style.NFTCard}>
      {NFTData.map((el, i) => (
        <Link href={{ pathname: "/NFT-details", query: el }}>
          <div className={Style.NFTCard_box} key={i + 1}>
            <div className={Style.NFTCard_box_img}>
              <Image
                className="aspect-auto mb-3 rounded-2xl object-cover h-80 w-100"
                src={el.image}
                alt="NFT images"
                width={600}
                height={600}
                // className={Style.NFTCard_box_img_img}
              />
            </div>

            <div className={Style.NFTCard_box_update}>
              <div className={Style.NFTCard_box_update_left}>
                <div
                  className={Style.NFTCard_box_update_left_like}
                  onClick={() => likeNft()}
                >
                  {like ? (
                    <AiOutlineHeart />
                  ) : (
                    <AiFillHeart
                      className={Style.NFTCard_box_update_left_like_icon}
                    />
                  )}
                  {""} 22
                </div>
              </div>

              {/* <div className={Style.NFTCard_box_update_right}>
                <div className="">
                  <p className="text-sm font-medium">Remaining time</p>
                  <p className="text-lg">3h : 15m : 20s</p>
                </div>
              </div> */}
            </div>

            <div className={Style.NFTCard_box_update_details}>
              <div className={Style.NFTCard_box_update_details_price}>
                <div className={Style.NFTCard_box_update_details_price_box}>
                  <h4 className="mt-5 mb-1">
                    {el.name} #{el.tokenId}
                  </h4>

                  <div
                    className={Style.NFTCard_box_update_details_price_box_box}
                  >
                    <div
                      className={Style.NFTCard_box_update_details_price_box_bid}
                    >
                      <p className="text-xs font-medium">Current Bid</p>
                      <p className="text-sm">{el.price} ETH</p>
                    </div>
                    {/* <div>
                      <p className="text-xs">61 in stock</p>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* <div className={Style.NFTCard_box_update_details_category}>
                <BsImages />
              </div> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCard;
