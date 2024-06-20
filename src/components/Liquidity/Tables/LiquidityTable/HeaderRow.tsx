'use client'
import { Fragment, useEffect, useMemo, useState } from 'react'

// api
import { fetchRingsApr } from './getAprRings'

// components
import Row from './Row'
import { Pagination, PaginationMobile, TableBody, TableSkeleton } from '@/src/components/UI'
import TableHeadNew from '@/src/components/UI/Table/TableHeadNew'

// models
import { BasicPool } from '@/src/state/liquidity/types'
import SortTypes from '@/src/library/types/common/sort-types.enum'
import TableHeaderCell from '@/src/library/types/common/table-header-cell'

// personal models
interface HeaderRowProps {
  loading: boolean,
  poolsData: BasicPool[],
  activePagination?: boolean,
  titleHeader?: string,
  titleHeader2?: string,
  titleButton?: string,
  titleButton2?: string,
  activeRange?: boolean,
}

// personal constants
const HeaderCellsRaw: TableHeaderCell[] = [
  { text: 'Pair', className: 'w-[20%]' },
  { text: 'Range', className: 'w-[12%] text-center' },
  { text: 'Point Stack', className: 'w-[15%] text-right', rangeClassName: 'w-[8%] text-right' },
  { text: 'TVL', className: 'w-[13%] text-right', sortBy: 'totalValueLockedUSD' },
  { text: 'APR', className: 'w-[13%] text-right', rangeClassName: 'w-[8%] text-right', sortBy: 'aprRings' },
  { text: 'Volume', className: 'w-[13%] text-right', sortBy: 'volumeUSD' },
  { text: 'Fees', className: 'w-[13%] text-right', sortBy: 'feesUSD' },
  { text: 'Action', className: 'w-[13%] text-right' },
]

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
  // state
  const [poolsAprRing, setPoolsAprRing] = useState<{ [key: string]: string } | null>(null)
  const [itemsPerPage, setItemPerPage] = useState<number>(20)
  const [activePage, setActivePage] = useState<number>(1)
  const [sort, setSort] = useState<SortTypes | null>(null)
  const [sortBy, setSortBy] = useState<keyof BasicPool | null>(null)

  // computed
  const HeaderCells = useMemo(() => [
    HeaderCellsRaw.at(0),
    ...(activeRange ? [HeaderCellsRaw.at(1)] : []),
    ...HeaderCellsRaw.slice(2, -3).map(
      (cell) => ({
        ...cell,
        ...((activeRange && cell.rangeClassName) ? { className: cell.rangeClassName } : {})
      })
    ),
    { ...HeaderCellsRaw.at(-3), text: titleHeader || HeaderCellsRaw.at(-3)!.text },
    { ...HeaderCellsRaw.at(-2), text: titleHeader2 || HeaderCellsRaw.at(-2)!.text },
    HeaderCellsRaw.at(-1),
  ] as TableHeaderCell[], [activeRange, titleHeader, titleHeader2])
  const sortedMappedTableData: BasicPool[] = useMemo(() => {
    const mappedData = poolsData.map((item) => ({
      ...item,
      aprRings: (+(poolsAprRing?.[item.id] ?? 0) + +(isNaN(+item.apr!) ? 0 : item.apr ?? 0)).toString(),
    }))

    if (!(sortBy && sort && mappedData[0][sortBy])) {
      return mappedData
    }

    return mappedData.sort((a, b) => (+a[sortBy]! - +b[sortBy]!) * sort)
  }, [poolsData, poolsAprRing, sortBy, sort])
  const pageData = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(sortedMappedTableData.length / itemsPerPage))

    // Ensure current page isn't out of range
    const start = (Math.min(activePage, totalPages) - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedMappedTableData.slice(start, end)
  }, [sortedMappedTableData, itemsPerPage, activePage])

  // helpers
  function toggleSort(sortBy: keyof BasicPool | null, sort: SortTypes | null): void {
    setSortBy(sortBy)
    setSort(sort)
  }

  // async helpers
  async function loadAprRings(): Promise<void> {
    setPoolsAprRing(await fetchRingsApr())
  }

  // lifecycle hooks
  useEffect(() => {
    loadAprRings()
  }, [])

  return (
    <div className="relative">
      <div className="mb-2.5 w-full xl:mb-5">
        <div className="hidden lg:block">
          <TableHeadNew items={HeaderCells} sort={sort} sortBy={sortBy} setSort={toggleSort} />
        </div>

        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <TableSkeleton key={index} />
              ))
            : pageData.map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  tokensData={null}
                  activeRange={activeRange}
                  titleHeader={titleHeader}
                  titleHeader2={titleHeader2}
                  titleButton={titleButton}
                  titleButton2={titleButton2}
                />
              ))}
        </TableBody>
      </div>

      {activePagination
        ? (
            <>
              <div className="hidden items-center lg:flex">
                <Pagination
                  itemsPerPage={itemsPerPage}
                  setItemPerPage={setItemPerPage}
                  activePage={activePage}
                  setActivePage={setActivePage}
                  className="mx-auto"
                  numberPages={Math.ceil(poolsData.length / itemsPerPage)}
                />
              </div>
              <div className="py-5 lg:hidden">
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
          )
        : null}
    </div>
  )
}

export default HeaderRow
