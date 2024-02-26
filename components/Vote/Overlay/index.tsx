import { Button } from '@/components/UI'
import React from 'react'

const Overlay = () => {
  return (
    <div className=" p-8 flex justify-between items-center w-[626px] bg-overlay-fixed mx-auto backdrop-blur-sm">
      <div className='flex flex-col'>
        <p className="text-white text-xs">Voting Power Used</p>
        <p className="text-2xl text-white">3878 (100%)</p>
      </div>
      <div className='flex gap-10 items-center'>
        <div>
          <span className="py-1 border border-green-400 bg-none bg-green-500 bg-opacity-20 text-white rounded-lg px-5 text-xs">Voting</span>
        </div>
        <div className="flex items-center gap-4">
          <Button className='!h-[38px] !text-xs'>Cast Votes</Button>
          <Button className='!py-2 !text-xs' variant="secondary">Reset</Button>
        </div>
      </div>
    </div>
  )
}

export default Overlay
