const {ethers, network } = require("hardhat");

module.exports = async ({getNamedAccounts,deployments}) => {
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId = network.config.chainId;

    args = [];

    log("Deploying the governance token contract.....");
    const governerToken = await deploy("GovernanceToken", {
        from : deployer,
        log: true,
        args: args,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("The Governance token has been deployed........");
    log(`The token address is ${governerToken.address}`);
    log("----------------------------------------------------------------")
};