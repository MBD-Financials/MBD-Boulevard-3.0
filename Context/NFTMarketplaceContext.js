import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { ThirdwebSDK, NATIVE_TOKENS } from "@thirdweb-dev/sdk";
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecretKey = process.env.NEXT_PUBLIC_PROJECT_SECRET_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
	"base64"
)}`;
const URL = process.env.NEXT_PUBLIC_URL;
const subdomain = process.env.NEXT_PUBLIC_SUBDOMAIN;
const RPCUri = process.env.NEXT_PUBLIC_PROJECT_PROVIDER;
const marketPlaceContractAddress =
	process.env.NEXT_PUBLIC_PROJECT_MARKETPLACE_CONTRACT_ADRESS;

const client = ipfsHttpClient({
	host: "infura-ipfs.io",
	port: 5001,
	protocol: "https",
	headers: {
		authorization: auth,
	},
});

//---FETCHING SMART CONTRACT
const fetchContract = async (signerOrProvider, typeOfContract) => {
	if (typeOfContract === "marketplace") {
		const sdk = ThirdwebSDK.fromSigner(signerOrProvider, RPCUri);
		return await sdk.getContract(marketPlaceContractAddress, "marketplace");
	} else if (typeOfContract === "mint") {
		
		const sdk = ThirdwebSDK.fromPrivateKey(
			// Your wallet private key (read it in from .env.local file)
			process.env.NEXT_PUBLIC_PRIVATE_KEY,
			RPCUri
		);
		const signer = await sdk.getContract(
			// Replace this with your NFT Collection contract address
			"0xb20B88B9B57E000D45ac9B0F03Ddf159334cFD89",
			"nft-collection"
		);
		
		const thirdwebSDK = ThirdwebSDK.fromSigner(signerOrProvider, RPCUri);
		const userContract = await thirdwebSDK.getContract(
			"0xb20B88B9B57E000D45ac9B0F03Ddf159334cFD89",
			"nft-collection"
		);
		return [signer, userContract];
	} else {
		const sdk = ThirdwebSDK.fromSigner(signerOrProvider, RPCUri);
		return await sdk.getContract(typeOfContract);
	}
};

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async (typeOfContract) => {
	try {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = await fetchContract(signer, typeOfContract);
		return contract;
	} catch (error) {
		console.log("Something went wrong while connecting with contract", error);
	}
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
	const titleData = "Future of Shopping with our AI NFT Marketplace";

	//------USESTAT
	const [error, setError] = useState("");
	const [openError, setOpenError] = useState(false);
	const [currentAccount, setCurrentAccount] = useState("");
	const [accountBalance, setAccountBalance] = useState("");
	const [transactionCount, setTransactionCount] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({});
	const router = useRouter();

	//---CHECK IF WALLET IS CONNECTD
	const checkIfWalletConnected = async () => {
		try {
			if (!window.ethereum) return setError("Install MetaMask");

			const accounts = await window.ethereum.request({
				method: "eth_accounts",
			});

			if (accounts.length) {
				setCurrentAccount(accounts[0].toLowerCase());
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const getBalance = await provider.getBalance(accounts[0]);
				const bal = ethers.utils.formatEther(getBalance);
				setAccountBalance(bal);
				// console.log(accounts[0]);
				await connectingWithSmartContract("marketplace");
			} else {
				setError("No Account Found");
				// setOpenError(true);
			}
		} catch (error) {
			setError("Something wrong while connecting to wallet");
			// setOpenError(true);
		}
	};

	useEffect(() => {
		checkIfWalletConnected();
		// connectingWithSmartContract();
	}, []);

	useEffect(() => {
		if (!currentAccount) return;
		getUser();
	}, [currentAccount]);

	//---CONNET WALLET FUNCTION
	const connectWallet = async () => {
		try {
			if (!window.ethereum) return setError("Install MetaMask");

			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setCurrentAccount(accounts[0].toLowerCase());
			// window.location.reload();
		} catch (error) {
			setError("Error while connecting to wallet");
			// setOpenError(true);
		}
	};

	//---UPLOAD TO IPFS FUNCTION
	const uploadToIPFS = async (file) => {
		try {
			const added = await client.add({ content: file });

			const url = `${subdomain}/ipfs/${added.path}`;
			return url;
		} catch (error) {
			setError("Error Uploading to IPFS");
			// setOpenError(true);
		}
	};

	//---CREATENFT FUNCTION
	const createNFT = async (name, image, description, router) => {
		if (!name || !description || !image)
			return setError("Data Is Missing"), setOpenError(true);

		try {
			const contracts = await connectingWithSmartContract("mint");
			const signer = contracts[0];
			const contract = contracts[1];
			const data = {
				to: currentAccount,
				metadata: {
					name,
					description,
					image,
				},
			};
			const signedPayload = await signer.erc721.signature.generate(data);
			// const isValid = await contract.erc721.signature.verify(signedPayload);
			// console.log(isValid);
			const tx = await contract.erc721.signature.mint(signedPayload);
			alert("Minted Succesfully!!");
			const nft = await tx.data(); // (optional) fetch details of minted NFT

			createNFTDB(name, parseFloat(price), description, image, currentAccount);
			router.push("/profile");
		} catch (error) {
			setError("Error while minting NFT");

			// setOpenError(true);
		}
	};



	//--FETCHNFTS FUNCTION

	const fetchNFTsCollection = async () => {
		try {
			if (currentAccount) {
				const contract = await connectingWithSmartContract(
					"0xb20B88B9B57E000D45ac9B0F03Ddf159334cFD89"
				);
				const data = await contract.erc721.getAll();
				const items = await Promise.all(
					data.map(async ({ metadata, owner }) => {
						const name = metadata.name;
						const description = metadata.description;
						const tokenId = metadata.id;
						const image = metadata.image;
						const tokenURI = metadata.uri;
						const seller = owner;
						const _owner = owner;
						const price = "";
						const contractAddress = "0xb20B88B9B57E000D45ac9B0F03Ddf159334cFD89"
						// const tokenURI = await contract.tokenURI(tokenId);

						// --- THIS IS WORKING ---
						// var tokenSplit = tokenURI.split("//").pop();
						// const tokenURISend = `https://ipfs.io/ipfs/${tokenSplit}`;
						// console.log(tokenURISend)
						// const {
						// 	data: { image, name, description },
						// } = await axios.get(tokenURISend);
						// console.log(image, name, description)

						// --- ---- ---- --- -----

						// const price = ethers.utils.formatUnits(
						// 	unformattedPrice.toString(),
						// 	"ether"
						// );

						return {
							price,
							tokenId,
							seller,
							_owner,
							image,
							name,
							description,
							tokenURI,
							contractAddress
						};
					})
				);
				const listedNFTs = items.filter(
					(el)=>{
						return el.seller.toLowerCase() != "0x0000000000000000000000000000000000000000";
					}
				)
				return listedNFTs;
				
			}
		} catch (error) {
			setError("Error while fetching NFTS");
			// setOpenError(true);
			console.log(error);
		}
	};

	const fetchNFTsMarketplace = async () => {
		try {
			if (currentAccount) {
				const contract = await connectingWithSmartContract("marketplace");
				const listings = await contract.getActiveListings();
				
				const items = await Promise.all(
					listings.map(
						async ({
							asset,
							assetContractAddress,
							buyoutCurrencyValuePerToken,
							sellerAddress,
							id
						}) => {
							const name = asset.name;
							const description = asset.description;
							const tokenId = asset.id;
							const image = asset.image;
							const tokenURI = asset.uri;
							const seller = sellerAddress;
							const owner = sellerAddress;
							const contractAddress = assetContractAddress;
							const price = buyoutCurrencyValuePerToken["displayValue"].concat(
								" ",
								buyoutCurrencyValuePerToken["symbol"]
							);
							const listingId = id;
							return {
								price,
								tokenId: tokenId,
								seller,
								owner,
								image,
								name,
								description,
								tokenURI,
								contractAddress,
								listingId
							};
						}
					)
				);
				
				
				return items;
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (currentAccount) {
			fetchNFTsCollection();
			fetchNFTsMarketplace();
		}
	}, []);

	
	//--FETCHING MY NFT OR LISTED NFTs
	const fetchMyNFTsOrListedNFTs = async (type) => {
		try {
			if (currentAccount) {
				if (type === 'fetchItemsListed'){
					const data = await fetchNFTsMarketplace()
				
					const listedNFTs = data.filter(
						(el)=>{
							return el.seller.toLowerCase() == currentAccount;
						}
					)
					return listedNFTs;
				}
				else{
					const data = await fetchNFTsCollection();
					const listedNFTs = data.filter(
						(el)=>{
							return el.seller.toLowerCase() == currentAccount;
						}
					)
					return listedNFTs;
				}
				
			}
		} catch (error) {
			setError("Error while fetching listed NFTs");
			// setOpenError(true);
		}
	};

	// useEffect(() => {
	// 	fetchMyNFTsOrListedNFTs();
	// }, []);

	//---BUY NFTs FUNCTION
	const buyNFT = async (nft,toast) => {
		const notification = toast.loading("Buying",{
			style:{
				background: '#333',
      			color: '#fff',
				fontSize:'17px'
			}

		})
		try {
			const contract = await connectingWithSmartContract("marketplace");
			const listingId = nft.listingId;
			const txResult = await contract.direct.buyoutListing(listingId,"1");
			router.push("/profile");
		} catch (error) {
			
			toast.error("Something went wrong",{
				style:{
					background: '#333',
      				color: '#fff',
					fontSize:'17px'
				}
			})
		}finally{
			toast.dismiss(notification)
		}
	};

	const listNFT = async(tokenId, assetContractAddress,price) =>{
		try{
			
			const contract = await connectingWithSmartContract("marketplace");
			const currencyContractAddress = NATIVE_TOKENS[56].wrapped.address;
			const tx = await contract.direct.createListing({
				assetContractAddress: assetContractAddress, // address of the contract the asset you want to list is on
				tokenId: tokenId, // token ID of the asset you want to list
				startTimestamp: new Date(), // when should the listing open up for offers
				listingDurationInSeconds: 2592000, // how long the listing will be open for
				quantity: 1, // how many of the asset you want to list
				currencyContractAddress: currencyContractAddress, // address of the currency contract that will be used to pay for the listing
				buyoutPricePerToken: price, // how much the asset will be sold for
			  });	
			router.push("/profile")
		}catch(error){
			alert("Error: " + error)
		}

	}
	const delistNFT = async(listingId) =>{
		try{

			const contract = await connectingWithSmartContract("marketplace");
			const txResult = await contract.direct.cancelListing(listingId);
			router.push("/profile");
		}catch(error){
			alert("Error: " + error)
		}

	}
	const createOffer = async(listingId,offer) =>{
		try{
			const contract = await connectingWithSmartContract("marketplace");
			// const isValid = await contract.direct.isStillValidListing(listingId);
			// console.log(isValid);
			const currencyContractAddress = NATIVE_TOKENS[56].wrapped.address
			const txResult = await contract.direct.makeOffer(
				listingId,
				1,
				currencyContractAddress,
				offer,
				new Date(Date.now() + 60 * 60 * 24 * 1000), // e.g offer expires 1 day from now
			);
			alert("Offer Created\nRefresh your page if you don't see your offer")
		}catch(error){
			alert("Something went wrong")
			console.log("Error while creating offer")
		}
		
	}


	const createUser = async () => {
		try {
			await axios
				.post(URL + "api/v1/users/createuser", {
					username: currentAccount.slice(0, 7),
					walletaddress: currentAccount,
				})
				.then(function (response) {})
				.catch(function (error) {});
		} catch {
			console.log("Error during creating user");
		}
	};

	const createNFTDB = async (name, price, description, image, owner) => {
		try {
			await axios
				.post(URL + "api/v1/nfts/createnft", {
					name: name,
					price: price,
					description: description,
					image: image,
					owner: owner,
				})
				.then(function (response) {
					console.log(response);
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch {
			console.log("Error during creating nft");
		}
	};

	const getUser = async () => {
		try {
			await axios
				.get(URL + "api/v1/users/getuser/" + currentAccount, {})
				.then(function (response) {
					if (response.data.status === "success") {
						if (response.data.data.user.length == 0) {
							createUser();
						} else {
							setUser(response.data.data.user[0]);
						}
					}
				})
				.catch(function (error) {
					console.log(error);
				});
		} catch {
			console.log("Error during getting user");
		}
	};

	const updateUser = async (username, email, website, bio, fileUri) => {
		try {
			await axios
				.patch(URL + "api/v1/users/updateuser/" + currentAccount, {
					username: username,
					email: email,
					website: website,
					bio: bio,
					photo: fileUri,
				})
				.then(function (response) {
					if (response.data.status === "success") {
						setUser(response.data.data.user);
					}
				})
				.catch(function (error) {});
			return user;
		} catch {
			console.log("Error during creating user");
		}
	};

	return (
		<NFTMarketplaceContext.Provider
			value={{
				checkIfWalletConnected,
				connectWallet,
				uploadToIPFS,
				createNFT,
				fetchNFTsCollection,
				fetchMyNFTsOrListedNFTs,
				buyNFT,
				currentAccount,
				titleData,
				setOpenError,
				openError,
				error,
				loading,
				accountBalance,
				transactionCount,
				transactions,
				user,
				updateUser,
				fetchNFTsMarketplace,
				listNFT,
				delistNFT,
				createOffer
			}}
		>
			{children}
		</NFTMarketplaceContext.Provider>
	);
};
