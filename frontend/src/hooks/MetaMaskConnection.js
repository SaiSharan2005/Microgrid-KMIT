import { ethers } from 'ethers';
import contractABI from '../blockChain/Microgrid.json';

export default  async function ConnectToMetaMask() {
  try {
    const { ethereum } = window;
    console.log("Requesting account...");
    if (window.ethereum) {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log(accounts);

      const contractAddress = "0x90481e22c2f0C9f07d77aEA8460FB07c01551089";
      const ganacheProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
      const metaMaskAddress = ethereum.selectedAddress;
      console.log("meta mask:",metaMaskAddress)
      const wallet = new ethers.Wallet(ethereum.selectedAddress, ganacheProvider);
      const walletProvider = new ethers.providers.Web3Provider(ethereum);
      const sendDataContract = new ethers.Contract(contractAddress, contractABI.abi, walletProvider.getSigner());
      const getDataContract = new ethers.Contract(contractAddress, contractABI.abi, wallet);
      return { sendDataContract, getDataContract,metaMaskAddress };
    } else {
      alert("MetaMask not detected");
      return null;
    }
  } catch (error) {
    console.error("Error connecting:", error);
    throw error;
  }
}
