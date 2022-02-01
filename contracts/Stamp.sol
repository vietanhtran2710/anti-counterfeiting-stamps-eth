// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ACSAccessControl.sol";

contract Stamp is ACSAccessControl {
    mapping(address => uint) private codeActivated;
    mapping(address => address) private codeSerialNumber;

    event CreateSerialNumber(address eventSerialNumber);
    
    function createCode(address hashCode, address serialNumber) public onlyRole(CREATOR_ROLE) {
        // address hashCode = address(bytes20(keccak256(code)));
        require(codeActivated[hashCode] == 0, "This code is already created");
        codeSerialNumber[serialNumber] = hashCode;
        codeActivated[hashCode] = 1;
        emit CreateSerialNumber(serialNumber);
    }
 
    function createBatchCodes(address[] memory hashCode, address[] memory serialCode) public onlyRole(CREATOR_ROLE) {
        for (uint256 i = 0; i < hashCode.length; i++) {
            createCode(hashCode[i], serialCode[i]);
        }
    }

    function isCodeActivated(address hashCode) public view returns (bool) {
        return codeActivated[hashCode] == 2;
    }

    function isCodeValid(address hashCode) public view returns (bool) {
        return codeActivated[hashCode] != 0;
    }

    function activateCode(address hashCode) public onlyRole(VALIDATOR_ROLE) {
        codeActivated[hashCode] = 2; 
    }

    function isSerialNumberActivated(address serialNumber) public view returns (bool) {
        return codeActivated[codeSerialNumber[serialNumber]] == 2;
    }

    function isSerialNumberValid(address serialNumber) public view returns (bool) {
        return codeSerialNumber[serialNumber] != address(0);
    }

}
