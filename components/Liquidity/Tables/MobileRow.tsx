import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/UI'

type IRow = {
  type: string
  APR: string
}
interface RowDataProps {
  row: IRow
}

const MobileRow = ({ row }: RowDataProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={`border border-shark-950 px-3 py-2 rounded-[10px] bg-shark-400 ${
          isOpen ? 'bg-opacity-60' : 'bg-opacity-20'
        } ${'xl:hidden'}`}
      >
        <div className="flex gap-[9px] items-center">
          <div className="relative flex items-center">
            <Image
              src="/static/images/tokens/FNX.png"
              alt="token"
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />
            <Image
              src="/static/images/tokens/ETH.png"
              alt="token"
              className="w-8 h-8 -ml-5 rounded-full"
              width={32}
              height={32}
            />
          </div>
          <div className="flex flex-col">
            <h5 className="text-sm font-semibold leading-normal mb-1.5">FNX/ETH</h5>
            <div className="flex items-center gap-2">
              {'VOLATILE' === row.type && (
                <Button
                  variant="tertiary"
                  className="!py-1 !text-xs border !border-shark-400 !rounded-[10px] !bg-shark-400 !bg-opacity-40 !h-[30px] !px-[7px]"
                >
                  Volatile Pool
                </Button>
              )}
              {'CONCENTRATED' === row.type && (
                <Button
                  variant="tertiary"
                  className="!py-1 hover:!border-none !bg-green-500 !border !border-solid !border-1 !border-green-400 !bg-opacity-40 !text-xs !h-[30px] !px-[7px]"
                >
                  Concentrated
                </Button>
              )}
              {'STABLE' === row.type && (
                <Button
                  variant="tertiary"
                  className="!py-1 !text-xs border !border-shark-400 !rounded-[10px] !bg-shark-400 !bg-opacity-40 !h-[30px] !px-[7px]"
                >
                  Stable Pool
                </Button>
              )}

              <Button
                variant="tertiary"
                className="!py-1 !text-xs border !border-shark-400 !rounded-[10px] !bg-shark-400 !bg-opacity-40 !h-[30px] !px-[7px]"
              >
                0.3%
              </Button>
              <Button
                variant="tertiary"
                className="!py-1 !text-xs border !border-shark-400 !rounded-[10px] !bg-shark-400 !bg-opacity-40 !h-[30px] !px-[7px]"
              >
                <span className="icon-info"></span>
              </Button>
            </div>
          </div>
          <button type="button" className="ml-auto" onClick={() => setIsOpen(!isOpen)}>
            <span className={`icon-chevron text-xs leading-[0] block ${isOpen ? 'rotate-180' : ''}`}></span>
          </button>
        </div>

        {isOpen && (
          <>
            <div className="flex flex-col gap-2.5 mt-[21px] mb-2.5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium leading-normal">APR</span>
                  <span className="icon-info text-[13px]"></span>
                </div>
                <div className="flex gap-[7px]">
                  <div className="ml-auto text-xs leading-normal">34.58%</div>
                  <div
                    className="flex items-center gap-[5px] cursor-pointer
                     text-shark-100 hover:text-transparent hover:bg-gradient-to-r hover:from-outrageous-orange-500 hover:to-festival-500 hover:bg-clip-text"
                  >
                    <span className="text-xl leading-[0] icon-link"></span>
                    <span className="text-xs leading-normal">Add Incentives</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium leading-normal">TVL</span>
                  <span className="icon-info text-[13px]"></span>
                </div>
                <div className="flex flex-col">
                  <div className="ml-auto text-xs leading-normal">34.58%</div>
                  <div className="flex gap-2.5 text-shark-100">
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src="/static/images/tokens/FNX.png"
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">2,313,873.46</span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src="/static/images/tokens/ETH.png"
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">225.38</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium leading-normal">Volume</span>
                  <span className="icon-info text-[13px]"></span>
                </div>
                <div className="flex flex-col">
                  <div className="ml-auto text-xs leading-normal">34.58%</div>
                  <div className="flex gap-2.5 text-shark-100">
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src="/static/images/tokens/FNX.png"
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">2,313,873.46</span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src="/static/images/tokens/ETH.png"
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">225.38</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium leading-normal">Fees</span>
                  <span className="icon-info text-[13px]"></span>
                </div>
                <div className="flex flex-col">
                  <div className="ml-auto text-xs leading-normal">{row.APR}%</div>
                  <div className="flex gap-2.5 text-shark-100">
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src="/static/images/tokens/FNX.png"
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">2,313,873.46</span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src="/static/images/tokens/ETH.png"
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">225.38</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium leading-normal">Pool Balance</span>
                  <span className="icon-info text-[13px]"></span>
                </div>
                <div className="flex flex-col">
                  <div className="ml-auto text-xs leading-normal">34.58%</div>
                  <div className="flex gap-2.5 text-shark-100">
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src="/static/images/tokens/FNX.png"
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">2,313,873.46</span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src="/static/images/tokens/ETH.png"
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">225.38</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-2.5 pb-[3px]">
              <Button
                variant="tertiary"
                className="!py-1 !text-xs border !border-shark-400 !rounded-[10px] !bg-shark-400 !bg-opacity-40 !h-[36px] !px-[7px] !w-full"
              >
                <span className="icon-circles text-lg mr-2.5"></span>
                <span>Deposit Liquidity</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default MobileRow
