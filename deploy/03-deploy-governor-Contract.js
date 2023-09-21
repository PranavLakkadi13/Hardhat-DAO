const {ethers} = require("hardhat");
const {Quorum_Percentage,voting_delay,voting_period} = require("../helper-hardhat-config");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy,log,get} = deployments;
    const {deployer} = await getNamedAccounts();
    const governaceToken = await get("GovernanceToken");
    const timelock = await get("TimeLock");

    log("Deploying the Governor Contract  ");

    const args = [governaceToken.address, timelock.address,Quorum_Percentage ,voting_period,voting_delay];

    const GovernorContract = await deploy("GovernorContract", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log("The GovernorContract token has been deployed........");
    log(`The token address is ${GovernorContract.address}`);
    log("----------------------------------------------------------------");
    log("----------------------------------------------------------------");
}