import React from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";
import { SocialIcon } from 'react-social-icons';
//INTERNAL IMPORT
import Style from "./Footer.module.css";
import images from "../../img";
import { Discover, HelpCenter } from "../NavBar/index";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          {/* <Image src={images.logo} alt="footer logo" height={100} width={100} /> */}
          {/* <a href="/"> */}
            {/* <DiJqueryLogo className={Style.footer_box_social_logo} /> */}
            <Image
                src={images.logoHome}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => router.push("/")}
                className={Style.navbar_container_right_profile}
            />
          {/* </a> */}
          <p>
          The world's premier digital bazaar for unique crypto-collectibles and NFTs. Experience seamless transactions for one-of-a-kind digital assets. Explore, buy, and sell the most exclusive digital and physical items on the market.
          </p>

          <div className={Style.footer_social}>
            <a href="https://www.facebook.com/MBDFinancials">
              <TiSocialFacebook />
            </a>
            <a href="https://www.linkedin.com/company/mbdfinancials/">
              <TiSocialLinkedin />
            </a>
            <a href="https://twitter.com/MBDFinancials">
              <TiSocialTwitter />
            </a>
            <a href="https://www.youtube.com/channel/UCju8ObUSidjgEvevlXc9pVg">
              <TiSocialYoutube />
            </a>
            <a href="https://www.instagram.com/mbdfinancials/">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <SocialIcon network="discord" style={{ height: 20, width: 20 }} bgColor="#ffffff" fgColor="#000000"/>
            </a>
          <a href="#">
            <SocialIcon network="telegram" style={{ height: 20, width: 20 }} bgColor="#ffffff" fgColor="#000000"/>
          </a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <Discover />
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <HelpCenter />
        </div>

        <div className={Style.subscribe}>
          <h3>Subscribe</h3>

          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your email *" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
              Discover, collect, and sell extraordinary NFTs. MBD Boulevard is the
              world's first AI integrated E-comm Marketplace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
