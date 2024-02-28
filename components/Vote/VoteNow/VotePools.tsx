import React from 'react'
import { Button } from '@/components/UI'
import Image from 'next/image'



const VotePools = () => {
  return (
    <div className="flex items-end relative justify-between vote-box p-8 gap-10 w-full xl:w-auto ">
      <div className="flex items-center gap-2 ">
        <div className="flex items-center w-full">
          <Image
            src="/static/images/tokens/FNX.svg"
            alt="token"
            className="rounded-full w-7 h-7"
            width={20}
            height={20}
          />
          <Image
            src="/static/images/tokens/ETH.svg"
            alt="token"
            className="-ml-4 rounded-full w-7 h-7"
            width={20}
            height={20}
          />
        </div>
        <div className="flex flex-col">
          <h5 className="text-sm text-white">FNX / ETH</h5>
          <div className="flex justify-between items-center gap-2">
            <Button
              variant="tertiary"
              className="!py-1 hover:!border-none !bg-green-500 !border !border-solid !border-1 !border-green-400 !bg-opacity-40 "
            >
              Concentrated
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Button variant="tertiary" className="!py-1 ">
          0.3%
        </Button>
      </div>
      <div className='icon-x absolute iam p-2 right-0 top-0 text-shark-100'></div>
    </div>
  )
}

export default VotePools
