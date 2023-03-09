import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { ThirdwebSDK } from "@thirdweb-dev/sdk";

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
	} else {
		const sdk = ThirdwebSDK.fromSigner(signerOrProvider, RPCUri);
		return await sdk.getContract(typeOfContract, "nft-collection");
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
	const createNFT = async (name, price, image, description, router) => {
		if (!name || !description || !price || !image)
			return setError("Data Is Missing"), setOpenError(true);
		
		try {
			const contract = await connectingWithSmartContract(
				"0xb20B88B9B57E000D45ac9B0F03Ddf159334cFD89"
			);
			
			const data = JSON.stringify({ name, description, image });
			const tx = await contract.erc721.mintTo(currentAccount, data);
			const receipt = tx.receipt; // the transaction receipt
			console.log(receipt);
			const tokenId = tx.id; // the id of the NFT minted
			console.log(tokenId);
			const nft = await tx.data(); // (optional) fetch details of minted NFT
			
			console.log(nft)

			createNFTDB(name, parseFloat(price), description, image, currentAccount);
			router.push("/searchPage");
			console.log("NFT CREATED");

		} catch (error) {
			setError("Error while minting NFT");

			// setOpenError(true);
		}
	};

	//--- createSale FUNCTION
	const createSale = async (url, formInputPrice, isReselling, id) => {
		try {
			console.log(url, formInputPrice, isReselling, id);
			const price = ethers.utils.parseUnits(formInputPrice, "ether");

			const contract = await connectingWithSmartContract();

			const listingPrice = await contract.getListingPrice();

			const transaction = !isReselling
				? await contract.createToken(url, price, {
						value: listingPrice.toString(),
				  })
				: await contract.resellToken(id, price, {
						value: listingPrice.toString(),
				  });

			await transaction.wait();
			console.log(transaction);
		} catch (error) {
			setError("error while creating sale");
			// setOpenError(true);
			console.log(error);
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
					data.map(async ({ metadata, nft_owner }) => {
						const name = metadata.name;
						const description = metadata.description;
						const tokenId = metadata.id;
						const image = metadata.image;
						const tokenURI = metadata.uri;
						const seller = nft_owner;
						const owner = nft_owner;
						const price = "1 BNB";
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
							tokenId: tokenId,
							seller,
							owner,
							image,
							name,
							description,
							tokenURI,
						};
					})
				);
				return items;
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
				const listings = await contract.getAllListings();
				console.log(listings);
				const items = await Promise.all(
					listings.map(
						async ({
							asset,
							assetContractAddress,
							buyoutCurrencyValuePerToken,
							sellerAddress,

						}) => {
							const name = asset.name;
							const description = asset.description;
							const tokenId = asset.id;
							const image = asset.image;
							const tokenURI = asset.uri;
							const seller = sellerAddress;
							const owner = sellerAddress;
							const contractAddress = assetContractAddress;
							const price = buyoutCurrencyValuePerToken['displayValue'].concat(" ",buyoutCurrencyValuePerToken['symbol']);
							return {
								price,
								tokenId: tokenId,
								seller,
								owner,
								image,
								name,
								description,
								tokenURI,
								contractAddress
							};
						}
					)
				);
				console.log(items);
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
				const contract = await connectingWithSmartContract(
					"0xb20B88B9B57E000D45ac9B0F03Ddf159334cFD89"
				);

				const data =
					type == "fetchItemsListed"
						? await contract.fetchItemsListed()
						: await contract.fetchMyNFTs();

				const items = await Promise.all(
					data.map(
						async ({ tokenId, seller, owner, price: unformattedPrice }) => {
							const tokenURI = await contract.tokenURI(tokenId);

							var tokenSplit = tokenURI.split("/").pop();
							const tokenURISend = `https://ipfs.io/ipfs/${tokenSplit}`;
							const {
								data: { image, name, description },
							} = await axios.get(tokenURISend);

							const price = ethers.utils.formatUnits(
								unformattedPrice.toString(),
								"ether"
							);

							return {
								price,
								tokenId: tokenId.toNumber(),
								seller,
								owner,
								image,
								name,
								description,
								tokenURI,
							};
						}
					)
				);
				return items;
			}
		} catch (error) {
			setError("Error while fetching listed NFTs");
			// setOpenError(true);
		}
	};

	useEffect(() => {
		fetchMyNFTsOrListedNFTs();
	}, []);

	//---BUY NFTs FUNCTION
	const buyNFT = async (nft) => {
		try {
			const contract = await connectingWithSmartContract();
			const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

			const transaction = await contract.createMarketSale(nft.tokenId, {
				value: price,
			});

			await transaction.wait();
			router.push("/author");
		} catch (error) {
			setError("Error While buying NFT");
			// setOpenError(true);
		}
	};


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
				createSale,
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
				fetchNFTsMarketplace
			}}
		>
			{children}
		</NFTMarketplaceContext.Provider>
	);
};
