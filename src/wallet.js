// src/wallet.js
import { Web3Modal } from '@web3modal/standalone';
import { ethers } from 'ethers';

const web3Modal = new Web3Modal({
  projectId: 'YOUR_PROJECT_ID', // 👉 Get this from https://cloud.walletconnect.com
  themeMode: 'dark',
});

export async function connectWithWeb3Modal() {
  try {
    const provider = await web3Modal.connect();
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();
    const address = await signer.getAddress();
    return address;
  } catch (err) {
    console.error('Web3Modal error:', err);
    return null;
  }
}
