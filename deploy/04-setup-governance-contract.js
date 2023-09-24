const {ethers } = require("hardhat");

module.exports = async ({getNamedAccounts,deployments}) => {
    const {deploy,log,get} = deployments;
    const {deployer} = await getNamedAccounts();
    const timeLock = await ethers.getContract("TimeLock", deployer);
    const governor = await ethers.getContract("GovernorContract", deployer);

    // Here the governorcontract raises proposals and the timelock contract is the main contract 
    // only the governnor contract can raise proposals and anyone can execute after the timelock min delay

    log("Setting up roles....");
    const PROPOSER_ROLE = await timeLock.PROPOSER_ROLE();
    const EXECUTOR_ROLE = await timeLock.EXECUTOR_ROLE();
    const TIMELOCK_ADMIN_ROLE = await timeLock.TIMELOCK_ADMIN_ROLE();

    // only the governor contract can raise proposals 
    const proposertx = await timeLock.grantRole(PROPOSER_ROLE,governor.address);
    await proposertx.wait(1);

    
}