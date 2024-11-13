const { task } = require("hardhat/config");

task("block-number", "Print block number").setAction(async (taskArgs, hre) => {
  let blockNumber = await  hre.ethers.provider.getBlockNumber();

  console.log(`Current blocknumber is:${blockNumber}`);
});

module.exports = {};
