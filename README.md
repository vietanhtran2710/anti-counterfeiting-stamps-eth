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
let hashedStampCode = soliditySha3("ASJ1324CIS").substring(0, 42);
```
Please check the `test.js` file for more information about how the smart contract works.
