'use client'

import { useState } from 'react'
import cn from '@/src/library/utils/cn'
import Button from '../Button'

interface PaginationProps {
  numberPages: number
  className: string
  activePage: number
  setActivePage: (page: number) => void
  itemsPerPage: number
  setItemPerPage: (item: number) => void
}

<<<<<<< HEAD
const Pagination = ({ className, numberPages, setActivePage, activePage }: PaginationProps) => {
  const mergeClassName = cn('text-white text-xs w-full md:max-w-[785px] box-large hidden lg:block', className)
=======
const Pagination = ({
  className,
  numberPages,
  setActivePage,
  activePage,
  itemsPerPage,
  setItemPerPage,
}: PaginationProps) => {
  const [isOpenItemsPerPage, setIsOpenItemsPerPage] = useState(false)
  const mergeClassName = cn('text-white text-xs w-full md:max-w-full box-large hidden lg:block', className)
>>>>>>> dev

  const pageClassName = (index: number) => {
    return cn(
      'flex items-center justify-center leading-normal transition-colors bg-shark-400 bg-opacity-40 border border-shark-400 px-[15px] h-[38px] rounded-[10px] hover:border-outrageous-orange-500 hover:bg-button-primary-hover hover:bg-opacity-80',
      activePage === index + 1 ? 'bg-button-primary bg-opacity-100' : '[&:not(:hover)]:text-navy-gray-500'
    )
  }

  const hadlerPrev = () => setActivePage(activePage > 1 ? activePage - 1 : activePage)
  const hadlerNext = () => setActivePage(activePage < numberPages ? activePage + 1 : activePage)

  const hadlerPage = (index: number) => setActivePage(index + 1)

  return (
    <div className={mergeClassName}>
      <div className="w-full flex justify-center items-center">
        <div className="w-[90%] flex items-center justify-center gap-2.5 h-[62px] relative z-10">
          {numberPages > 1 && activePage > 1 && (
            <button
              type="button"
              className="flex items-center justify-center leading-normal [&:not(:hover)]:text-shark-100 gap-2.5 px-5 py-2.5 transition-colors button-secondary rounded-[10px] mr-1.5"
              onClick={hadlerPrev}
              disabled={activePage === 1}
            >
              <span className="-scale-x-100 icon-arrow"></span>
              Previous
            </button>
          )}
          {Array.from({ length: numberPages }).map((_, index) => (
            <button key={index} type="button" className={pageClassName(index)} onClick={() => hadlerPage(index)}>
              {index + 1}
            </button>
          ))}
          {numberPages > 1 && activePage !== numberPages && (
            <button
              type="button"
              className="flex items-center justify-center leading-normal [&:not(:hover)]:text-shark-100 gap-2.5 px-5 py-2.5 transition-colors button-secondary rounded-[10px] ml-1.5"
              onClick={hadlerNext}
              disabled={activePage === numberPages}
            >
              Next
              <span className="icon-arrow"></span>
            </button>
          )}
        </div>
        <div
          className="flex items-center justify-center cursor-default flex-shrink-0 w-12 h-12 px-4 transition-colors
        border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400 relative"
          onClick={() => setIsOpenItemsPerPage(!isOpenItemsPerPage)}
        >
          <span className="text-lg icon-cog text-white "></span>
          {isOpenItemsPerPage && (
            <div
              className="w-[68px] p-2 flex flex-col gap-1 rounded-[10px] bg-shark-400 bg-opacity-40 absolute left-full bottom-0 translate-x-1"
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
        </div>
      </div>
    </div>
  )
}

export default Pagination
