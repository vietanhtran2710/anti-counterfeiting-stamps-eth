# anti-counterfeiting-stamps-eth

Smart Contracts for Electronic Anti-counterfeiting Stamps on Ethereum Blockchain

## Installation

Use the package manager [npm](https://nodejs.org/en/) to install truffle.

```bash
npm install -g truffle
npm i web3-utils
npm i @openzeppelin/contracts
```

## Usage

Start your local network. E.g, Ganache.

```bash
truffle deploy
```

## Stamp code hashing
Before sending stamp code to the blockchain, the code need to be hashed and converted to a 20-bytes-address by the following code for example:

```javascript
const { soliditySha3 } = require("web3-utils");
let hashedStampCode = soliditySha3("ASJ1324CIS").substring(0, 42);
```
Please check the `test.js` file for more information about how the smart contract works.

## JavaScript service to call smart contract functions on the blockchain
```javascript
import { Injectable } from '@angular/core';
import Moralis from 'moralis';
import { environment } from 'src/environments/environment';
const { soliditySha3 } = require("web3-utils");

@Injectable({
  providedIn: 'root'
})
export class StampService {
  private web3: any;
  private artifacts = require('../../../../../build/contracts/Stamp.json');
  private contractAddress = environment.stampAssress;
  private contractABI = this.artifacts.abi;
  private adminAddress = environment.adminAddress;
  private key = environment.key;
  private contract: any; 

  constructor() { 
    this.initWeb3();
  }

  async initWeb3() {
    // Initialize Web3 on the Client to call functions or send transactions
    this.web3 = await Moralis.enableWeb3();
    this.contract = await new this.web3.eth.Contract(this.contractABI, this.contractAddress);
  }

  async getEthBalance(address) {
    // Get the ETH balance of the address\
    // Return a Promise containing the result
  }

  async addCreator(address, currentAccount) {
    // Add 'CREATOR' role for an address with the current admin account
    // Return the transaction if no error meet and role added successfully
  }

  async addValidator(address, currentAccount) {
    // Add 'VALIDATOR' role for an address with the current admin account
    // Return a promise containing a transaction if no error meet and role added successfully
  }

  async isCreator(address) {
    // Check if an address has the 'CREATOR' role
    // Return a Promise containing True if the address is a creator, False otherwise
  }

  async isValidator(address) {
    // Check if an address has the 'VALIDATOR' role
    // Return a Promise containing True if the address is a validator, False otherwise
  }

  createStamp(code, serialNumber, currentAccount) {
    // Create stamp secret code with serial number for an item on the blockchain
    // The Code and Serial Number passed to the function must be original (not hashed yet)
    // Return a promise containing a transaction if no error meet and stamp created successfully

  isCodeValid(code) {
    // Check if a secret code (not hashed yet) is valid (created)
    // Return a Promise containing True if the code is valid, False otherwise
  }

  isCodeActivated(code) {
    // Check if a secret code (not hashed yet) is activated yet
    // Return a Promise containing True if the code is activated, False otherwise
  }

  isSerialNumberValid(code) {
    // Check if a serial number (not hashed yet) is valid (created)
    // Return a Promise containing True if the serial number is valid, False otherwise
  }

  isSerialNumberActivated(code) {
    // Check if a serial number (not hashed yet) is activated
    // Return a Promise containing True if the serial number is activated, False otherwise
  }

  async activateCode(code) {
    // Activated the secret code
    // Return a promise containing a transaction if no error meet and item activated successfully
  }
}

```
