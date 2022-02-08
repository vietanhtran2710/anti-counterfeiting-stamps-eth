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
  private contract: any; 

  constructor() { 
    this.initWeb3();
  }

  async initWeb3() {
    this.web3 = await Moralis.enableWeb3();
    this.contract = await new this.web3.eth.Contract(this.contractABI, this.contractAddress);
  }

  async getEthBalance(address) {
    await this.initWeb3();
    const that = this;
    return new Promise((resolve, reject) => {
      that.web3.eth.getBalance(address)
      .then(function(result) {
        return resolve(result);
      })
    })
  }

  async addCreator(address, currentAccount) {
    await this.initWeb3();
    const that = this;
    return new Promise((resolve, reject) => {
      that.contract.methods.addCreator(address).send({from: currentAccount})
      .then(function(result) {
        return resolve(result);
      })
    })
  }

  async addValidator(address, currentAccount) {
    await this.initWeb3();
    const that = this;
    return new Promise((resolve, reject) => {
      that.contract.methods.addValidator(address).send({from: currentAccount})
      .then(function(result) {
        return resolve(result);
      })
    })
  }

  async isCreator(address) {
    await this.initWeb3();
    const that = this;
    return new Promise((resolve, reject) => {
      that.contract.methods.isCreator(address).call()
      .then(function(result) {
        return resolve(result);
      })
    })
  }

  async isValidator(address) {
    await this.initWeb3();
    const that = this;
    return new Promise((resolve, reject) => {
      that.contract.methods.isValidator(address).call()
      .then(function(result) {
        return resolve(result);
      })
    })
  }

  createStamp(code, serialNumber, currentAccount) {
    let hashedCode = soliditySha3(code).substring(0, 42);
    let hashedSerialNumber = soliditySha3(serialNumber).substring(0, 42);
    const that = this;
    return new Promise((resolve, reject) => {
      that.contract.methods.createCode(hashedCode, hashedSerialNumber).send({from: currentAccount})
      .then(function(result) {
        return resolve(result);
      })
    })
  }
}
