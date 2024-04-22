import { Button, Pagination, PaginationMobile, TableBody, TableHead, TableSkeleton } from '@/src/components/UI'
import { PoolData } from '@/src/state/liquidity/types'
import { Fragment, useEffect, useState } from 'react'
import Row from './Row'
import { fetchTokens } from '@/src/library/common/getAvailableTokens'
import { useAccount, useChainId, useChains } from 'wagmi'
import { useWindowSize } from 'usehooks-ts'

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
  const [paginationResult, setPaginationResult] = useState<PoolData[]>(poolsData)
  const [sort, setSort] = useState<'asc' | 'desc' | null>(null)
  const [paginationStatus, setPaginationStatus] = useState<boolean>(false)
  const [sortIndex, setSortIndex] = useState<number>(0)

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

  const { chainId } = useAccount()
  const activeChain = useChains()

  useEffect(() => {
    if (paginationStatus && paginationResult && paginationResult.length > 0) {
      if (sort === 'asc') {
        setPaginationResult(
          paginationResult.sort((a, b) => {
            return compareBigDecimal(Number(a.pairDetails.tvl), Number(b.pairDetails.tvl))
          })
        )
      } else {
        setPaginationResult(
          paginationResult.sort((a, b) => {
            return compareBigDecimal(Number(b.pairDetails.tvl), Number(a.pairDetails.tvl))
          })
        )
      }
    } else {
      setPaginationStatus(true)
    }
  }, [sort, chainId])

  useEffect(() => {
    setPaginationResult(poolsData)
  }, [poolsData])

  function compareBigDecimal(a: any, b: any) {
    return a - b
  }
  const pagination = paginate(paginationResult, activePage, itemsPerPage)
  const { width } = useWindowSize()
  return (
    <div className="relative">
      <div className="w-full mb-2.5 xl:mb-5">
        <div className="hidden lg:block">
          <TableHead
            items={[
              {
                text: 'Pair',
                className: `${activeRange ? 'w-[20%]' : width >= 1300 ? 'w-[30%]' : 'w-[27%]'}`,
                sortable: true,
              },
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
              { text: 'Action', className: 'w-[15%] text-right', sortable: false },
            ]}
            setSort={setSort}
            sort={sort}
            sortIndex={sortIndex}
            setSortIndex={setSortIndex}
          />
        </div>

        <TableBody>
          {loading ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableSkeleton key={index} />
              ))}
            </>
          ) : chainId?.toString() === process.env.NEXT_PUBLIC_CHAINID ? (
            pagination.map((row, index) => (
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
          ) : (
            <div>
              <br></br>
              <br></br>
              <br></br>
              <div className="flex flex-col items-center justify-center mb-4">
                <h1 className="mb-2 text-xl font-bold text-center text-white">
                  You are in the wrong network/ Wallet not connected
                </h1>
                <p className="text-sm text-shark-100 w-[261px] text-center">
                  Please switch to Blast Network to use Fenix Protocol.
                </p>
              </div>
              <br></br>
              <br></br>
            </div>
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
                  className="w-[68px] p-2 flex flex-col gap-1 rounded-[10px] bg-shark-400 bg-opacity-40 absolute right-55px bottom-0 -translate-y-16"
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
