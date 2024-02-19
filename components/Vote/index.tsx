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
      <div className="flex flex-col xl:flex xl:flex-row items-center gap-5 p-5">
        <Deposit />
       <VoteNow/>
      </div>
      <h1 className='text-white text-xl'>
      Select Liquidity Pools for Voting
      </h1>
      <div className='flex flex-col xl:flex xl:flex-row items-center justify-between gap-5 mb-10 mt-5'>
      
      <Filter Options={FILTER_OPTIONS} />
        <Search />
        </div>
      <Voted />
    </section>
  )
}

export default Vote
