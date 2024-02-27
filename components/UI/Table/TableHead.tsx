'use client'

import { useState } from 'react'
import cn from '@/utils/cn'
import TotalRewardsTooltip from '@/components/Vote/TotalRewardsTooltip'

interface IItems {
  text: string
  sortable?: boolean
  className?: string
  showTooltip?: boolean
  setShowTooltip?: (showTooltip: boolean) => void
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
    return cn('p-2.5 ', item.sortable ? 'cursor-pointer relative select-none' : '', item.className)
  }

  const sortClassName = (item: IItems, index: number) => {
    return cn(
      'icon-chevron text-[11px] inline-block ml-2',
      sort === 'asc' ? '-scale-y-100' : '',
      sortIndex === index ? '' : 'opacity-0'
    )
  }

  return (
    <div className="flex text-white text-sm mb-3.5 px-1.5 relative">
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className={mergeClassName(item)}
            onMouseOver={() => {
              if (item.text === 'Total Rewards') {
                item.setShowTooltip && item.setShowTooltip(true)
              }
            }}
            onMouseOut={() => {
              if (item.text === 'Total Rewards') {
                item.setShowTooltip && item.setShowTooltip(false)
              }
            }}
            onClick={() => {
              handleSort(index, item)
            }}
          >
            {item.showTooltip && (
              <div className="absolute z-50 text-left bottom-0">
                <TotalRewardsTooltip show={item.showTooltip} setShow={() => {}} />
              </div>
            )}

            <span className="leading-normal">{item.text}</span>
            {item.sortable && <span className={sortClassName(item, index)}></span>}
          </div>
        )
      })}
    </div>
  )
}

export default TableHead
