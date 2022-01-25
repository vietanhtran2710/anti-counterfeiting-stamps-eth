// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ACSAccessControl.sol";

contract Stamp is ACSAccessControl {
    mapping(address => uint) private codeActivated;
    mapping(uint256 => address) private codeSerialNumber;
    uint256 currentSerialNumber;

    event CreateSerialNumber(uint256 eventSerialNumber);
    
    function createCode(address hashCode) public onlyRole(CREATOR_ROLE) returns (uint256) {
        // address hashCode = address(bytes20(keccak256(code)));
        require(codeActivated[hashCode] == 0, "This code is already created");
        codeSerialNumber[currentSerialNumber] = hashCode;
        currentSerialNumber++;
        codeActivated[hashCode] = 1;
        emit CreateSerialNumber(currentSerialNumber - 1);
        return currentSerialNumber - 1;
    }
 
    function createBatchCodes(address[] memory hashCode) public onlyRole(CREATOR_ROLE) returns (uint256[] memory) {
        uint256[] memory serialNumbers = new uint256[](hashCode.length);
        for (uint256 i = 0; i < hashCode.length; i++) {
            serialNumbers[i] = createCode(hashCode[i]);
        }
        return serialNumbers;
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

    function isSerialNumberActivated(uint256 serialNumber) public view returns (bool) {
        return codeActivated[codeSerialNumber[serialNumber]] == 2;
    }

    function isSerialNumberValid(uint256 serialNumber) public view returns (bool) {
        return serialNumber < currentSerialNumber;
    }

}
