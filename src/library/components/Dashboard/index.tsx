'use client'
import StrategiesDCA from '@/src/library/components/Dashboard/StrategiesDCA'
import MyNest from '@/src/library/components/Dashboard/MyNest'
import LiquidityPositions from '@/src/library/components/Dashboard/LiquidityPositions'
import MyLocks from '@/src/library/components/Dashboard/MyLocks'
import VotingRewards from '@/src/library/components/Dashboard/VotingRewards'
import MyStrategies from '@/src/library/components/Dashboard/MyStrategies'

const Dashboard = () => {
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

export default Dashboard
