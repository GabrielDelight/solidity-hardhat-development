const { ethers, run, network } = require("hardhat");
async function main() {
  const SimpleStorageFactory = ethers.getContractFactory("SimpleStorage");

  console.log("Deploying....");
  const SimpleStorage = await (await SimpleStorageFactory).deploy();
//   console.log("SimpleStorage", SimpleStorage);
  let tx = (await SimpleStorage).deploymentTransaction();

  let address = await (await SimpleStorage).getAddress();
  console.log("Contract address:", address);

  // Verifying our smart contract
  console.log("network", network.config.chainId)
  if(network.config.chainId === process.env.SEPOLIA_CHAIN_ID){
     SimpleStorage.deploymentTransaction().wait(6);
     verifyContract(address);
   }

  // Interacting with our smart contract
  const currentFavoriteNumber = await SimpleStorage.retrieve();
  console.log(`Our current Favorite number is ${currentFavoriteNumber}`);

    await SimpleStorage.store(6)

    const updatedNumber  = await SimpleStorage.retrieve()
    console.log(`Our current Favorite number is ${updatedNumber}`)
}

async function verifyContract(address) {
  try {
    await run("verify:verify", {
      address: address,
    });
  } catch (error) {
    console.log(error);
  }
}

main()
  .then((data) => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
