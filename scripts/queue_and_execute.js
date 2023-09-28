const { ethers,network } = require("hardhat");
const {Func, New_Store_Value, Proposal_Description, development_Chains, min_delay} = require("../helper-hardhat-config");
const {moveBlocks} = require("../utils/move-blocks");
const {moveTime} = require("../utils/move-time");

async function queueAndExecute() {
  const args = [New_Store_Value];
  const box = await ethers.getContract("Box");
  const encodedFunctionCall = box.interface.encodeFunctionData(Func,args);
  const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(Proposal_Description));

  const governor = await ethers.getContract("GovernorContract");
  console.log("Queing the proposal.....");

  const queueTx = await governor.queue([box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );
  await queueTx.wait(1);
  
  // Here we want to move blocks as well as timesnap 
  // Therefore we need to move the time 
  if (development_Chains.includes[network.name]){
    await moveTime(min_delay + 100);
    await moveBlocks(10);
  }

  console.log("Executing.......");

  const executeTx = await governor.execute(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );
  await executeTx.wait(1);

  const newValue = await box.retreive();
  console.log(`the new box value is ${newValue.toString()}`);
}

queueAndExecute().then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
