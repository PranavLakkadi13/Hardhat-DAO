const {ethers} = require("hardhat");
const {min_delay} = require("../helper-hardhat-config");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();

    log("Deploying the time-lock contract ");

     const args = [min_delay, [], [], deployer];

    const TimeLock = await deploy("TimeLock", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log("The Timelock token has been deployed........");
    log(`The token address is ${TimeLock.address}`);
    log("----------------------------------------------------------------");
    log("----------------------------------------------------------------");
}