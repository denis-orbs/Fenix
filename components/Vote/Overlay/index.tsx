import { Button } from '@/components/UI'
import React from 'react'

const Overlay = () => {
  return (
    <div className=" p-4 flex justify-between items-center w-2/5 vote-box mx-auto">
      <div className='flex flex-col'>
        <p className="text-shark-100">Voting Power Used</p>
        <p className="text-4xl text-white">3878 (100%)</p>
      </div>
      <div className='flex gap-6 items-center'>
        <div>
          <Button className='!py-2 !border-green-500 !bg-none !bg-green-500 !bg-opacity-40 '>Voting</Button>
        </div>
        <div>
          <Button className='!py-3'>Cast Votes</Button>
        </div>
        <div>
          <Button className='!py-2' variant='default'>Reset</Button>
        </div>
      </div>
    </div>
  )
}

export default Overlay
