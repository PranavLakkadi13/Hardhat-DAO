const { ethers,network } = require("hardhat");
const {Func, New_Store_Value, Proposal_Description,development_Chains, voting_delay, Proposals_File} = require("../helper-hardhat-config");
const {moveBlocks} = require("../utils/move-blocks");
const {fs} = require("fs-extra");

async function propose (args,functionToCall,proposalDescription) {
    // Here this script is to get the governor contract that will be allowed to create a proposal

    const governor = await ethers.getContract("GovernorContract");
    const box = await ethers.getContract("Box");

    // simce we are calling the store function on the Box contract, we are encoding it 
    const encodedFunctionCall = await box.interface.encodeFunctionData(functionToCall,args);

    console.log(encodedFunctionCall);

    console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`);
    console.log(`Proposal Description : \n ${proposalDescription}`);

    const proposetx = await governor.propose(
      [box.address],
      [0],
      [encodedFunctionCall],
      proposalDescription);

    const proposeReceipt = proposetx.wait(1);

    if (development_Chains.includes(network.name)){
      await moveBlocks(voting_delay + 1);
    }

    const proposalId = await proposeReceipt.events[0].args.proposalId;

    let proposals = JSON.parse(fs.readFileSync(Proposals_File, "utf8"));

    proposals[network.config.chainId.toString()].push(proposalId.toString());

    fs.writeFileSync(Proposals_File, JSON.stringify(proposals));
}

propose([New_Store_Value],Func, Proposal_Description)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });