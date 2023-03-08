import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { DiJqueryLogo } from "react-icons/di";
import { SocialIcon } from 'react-social-icons';

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";
import { Router } from "next/router";

const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
  //------USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  const [openMerchant, setOpenMerchant] = useState(false);

  const router = useRouter();

  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Search",
      link: "searchPage",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
    {
      name: "Connect Wallet",
      link: "connectWallet",
    },
    {
      name: "Blog",
      link: "blog",
    },
  ];
  //------HELP CNTEER
  const helpCenter = [
    {
      name: "About",
      link: "aboutus",
    },
    {
      name: "Contact Us",
      link: "contactus",
    }
  ];
  const merchant = [
    {
      name: "Subscription",
      link: "subscription",
    },
  ];

  const openDiscoverMenu = () => {
    if (!openDiscover) {
      setOpenDiscover(true);
      
    } else {
      setOpenDiscover(false);
      setOpenMerchant(false);
    }
  };

  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
      setOpenMerchant(false);
    }
  };
  const openMerchantMenu = () => {
    if (!openMerchant) {
      setOpenMerchant(true);
      
    } else {
      setOpenDiscover(false);
      setOpenMerchant(false);
    }
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  return (
    <div className={Style.sideBar}>
      <GrClose
        className={Style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />

      <div className={Style.sideBar_box}>
        <Image src={images.logoHome} alt="logo" width={150} height={150} />
        <p>
          Discover the most outstanding articles on all topices of NFT & write
          your own stories and share them
        </p>
        <div className={Style.sideBar_social}>
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

      <div className={Style.sideBar_menu}>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openDiscoverMenu()}
          >
            <p>Discover</p>
            <TiArrowSortedDown />
          </div>

          {openDiscover && (
            <div className={Style.sideBar_discover}>
              {discover.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openHelpMenu()}
          >
            <p>Help Center</p>
            <TiArrowSortedDown />
          </div>

          {openHelp && (
            <div className={Style.sideBar_discover}>
              {helpCenter.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openMerchantMenu()}
          >
            <p>Build Store</p>
            <TiArrowSortedDown />
          </div>

          {openMerchant && (
            <div className={Style.sideBar_discover}>
              {merchant.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={Style.sideBar_button}>
        {currentAccount == "" ? (
          <Button btnName="connect" handleClick={() => connectWallet()} />
        ) : (
          <Button
            btnName="Create"
            handleClick={() => router.push("/uploadNFT")}
          />
        )}

        {/* <Button btnName="Connect Wallet" handleClick={() => {}} /> */}
      </div>
    </div>
  );
};

export default SideBar;
