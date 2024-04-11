import { ethers } from 'ethers'

export const getWeb3Provider = () => {
  let web3Provider: any
  if (window.ethereum) {
    web3Provider = new ethers.providers.Web3Provider(window.ethereum)
  } else {
    web3Provider = new ethers.providers.JsonRpcProvider('https://sepolia.blast.io')
  }
  return web3Provider
}
