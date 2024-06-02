'use client'

import { useState } from 'react'
import cn from '@/src/library/utils/cn'
import TotalRewardsTooltip from '@/src/components/Vote/TotalRewardsTooltip'

interface IItems {
  text: string
  sortable?: boolean
  className?: string
  showTooltip?: boolean
  setShowTooltip?: (showTooltip: boolean) => void
}
interface TableHeadProps {
  items: IItems[]
  setSort: (sort: 'asc' | 'desc' | 'normal') => void
  setSortIndex: (sortIndex: number) => void
  sortIndex: number
  sort: 'asc' | 'desc' | 'normal'
}

const TableHead = ({ items, setSort, setSortIndex, sortIndex, sort }: TableHeadProps) => {
  const handleSort = (index: number, items: IItems) => {
    const newSort = sort === 'asc' ? 'desc' : sort === 'desc' ? 'normal' : 'asc'
    if (items.sortable) {
      setSort(newSort)
      setSortIndex(index)
    }
  }

  const mergeClassName = (item: IItems) => {
    return cn('px-2.5 ', item.sortable ? 'cursor-pointer relative select-none' : '', item.className)
  }

  const sortClassName = (item: IItems, index: number) => {
    return cn(
      'icon-chevron text-[11px] inline-block ml-2',
      sort === 'asc' ? '-scale-y-100' : sort === 'desc' ? '' : '',
      sortIndex === index && sort !== 'normal' ? '' : 'opacity-0'
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
              <div className="absolute z-50 text-left bottom-6 right-32">
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