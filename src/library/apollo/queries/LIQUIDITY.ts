import { gql } from '@apollo/client'

export const GET_V2_PAIRS = gql`
  query GetV2Pairs($first: Int, $skip: Int) {
    pairs(first: $first, skip: $skip) {
      id
      isStable
      token0 {
        name
        id
        symbol
      }
      token1 {
        id
        symbol
        name
      }
    }
  }
`
