/* eslint-disable no-console */
'use client'
import { useState, useEffect, Fragment } from 'react'
import Deposit from '@/components/Vote/Deposit'
import VoteNow from './VoteNow/VoteNow'
import Filter from '@/components/Common/Filter'
import Search from '@/components/Common/Search'
import { TableSkeleton, TableBody, TableHead, PaginationMobile } from '@/components/UI'
import { Pagination } from '@/components/UI'
import RowDataVote from './Tables/RowVote'
import { DATA_ROW } from '../Liquidity/data'
import VotePools from './VoteNow/VotePools'
import SelectVote from '../Modals/SelectVote'
import Overlay from './Overlay'
import { FILTER_OPTIONS } from './data'

const Vote = () => {
  const [currentTab, setCurrentTab] = useState('VOLATILE')
  const [activeVote, setActiveVote] = useState(false)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const filterData = DATA_ROW.filter((row) => row.type === currentTab)
  const [showTooltip, setShowTooltip] = useState(false)
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
      <div className="relative">
        <div className="w-full mb-2.5 xl:mb-10">
          <div className="max-xl:hidden">
            <TableHead
              items={[
                { text: 'Assets', className: 'w-[30%]', sortable: true },
                { text: 'APR', className: 'text-center  w-[10%]', sortable: true },
                { text: 'Your Votes', className: 'w-[20%] text-right', sortable: true },
                {
                  text: 'Total Rewards',
                  className: 'w-[20%] text-right',
                  sortable: true,
                  showTooltip: showTooltip,
                  setShowTooltip: setShowTooltip,
                },
                { text: 'Vote', className: 'w-[20%] text-right', sortable: true },
              ]}
            />
          </div>

          <TableBody>
            {loading ? (
              <>
                {Array.from({ length: filterData.length }).map((_, index) => (
                  <TableSkeleton key={index} />
                ))}
              </>
            ) : (
              filterData.map((row, index) => (
                <Fragment key={index}>
                  <RowDataVote row={row} activeVote={activeVote} />
                  <RowDataVote row={row} activeVote={activeVote} />
                </Fragment>
              ))
            )}
          </TableBody>
        </div>
        <div className="items-center hidden xl:flex">
          <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p>
          <Pagination className="mx-auto" numberPages={7} />
          <div
            className="flex items-center justify-center
          cursor-pointer w-12 h-12 px-4 transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400"
          >
            <span className="text-lg icon-cog text-white"></span>
          </div>
        </div>
        <div className="block xl:hidden">
          <PaginationMobile />
        </div>
      </div>

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
