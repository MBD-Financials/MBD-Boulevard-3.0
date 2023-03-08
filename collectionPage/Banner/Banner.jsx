import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Banner.module.css";

const Banner = ({ bannerImage }) => {
  return (
    <div className={Style.banner}>
      <div>
        <Image
         className="object-fill h-80 w-96"
          src={bannerImage}
          alt="background"
          // width={1000}
          // height={100} 
          
        />
      </div>

    </div>
  );
};

export default Banner;
