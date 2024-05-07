'use client'
import StrategiesDCA from '@/src/components/Dashboard/StrategiesDCA'
import MyNest from '@/src/components/Dashboard/MyNest'
import LiquidityPositions from '@/src/components/Dashboard/LiquidityPositions'
import MyLocks from '@/src/components/Dashboard/MyLocks'
import VotingRewards from '@/src/components/Dashboard/VotingRewards'
import MyStrategies from '@/src/components/Dashboard/MyStrategies'
import MyPositions from './MyPositions'

const Dashboard = () => {
  return (
    <div className="py-5">
      {/* <MyLocks />
      <MyNest />
      <VotingRewards /> */}
      <MyStrategies />
      <br></br>
      <br></br>
      {/* <LiquidityPositions /> */}
      {/* <StrategiesDCA /> */}
      <MyPositions />
    </div>
  )
}

export default Dashboard
