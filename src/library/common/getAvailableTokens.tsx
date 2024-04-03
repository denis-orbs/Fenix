import axios from 'axios'

export interface Token {
  tokenAddress: string
  priceUSD: string
  chainId: string
  basetoken: {
    address: string
    name: string
    symbol: string
  }
  decimals: string
  logourl: string
  common: boolean
}

export const fetchTokens = async (): Promise<Token[]> => {
  try {
    const response = await axios.get<Token[]>('https://fenix-api-testnet.vercel.app/token-prices')
    return response.data
  } catch (error) {
    console.error('Error fetching token prices:', error)
    return []
  }
}
