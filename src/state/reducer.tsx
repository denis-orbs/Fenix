import { combineReducers } from '@reduxjs/toolkit'

import liquidity from './liquidity/reducer'
import lock from './lock/reducer'
import vote from './vote/reducer'
import user from './user/reducer'
import notifications from './notifications/reducer'
import apr from './apr/reducer'

const reducer = combineReducers({
  user,
  liquidity,
  lock,
  vote,
  notifications,
  apr,
})

export default reducer
