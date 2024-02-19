/* eslint-disable max-len */
'use client'
import { Fragment, useEffect, useState } from 'react'

import Deposit from '@/components/Liquidity/Deposit'
import Steps from '@/components/Common/Steps'
import Filter from '../Common/Filter'
import Search from '../Common/Search'
import { STEPS } from './data'
import { TableHead, TableBody,  Pagination } from '../UI'
import RowSkeleton from './RowSkeleton'
import { OPTIONS_FILTER } from './data'
import RowData from './Tables/Row'
import PaginationMobile from '../UI/Pagination/PaginationMobile'
import { DATA_ROW } from './data'

const Liquidity = () => {
  const [currentTab, setCurrentTab] = useState<string>("CONCENTRATED")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  const filterData = currentTab !== "ALL POOLS" ? DATA_ROW.filter(row => row.type === currentTab) : DATA_ROW

  return (
    <section className="my-5 xl:my-10">
      <div className="flex items-center gap-10 justify-around flex-col xl:flex-row mb-10 xl:h-[450px]">
        <Deposit />
        <Steps steps={STEPS} />
      </div>
      <h5 className="mb-4 text-lg text-white">Liquidity Pools</h5>

      <div className="flex flex-col justify-between gap-5 mb-10 md:items-center xl:flex-row">
        <Filter Options={OPTIONS_FILTER} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <div className="xl:w-1/3">
          <Search />
        </div>
      </div>

      <div className="relative">
        <div className="w-full mb-2.5 xl:mb-10">
          <div className="max-xl:hidden">
            <TableHead
              items={[
                { text: 'Pair', className: 'w-[30%]', sortable: true },
                { text: 'APR', className: 'text-center  w-[10%]', sortable: true },
                { text: 'TVL', className: 'w-[15%] text-right', sortable: true },
                { text: 'Volume', className: 'w-[15%] text-right', sortable: true },
                // { text: 'Volume', className: 'w-[15%] text-right', sortable: true },
                { text: 'Fees', className: 'w-[15%] text-right', sortable: true },
                { text: 'Action', className: 'w-[15%] text-right', sortable: true },
              ]}
            />
          </div>

          <TableBody>
            {loading ? (
              <>
                {Array.from({ length: filterData.length }).map((_, index) => (
                  <RowSkeleton key={index} />
                ))}
              </>
            ) : (
              filterData.map((row, index) => (
                <Fragment key={index}>
                  <RowData row={row} />
                </Fragment>
              ))
            )}
          </TableBody>
        </div>
        <div className="items-center hidden xl:flex">
          <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p>
          <Pagination className="mx-auto" numberPages={7} />
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 px-4 text-white transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400">
            <span className="text-lg icon-cog"></span>
          </div>
        </div>
        <div className='xl:hidden'>
          <PaginationMobile />
        </div>
      </div>
    </section>
  )
}

export default Liquidity
