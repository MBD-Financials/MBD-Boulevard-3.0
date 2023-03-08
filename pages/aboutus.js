import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "../styles/aboutus.module.css";
import { Brand } from "../components/componentsindex";
import images from "../img";

const aboutus = () => {
  const founderArray = [
    {
      name: "Fred Dahl",
      position: "Founder and CEO",
      images: images.founder1,
    },
    {
      name: "May Mahboob",
      position: "Co-founder and President",
      images: images.founder2,
    },
    {
      name: "OV",
      position: "CMO",
      images: images.founder3,
    },
    {
      name: "Usama Latif",
      position: "Full-Stack Blockchain Developer",
      images: images.founder4,
    },
  ];

  const factsArray = [
    {
      title: "Accessibility",
      info: "Allows for fluid movement of NFTs, regardless of their native network. Any singular NFT can be accessible on any chain, and users will also be able to transact with their NFTs directly cross-chain. Users will also be able to mint NFTs using the NFT trade platform.",
    },
    {
      title: "Trading",
      info: "Means that users will be able to trade directly with each other, without the need of an intermediary,using smart contracts to guarantee that both parties are satisfied with the transaction.",
    },
    {
      title: "Rewards",
      info: "Users will be able share their NFTs, interact with other users and collectors, and create using their assets. Loyalty and token programs allow new forms of engagement for businesses. Rewards services allow users to earn and spend points.",
    },
  ];
  return (
    <div className={Style.aboutus}>
      <div className={Style.aboutus_box}>
        <div className={Style.aboutus_box_hero}>
          <div className={Style.aboutus_box_hero_left}>
            <h1>👋 About Us.</h1>
            <p>
              MBD Boulevard goes beyond the traditional
              marketplace model by offering a wide range of
              goods and services. There are several platforms
              for trading art-based NFTs, but fewer for real
              world goods, services, and loyalty programs.
              Imagine a platform where Fiverr, Etsy, and
              Amazon are all available in one place, anyone
              can set up their own store, and transactions
              occur instantaneously and securely.
            </p>
          </div>
          <div className={Style.aboutus_box_hero_right}>
            <Image src={images.hero2} />
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>⛱ Team</h2>
          <p>
          Our team is dedicated to serving the community with transparency in all that we do.
          </p>
        </div>

        <div className={Style.aboutus_box_founder}>
          <div className={Style.aboutus_box_founder_box}>
            {founderArray.map((el, i) => (
              <div className={Style.aboutus_box_founder_box_img}>
                <Image
                  src={el.images}
                  alt={el.name}
                  width={500}
                  height={500}
                  className="aspect-auto mb-3 rounded-2xl object-cover h-80 w-100"
                />
                <h3 className="text-2xl">{el.name}</h3>
                <p>{el.position}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.aboutus_box_title}>
          <h2>🚀 Fast Facts</h2>
          <p>
            “We are building a more diverse and equitable marketplace, with the opportunity for both
            buyers and sellers to consume products in a new way. We are excited to offer the tools for
            people all over the world to expand their business pursuits.”
          </p>
        </div>

        <div className={Style.aboutus_box_facts}>
          <div className={Style.aboutus_box_facts_box}>
            {factsArray.map((el, i) => (
              <div className={Style.aboutus_box_facts_box_info}>
                <h3>{el.title}</h3>
                <p className="text-l text-justify">{el.info}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Brand />
    </div>
  );
};

export default aboutus;
