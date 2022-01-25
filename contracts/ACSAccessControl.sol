// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract ACSAccessControl is AccessControl {
    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");

    function addCreator(address _address) public {
        grantRole(CREATOR_ROLE, _address);
    }

    function addValidator(address _address) public {
        grantRole(VALIDATOR_ROLE, _address);
    }

    function addBatchCreator(address[] memory _address) public {
        for(uint256 i = 0; i < _address.length; ++i) {
            grantRole(CREATOR_ROLE, _address[i]);
        }
    }

    function addBatchValidator(address[] memory _address) public {
        for(uint256 i = 0; i < _address.length; ++i) {
            grantRole(VALIDATOR_ROLE, _address[i]);

        }
    }

    function removeCreator(address _address) public {
        revokeRole(CREATOR_ROLE, _address);
    }

    function removeValidator(address _address) public {
        revokeRole(VALIDATOR_ROLE, _address);
    }

    function removeBatchCreator(address[] memory _address) public {
        for (uint256 i = 0; i < _address.length; ++i) {
            revokeRole(CREATOR_ROLE, _address[i]);
        }
    }

    function removeBatchValidator(address[] memory _address) public {
        for (uint256 i = 0; i < _address.length; ++i) {
            revokeRole(VALIDATOR_ROLE, _address[i]);
        }
    }

    function isCreator(address _address) public view returns (bool) {
        return hasRole(CREATOR_ROLE, _address);
    }

    function isValidator(address _address) public view returns (bool) {
        return hasRole(VALIDATOR_ROLE, _address);
    }
}
