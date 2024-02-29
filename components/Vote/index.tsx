'use client'
import { useState, useEffect } from 'react'
import Deposit from '@/components/Vote/Deposit'
import VoteNow from './VoteNow/VoteNow'
import Filter from '@/components/Common/Filter'
import Search from '@/components/Common/Search'

import { DATA_ROW } from '../Liquidity/data'
import VotePools from './VoteNow/VotePools'
import SelectVote from '../Modals/SelectVote'
import Overlay from './Overlay'
import { FILTER_OPTIONS } from './data'
import HeaderRowVote from './Tables/HeaderRowVote'

const Vote = () => {
  const [currentTab, setCurrentTab] = useState('VOLATILE')
  const [activeVote, setActiveVote] = useState(false)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const filterData = DATA_ROW.filter((row) => row.type === currentTab)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <section className="relative">
      <div className="flex flex-col items-center gap-5 py-5 2xl:flex-row">
        <div className="w-full 2xl:w-3/4">
          <Deposit />
        </div>
        <VoteNow openModal={openModal} setOpenModal={setOpenModal} activeVote={activeVote} />
      </div>
      <h1 className="text-xl text-white">Select Liquidity Pools for Voting</h1>
      <div className="flex flex-col items-center justify-between gap-5 mt-5 mb-10 xl:flex xl:flex-row">
        <div className="w-full xl:w-2/3">
          <Filter options={FILTER_OPTIONS} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
        <div className="w-full xl:w-1/3">
          <Search />
        </div>
      </div>
      {activeVote && (
        <div className="mb-5">
          <h1 className="text-2xl text-white">Vote Pools</h1>
          <div className="flex flex-wrap gap-2 justify-center">
            <VotePools />
            <VotePools />
            <VotePools />
            <VotePools />
          </div>
        </div>
      )}
      <HeaderRowVote activeVote={activeVote} filterData={filterData} loading={loading} />
      <SelectVote
        activeVote={activeVote}
        setActiveVote={setActiveVote}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <div className="p-5 fixed bottom-5 left-0 right-0 z-50  md:block">{activeVote && <Overlay />}</div>
    </section>
  )
}

export default Vote
