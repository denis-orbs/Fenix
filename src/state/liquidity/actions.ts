import { Address } from '@/src/library/types'
import { ClmProvider } from '@/src/library/types/liquidity'
import { createAction } from '@reduxjs/toolkit'

export const updateToken0 = createAction<Address>('liquidity/updateToken0')
export const updateToken0Value = createAction<string>('liquidity/updateToken0Value')
export const updateToken1 = createAction<Address>('liquidity/updateToken1')
export const updateToken1Value = createAction<string>('liquidity/updateToken1Value')
export const updateClmProvider = createAction<ClmProvider>('liquidity/updateClmProvider')
