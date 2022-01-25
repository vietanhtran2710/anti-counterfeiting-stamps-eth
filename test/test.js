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

    it("Stamp test", function() {
        
    })
    
});