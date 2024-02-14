import React from 'react'
const PaginationMobile = () => {
  return (
    <div className="flex items-center justify-between text-sm ">
      <div className="flex items-center gap-2">
        <div className="flex gap-2 pagination-mobile-box h-12 bg-opacity-40 
         w-[168px]  text-white items-center justify-center">
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
        border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400"
        >
          <span className="text-lg icon-circles"></span>
        </div>
      </div>
      <div className='flex items-center gap-4 p-2'>
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
