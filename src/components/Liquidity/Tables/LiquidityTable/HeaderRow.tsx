import { Pagination, PaginationMobile, TableBody, TableHead, TableSkeleton } from '@/src/components/UI'
import { PoolData } from '@/src/state/liquidity/types'
import { Fragment, useEffect } from 'react'
import Row from './Row'
import { fetchTokens } from '@/src/library/common/getAvailableTokens'
import { useAppSelector } from '@/src/state'

interface HeaderRowProps {
  loading: boolean
  poolsData: PoolData[]
  activePagination?: boolean
  titleHeader?: string
  titleHeader2?: string
  titleButton?: string
  titleButton2?: string
  activeRange?: boolean
}

const HeaderRow = ({
  poolsData,
  loading,
  activePagination = true,
  titleHeader = '',
  titleButton = '',
  titleButton2 = '',
  titleHeader2 = '',
  activeRange = false,
}: HeaderRowProps) => {
  const tokensData = fetchTokens()

  const RANGE = activeRange
    ? { text: 'Range', className: 'w-[12%] text-center', sortable: true }
    : { text: '', className: 'w-[0%]', sortable: true }
  return (
    <div className="relative">
      <div className="w-full mb-2.5 xl:mb-5">
        <div className="hidden 2xl:block">
          <TableHead
            items={[
              { text: 'Pair', className: `${activeRange ? 'w-[20%]' : 'w-[30%]'}`, sortable: true },
              RANGE,
              { text: 'APR', className: `${activeRange ? 'w-[8%]' : 'w-[10%]'} text-center`, sortable: true },
              { text: 'TVL', className: 'w-[15%] text-right', sortable: true },
              {
                text: `${titleHeader === '' ? 'Volume' : titleHeader}`,
                className: 'w-[15%] text-right',
                sortable: true,
              },
              // { text: 'Volume', className: 'w-[15%] text-right', sortable: true },
              {
                text: `${titleHeader2 === '' ? 'Fees' : titleHeader2}`,
                className: 'w-[15%] text-right',
                sortable: true,
              },
              { text: 'Action', className: 'w-[15%] text-right', sortable: true },
            ]}
          />
        </div>

        <TableBody>
          {loading ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableSkeleton key={index} />
              ))}
            </>
          ) : (
            poolsData.map((row, index) => (
              <Fragment key={index}>
                <Row
                  row={row}
                  tokensData={tokensData}
                  activeRange={activeRange}
                  titleHeader={titleHeader}
                  titleHeader2={titleHeader2}
                  titleButton={titleButton}
                  titleButton2={titleButton2}
                />
              </Fragment>
            ))
          )}
        </TableBody>
      </div>

      {activePagination && (
        <>
          <div className="items-center hidden xl:flex">
            {/* <p className="text-sm text-shark-100">Showing 2 out of 2 migrations...</p> */}
            <Pagination className="mx-auto" numberPages={7} />
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 px-4 transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400">
              <span className="text-lg icon-cog text-white cursor-pointer"></span>
            </div>
          </div>
          <div className="xl:hidden">
            <PaginationMobile />
          </div>
        </>
      )}
    </div>
  )
}

export default HeaderRow
