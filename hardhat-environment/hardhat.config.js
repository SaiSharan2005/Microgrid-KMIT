module.exports = {
  networks: {
    hardhat: {
      host: "127.0.0.1",  // Localhost (default: 127.0.0.1)
      port: 8545,         // Port Hardhat network is running on (default: 8545)
      network_id: "*",    // Match any network ID
    },
  },
  compilers: {
    solc: {
      version: "0.8.11", // Match the Solidity version in Hardhat
    },
  },
};

