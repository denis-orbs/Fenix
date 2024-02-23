import React from 'react'

const Transfer = () => {
  return (
    <div className='flex flex-col relative'>
    <div className="rotate-90 mx-auto bg-shark-400 p-1 rounded-lg bg-opacity-40">
        <span className="icon-arrow text-2xl inline-block     text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
      </div>
    <div className='p-8 exchange-box-x1 mt-2'>
        <p className='text-sm text-white  mb-2'>Transfer to</p>
        <input type="text" placeholder='0e2x'  className='bg-shark-400 text-sm   rounded-lg bg-opacity-40 outline-none p-4 w-full'/>
    </div>
    </div>
  )
}

export default Transfer