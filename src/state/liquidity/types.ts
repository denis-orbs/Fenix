export type LiquidityV2PairData = {
  id: string
  isStable: boolean
  token0: {
    name: string
    id: string
    symbol: string
  }
  token1: {
    id: string
    symbol: string
    name: string
  }
}
