'use client'
import { useState, useEffect } from 'react'
import Search from '@/src/components/Common/Search'
import { DATA_ROW } from '../Liquidity/data'
import VotePools from '@/src/components/Vote/VoteNow/VotePools'
import SelectVote from '../Modals/SelectVote'
import RewardBox from './RewardBox'
import RewardNow from './RewardNow'
import HeaderRowReward from './Tables/HeaderRowReward'

const Rewards = () => {
  const [activeVote, setActiveVote] = useState(true)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  // const filterData = DATA_ROW.filter((row) => row.type === currentTab)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <section className="relative">
      <div className="flex flex-col items-center gap-5 py-5 xl:flex-row">
        <div className="w-full xl:w-[60%]">
          <RewardBox />
        </div>
        <div className="w-full xl:w-[40%]">
          <RewardNow openModal={openModal} setOpenModal={setOpenModal} activeVote={activeVote} />
        </div>
      </div>
      <h1 className="text-xl font-medium text-white">Rewards overview</h1>
      <div className="flex flex-col items-center justify-between gap-5 mt-5 mb-10 xl:flex xl:flex-row">
        <div className="w-full ">
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
      </div>
      <HeaderRowReward activeVote={activeVote} filterData={[]} loading={loading} />
      <SelectVote
        activeVote={activeVote}
        setActiveVote={setActiveVote}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      <div className="p-5 mx-auto fixed bottom-4 z-50 left-0 xl:w-1/2 right-0 md:block"></div>
    </section>
  )
}

export default Rewards
