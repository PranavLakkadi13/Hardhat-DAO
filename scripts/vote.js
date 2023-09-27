const { ethers,network } = require("hardhat");
const {development_Chains,Proposals_File, voting_period} = require("../helper-hardhat-config");
const {moveBlocks} = require("../utils/move-blocks");
const fs = require("fs");

const index = 0;

async function main(proposalIndex) {
    const proposals = JSON.parse(fs.readFileSync(Proposals_File, "utf8"));
    const proposalId = proposals[network.config.chainId.toString()][proposalIndex];

    // To vote => 0 against, 1 for, 2 abstain 
    const VoteWay = 1;
    const Reason = "I like the change";

    const governor = await ethers.getContract("GovernorContract");
    
    const voteTxResponse = await governor.castVoteWithReason(proposalId,VoteWay,Reason);
    await voteTxResponse.wait(1);

    if (development_Chains.includes(network.name)){
        await moveBlocks(voting_period + 1);
    }

    console.log("Voted!!! Ready to go ahead......");

    const state = await governor.state(proposalId);
    console.log(state.toString()); // succeeded
}

main(index).then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});