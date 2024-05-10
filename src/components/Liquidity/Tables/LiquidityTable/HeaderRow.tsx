import { Button, Pagination, PaginationMobile, TableBody, TableHead, TableSkeleton } from '@/src/components/UI'
import { BasicPool, PoolData } from '@/src/state/liquidity/types'
import { Fragment, useEffect, useState } from 'react'
import Row from './Row'
import { fetchTokens } from '@/src/library/common/getAvailableTokens'
import { useAccount, useChainId, useChains } from 'wagmi'
import { useWindowSize } from 'usehooks-ts'
import { isSupportedChain } from '@/src/library/constants/chains'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'

interface HeaderRowProps {
  loading: boolean
  poolsData: BasicPool[]
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
  // const tokensData = fetchTokens()
  const [itemsPerPage, setItemPerPage] = useState<any>(20)
  const [activePage, setActivePage] = useState<number>(1)
  const [isOpenItemsPerPage, setIsOpenItemsPerPage] = useState(false)
  const [paginationResult, setPaginationResult] = useState<BasicPool[]>(poolsData)
  const [sort, setSort] = useState<'asc' | 'desc' | null>(null)
  const [paginationStatus, setPaginationStatus] = useState<boolean>(false)
  const [sortIndex, setSortIndex] = useState<number>(-1)

  const RANGE = activeRange
    ? { text: 'Range', className: 'w-[12%] text-center', sortable: true }
    : { text: '', className: 'w-[0px] !p-0', sortable: true }

  function paginate(items: BasicPool[], currentPage: number, itemsPerPage: number) {
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
  const { isConnected } = useActiveConnectionDetails()

  useEffect(() => {
    if (paginationResult && paginationResult.length > 0) {
      if (sort === 'asc') {
        const sortedPaginationResult = [...paginationResult]
        const sortArr = sortedPaginationResult.sort((a, b) => {
          return compareBigDecimal(Number(a.totalValueLockedUSD), Number(b.totalValueLockedUSD))
        })
        setPaginationResult([...sortArr])
      } else {
        const sortedPaginationResult = [...paginationResult]
        const sortArr = paginationResult.sort((a, b) => {
          return compareBigDecimal(Number(b.totalValueLockedUSD), Number(a.totalValueLockedUSD))
        })
        setPaginationResult([...sortArr])
      }
    }
  }, [sort, chainId])

  useEffect(() => {
    setPaginationResult(poolsData)
  }, [poolsData])

  /* useEffect(() => {
    if (paginationStatus && paginationResult && paginationResult.length > 0) {
      // setSort('asc')
      setPaginationResult(
        paginationResult.sort((a, b) => {
          return compareBigDecimal(Number(b.totalValueLockedUSD), Number(a.totalValueLockedUSD))
        })
      )
    }
  }, [paginationStatus, paginationResult]) */

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
                className: `${activeRange ? 'w-[20%]' : 'w-[20%]'}`,
                sortable: true,
              },
              RANGE,
              { text: 'Point Stack', className: `${activeRange ? 'w-[8%]' : 'w-[20%]'} text-right` },
              { text: 'APR', className: `${activeRange ? 'w-[8%]' : 'w-[10%]'} text-right`, sortable: true },
              // { text: 'TVL', className: 'w-[10%] text-right', sortable: true },
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
              { text: 'Action', className: 'w-[20%] flex justify-end', sortable: false },
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
          ) : (
            pagination.map((row, index) => (
              <Fragment key={index}>
                <Row
                  row={row}
                  tokensData={null}
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
          <div className="items-center hidden lg:flex">
            <Pagination
              itemsPerPage={itemsPerPage}
              setItemPerPage={setItemPerPage}
              activePage={activePage}
              setActivePage={setActivePage}
              className="mx-auto"
              numberPages={Math.ceil(poolsData.length / itemsPerPage)}
            />
          </div>
          <div className="lg:hidden py-5">
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
