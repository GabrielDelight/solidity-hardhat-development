const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", () => {
  let getContractFactory, simpleStorageContract;

  beforeEach(async () => {
    getContractFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorageContract = await getContractFactory.deploy();
  });

  it("Should start with 0", async () => {
    const favoriteNumber = await simpleStorageContract.retrieve();
    const expetedValue = "0";
    assert.equal(expetedValue, favoriteNumber.toString());
  });

  it("Should updated to 7 in store", async () => {
    const expectedNumber = "7";
    const response = await simpleStorageContract.store(expectedNumber);
    response.wait(1);
    const updatedFavoriteNumber = await simpleStorageContract.retrieve();
    expect(expectedNumber).to.equal(updatedFavoriteNumber.toString())
  });
});
