interface BaseToken {
  address: string
  name: string
  symbol: string
}

interface TokenPrice {
  tokenAddress: string
  priceUSD: number
  chainId: string
  basetoken: BaseToken
  decimals: string
  common: boolean
  logourl: string
}
export class TokenDataProvider {
  static async getTokenPrices(): Promise<TokenPrice[]> {
    const data = await fetch('https://fenix-dex-api.vercel.app/token-prices', {
      cache: 'no-cache',
    })
    return await data.json()
  }
}
