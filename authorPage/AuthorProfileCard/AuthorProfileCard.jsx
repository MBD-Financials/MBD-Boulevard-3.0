import React, { useState } from "react";
import Image from "next/image";
import {
  MdVerified,
  MdCloudUpload,
  MdOutlineReportProblem,
} from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialInstagram,

} from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import { SocialIcon } from 'react-social-icons';

//INTERNAL IMPORT
import Style from "./AuthorProfileCard.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";



const AuthorProfileCard = ({ currentAccount, user}) => {
  const [share, setShare] = useState(false);
  const [report, setReport] = useState(false);
  //copyAddress function
  const copyAddress = () => {
    const copyText = document.getElementById("myInput");

    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };

  const openShare = () => {
    if (!share) {
      setShare(true);
      setReport(false);
    } else {
      setShare(false);
    }
  };

  const openReport = () => {
    if (!report) {
      setReport(true);
      setShare(false);
    } else {
      setReport(false);
    }
  };

  return (
    <div className={Style.AuthorProfileCard}>
      <div className={Style.AuthorProfileCard_box}>
        
        {(user.photo)?
          <div className={Style.AuthorProfileCard_box_img}>
          <Image
            src={user.photo}
            className={Style.AuthorProfileCard_box_img_img}
            alt="NFT IMAGES"
            width={220}
            height={220}
          />
        </div>
        :(
          <div className={Style.AuthorProfileCard_box_img}>
          <Image
            src={images.nft_image_1}
            className={Style.AuthorProfileCard_box_img_img}
            alt="NFT IMAGES"
            width={220}
            height={220}
          />
        </div>
        )}
          

        <div className={Style.AuthorProfileCard_box_info}>
          <h2>
            {user.username}
            {/* <span>
              <MdVerified />
            </span>{" "} */}
          </h2>

          <div className={Style.AuthorProfileCard_box_info_address}>
            <input type="text" value={currentAccount} id="myInput" />
            <FiCopy
              onClick={() => copyAddress()}
              className={Style.AuthorProfileCard_box_info_address_icon}
            />
          </div>

          <p className="mt-2">
            {user.bio}
          </p>

          <div className={Style.AuthorProfileCard_box_info_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <SocialIcon network="discord" style={{ height: 25, width: 25 }} bgColor="#BA00B1" fgColor="#000000"/>
            </a>
            <a href="#">
              <SocialIcon network="telegram" style={{ height: 25, width: 25 }} bgColor="#BA00B1" fgColor="#000000"/>
            </a>
          </div>
        </div>
        {/* <div className={Style.AuthorProfileCard_box_share}>
          
          <Button btnName="Followers" handleClick={()=>{}} />
          <Button btnName="Following" handleClick={()=>{}} />
        </div> */}
        <div className={Style.AuthorProfileCard_box_share}>
          {/* <Button btnName="Follow" handleClick={()=>{}} /> */}
          <Button btnName="Followers" handleClick={()=>{}} />
          <Button btnName="Following" handleClick={()=>{}} /> 
          <MdCloudUpload
            onClick={() => openShare()}
            className={Style.AuthorProfileCard_box_share_icon}
          />

          {share && (
            <div className={Style.AuthorProfileCard_box_share_upload}>
              <p>
                <span>
                  <TiSocialFacebook />
                </span>{" "}
                {""}
                Facebook
              </p>
              <p>
                <span>
                  <TiSocialInstagram />
                </span>{" "}
                {""}
                Instragram
              </p>
              <p>
                <span>
                  <TiSocialLinkedin />
                </span>{" "}
                {""}
                LinkedIn
              </p>
              <p>
                <span>
                  <TiSocialYoutube />
                </span>{" "}
                {""}
                YouTube
              </p>
              <p>
                <span>
                <SocialIcon network="discord" style={{ height: 20, width: 20 }} bgColor="#ffffff" fgColor="#000000"/>
                </span>{" "}
                {""}
                Discord
              </p>
              <p>
                <span>
                <SocialIcon network="telegram" style={{ height: 20, width: 20 }} bgColor="#ffffff" fgColor="#000000"/>
                </span>{" "}
                {""}
                Telegram
              </p>
            </div>
          )}
          
          <BsThreeDots
            onClick={() => openReport()}
            className={Style.AuthorProfileCard_box_share_icon}
          />

          {report && (
            <p className={Style.AuthorProfileCard_box_share_report}>
              <span>
                <MdOutlineReportProblem />
              </span>{" "}
              {""}
              Report abouse
            </p>
          )}
          
        </div>
        
      </div>
    </div>
  );
};

export default AuthorProfileCard;
