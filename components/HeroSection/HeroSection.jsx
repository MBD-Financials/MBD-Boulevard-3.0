import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const HeroSection = () => {
	const { titleData } = useContext(NFTMarketplaceContext);
	const router = useRouter();
	return (
		<div className={Style.heroSection}>
			<div className={Style.heroSection_box}>
				<div className={Style.heroSection_box_left}>
					<h1 className="text-white">{titleData}</h1>
					<p className="text-white mt-2">
						Discover the most outstanding NTFs in all topics of life. Creative
						your NTFs and sell them
					</p>
					<Button
						btnName="Start your search"
						handleClick={() => router.push("/searchPage")}
					/>
				</div>
				<div className={Style.heroSection_box_right}>
				<video autoPlay loop muted style={{ width: '100%', height: '100%' }} src={require("../../public/Header.mp4")}></video>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
