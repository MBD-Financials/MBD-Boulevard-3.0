require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/sgVKVudg1rIPwUU065uEUAgFMaOXnYmc",
      accounts: "PRIVATE KEY HERE",
    },
  },
};
