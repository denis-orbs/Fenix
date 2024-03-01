'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/UI'
import OPTIONS_STRATEGIES from './data'

const StrategyMobile = () => {
  const [isOpenItemsPerPage, setIsOpenItemsPerPage] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handlerOpen = ()=> isOpen ? setIsOpen(false): setIsOpen(true)
  return (
    <div className="w-full bg-shark-400 bg-opacity-40 p-4">
      <div className="relative z-50">
        <div className="relative text-white flex flex-col">
          <div className="flex justify-between items-center box-strategies">
            <div className="flex gap-4 items-center">
              <div className="flex items-center">
                <Image
                  src="/static/images/tokens/FNX.svg"
                  alt="token"
                  className="rounded-full "
                  width={32}
                  height={32}
                />
                <Image
                  src="/static/images/tokens/ETH.svg"
                  alt="token"
                  className="-ml-4 rounded-full"
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex flex-col">
                <p>USDC / FNX</p>
                <p className="text-xs">
                  ID: 158 - <span className="text-green-400">ACTIVE</span>
                </p>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div
                className="flex items-center justify-center cursor-pointer flex-shrink-0 w-12 h-12 px-4 transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400 relative"
                onClick={() => setIsOpenItemsPerPage(!isOpenItemsPerPage)}
              >
                <span className="text-lg icon-cog text-white "></span>
                {isOpenItemsPerPage && (
                  <div
                    className="w-[300px] p-2 flex flex-col gap-1 rounded-[10px]
                          bg-shark-400 absolute top-14 z-50 left--1 translate-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {OPTIONS_STRATEGIES.map((option, index) => {
                      return (
                        <Button variant="default" key={index} className="!py-1 !h-[33px]  !text-xs">
                          {option}
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
              <span onClick={handlerOpen} className={`icon-chevron cursor-pointer ${isOpen && 'rotate-180 transition-all'}`}></span>
            </div>
          </div>
        </div>

        {isOpen && (
          <div>
            <div className="flex gap-2 my-2">
              <div className="flex flex-col gap-2 w-1/2 items-center bg-shark-400 bg-opacity-40 p-4  rounded-lg">
                <p className="text-white">
                  ROI <span className="icon-info text-xs"></span>
                </p>
                <h1 className="text-green-400 text-2xl">0.00%</h1>
              </div>
              <div className="bg-shark-400 bg-opacity-40 flex flex-col gap-2 w-1/2 items-center p-4  rounded-lg">
                <p className="text-white">
                  TOTAL BUDGET <span className="icon-info text-xs"></span>
                </p>
                <h1 className="text-white text-2xl">$501.10</h1>
              </div>
            </div>
            <div className="bg-shark-400 bg-opacity-40 rounded-lg">
              <div className="relative text-white flex items-center justify-center border-b border-shark-400">
                <div className="flex items-start flex-col p-4 w-1/2">
                  <h4 className="text-sm text-green-400">Buy ETH</h4>
                  <h4 className="text-sm text-white">500.00 USDC</h4>
                  <p className="text-xs text-white">$501.10</p>
                </div>
                <div className="flex items-start flex-col p-4 w-1/2 border-l border-shark-400">
                  <h4 className="text-sm text-red-500">Buy ETH</h4>
                  <h4 className="text-sm text-white">0.00 USDC</h4>
                  <p className="text-xs text-white">$0.00</p>
                </div>
              </div>
              <div className="h-auto">
                <div className="flex items-center w-full justify-between px-10 py-3 border-t mt-24 border-shark-300">
                  <p className="text-white text-xs">0.00</p>
                  <p className="text-white text-xs">1,328.19</p>
                  <p className="text-white text-xs">3,672.06</p>
                  <p className="text-white text-xs">6,015.93</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StrategyMobile
