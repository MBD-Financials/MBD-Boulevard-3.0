import React, { useState, useEffect, useContext} from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
//----IMPORT ICON
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar, Merchant } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";
import {
  BellIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {
  //----USESTATE COMPONNTS
  const [discover, setDiscover] = useState(false);
  const [merchant, setMerchant] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const router = useRouter();
  
  const openMenu = (e) => {
    const btnText = e.target.innerText;
    if (btnText == "Discover") {
      setDiscover(true);
      setHelp(false);
      setNotification(false);
      setProfile(false);
      setMerchant(false);
      openDiscover();
    } else if (btnText == "Help Center") {
      setDiscover(false);
      setHelp(true);
      setNotification(false);
      setProfile(false);
      setMerchant(false);
      openHelpCenter();
    } else if (btnText == "Built Shop"){
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
      openMerchant();
    }
    else {
      setDiscover(false);
      setHelp(false);
      setNotification(false);
      setProfile(false);
      setMerchant(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setNotification(true);
      setDiscover(false);
      setHelp(false);
      setProfile(false);
      setMerchant(false);
    } else {
      setNotification(false);
    }
  };

  const openProfile = () => {
    if (!profile) {
      setProfile(true);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
      setMerchant(false);
    } else {
      setProfile(false);
    }
  };
  const openHelpCenter = () => {
    if (!help) {
      setProfile(false);
      setHelp(true);
      setDiscover(false);
      setNotification(false);
      setMerchant(false);
    } else {
      setHelp(false);
    }
  };
  const openDiscover = () => {
    if (!discover) {
      setProfile(false);
      setHelp(false);
      setDiscover(true);
      setNotification(false);
      setMerchant(false);
    } else {
      setDiscover(false);
    }
  };
  const openMerchant = () => {
    if (!merchant) {
      setProfile(false);
      setHelp(false);
      setDiscover(false);
      setNotification(false);
      setMerchant(true);
    } else {
      setMerchant(false);
    }
  };

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  };

  //SMART CONTRACT SECTION
  const { currentAccount, connectWallet, openError, user} = useContext(
    NFTMarketplaceContext
  );

  return (
    
    <div>
        <nav className="flex justify-between">
        <div className="flex items-center space-x-2 text-sm">
          {currentAccount ? (
            <button className="connectWalletBtn">
              Hi, {currentAccount.slice(0, 4) + "..." + currentAccount.slice(-4)}
            </button>
          ) : (
            <button className="connectWalletBtn">
              Connect your wallet
            </button>
          )}
          <p className="headerLink text-white">Help & Contact</p>
        </div>

        <div className="flex items-center space-x-4 text-sm">
        <Link href="/subscription" className="headerLink text-white">
            Subscription
          </Link>
        <p className="headerLink text-white">MBD Gemz </p>
      
        <a href="https://mbdsend.netlify.app/" className="headerLink text-white flex items-center hover:link">
            CryptoiT!
          {/* <ChevronDownIcon className="h-4" /> */}
          </a>
        <a href="https://aistudio.netlify.app/" className="headerLink text-white flex items-center hover:link">
            AI Studio
          {/* <ChevronDownIcon className="h-4" /> */}
        </a>
        
          <Link href="/uploadNFT" className="text-white flex items-center hover:link">
            Add to inventory
            {/* <ChevronDownIcon className="h-4" /> */}
          </Link>

          <BellIcon className="text-white h-6 w-6" />
          <ShoppingCartIcon className="text-white h-6 w-6" />
        </div>
      </nav>
      
      <hr />
      

      <div className={Style.navbar}>
        <div className={Style.navbar_container}>
          <div className={Style.navbar_container_left}>
            <div className={Style.logo}>
              {/* <DiJqueryLogo onClick={() => router.push("/")} /> */}
              <Image
                  src={images.logoHome}
                  alt="Profile"
                  width={90}
                  height={80}
                  onClick={() => router.push("/")}
                  className={Style.navbar_container_right_profile}
              />
            </div>
            <div className={Style.navbar_container_left_box_input}>
              <div className={Style.navbar_container_left_box_input_box}>
                <input type="text" placeholder="Search NFT" />
                <BsSearch onClick={() => {}} className={Style.search_icon} />
              </div>
            </div>
          </div>

          {/* //END OF LEFT SECTION */}
          <div className={Style.navbar_container_right}>
            <div className={Style.navbar_container_right_discover}>
              {/* DISCOVER MENU */}
              <p onClick={(e) => openMenu(e)}>Discover</p>
              {discover && (
                <div className={Style.navbar_container_right_discover_box}>
                  <Discover />
                </div>
              )}
            </div>

            <div className={Style.navbar_conttainer_merchant}>
              <p onClick={(e) => openMenu(e)}>Build Shop</p>
              {merchant && (
                <div className={Style.navbar_container_right_merchant_box}>
                  <Merchant />
                </div>
              )}
            </div>


            {/* HELP CENTER MENU */}
            <div className={Style.navbar_container_right_help}>
              <p onClick={(e) => openMenu(e)}>Help Center</p>
              {help && (
                <div className={Style.navbar_container_right_help_box}>
                  <HelpCenter />
                </div>
              )}
            </div>

            {/* NOTIFICATION */}
            <div className={Style.navbar_container_right_notify}>
              <MdNotifications
                className={Style.notify}
                onClick={() => openNotification()}
              />
              {notification && <Notification />}
            </div>

            {/* CREATE BUTTON SECTION */}
            <div className={Style.navbar_container_right_button}>
              {currentAccount == "" ? (
                <Button btnName="Connect" handleClick={() => connectWallet()} />
              ) : (
                <Button
                  btnName="Create"
                  handleClick={() => router.push("/uploadNFT")}
                />
              )}
            </div>

            {/* USER PROFILE */}

            <div className={Style.navbar_container_right_profile_box}>
              <div className={Style.navbar_container_right_profile}>
              {(user.photo)?
                <Image
                  src={user.photo}
                  alt="Profile"
                  width={40}
                  height={40}
                  onClick={() => openProfile()}
                  className={Style.navbar_container_right_profile}
                />
                :
                <Image
                  src={images.user2}
                  alt="Profile"
                  width={40}
                  height={40}
                  onClick={() => openProfile()}
                  className={Style.navbar_container_right_profile}
                />
              }
                {profile && <Profile currentAccount={currentAccount} user = {user} />}
              </div>
            </div>

            {/* MENU BUTTON */}

            <div className={Style.navbar_container_right_menuBtn}>
              <CgMenuRight
                className={Style.menuIcon}
                onClick={() => openSideBar()}
              />
            </div>
          </div>
        </div>

        {/* SIDBAR CPMPONENT */}
        {openSideMenu && (
          <div className={Style.sideBar}>
            <SideBar
              setOpenSideMenu={setOpenSideMenu}
              currentAccount={currentAccount}
              connectWallet={connectWallet}
            />
          </div>
        )}

        {openError && <Error />}
      </div>
      <hr />
      <div>
      <section className="flex py-3 space-x-6 text-xs md:text-sm whitespace-nowrap justify-center px-6">
        <p className="link">
        <Link href={{ pathname: "/" }}>Home</Link>
        </p>
        <p className="link">PFP</p>
        <p className="link">Arts</p>
        <p className="link hidden sm:inline">Audio</p>
        <p className="link hidden sm:inline">Video</p>
        <p className="link hidden md:inline">Collectibles</p>
        <p className="link hidden lg:inline">1/1</p>
        {/* <p className="link hidden lg:inline">Books</p>
        <p className="link hidden lg:inline">Music</p>
        <p className="link hidden xl:inline">Deals</p>
        <p className="link hidden xl:inline">Rewards</p> */}
        <p className="link hidden xl:inline">
        <Link href={{ pathname: "/profile" }}>Limited Edition</Link>
        </p>
        <p className="link hidden xl:inline">
        <Link href={{ pathname: "/profile" }}>Coupons</Link>
        </p>
        <p className="link hidden xl:inline">Other</p>
        <p className="link">More</p>
      </section>
      </div>
    </div>
  );
};

export default NavBar;
