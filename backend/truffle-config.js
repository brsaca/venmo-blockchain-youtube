require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { INFURA_API_KEY, MNEMONIC } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    goerli: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, 'https://goerli.infura.io/v3/' + INFURA_API_KEY)
      },
      network_id: '5',
      gas: 4465030,
      gasPrice: 10000000000,
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.15"
    }
  }
};