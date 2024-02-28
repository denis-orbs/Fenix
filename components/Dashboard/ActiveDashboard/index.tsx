'use client'

import StrategiesDCA from '@/components/Dashboard/StrategiesDCA'
import MyNest from '@/components/Dashboard/MyNest'
import LiquidityPositions from '@/components/Dashboard/LiquidityPositions'
import MyLocks from '@/components/Dashboard/MyLocks'
import VotingRewards from '@/components/Dashboard/VotingRewards'
import MyStrategies from '@/components/Dashboard/MyStrategies'

const ActiveDashboard = () => {
  return (
    <div className="py-5">
      <LiquidityPositions />
      <MyLocks />
      <MyNest />
      <VotingRewards />
      <MyStrategies />
      <StrategiesDCA />
    </div>
  )
}

export default ActiveDashboard
