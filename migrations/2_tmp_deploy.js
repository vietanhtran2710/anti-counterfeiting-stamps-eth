var Stamp = artifacts.require("Stamp");

module.exports = async function (deployer) {
  deployer.deploy(Stamp);
};