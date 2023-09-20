// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

/**
 * This is going to be the owner of the box contract 
 * 
 * To give time to users to get out if they dont the goverance proposal passed 
 */


contract TimeLock is TimelockController {
    
    /**
     * 
     * @param minDelay How long you have to wait before executing 
     * @param proposers The list of addresses that can propose 
     * @param executers The list of addresses that can execute a proposal once it passes
     */
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executers,
        address admin
    ) TimelockController(minDelay,proposers,executers,admin) {
        
    }
}