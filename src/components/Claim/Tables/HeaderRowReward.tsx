'use client'
import { Fragment, useEffect, useState } from 'react'
import { TableSkeleton, TableBody, TableHead, PaginationMobile } from '@/src/components/UI'
import { Pagination } from '@/src/components/UI'
import RowReward from './RowReward'
import NotFoundLock from '../../Lock/NotFoundLock'

interface HeaderRowRewardProps {
  loading: boolean
  filterData: any[]
  activePagination?: boolean
  activeSlider?: boolean
  search: string
}

const HeaderRowReward = ({
  filterData,
  loading,
  activePagination = true,
  activeSlider = true,
  search,
}: HeaderRowRewardProps) => {
  const [showTooltip, setShowTooltip] = useState(false)
  // const [data, setData] = useState<any[]>(filterData)

  // useEffect(() => {
  //   if(search.length > 0) {
  //     const filterArr = filterData.filter(item => {
  //       if(item.token.includes(search)){
  //         return item
  //       }
  //     })
  //     if(filterArr.length) {
  //       setData(filterArr)
  //     }
  //   }
  // },[search])

  return (
    <div className="relative z-10">
      <div className="w-full mb-2.5 xl:mb-5">
        <div className="max-xl:hidden">
          <TableHead
            items={[
              { text: 'Pairs', className: 'w-[40%] text-xs', sortable: true },
              { text: 'Rewards', className: 'text-center  w-[15%] text-xs', sortable: true },
              { text: 'Claimed', className: 'text-center  w-[15%] text-xs', sortable: true },
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
                  {filterData.map((row, index) => (
                    <Fragment key={index}>
                      <RowReward index={index} row={row} activeSlider={activeSlider} />
                    </Fragment>
                  ))}

                  {/* { <NotFoundLock info={'You have not selected any veFNX yet.'} />} */}
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
