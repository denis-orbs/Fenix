'use client'

import { useState } from 'react'
import cn from '@/utils/cn'

interface IItems {
  text: string
  sortable?: boolean
  className?: string
}
interface TableHeadProps {
  items: IItems[]
}

const TableHead = ({ items }: TableHeadProps) => {
  const [sort, setSort] = useState<'asc' | 'desc' | null>(null)
  const [sortIndex, setSortIndex] = useState<number | null>(null)

  const handleSort = (index: number, items: IItems) => {
    const newSort = sort === 'asc' ? 'desc' : 'asc'

    if (items.sortable) {
      setSort(newSort)
      setSortIndex(index)
    }
  }

  const mergeClassName = (item: IItems) => {
    return cn(
      'p-2.5 basis-[100%] flex-grow text-right',
      item.sortable ? 'cursor-pointer relative select-none' : '',
      item.className
    )
  }

  const sortClassName = (item: IItems, index: number) => {
    return cn(
      'icon-chevron text-[11px] inline-block ml-2',
      sort === 'asc' ? '-scale-y-100' : '',
      sortIndex === index ? '' : 'opacity-0'
    )
  }

  return (
    <div className="flex text-white justify-between text-sm mb-3.5 px-1.5">
      {items.map((item, index) => {
        return (
          <div key={index} className={mergeClassName(item)} onClick={() => handleSort(index, item)}>
            <span className="leading-normal">{item.text}</span>
            {item.sortable && <span className={sortClassName(item, index)}></span>}
          </div>
        )
      })}
    </div>
  )
}

export default TableHead
