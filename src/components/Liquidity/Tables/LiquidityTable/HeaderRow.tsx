import { Button, Pagination, PaginationMobile, TableBody, TableHead, TableSkeleton } from '@/src/components/UI'
import { PoolData } from '@/src/state/liquidity/types'
import { Fragment, useEffect, useState } from 'react'
import Row from './Row'
import { fetchTokens } from '@/src/library/common/getAvailableTokens'

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
  const [itemsPerPage, setItemPerPage] = useState<any>(5)
  const [activePage, setActivePage] = useState<number>(1)
  const [isOpenItemsPerPage, setIsOpenItemsPerPage] = useState(false)

  const RANGE = activeRange
    ? { text: 'Range', className: 'w-[12%] text-center', sortable: true }
    : { text: '', className: 'w-[0%]', sortable: true }

  function paginate(items: PoolData[], currentPage: number, itemsPerPage: number) {
    // Calculate total pages
    const totalPages = Math.ceil(items.length / itemsPerPage)

    // Ensure current page isn't out of range
    currentPage = Math.max(1, Math.min(currentPage, totalPages))

    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    const paginatedItems = items.slice(start, end)

    return paginatedItems
  }

  const paginationResult = paginate(poolsData, activePage, itemsPerPage)

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
                text: titleHeader === '' ? 'Volume' : titleHeader,
                className: 'w-[15%] text-right',
                sortable: true,
              },
              // { text: 'Volume', className: 'w-[15%] text-right', sortable: true },
              {
                text: titleHeader2 === '' ? 'Fees' : titleHeader2,
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
            paginationResult.map((row, index) => (
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
            <Pagination
              activePage={activePage}
              setActivePage={setActivePage}
              className="mx-auto"
              numberPages={Math.ceil(poolsData.length / itemsPerPage)}
            />
            <div
              onClick={() => setIsOpenItemsPerPage(!isOpenItemsPerPage)}
              className="flex items-center justify-center flex-shrink-0 w-12 h-12 px-4 transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400"
            >
              {isOpenItemsPerPage && (
                <div
                  className="w-[68px] p-2 flex flex-col gap-1 rounded-[10px] bg-shark-400 bg-opacity-40 absolute right-55px bottom-0 translate-x-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button onClick={() => setItemPerPage(5)} variant="tertiary" className="!py-1 !h-[33px] !text-xs">
                    5
                  </Button>
                  <Button onClick={() => setItemPerPage(10)} variant="tertiary" className="!py-1 !h-[33px] !text-xs">
                    10
                  </Button>
                  <Button onClick={() => setItemPerPage(20)} variant="tertiary" className="!py-1 !h-[33px] !text-xs">
                    20
                  </Button>
                  <Button onClick={() => setItemPerPage(50)} variant="tertiary" className="!py-1 !h-[33px] !text-xs">
                    50
                  </Button>
                  <Button onClick={() => setItemPerPage(100)} variant="tertiary" className="!py-1 !h-[33px] !text-xs">
                    100
                  </Button>
                </div>
              )}
              <span className="text-lg icon-cog text-white cursor-pointer"></span>
            </div>
          </div>
          <div className="xl:hidden">
            <PaginationMobile
              count={poolsData.length}
              itemsPerPage={itemsPerPage}
              setItemPerPage={setItemPerPage}
              activePage={activePage}
              setActivePage={setActivePage}
              className="mx-auto"
              numberPages={Math.ceil(poolsData.length / itemsPerPage)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default HeaderRow
