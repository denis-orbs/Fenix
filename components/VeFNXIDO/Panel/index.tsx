'use client'

import { Button } from '@/components/UI'
import MainBox from '@/components/Common/Boxes/MainBox'
import Image from 'next/image'

const Panel = () => {
  return (
    <MainBox>
      <div className="flex flex-col items-center justify-between w-full xl:flex-row relative z-10">
        <div className="w-full xl:w-1/2">
          <h4 className="mb-3 text-2xl text-white">veFNX IDO</h4>
          <div className="flex gap-4 items-center">
            <Image
              src="/static/images/tokens/USDC.svg"
              alt="token"
              className="w-8 h-8 rounded-full"
              width={20}
              height={20}
            />
            <div>
              <h4 className="text-white text-lg">USDC Offering</h4>
              <p className="text-sm text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">Finished</p>
            </div>
          </div>
        </div>
      </div>
    </MainBox>
  )
}

export default Panel
