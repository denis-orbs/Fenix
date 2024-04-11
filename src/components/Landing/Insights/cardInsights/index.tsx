import React from 'react'
import Image from 'next/image'
const CardInsights = () => {
  return (
    <div className="common-landing z-50 ">
      <div className="flex flex-col gap-5 items-center w-full">
        <Image src={'/static/images/landing/postFake.svg'} className='h-[150px] w-[266px] sm:h-[212px] sm:w-[378px]' alt="" height={212} width={378} />
        <div className="w-full sm:w-[70%] flex flex-col gap-2 justify-center items-center">
          <h1 className="font-medium text-white sm:text-lg text-xs text-center">Fenix: The Economic Growth Engine For Blast</h1>
          <p className="text-white text-xs font-normal">Feb 16, 2024</p>
        </div>
      </div>
    </div>
  )
}

export default CardInsights