const {ethers } = require("hardhat");
const {addressZero} = require("../helper-hardhat-config");

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

    // everyone can execute the successful passed proposal 
    const executortx = await timeLock.grantRole(EXECUTOR_ROLE,addressZero);
    await executortx.wait(1);

    // Now we want to revoke role from the deployer since the above steps were done by an admin->deployer
    const revoketx = await timeLock.revokeRole(TIMELOCK_ADMIN_ROLE, deployer);
    await revoketx.wait(1);

    /**
     * Now that we have revoked access to the deployer as the role of the admin 
     * we can say the Timelock contract can execute proposals only after governance
     * no entity controls the contract and only the governance decides the outcome 
     */

}