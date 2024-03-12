'use client'
import { Fragment, useState } from 'react'
import { TableSkeleton, TableBody, TableHead, PaginationMobile } from '@/src/components/UI'
import { Pagination } from '@/src/components/UI'
import RowReward from './RowReward'
import NotFoundLock from '../../Lock/NotFoundLock'

type filterData = {
  type: string
  APR: string
}

interface HeaderRowRewardProps {
  loading: boolean
  filterData: filterData[]
  activeVote: boolean
  activePagination?: boolean
  activeSlider?: boolean
}

const HeaderRowReward = ({
  activeVote,
  filterData,
  loading,
  activePagination = true,
  activeSlider = true,
}: HeaderRowRewardProps) => {
  const [showTooltip, setShowTooltip] = useState(false)
  console.log(activeVote)
  return (
    <div className="relative z-10">
      <div className="w-full mb-2.5 xl:mb-5">
        <div className="max-xl:hidden">
          <TableHead
            items={[
              { text: 'Pairs', className: 'w-[50%]', sortable: true },
              { text: 'Rewards', className: 'text-center  w-[20%]', sortable: true },
              { text: 'Action', className: 'w-[30%] text-right', sortable: true },
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
            <>
              {activeVote &&
                filterData.map((row, index) => (
                  <Fragment key={index}>
                    <RowReward row={row} activeVote={activeVote} activeSlider={activeSlider} />
                  </Fragment>
                ))}

              {!activeVote && <NotFoundLock info={'You have not selected any veFNX yet.'} />}
            </>
          )}
        </TableBody>
      </div>
      {activePagination && (
        <>
          <div className="items-center hidden xl:flex">
            <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p>
            <Pagination className="mx-auto" numberPages={7} />
            <div className="flex items-center justify-center cursor-pointer w-12 h-12 px-4 transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400">
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

export default HeaderRowReward
