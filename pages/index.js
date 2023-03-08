import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";

import { getTopCreators } from "../TopCreators/TopCreators";

//IMPORTING CONTRCT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    if (currentAccount) {
      fetchNFTs().then((items) => {
        setNfts(items.reverse());
        setNftsCopy(items);
        // console.log(nfts);
      });
    }
  },[currentAccount]);
  
  // useEffect(() => {
  //   checkIfWalletConnected();
  // }, []);

  // useEffect(() => {
  //   const wait = async () => {
  //     await checkIfWalletConnected();
  //     console.log(currentAccount);
  //     if (currentAccount) {
  //       console.log("inside")
  //       fetchNFTs().then((items) => {
  //         setNfts(items.reverse());
  //         setNftsCopy(items);
  //         console.log(nfts);
  //       });
  //   }}
  //   wait();
  // },);

  

  

  //CREATOR LIST

  const creators = getTopCreators(nfts);
  // console.log(creators);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      
      <Service />

      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />

      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
      
      <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />

      <Slider />  
      
      <Brand />
      
    </div>
  );
};

export default Home;
