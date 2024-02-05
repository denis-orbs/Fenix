'use client'

import { useState } from 'react'
import { MainBox } from '@/components/UI'
import { EXCHANGE_LIST } from '../data'
import InfoBox from '@/components/Common/InfoBox'

const Migration = () => {

  const [show, setShow] = useState<boolean>(false)

  return (
    <MainBox>
      <div className="flex justify-between w-full flex-col md:gap-10 md:flex-row md:items-center">
        <div className="w-full 2xl:w-1/2 my-5 md:m-0">
          <h4 className="mb-3 text-xl text-white">Migration Claim</h4>
          <p className="mb-4 text-sm text-shark-100">
            Deposit your CHR Tokens in order to migrate to our new Protocol!
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="px-4 py-3 rounded-lg box-medium flex items-center gap-3 md:gap-5 2xl:gap-8 w-full 2xl:justify-start justify-between 2xl:max-w-[400px]">
              <div>
                <h5 className="mb-1 text-xs text-shark-100">Migration</h5>
                <p className="text-xs text-green-500">Open</p>
              </div>
              <div className="flex justify-center flex-col items-center">
                <h5 className="mb-1 text-xs text-white text-center bg-shark-400 rounded-sm w-7 h-7 flex items-center justify-center">
                  3
                </h5>
                <p className="text-xs text-shark-100">Days</p>
              </div>
              <div className="flex justify-center flex-col items-center">
                <h5 className="mb-1 text-xs text-white text-center bg-shark-400 rounded-sm w-7 h-7 flex items-center justify-center">
                  14
                </h5>
                <p className="text-xs text-shark-100">Hours</p>
              </div>
              <div className="flex justify-center flex-col items-center">
                <h5 className="mb-1 text-xs text-white text-center bg-shark-400 rounded-sm w-7 h-7 flex items-center justify-center">
                  45
                </h5>
                <p className="text-xs text-shark-100">Minutes</p>
              </div>
              <div className="flex justify-center flex-col items-center">
                <h5 className="mb-1 text-xs text-white text-center bg-shark-400 rounded-sm w-7 h-7 flex items-center justify-center">
                  36
                </h5>
                <p className="text-xs text-shark-100">Seconds</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-3 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
              <span className="text-lg icon-link"></span>
              About Migration
            </p>
          </div>
        </div>
        <div className="relative flex flex-col w-auto max-h-[350px] overflow-y-auto overflow-x-none pr-4">
          {EXCHANGE_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} setShowTooltip={setShow} hasTooltip/>
          ))}
        </div>
      </div>
    </MainBox>
  )
}

export default Migration
