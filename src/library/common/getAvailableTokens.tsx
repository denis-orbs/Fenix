import axios from 'axios'
import cache from 'memory-cache'
import { TOKEN_API } from '../constants/addresses'
import { useAccount } from 'wagmi'

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

export const fetchTokens = async (chainId: number): Promise<Token[]> => {
  // const cacheKey = 'token-prices'
  // let cachedData = cache.get(cacheKey)
  console.log(TOKEN_API[chainId], 'heyyy')
  // if (!cachedData) {
  try {
    if (chainId) {
      const response = await fetch(TOKEN_API[chainId], {
        method: 'GET',
      })
      const responseData = await response.json()
      // cachedData = responseData
      // cache.put(cacheKey, responseData, 1000 * 60 * 5)
      return responseData
    }

    // const response = await axios.get<Token[]>(`${process.env.NEXT_PUBLIC_API_URL}/token-prices`)
    // return response.data
  } catch (error) {
    console.error('Error fetching token prices:', error)
    return []
  }
  return []
}
//   return cachedData
// }
