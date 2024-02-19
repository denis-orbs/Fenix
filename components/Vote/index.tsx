/* eslint-disable no-console */
'use client'
import Deposit from '@/components/Vote/Deposit'
import VoteNow from './VoteNow/VoteNow'
import Filter from '../Common/Filter'
import Search from '../Common/Search'
import { FILTER_OPTIONS } from './data'
import Voted from './Voted'
const Vote = () => {
  return (
    <section>
      <div className="flex flex-col items-center gap-5 p-5 xl:flex xl:flex-row">
        <Deposit />
        <VoteNow />
      </div>
      <h1 className="text-xl text-white">Select Liquidity Pools for Voting</h1>
      <div className="flex flex-col items-center justify-between gap-5 mt-5 mb-10 xl:flex xl:flex-row">
        <Filter options={FILTER_OPTIONS} currentTab={''} setCurrentTab={() => console.log()}/>
        <Search />
      </div>
      <Voted />
    </section>
  )
}

export default Vote
