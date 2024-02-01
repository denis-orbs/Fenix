'use client'

import { BigBox } from '@/components/UI'
import MigrationItem from './MigrationItem'
import { EXCHANGE_LIST } from './data'

const Migration = () => {

  return (
    <BigBox>
      <div className="flex items-center justify-between w-full">
        <div className="w-1/2">
          <h4 className="mb-3 text-xl text-white">Migration Claim</h4>
          <p className="mb-4 text-sm text-shark-100">
            Deposit your CHR Tokens in order to migrate to our new Protocol!
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="px-4 py-3 rounded-lg box-medium flex items-center gap-10">
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
        <div className="relative flex flex-col w-auto px-8">
          {EXCHANGE_LIST.map((exchange, index) => (
            <MigrationItem exchange={exchange} key={index} />
          ))}
        </div>
      </div>
    </BigBox>
  )
}

export default Migration
