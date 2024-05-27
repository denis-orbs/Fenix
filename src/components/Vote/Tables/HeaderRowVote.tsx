'use client'
import { Fragment, useEffect, useState } from 'react'
import { TableSkeleton, TableBody, TableHead, PaginationMobile } from '@/src/components/UI'
import { Pagination } from '@/src/components/UI'
import RowDataVote from './RowVote'
import { useDispatch } from 'react-redux'
import { AppThunkDispatch, useAppDispatch, useAppSelector } from '@/src/state'
import { setvotes, setpercentage, fetchGaugesAsync } from '@/src/state/vote/reducer'
import { useAccount } from 'wagmi'
import { voteState } from '@/src/state/vote/types'
import { lockState } from '@/src/state/lock/types'
import NotFoundLock from '../../Lock/NotFoundLock'
import { VoteTableElement } from '..'
import NotFoundGauges from '../NotFoundGauges'

interface HeaderRowVoteProps {
  loading: boolean
  filterData: VoteTableElement[]
  activeVote: boolean
  activePagination?: boolean
  activeSlider?: boolean
  setVotePercentage: (value: Number) => void
  vote: voteState
  lock: lockState
}

const HeaderRowVote = ({
  activeVote,
  filterData,
  loading,
  activePagination = true,
  activeSlider = true,
  setVotePercentage,
  vote,
  lock,
}: HeaderRowVoteProps) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [voteValue, setVoteValue] = useState<Number>(0)
  const [selectedRanges, setSelectedRanges] = useState<number[]>([])

  // Function to handle when a subcomponent updates its range
  const handleRangeUpdate = (index: number, value: number) => {
    const newRanges = [...selectedRanges]
    newRanges[index] = value
    setSelectedRanges(newRanges)
    setVoteValue(newRanges.reduce((a, b) => a + b, 0))
    setVotePercentage(newRanges.reduce((a, b) => a + b, 0))
  }

  return (
    <div className="relative z-10">
      <div className="w-full mb-2.5 xl:mb-5">
        <div className="max-xl:hidden">
          <TableHead
            items={[
              { text: 'Assets', className: 'w-[30%] text-xs', sortable: true },
              { text: 'APR', className: 'text-center  w-[10%] text-xs', sortable: true },
              { text: 'Total Votes', className: 'w-[15%] text-right text-xs', sortable: true },
              { text: 'Your Votes', className: 'w-[15%] text-right text-xs', sortable: true },
              {
                text: 'Total Rewards',
                className: 'w-[10%] text-right text-xs',
                sortable: true,
                showTooltip: showTooltip,
                setShowTooltip: setShowTooltip,
              },
              { text: 'Vote', className: 'w-[20%] text-right text-xs', sortable: true },
            ]}
            setSort={() => {}}
            sort={null}
            setSortIndex={() => {}}
            sortIndex={1}
          />
        </div>
        {vote.voteTableElement ? (
          <>
            <TableBody>
              {vote.appState == 'loading' ? (
                <>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableSkeleton key={index} />
                  ))}
                </>
              ) : (
                vote.voteTableElement.map((row, index) => (
                  <Fragment key={index}>
                    <RowDataVote
                      index={index}
                      row={row}
                      activeVote={activeVote}
                      activeSlider={activeSlider}
                      setVoteValue={setVoteValue}
                      onRangeUpdate={handleRangeUpdate}
                    />
                    {/* <RowDataVote row={row} activeVote={activeVote} /> */}
                  </Fragment>
                ))
              )}
            </TableBody>
            {activePagination && (
              <>
                <div className="items-center hidden xl:flex py-4">
                  {/* <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p> */}
                  <Pagination
                    className="mx-auto"
                    numberPages={7}
                    activePage={1}
                    setActivePage={() => {}}
                    itemsPerPage={10}
                    setItemPerPage={() => {}}
                  />
                </div>
                <div className="block xl:hidden py-4">
                  {/* <PaginationMobile
                    className=""
                    numberPages={7}
                    count={10}
                    activePage={1}
                    setActivePage={() => {}}
                    itemsPerPage={10}
                    setItemPerPage={() => {}}
                  /> */}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <NotFoundGauges />
          </>
        )}
      </div>
      {activePagination && (
        <>
          <div className="items-center hidden xl:flex">
            {/* <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p> */}
            {/* <Pagination
              className="mx-auto"
              numberPages={7}
              activePage={1}
              setActivePage={() => {}}
              itemsPerPage={10}
              setItemPerPage={() => {}}
            /> */}
            {/* <div
              className="flex items-center justify-center
      cursor-pointer w-12 h-12 px-4 transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400"
            >
              <span className="text-lg icon-cog text-white"></span>
            </div> */}
          </div>
          <div className="block xl:hidden">
            {/* <PaginationMobile
              className=""
              numberPages={7}
              count={10}
              activePage={1}
              setActivePage={() => {}}
              itemsPerPage={10}
              setItemPerPage={() => {}}
            /> */}
          </div>
        </>
      )}
    </div>
  )
}

export default HeaderRowVote
