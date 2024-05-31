'use client'
import { Fragment, useState } from 'react'
import { TableSkeleton, TableBody, TableHead, PaginationMobile } from '@/src/components/UI'
import { Pagination } from '@/src/components/UI'
import RowReward from './RowReward'
import NotFoundLock from '../../../Lock/NotFoundLock'

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
  return (
    <div className="relative z-10">
      <div className="w-full mb-2.5 xl:mb-5">
        <div className="max-xl:hidden">
          <TableHead
            items={[
              { text: 'Pairs', className: 'w-[50%] text-xs', sortable: true },
              { text: 'Rewards', className: 'text-center  w-[20%] text-xs', sortable: true },
              { text: 'Action', className: 'w-[30%] text-right text-xs', sortable: true },
            ]}
            setSort={() => {}}
            sort={null}
            setSortIndex={() => {}}
            sortIndex={1}
          />
        </div>

        {filterData.length !== 0 ? (
          <>
            <TableBody className="h-[350px] overflow-y-scroll">
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
                  <PaginationMobile
                    numberPages={7}
                    activePage={1}
                    setActivePage={() => {}}
                    itemsPerPage={10}
                    setItemPerPage={() => {}}
                    className=""
                    count={7}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <NotFoundLock />
          </>
        )}
      </div>
    </div>
  )
}

export default HeaderRowReward
