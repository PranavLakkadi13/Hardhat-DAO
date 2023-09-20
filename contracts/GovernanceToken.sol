// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is ERC20Votes {
    uint256 private s_maxSupply = 1000000000000000000000000;

    // Here we try to use a snapshot of the account balances from the past so that ppl dont
    // just participate as a pump and dump mechanism post voting so we take a past balance info 
    constructor() ERC20("GovernanceToken","GT") ERC20Permit("GovernanceToken"){
        _mint(msg.sender, s_maxSupply);
    }

    // These functions are a set of overrides that are required by solidity

    function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal override(ERC20Votes) {
    super._afterTokenTransfer(from, to, amount);
  }

  function _mint(address to, uint256 amount) internal override(ERC20Votes) {
    super._mint(to, amount);
  }

  function _burn(address account, uint256 amount) internal override(ERC20Votes) {
    super._burn(account, amount);
  }
}