const {ethers } = require("hardhat");

module.exports = async ({getNamedAccounts,deployments}) => {
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();

    log("Deploying the governance token contract.....");
    const governerToken = await deploy("GovernanceToken", {
        from : deployer,
        log: true,
        args: [],
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("The Governance token has been deployed........");
    log(`The token address is ${governerToken.address}`);
    log("----------------------------------------------------------------");

    log("----------------------------------------------------------------");
    await delegate(governerToken.address, deployer);
    log("delegated.....")
    log("----------------------------------------------------------------");
};


const delegate = async (tokenaddress, delegatedTo) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken",tokenaddress);

    const tx = await governanceToken.delegate(delegatedTo);
    await tx.wait(1);
    console.log(`checkpoints ${await governanceToken.numCheckpoints(delegatedTo)}`);
    
}
