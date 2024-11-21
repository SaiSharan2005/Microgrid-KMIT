const { ethers } = require("ethers");

// Define provider and wallet (Make sure you replace these with actual values)
const provider = new ethers.providers.JsonRpcProvider({
    url:process.env.JsonRpcProvider,
    network: { chainId: 31337, name: "hardhat" },
  });
const privateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"; // Replace with the producer's private key
const wallet = new ethers.Wallet(privateKey, provider);

// Smart contract ABI and address
// const contractABI = [
//   // Add the ABI of your smart contract here
//   "function addProducer(address producer) public",
//   "function addProsumer(address prosumer) public",
//   "function createMicrogrid(address producer) public returns (uint256)",
//   "function addBattery(uint256 microgridId, string memory details) public",
//   "function addGreenEnergy(uint256 microgridId, string memory details) public",
//   "function addPowerGrid(uint256 microgridId, string memory details) public",
//   "function connectProsumerToMicrogrid(uint256 microgridId, address prosumer) public",
// ];
const contractABI = require("./blockChain/build/contracts/Microgrid.json");

const contractAddress = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0"; // Replace with your deployed contract address
const microgridContract = new ethers.Contract(contractAddress, contractABI, wallet);

// Accounts
const producerAccount = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Replace with producer's Ethereum address
const prosumerAccount = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with prosumer's Ethereum address

async function manageMicrogrid() {
  try {
    // Step 1: Add the producer
    console.log("Adding producer...");
    const txAddProducer = await microgridContract.addProducer(producerAccount);
    await txAddProducer.wait();
    console.log(`Producer ${producerAccount} added.`);

    // Step 2: Create a microgrid with the producer
    console.log("Creating microgrid...");
    const txCreateMicrogrid = await microgridContract.createMicrogrid(producerAccount);
    const receipt = await txCreateMicrogrid.wait();
    const microgridId = receipt.events[0].args.microgridId.toString(); // Assuming the event returns the microgrid ID
    console.log(`Microgrid created with ID: ${microgridId}`);

    // Step 3: Add components to the microgrid
    console.log("Adding components to the microgrid...");
    const txAddBattery = await microgridContract.addBattery(microgridId, "Battery details");
    await txAddBattery.wait();
    console.log("Battery added.");

    const txAddGreenEnergy = await microgridContract.addGreenEnergy(microgridId, "Solar panels");
    await txAddGreenEnergy.wait();
    console.log("Green energy source added.");

    const txAddPowerGrid = await microgridContract.addPowerGrid(microgridId, "Power grid details");
    await txAddPowerGrid.wait();
    console.log("Power grid added.");

    // Step 4: Add the prosumer
    console.log("Adding prosumer...");
    const txAddProsumer = await microgridContract.addProsumer(prosumerAccount);
    await txAddProsumer.wait();
    console.log(`Prosumer ${prosumerAccount} added.`);

    // Step 5: Connect the prosumer to the microgrid
    console.log("Connecting prosumer to the microgrid...");
    const txConnectProsumer = await microgridContract.connectProsumerToMicrogrid(microgridId, prosumerAccount);
    await txConnectProsumer.wait();
    console.log(`Prosumer ${prosumerAccount} connected to microgrid ID: ${microgridId}`);

    console.log("Microgrid management complete.");
  } catch (error) {
    console.error("Error managing microgrid:", error);
  }
}

// Execute the function
manageMicrogrid();
