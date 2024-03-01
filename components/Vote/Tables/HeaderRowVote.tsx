'use client'
import { Fragment, useState } from 'react'
import { TableSkeleton, TableBody, TableHead, PaginationMobile } from '@/components/UI'
import { Pagination } from '@/components/UI'
import RowDataVote from './RowVote'

type filterData = {
  type: string
  APR: string
}

interface HeaderRowVoteProps {
  loading: boolean
  filterData: filterData[]
  activeVote: boolean
  activePagination?: boolean
  activeSlider?:boolean
}

const HeaderRowVote = ({ activeVote, filterData, loading, activePagination = true, activeSlider = true }: HeaderRowVoteProps) => {
  const [showTooltip, setShowTooltip] = useState(false)

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
          {loading ? (
            <>
              {Array.from({ length: filterData.length }).map((_, index) => (
                <TableSkeleton key={index} />
              ))}
            </>
          ) : (
            filterData.map((row, index) => (
              <Fragment key={index}>
                <RowDataVote row={row} activeVote={activeVote} activeSlider={activeSlider} />
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
