'use client'

import { useState } from 'react'

export interface ITableHeadItems {
  text: string
  sortable?: boolean
  className?: string
}

const TableHead = ({
  items,
  onClickSort,
}: {
  items: ITableHeadItems[]
  // eslint-disable-next-line no-unused-vars
  onClickSort?: ({ index, sort }: { index: number; sort: 'asc' | 'desc' }) => void
}) => {
  const [sort, setSort] = useState<'asc' | 'desc' | null>(null)
  const [sortIndex, setSortIndex] = useState<number | null>(null)

  const handleSort = (index: number) => {
    const newSort = sort === 'asc' ? 'desc' : 'asc'

    setSort(newSort)
    setSortIndex(index)

    onClickSort &&
      onClickSort({
        index,
        sort: newSort,
      })
  }

  return (
    <div className="flex text-white justify-between text-sm mb-3.5 px-1.5">
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className={`p-2.5 basis-[100%] flex-grow ${item.sortable ? 'cursor-pointer relative select-none' : ''} ${
              item.className
            }`}
            onClick={item.sortable ? () => handleSort(index) : undefined}
          >
            <span className="leading-normal">{item.text}</span>
            {item.sortable && (
              <span
                className={`icon-chevron text-[11px] inline-block ml-2 ${sort === 'asc' ? '-scale-y-100' : ''} ${sortIndex === index ? '' : 'opacity-0'}`}
              ></span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default TableHead
