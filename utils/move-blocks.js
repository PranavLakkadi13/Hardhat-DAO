const {network} = require("hardhat");

async function moveBlocks(amount) {
    console.log("Moving Blocks.....");
    for (let i = 0; i < amount; i++) {
        await network.provider.request({ method: "evm_mine", params: [] });
    }
}

module.exports = {moveBlocks};