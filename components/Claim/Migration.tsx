'use client'

import { Button, BigBox } from '@/components/UI'

const EXCHANGE_LIST = [
  {
    label: 'Exchange Ratio',
    amount: '1.06 veFNX: 1 CHR',
    info: {
      unlocked: '103.983.32',
      locked: '103.983.32',
    },
  },
  {
    label: 'Exchange Ratio',
    amount: '1.42 veFNX: 1 CHR',
    info: {
      unlocked: '103.983.32',
      locked: '103.983.32',
    },
  },
  {
    label: 'Exchange Ratio',
    amount: '75 veFNX: 1 CHR',
    info: {
      unlocked: '103.983.32',
      locked: '103.983.32',
    },
  },
  {
    label: 'Exchange Ratio',
    amount: '75 veFNX: 1 CHR',
    info: {
      unlocked: '103.983.32',
      locked: '103.983.32',
    },
  },
]

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
            <div key={index} className="w-[384px] h-[77px] flex gap-3 items-center p-3 box-medium mb-3">
              <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
                <span className="inline-block text-2xl text-transparent icon-lucide bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
              </div>
              <div className="fw">
                <h5 className="text-xs text-shark-100">{exchange.label}</h5>
                <div className="flex items-center gap-1">
                  <p className="text-white">{exchange.amount}</p>
                  <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-full icon-info bg-shark-200 hover:bg-outrageous-orange-500 cursor-pointer"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BigBox>
  )
}

export default Migration
