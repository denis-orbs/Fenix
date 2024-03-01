import React from 'react'
import Image from 'next/image'

const VotePools = () => {
  return (
    <div className="flex  relative justify-between items-end vote-box p-8 gap-10  w-full xl:w-auto ">
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
            <span className="text-xs py-1 rounded-lg text-white px-3  bg-green-500 border border-solid border-1 border-green-400 bg-opacity-40 ">
              Concentrated
            </span>
          </div>
        </div>
      </div>
      <div className='flex items-start'>
        <span className="py-1 px-3  text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
          0.3%
        </span>
      </div>
      <div className="icon-x absolute iam p-2 right-0 top-0 text-shark-100"></div>
    </div>
  )
}

export default VotePools
