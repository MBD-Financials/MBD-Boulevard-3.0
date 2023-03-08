import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

//INTRNAL IMPORT
import Style from "./DropZone.module.css";
import images from "../../img";

const DropZone = ({
  title,
  heading,
  subHeading,
  name,
  website,
  description,
  royalties,
  fileSize,
  category,
  properties,
  uploadToIPFS,
  setImage,
}) => {
  const [fileUrl, setFileUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
    setImage(url);
    console.log(url);
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });
  
  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          <h1>{title}</h1>
          <div className={Style.DropZone_box_input_img}>
            <Image
              src={images.upload}
              alt="upload"
              width={100}
              height={100}
              style = {{objectFit:"contain"}}
              className={Style.DropZone_box_input_img_img}
            />
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>

      {fileUrl && (
        <aside className={Style.DropZone_box_aside}>
          <div className={Style.DropZone_box_aside_box}>
            <Image src={fileUrl} alt="nft image" width={200} height={200} />

            <div className={Style.DropZone_box_aside_box_preview}>
              <div className={Style.DropZone_box_aside_box_preview_one}>
                <p>
                  <samp>NFT Name: </samp>
                  {name || ""}
                </p>
                <p>
                  <samp>Website: </samp>
                  {website || ""}
                </p>
                
                <p>
                  <samp>Royalties: </samp>
                  {royalties || ""}
                </p>
                <p>
                  <samp>Properties: </samp>
                  {properties || ""}
                </p>
                <p>
                  <samp>Category: </samp>
                  {category || ""}
                </p>
                <p>
                  <samp>Description: </samp>
                  {description || ""}
                </p>
              </div>

              {/* <div className={Style.DropZone_box_aside_box_preview_three}>
                <p>
                  <span>Description: </span>
                  {description || ""}
                </p>
              </div> */}

              <div className={Style.DropZone_box_aside_box_preview_one}>
                
              </div>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default DropZone;
