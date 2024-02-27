import { Button } from '@/components/UI'
import React from 'react'

const Overlay = () => {
  return (
    <div className='bg-shark-400 rounded-xl bg-opacity-40 lg:bg-none lg:bg-opacity-0 '>
    <div className=" p-8 flex flex-wrap  lg:flex-nowrap justify-between  items-center lg:w-[626px] lg:bg-overlay-fixed  mx-auto backdrop-blur-sm">
      <div className='flex flex-col w-full lg:w-auto'>
        <p className="text-white text-xs ">Voting Power Used</p>
        <p className="text-lg lg:text-2xl text-white">3878 (100%)</p>
      </div>
      <div className='flex justify-end lg:gap-10 gap-2 items-center flex-wrap lg:flex-nowrap'>
        <div className=''>
          <span className="py-1 border border-green-400 bg-none bg-green-500 bg-opacity-20 text-white rounded-lg px-5 text-xs">Voting</span>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <Button className='!h-[38px] !text-xs w-[130px] lg:w-auto'>Cast Votes</Button>
          <Button className='!py-2 !text-xs' variant="secondary">Reset</Button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Overlay
