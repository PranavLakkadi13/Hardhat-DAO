const { ethers,network } = require("hardhat");
const {development_Chains,Proposals_File, voting_period} = require("../helper-hardhat-config");
const {moveBlocks} = require("../utils/move-blocks");
const fs = require("fs");

async function queueAndExecute() {

}

queueAndExecute().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
