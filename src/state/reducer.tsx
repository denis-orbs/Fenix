import { combineReducers } from '@reduxjs/toolkit'

import liquidity from './liquidity/reducer'
import lock from './lock/reducer'
import vote from './vote/reducer'

/* import analytics from './analytics/reducer'
import application from './application/reducer' */

const reducer = combineReducers({
  liquidity,
  lock,
  vote,
  /* application,
  transactions,
  user,
  wallets,
  hedger,
  trade,
  notifications,
  quotes,
  analytics,
  referrals,
  tradingIncentives,
  testing, */
})

export default reducer
