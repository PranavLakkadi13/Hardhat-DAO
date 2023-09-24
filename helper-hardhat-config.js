const { ethers } = require("hardhat");

  const min_delay = 3600;

  const voting_period = 5;

  const voting_delay = 1;

  const Quorum_Percentage = 4;

  const addressZero = ethers.addressZero;
  
  
  module.exports = {
    min_delay,
    Quorum_Percentage,
    voting_delay,
    voting_period,
    addressZero
  };