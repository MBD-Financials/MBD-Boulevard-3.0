import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";

//INTERNAL IMPORT
import Style from "./DaysComponents.module.css";
import images from "../../../img";

const DaysComponents = ({ el, i }) => {
  return (
    <div className={Style.daysComponent}>
      <div>
        <div>
          <Image
            src={el.background}
            className="aspect-auto mb-3 rounded-tl-3xl rounded-tr-3xl w-full h-48 object-cover"
            alt="profile background"
            width={500}
            height={300}
            
            style={{objectFit:"cover"}}
          />
        </div>

        <div className={Style.daysComponent_box_profile}>
          <Image
            className="aspect-auto mb-3 rounded-bl-3xl w-full h-40 object-cover"
            src={images[`creatorbackground${i + 2}`]}
            alt="profile"
            width={200}
            height={200}
            style={{objectFit:"cover"}}
          />
          <Image
            className="aspect-auto mb-3 w-full h-40 object-cover"
            src={images[`creatorbackground${i + 4}`]}
            alt="profile"
            width={200}
            height={200}
            style={{objectFit:"cover"}}
          />
          <Image
            className="aspect-auto mb-3 rounded-br-3xl w-full h-40 object-cover"
            src={images[`creatorbackground${i + 3}`]}
            alt="profile"
            width={200}
            height={200}
            style={{objectFit:"cover"}}
          />
        </div>

        <div className={Style.daysComponent_box_title}>
          <h2 className="text-2xl font-bold">Amazing Collection</h2>
          <div className={Style.daysComponent_box_title_info}>
            <div className={Style.daysComponent_box_title_info_profile}>
              <Image
                className="rounded-full"
                src={el.user}
                alt="profile"
                width={30}
                height={30}
                style={{objectFit:"cover"}}
              />

              <p className="flex text-lg space-x-1.5 items-center">
              Creator Cain
              </p>
            </div>

            <div className={Style.daysComponent_box_title_info_price}>
              <small>{i + 4}.255 ETH</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaysComponents;
