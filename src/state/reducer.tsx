import { combineReducers } from '@reduxjs/toolkit'

import liquidity from './liquidity/reducer'
import lock from './lock/reducer'
import vote from './vote/reducer'
import user from './user/reducer'

const reducer = combineReducers({
  user,
  liquidity,
  lock,
  vote,
})

export default reducer
