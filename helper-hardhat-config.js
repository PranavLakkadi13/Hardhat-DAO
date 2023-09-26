const { ethers } = require("hardhat");

  const development_Chains = ["hardhat", "localhost"];

  const min_delay = 3600;

  const voting_period = 5;

  const voting_delay = 1;

  const Quorum_Percentage = 4;

  const addressZero = ethers.constants.AddressZero;

  const New_Store_Value = 77;

  const Func = "setValue";

  const Proposal_Description = "Proposal #1:  Set the value as 77 in the box contract";
  
  const Proposals_File = "proposals.json";
  
  module.exports = {
    min_delay,
    Quorum_Percentage,
    voting_delay,
    voting_period,
    addressZero,
    New_Store_Value,
    Func,
    Proposal_Description,
    development_Chains,
    Proposals_File
  };