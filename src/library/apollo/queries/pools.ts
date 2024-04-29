import { gql } from '@apollo/client'
export const POOL_FRAGMENT = gql`
  fragment PoolFields on Pool {
    id
    fee
    token0 {
      ...TokenFields
    }
    token1 {
      ...TokenFields
    }
    sqrtPrice
    liquidity
    tick
    tickSpacing
    totalValueLockedUSD
    volumeUSD
    feesUSD
    untrackedFeesUSD
    token0Price
    token1Price
  }
`
export const TICK_FRAGMENT = gql`
  fragment TickFields on Tick {
    tickIdx
    liquidityNet
    liquidityGross
    price0
    price1
  }
`

export const POOL_FEE_DATA_FRAGMENT = gql`
  fragment PoolFeeDataFields on PoolFeeData {
    fee
    timestamp
  }
`

export const POOL_DAY_DATA_FRAGMENT = gql`
  fragment PoolDayDataFields on PoolDayData {
    feesUSD
  }
`

export const POOLS_LIST = gql`
  query PoolsList {
    pools {
      id
      fee
      token0 {
        id
        symbol
        name
        decimals
        derivedMatic
      }
      token1 {
        id
        symbol
        name
        decimals
        derivedMatic
      }
      sqrtPrice
      liquidity
      tick
      tickSpacing
      totalValueLockedUSD
      volumeUSD
      feesUSD
      untrackedFeesUSD
      token0Price
      token1Price
    }
  }
`
export const POOLS_ID_LIST = gql`
  query PoolsList {
    pools {
      id
    }
  }
`

export const ALL_TICKS = gql`
  query allTicks($poolAddress: String!, $skip: Int!) {
    ticks(first: 1000, skip: $skip, where: { poolAddress: $poolAddress }, orderBy: tickIdx) {
      ...TickFields
    }
  }
`

export const SINGLE_POOL = gql`
  query SinglePool($poolId: ID!) {
    pool(id: $poolId) {
      ...PoolFields
    }
  }
`

export const MULTIPLE_POOLS = gql`
  query MultiplePools($poolIds: [ID!]) {
    pools(where: { id_in: $poolIds }) {
      ...PoolFields
    }
  }
`

export const POOL_FEE_DATA = gql`
  query PoolFeeData($poolId: String) {
    poolDayDatas(where: { pool: $poolId }, orderBy: date, orderDirection: desc) {
      ...PoolDayDataFields
    }
  }
`
