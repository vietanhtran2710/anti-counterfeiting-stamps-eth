const { soliditySha3 } = require("web3-utils");

let stamp = artifacts.require("./Stamp.sol");
let stampInstance;

contract('Contracts', function (accounts) {
    it("Contracts deployment", function() {
        return stamp.deployed().then(function(instance) {
            stampInstance = instance;
            assert(stampInstance != undefined, "Stamp contract should be defined/deployed");
        })
    });

    it("Access control test", function() {
        return stampInstance.isAdmin(accounts[0], {from: accounts[0]})
        .then(async function(result) {
            assert.equal(1, result, "Account 0 should be an admin");
            await stampInstance.addCreator(accounts[1], {from: accounts[0]})
            return stampInstance.isCreator(accounts[1], {from: accounts[0]})
        })
        .then(async function(result) {
            assert.equal(1, result, "Account 1 should be a creator");
            await stampInstance.addValidator(accounts[2], {from: accounts[0]})
            return stampInstance.isValidator(accounts[2], {from: accounts[0]})
        })
        .then(async function(result) {
            assert.equal(1, result, "Account 2 should be a validator");
            await stampInstance.removeCreator(accounts[1], {from: accounts[0]})
            return stampInstance.isCreator(accounts[1], {from: accounts[0]})
        })
        .then(async function(result) {
            assert.equal(0, result, "Account 1 should not be a creator anymore");
            await stampInstance.removeValidator(accounts[2], {from: accounts[0]})
            return stampInstance.isValidator(accounts[2], {from: accounts[0]})
        })
        .then(async function(result) {
            assert.equal(0, result, "Account 2 should not be a sponsor");
            await stampInstance.addBatchValidator([accounts[1], accounts[2]], {from: accounts[0]});
            let newResult = []
            for (let address of [accounts[1], accounts[2]]) {
                newResult.push(await stampInstance.isValidator(address));
            }
            return newResult;
        })
        .then(async function(result) {
            assert.deepEqual([true, true], result, "Account 1 and 2 should be a validator");
            await stampInstance.removeBatchValidator([accounts[1], accounts[2]], {from: accounts[0]});
            let newResult = []
            for (let address of [accounts[1], accounts[2]]) {
                newResult.push(await stampInstance.isValidator(address));
            }
            return newResult;
        })
        .then(async function(result) {
            assert.deepEqual([false, false], result, "Account 1 and 2 should not be a validator anymore");
            await stampInstance.addBatchCreator([accounts[1], accounts[2]], {from: accounts[0]});
            let newResult = []
            for (let address of [accounts[1], accounts[2]]) {
                newResult.push(await stampInstance.isCreator(address));
            }
            return newResult;
        })
        .then(async function(result) {
            assert.deepEqual([true, true], result, "Account 1 and 2 should be a creator");
            await stampInstance.addValidator(accounts[3], {from: accounts[0]});
        })
    })

    it("Stamp test", async function() {
        let hashedStampCode = soliditySha3("ASJ1324CIS").substring(0, 42);
        return stampInstance.createCode(hashedStampCode, {from: accounts[1]})
        .then(function (result) {
            assert.equal(0, result.logs[0]['args']['0']['words'][0], "Code ASJ1324CIS serial number should be 0");
            return stampInstance.isCodeValid(hashedStampCode, {from: accounts[0]})
        })
        .then(function (result) {
            assert.equal(1, result, "Code ASJ1324CIS should be valid");
            return stampInstance.isCodeActivated(hashedStampCode, {from: accounts[0]})
        })
        .then(async function (result) {
            assert.equal(0, result, "Code ASJ1324CIS should not be activated yet");
            await stampInstance.activateCode(hashedStampCode, {from: accounts[3]});
            return stampInstance.isCodeActivated(hashedStampCode, {from: accounts[0]})
        })
        .then(function (result) {
            assert.equal(1, result, "Code ASJ1324CIS should be activated");
            return stampInstance.isSerialNumberValid(0, {from: accounts[0]})
        })
        .then(function (result) {
            assert.equal(1, result, "Serial number 0 should be valid");
            return stampInstance.isSerialNumberActivated(0, {from: accounts[0]})
        })
        .then(function (result) {
            assert.equal(1, result, "Serial number 0 should be activated");
            return stampInstance.isSerialNumberValid(1, {from: accounts[0]})
        })
        .then(function (result) {
            assert.equal(0, result, "Serial number 1 should not be valid");
            let hashedBatchCodes = [];
            for (let item of ["A1238CA2SD", "AK2SXOS9WS", "AWICNW129A"]) {
                hashedBatchCodes.push(soliditySha3(item).substring(0, 42));
            }
            return stampInstance.createBatchCodes(hashedBatchCodes, {from: accounts[1]})
        })
        .then(function(result) {
            let createdSerialNumber = [];
            for (let bn of result.logs) {
                createdSerialNumber.push(bn['args']['eventSerialNumber']['words'][0]);
            }
            assert.deepEqual([1, 2, 3], createdSerialNumber, "Serial numbers should be 1, 2, 3");
            return stampInstance.isCodeActivated(soliditySha3("A1238CA2SD").substring(0, 42))
        })
        .then(function(result) {
            assert.equal(0, result, "Code A1238CA2SD should not be activated")
            return stampInstance.isSerialNumberActivated(1)
        })
        .then(function(result) {
            assert.equal(0, result, "Serial number 1 should not be activated")
        })
    })
    
});