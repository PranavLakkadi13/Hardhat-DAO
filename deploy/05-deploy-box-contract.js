const {ethers} = require("hardhat");

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();

    log("Deploying the Box contract ");

     const args = [];

    const box = await deploy("Box", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log("The Box contract has been deployed........");
    log(`The Box contract address is ${box.address}`);
    log("----------------------------------------------------------------");
    log("----------------------------------------------------------------");

    const timeLock = await ethers.getContract("TimeLock", deployer);
    const governor = await ethers.getContract("GovernorContract", deployer);

    /**
     * The above deployment was deployed by the deployer
     * we now transfered the ownership to governance contract so that it can be governed
     */

    const boxContract = await ethers.getContractAt("Box", box.address);
    const transfertx = await boxContract.transferOwnership(timeLock.address);
    await transfertx.wait(1);
    log("Successfully transferred the ownership to a governance contract (TimeLock contract)!!!!...")
}