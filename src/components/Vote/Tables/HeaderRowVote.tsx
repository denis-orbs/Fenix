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

type filterData = {
  type: string
  APR: string
}

interface HeaderRowVoteProps {
  loading: boolean
  filterData: filterData[]
  activeVote: boolean
  activePagination?: boolean
  activeSlider?: boolean
}

const HeaderRowVote = ({
  activeVote,
  filterData,
  loading,
  activePagination = true,
  activeSlider = true,
}: HeaderRowVoteProps) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [selectedRanges, setSelectedRanges] = useState<number[]>([])
  const { address } = useAccount()
  const dispatch = useDispatch<AppThunkDispatch>()
  const vote = useAppSelector((state) => state.vote as voteState)
  const lock = useAppSelector((state) => state.lock as lockState)
  // console.log(
  //   vote.voteTableElement.map((row) => row.pair.pair_address),
  //   'voteTableElement'
  // )

  useEffect(() => {
    if (address) dispatch(fetchGaugesAsync(address))
  }, [address, lock])

  // Function to handle when a subcomponent updates its range
  const handleRangeUpdate = (index: number, value: number) => {
    const newRanges = [...selectedRanges]
    newRanges[index] = value
    setSelectedRanges(newRanges)
    dispatch(setpercentage(newRanges.reduce((a, b) => a + b, 0)))
    dispatch(setvotes(newRanges))
  }

  return (
    <div className="relative z-10">
      <div className="w-full mb-2.5 xl:mb-5">
        <div className="max-xl:hidden">
          <TableHead
            items={[
              { text: 'Assets', className: 'w-[30%]', sortable: true },
              { text: 'APR', className: 'text-center  w-[10%]', sortable: true },
              { text: 'Your Votes', className: 'w-[10%] text-right', sortable: true },
              {
                text: 'Total Rewards',
                className: 'w-[30%] text-right',
                sortable: true,
                showTooltip: showTooltip,
                setShowTooltip: setShowTooltip,
              },
              { text: 'Vote', className: 'w-[20%] text-right', sortable: true },
            ]}
          />
        </div>

        <TableBody>
          {vote.appState == 'loading' ? (
            <>
              {Array.from({ length: filterData.length }).map((_, index) => (
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
                  onRangeUpdate={handleRangeUpdate}
                />
                {/* <RowDataVote row={row} activeVote={activeVote} /> */}
              </Fragment>
            ))
          )}
        </TableBody>
      </div>
      {activePagination && (
        <>
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
        </>
      )}
    </div>
  )
}

export default HeaderRowVote
