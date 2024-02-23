import { useState } from 'react'
import Button from '../Button'

const PaginationMobile = () => {
  const [isOpenItemsPerPage, setIsOpenItemsPerPage] = useState(false)

  return (
    <div className="flex items-center justify-between text-sm ">
      <div className="flex items-center gap-2">
        <div
          className="flex gap-2 pagination-mobile-box h-12 bg-opacity-40
         w-[168px]  text-white items-center justify-center"
        >
          <div>
            <p>10 Row</p>
          </div>
          <div className="h-[20px] w-[2px] bg-orange-600"></div>
          <div>
            <p>1-10 of 186</p>
          </div>
        </div>
        <div
          className="flex items-center justify-center
       flex-shrink-0 w-12 h-12 px-4 text-white transition-colors
        border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400 relative"
          onClick={() => setIsOpenItemsPerPage(!isOpenItemsPerPage)}
        >
          <span className="text-lg icon-circles"></span>

          {isOpenItemsPerPage && (
            <div
              className="w-[68px] p-2 flex flex-col gap-1 rounded-[10px] bg-shark-400 bg-opacity-40 absolute left-full bottom-0 translate-x-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Button variant="tertiary" className="!py-1 !h-[33px] !text-xs">
                10
              </Button>
              <Button variant="tertiary" className="!py-1 !h-[33px] !text-xs">
                20
              </Button>
              <Button variant="tertiary" className="!py-1 !h-[33px] !text-xs">
                50
              </Button>
              <Button variant="tertiary" className="!py-1 !h-[33px] !text-xs">
                100
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 p-2">
        <div className="flex">
          <span className="icon-arrow flex text-lg items-center rotate-180 text-shark-300"></span>
        </div>
        <div>
          <span className="icon-arrow flex items-center text-lg    text-white"></span>
        </div>
      </div>
    </div>
  )
}

export default PaginationMobile
