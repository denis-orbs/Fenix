'use client'
import StrategiesDCA from '@/src/app/components/Dashboard/StrategiesDCA'
import MyNest from '@/src/app/components/Dashboard/MyNest'
import LiquidityPositions from '@/src/app/components/Dashboard/LiquidityPositions'
import MyLocks from '@/src/app/components/Dashboard/MyLocks'
import VotingRewards from '@/src/app/components/Dashboard/VotingRewards'
import MyStrategies from '@/src/app/components/Dashboard/MyStrategies'

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
