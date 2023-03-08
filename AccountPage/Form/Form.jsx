import React, { useEffect, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineHttp, MdOutlineContentCopy } from "react-icons/md";
import {
	TiSocialFacebook,
	TiSocialTwitter,
	TiSocialInstagram,
} from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./Form.module.css";
import { Button } from "../../components/componentsindex.js";
import { SocialIcon } from 'react-social-icons';

const Form = ({user,updateUser,fileUrl}) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("")
  const [imageURI, setImageURI] = useState(null)

  const updateUserInfo = async () =>{
    const updatedUser = await updateUser(username,email,website,bio,imageURI);
	// setUsername(updatedUser.username);
	// setEmail(updatedUser.email);
	// setBio(updatedUser.bio);
	// setWebsite(updatedUser.website);
	// setImageURI(updatedUser.photo);
  }
  useEffect(()=>{
	setUsername(user.username);
	setEmail(user.email);
	setBio(user.bio);
	setWebsite(user.website);
	setImageURI(user.photo);
  },[user])

  useEffect(()=>{
	setImageURI(fileUrl);
  },[fileUrl])

	return (
		<div className={Style.Form}>
			<div className={Style.Form_box}>
				<div>
					<div className={Style.Form_box_input}>
						<label htmlFor="name">Username</label>
						<input
							type="text"
							value={username}
							placeholder = "username"
							onChange={(e) => setUsername(e.target.value)}
							className={Style.Form_box_input_userName}
						/>
					</div>

					<div className={Style.Form_box_input}>
						<label htmlFor="email">Email</label>
						<div className={Style.Form_box_input_box}>
							<div className={Style.Form_box_input_box_icon}>
								<HiOutlineMail />
						</div>
							<input 
								type="text" 
								placeholder="Email" 
								value = {email}
								onChange={(e) => setEmail(e.target.value)}
                			/>
						</div>
					</div>

					<div className={Style.Form_box_input}>
						<label htmlFor="description">Description</label>
						<textarea
							name=""
							id=""
							cols="30"
							rows="6"
              				value = {bio}
							placeholder="something about yourself in few words"
              				onChange={(e) => setBio(e.target.value)}
						></textarea>
					</div>

					<div className={Style.Form_box_input}>
						<label htmlFor="website">Website</label>
						<div className={Style.Form_box_input_box}>
							<div className={Style.Form_box_input_box_icon}>
								<MdOutlineHttp />
							</div>

							<input 
								type="text" 
								placeholder="website" 
								value={website}
								onChange={(e) => setWebsite(e.target.value)}
             				 />
						</div>
					</div>

					<div className={Style.Form_box_input_social}>
						<div className={Style.Form_box_input}>
							<label htmlFor="facebook">Facebook</label>
							<div className={Style.Form_box_input_box}>
								<div className={Style.Form_box_input_box_icon}>
									<TiSocialFacebook />
								</div>
								<input
									type="text"
									placeholder="https://www.facebook.com/MBDFinancials"
								/>
							</div>
						</div>
						<div className={Style.Form_box_input}>
							<label htmlFor="Twitter">Twitter</label>
							<div className={Style.Form_box_input_box}>
								<div className={Style.Form_box_input_box_icon}>
									<TiSocialTwitter />
								</div>
								<input
									type="text"
									placeholder="https://twitter.com/MBDFinancials"
								/>
							</div>
						</div>
						<div className={Style.Form_box_input}>
							<label htmlFor="Instagram">Instagram</label>
							<div className={Style.Form_box_input_box}>
								<div className={Style.Form_box_input_box_icon}>
									<TiSocialInstagram />
								</div>
								<input
									type="text"
									placeholder="https://www.instagram.com/mbdfinancials/"
								/>
							</div>
						</div>
						<div className={Style.Form_box_input}>
							<label htmlFor="Discord">Discord</label>
							<div className={Style.Form_box_input_box}>
								<div className={Style.Form_box_input_box_icon}>
								<SocialIcon network="discord" style={{ height: 25, width: 25 }} bgColor="#BA00B1" fgColor="#000000"/>
								</div>
								<input
									type="text"
									placeholder="https://www.discord.com/mbdfinancials/"
								/>
							</div>
						</div>
						<div className={Style.Form_box_input}>
							<label htmlFor="Telegram">Telegram</label>
							<div className={Style.Form_box_input_box}>
								<div className={Style.Form_box_input_box_icon}>
								<SocialIcon network="telegram" style={{ height: 25, width: 25 }} bgColor="#BA00B1" fgColor="#000000"/>
								</div>
								<input
									type="text"
									placeholder="https://www.telegram.com/mbdfinancials/"
								/>
							</div>
						</div>
						
					</div>

					{/* <div className={Style.Form_box_input}>
						<label htmlFor="wallet">Wallet address</label>
						<div className={Style.Form_box_input_box}>
							<div className={Style.Form_box_input_box_icon}>
								<MdOutlineHttp />
							</div>
							<input
								type="text"
								placeholder="0x5F5FE741A43E9A2b9e4BC31583F71e15eba30ef9"
							/>
							<div className={Style.Form_box_input_box_icon}>
								<MdOutlineContentCopy />
							</div>
						</div>
					</div> */}

					<div className={Style.Form_box_btn}>
						<Button
							btnName="Upload profile"
							handleClick={updateUserInfo}
							classStyle={Style.button}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Form;
