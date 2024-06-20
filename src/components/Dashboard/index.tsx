'use client'
import StrategiesDCA from '@/src/components/Dashboard/StrategiesDCA'
import MyNest from '@/src/components/Dashboard/MyNest'
import LiquidityPositions from '@/src/components/Dashboard/LiquidityPositions'
import MyLocks from '@/src/components/Dashboard/MyLocks'
import VotingRewards from '@/src/components/Dashboard/VotingRewards'
import MyStrategies from '@/src/components/Dashboard/MyStrategies'
import MyPositions from './MyPositions'
import GoldRushBanner from '../Common/GoldRushBanner'

const Dashboard = () => {
  return (
    <div className="py-5">
      <GoldRushBanner/>
      {/* <MyLocks />
      <MyNest />
      <VotingRewards /> */}
      <MyPositions />
      <LiquidityPositions />
      {/* <StrategiesDCA /> */}
      <MyStrategies />
      <br></br>
    </div>
  )
}

export default Dashboard
