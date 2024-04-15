import { createAction } from '@reduxjs/toolkit'

export const resetUser = createAction('user/resetUser')
export const updateSlippageTolerance = createAction<{ slippageTolerance: number | 'auto' }>(
  'user/updateSlippageTolerance'
)
