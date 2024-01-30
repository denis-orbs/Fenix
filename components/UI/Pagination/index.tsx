/* eslint-disable max-len */
'use client'

import { useState } from 'react'

const Pagination = ({ className }: { className?: string }) => {
  const [activePage, setActivePage] = useState(1)

  return (
    <div className={`text-white text-xs ${className} w-full max-w-[785px] main-pagination`}>
      <div className="flex items-center justify-center gap-2.5 h-[62px] relative z-10">
        <button
          type="button"
          className="flex items-center justify-center leading-normal [&:not(:hover)]:text-shark-100 gap-2.5 px-5 py-2.5 transition-colors button-secondary rounded-[10px] mr-1.5"
          onClick={() => setActivePage(activePage > 1 ? activePage - 1 : activePage)}
        >
          {/* <span className="-scale-x-100"><ChevronRight /></span> */}
          <div className="w-[18px] h-[18px] bg-white bg-opacity-10"></div>
          Previous
        </button>
        {Array.from({ length: 9 }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`flex items-center justify-center leading-normal transition-colors bg-shark-400 bg-opacity-40 border border-shark-950 px-[15px] h-[38px] rounded-[10px] hover:border-outrageous-orange-500 hover:bg-button-primary-hover hover:bg-opacity-80 ${
              activePage === index + 1 ? '' : '[&:not(:hover)]:text-navy-gray-500'
            }`}
            onClick={() => setActivePage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          type="button"
          className="flex items-center justify-center leading-normal [&:not(:hover)]:text-shark-100 gap-2.5 px-5 py-2.5 transition-colors button-secondary rounded-[10px] ml-1.5"
          onClick={() => setActivePage(activePage < 7 ? activePage + 1 : activePage)}
        >
          Next
          {/* <ChevronRight /> */}
          <div className="w-[18px] h-[18px] bg-white bg-opacity-10"></div>
        </button>
      </div>
    </div>
  )
}

export default Pagination
