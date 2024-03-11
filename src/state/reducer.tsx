import { combineReducers } from '@reduxjs/toolkit'

import liquidity from './liquidity/reducer'

/* import analytics from './analytics/reducer'
import application from './application/reducer' */

const reducer = combineReducers({
  liquidity,
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
