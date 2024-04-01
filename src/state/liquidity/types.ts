import { Address } from 'viem'
import { BigDecimal } from '@/src/library/common/BigDecimal'
import { PairInfoV3 } from '@/src/library/web3/apis/pairAPI'

export type PoolData = {
  pairDetails: LiquidityTableElement
}
export type v3PoolData = {
  pairDetails: V3PairInfo
}

export type LiquidityV2PairDetails = {
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
export interface PairInfo {
  pair_address: Address
  symbol: string
  name: string
  decimals: number
  stable: boolean
  total_supply: bigint

  // Token pair info
  token0: Address
  token0_symbol: string
  token0_decimals: number
  reserve0: bigint
  claimable0: bigint

  token1: Address
  token1_symbol: string
  token1_decimals: number
  reserve1: bigint
  claimable1: bigint

  // pairs gauge
  gauge: string
  gauge_total_supply: bigint
  gauge_total_weight: bigint
  fee: string
  bribe: string
  emissions: bigint
  emissions_token: string
  emissions_token_decimals: number

  // User deposit
  account_lp_balance: bigint
  account_token0_balance: bigint
  account_token1_balance: bigint
  account_gauge_balance: bigint
  account_gauge_total_weight: bigint
  account_gauge_earned: bigint

  inactive_gauge?: boolean
}
export interface LiquidityTableElement {
  pairAddress: Address
  pairSymbol: string
  pairInformationV2?: PairInfo
  pairInformationV3?: PairInfoV3
  priceA: number
  priceB: number
  isInactiveGauge?: boolean
  apr: number
  volumeUSD: string
  volumeToken0: string
  volumeToken1: string
  maxAPR?: number
  tvl: BigDecimal
  fee: string
  token0Symbol: string
  token1Symbol: string
  unmigrated: boolean
  totalPoolAmountValue: BigDecimal
  myPoolAmountValue: BigDecimal
  myStackedAmountValueV3: BigDecimal
  myStackedAmountValueV2: BigDecimal
}
export interface V2PairInfo {
  id: string
  isStable: boolean
  token0: {
    name: string
    id: string
    symbol: string
  }
  token1: { name: string; id: string; symbol: string }
  volumeToken0: string
  volumeToken1: string
  volumeUSD: string
}
export interface V3PairInfo {
  id: Address
  feesToken0: string
  feesToken1: string
  feesUSD: string
  communityFee: string
  createdAtBlockNumber: string
  createdAtTimestamp: string
  fee: string
  feeGrowthGlobal0X128: string
  feeGrowthGlobal1X128: string
  liquidity: string
  liquidityProviderCount: string
  observationIndex: string
  sqrtPrice: string
  tick: string
  tickSpacing: string
  totalValueLockedMatic: string
  totalValueLockedToken0: string
  totalValueLockedToken1: string
  totalValueLockedUSD: string
  totalValueLockedUSDUntracked: string
  txCount: string
  untrackedFeesUSD: string
  untrackedVolumeUSD: string
  volumeToken0: string
  volumeToken1: string
  volumeUSD: string
  token0: {
    decimals: string
    id: Address
    name: string
    symbol: string
  }
  token1: {
    decimals: string
    id: Address
    name: string
    symbol: string
  }
}
