// models
import { Address } from 'viem';
import { IToken } from '@/src/library/types';

export const MAX_UINT_256 = '115792089237316195423570985008687907853269984665640564039457584007913129639934'
export const USDB_TOKEN_ADDRESS = '0x4300000000000000000000000000000000000003' as Address
export const WETH_TOKEN_ADDRESS = '0x4300000000000000000000000000000000000004' as Address

export const USDB_TOKEN_INITIAL_STATE = {
  name: 'USDB',
  symbol: 'USDB',
  id: 0,
  decimals: 18,
  address: USDB_TOKEN_ADDRESS,
  img: '/static/images/tokens/USDB.svg',
} as IToken
export const WETH_TOKEN_INITIAL_STATE = {
  name: 'Wrapped Ether',
  symbol: 'ETH',
  id: 1,
  decimals: 18,
  address: WETH_TOKEN_ADDRESS,
  img: '/static/images/tokens/WETH.png',
} as IToken
