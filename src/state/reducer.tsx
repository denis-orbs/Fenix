import { combineReducers } from '@reduxjs/toolkit'

import liquidity from './liquidity/reducer'
import lock from './lock/reducer'
import vote from './vote/reducer'
import user from './user/reducer'
import chart from './swap-chart/reducer'

const reducer = combineReducers({
  user,
  liquidity,
  lock,
  vote,
  chart,
})

export default reducer
