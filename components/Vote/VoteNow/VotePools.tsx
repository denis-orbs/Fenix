import React from 'react'
import { Button } from '@/components/UI'
import Image from 'next/image'
const VotePools = () => {
  return (
    <div className="flex items-end  justify-between  vote-box   p-8 gap-10">
      <div className="flex items-center gap-2 ">
        <div className="flex items-center">
          <Image
            src="/static/images/tokens/FNX.png"
            alt="token"
            className="rounded-full w-7 h-7"
            width={20}
            height={20}
          />
          <Image
            src="/static/images/tokens/ETH.png"
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
      <div className='icon-x absolute mb-10 ms-72 p-2 text-shark-100'></div>
    </div>
  )
}

export default VotePools
