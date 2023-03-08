import React from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Brand.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";

const Brand = () => {
  const router = useRouter();
  return (
    <div className={Style.Brand}>
      <div className={Style.Brand_box}>
        <div className={Style.Brand_box_left}>
          {/* <Image src={images.logo} alt="brand logo" width={100} height={100} /> */}
          {/* <a href="/">
            <DiJqueryLogo className={Style.Brand_box_left_logo} />
          </a> */}
          <h1 className="mb-5">Earn Gemz with MBD</h1>
          <p>A fully fletched rewards platform.</p>

          <div className={Style.Brand_box_left_btn}>
            <Button
              btnName="Redeem With Gemz"
              handleClick={() => router.push("/")}
            />
            <Button
              btnName="Discover"
              handleClick={() => router.push("/")}
            />
          </div>
          <p>Coming Soon</p>
        </div>
        <div className={Style.Brand_box_right}>
          {/* <Image src={images.metaverse} alt="brand logo" width={800} height={600} /> */}
          <video autoPlay loop muted  src={require("../../public/Gem.mp4")}>
            {/* <source  type="video/mp4"/> */}
          </video>
        </div>
      </div>
    </div>
  );
};

export default Brand;
