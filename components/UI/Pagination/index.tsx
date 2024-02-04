/* eslint-disable max-len */
'use client'

import { useState } from 'react'
import cn from '@/utils/cn'

interface PaginationProps {
  numberPages: number
  className: string
}

const Pagination = ({ className, numberPages }: PaginationProps) => {
  const [activePage, setActivePage] = useState(1)

  const mergeClassName = cn('text-white text-xs w-full md:max-w-[785px] box-large', className)

  const pageClassName = (index: number) => {
    return cn(
      'flex items-center justify-center leading-normal transition-colors bg-shark-400 bg-opacity-40 border border-shark-400 px-[15px] h-[38px] rounded-[10px] hover:border-outrageous-orange-500 hover:bg-button-primary-hover hover:bg-opacity-80',
      activePage === index + 1 ? 'bg-button-primary bg-opacity-100' : '[&:not(:hover)]:text-navy-gray-500'
    )
  }

  const hadlerPrev = () => setActivePage(activePage > 1 ? activePage - 1 : activePage)
  const hadlerNext = () => setActivePage(activePage < 7 ? activePage + 1 : activePage)

  const hadlerPage = (index: number) => setActivePage(index + 1)

  return (
    <div className={mergeClassName}>
      <div className="flex items-center justify-center gap-2.5 h-[62px] relative z-10">
        <button
          type="button"
          className="flex items-center justify-center leading-normal [&:not(:hover)]:text-shark-100 gap-2.5 px-5 py-2.5 transition-colors button-secondary rounded-[10px] mr-1.5"
          onClick={hadlerPrev}
        >
          <span className="-scale-x-100 icon-arrow"></span>
          Previous
        </button>
        {Array.from({ length: numberPages }).map((_, index) => (
          <button key={index} type="button" className={pageClassName(index)} onClick={() => hadlerPage(index)}>
            {index + 1}
          </button>
        ))}
        <button
          type="button"
          className="flex items-center justify-center leading-normal [&:not(:hover)]:text-shark-100 gap-2.5 px-5 py-2.5 transition-colors button-secondary rounded-[10px] ml-1.5"
          onClick={hadlerNext}
        >
          Next
          <span className="icon-arrow"></span>
        </button>
      </div>
    </div>
  )
}

export default Pagination
