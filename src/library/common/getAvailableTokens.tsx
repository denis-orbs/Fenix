import axios from 'axios'
import cache from 'memory-cache'

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
  const cacheKey = 'token-prices'
  let cachedData = cache.get(cacheKey)
  if (!cachedData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token-prices`, {
        method: 'GET',
      })
      const responseData = await response.json()
      cachedData = responseData
      cache.put(cacheKey, responseData, 1000 * 60 * 5)
      // const response = await axios.get<Token[]>(`${process.env.NEXT_PUBLIC_API_URL}/token-prices`)
      // return response.data
    } catch (error) {
      console.error('Error fetching token prices:', error)
      return []
    }
  }
  return cachedData
}
