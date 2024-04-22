import { Button } from '@/src/components/UI'
import { formatCurrency } from '@/src/library/utils/numbers'
import { PoolData } from '@/src/state/liquidity/types'
import Image from 'next/image'
import { useState } from 'react'

interface RowDataProps {
  row: PoolData
  titleHeader?: string
  titleHeader2?: string
  titleButton?: string
  titleButton2?: string
  activeRange?: boolean
}

export default function MobileRow({
  row,
  titleHeader,
  titleHeader2,
  titleButton,
  titleButton2,
  activeRange,
}: RowDataProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={`border border-shark-950 px-3 py-2 rounded-[10px] bg-shark-400 ${
          isOpen ? 'bg-opacity-60' : 'bg-opacity-20'
        } ${'2xl:hidden'}`}
      >
        <div className="flex gap-[9px] items-center">
          <div className="relative flex items-center">
            <Image
              src={`/static/images/tokens/${row.pairDetails.token0Symbol}.svg`}
              alt="token"
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />
            <Image
              src={`/static/images/tokens/${row.pairDetails.token1Symbol}.svg`}
              alt="token"
              className="w-8 h-8 -ml-5 rounded-full"
              width={32}
              height={32}
            />
          </div>
          <div className="flex flex-col">
            <div>
              <h5 className="text-sm font-semibold leading-normal mb-1.5">
                {row.pairDetails.token0Symbol} / {row.pairDetails.token1Symbol}
              </h5>
              <div className="flex items-center gap-2">
                {!row.pairDetails.pairInformationV2?.stable && row.pairDetails.pairSymbol !== 'Concentrated pool' && (
                  <span className="text-white py-1 px-3 text-xs rounded-lg border bg-shark-400 border-shark-400 ">
                    Volatile Pool
                  </span>
                )}
                {row.pairDetails.pairInformationV2?.stable && row.pairDetails.pairSymbol !== 'Concentrated pool' && (
                  <span className="text-white py-1 px-3 text-xs rounded-lg border bg-shark-400 border-shark-400 ">
                    Stable Pool
                  </span>
                )}
                {row.pairDetails.pairSymbol === 'Concentrated pool' && (
                  // <span className="text-white py-1 px-3 text-xs rounded-lg border bg-green-400 border-green-400 ">
                  <span className="text-white py-1 px-3 text-xs rounded-lg border bg-gradient-to-r from-outrageous-orange-500 to-festival-500">
                    Concentrated Pool
                  </span>
                )}

                {/* 'CONCENTRATED' === row.type && (
                <span
                  className="py-1 px-2  text-xs rounded-lg 
                bg-green-500 border border-solid border-1 border-green-400 bg-opacity-40 "
                >
                  Concentrated
                </span>
              ) */}

                <span className="!py-1 px-3  text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                  {row.pairDetails.fee} %
                </span>
                <Button
                  variant="tertiary"
                  className="!py-1 !text-xs border !border-shark-400 !rounded-[10px] !bg-shark-400 !bg-opacity-40 !h-[30px] !px-[7px]"
                >
                  <span className="icon-info"></span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-2 ml-auto">
            {titleButton2 === '' ? (
              <Button
                variant="tertiary"
                className="flex items-center gap-2 w-full"
                href={`/liquidity/deposit#${!row.pairDetails.pairInformationV2?.stable ? 'volatile' : 'stable'}-${row.pairDetails.pairInformationV2?.token0}-${row.pairDetails.pairInformationV2?.token1}`}
              >
                <span className="icon-circles"></span>
                Deposit
              </Button>
            ) : (
              <Button variant="tertiary" className="flex items-center gap-2 w-full" href="/liquidity/deposit">
                <span className="icon-logout"></span>
                Manage
              </Button>
            )}
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              <span className={`icon-chevron text-xs leading-[0] block ${isOpen ? 'rotate-180' : ''}`}></span>
            </button>
          </div>
        </div>

        {isOpen && (
          <>
            {activeRange && (
              <div className="flex justify-between border mt-[21px] items-center  mb-2.5 border-shark-300 p-4 rounded-lg">
                <h1 className="text-xs">Range</h1>
                <div className={`flex items-center justify-center`}>
                  <div className="flex gap-2 items-center">
                    <span className="bg-green-600 w-4 h-4 rounded-full border-4 border-black"></span>
                    <div className="text-xs flex flex-col">
                      <p className="text-shark-100 text-xs">Min Price</p>
                      <span className="p-2  text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300 text-xs">
                        $0.00
                      </span>
                    </div>
                    <div className="text-xs flex flex-col">
                      <p className="text-shark-100 text-xs">Max Price</p>
                      <span className="p-2 text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                        $0.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2.5  mb-2.5">
              <div
                className="flex items-start justify-between border border-shark-300 p-4 rounded-lg

              "
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium leading-normal">APR</span>
                  {/* <span className="icon-info text-[13px]"></span> */}
                </div>
                <div className="flex gap-[7px]">
                  <div className="ml-auto text-xs leading-normal">{row.pairDetails.apr.toFixed(0)} %</div>
                  <div
                    className="flex items-center gap-[5px] cursor-pointer
                     text-shark-100 hover:text-transparent hover:bg-gradient-to-r hover:from-outrageous-orange-500 hover:to-festival-500 hover:bg-clip-text"
                  ></div>
                </div>
              </div>

              <div className="flex items-start justify-between border  border-shark-300 p-4 rounded-lg">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium leading-normal">TVL</span>
                </div>
                <div className="flex flex-col">
                  <div className="ml-auto text-xs leading-normal">$ {formatCurrency(Number(row.pairDetails.tvl))}</div>
                  <div className="flex gap-2.5 text-shark-100">
                    <div className="flex items-center gap-[5px]">
                      {/* <Image
                        src="/static/images/tokens/FNX.svg"
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">2,313,873.46</span> */}
                    </div>
                    <div className="flex items-center gap-[5px]">
                      {/* <Image
                        src="/static/images/tokens/ETH.svg"
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">225.38</span> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between border border-shark-300 p-4 rounded-lg">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium leading-normal">
                    {titleHeader?.length === 0 ? 'Volume' : titleHeader}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="ml-auto text-xs leading-normal">
                    $ {formatCurrency(Number(row.pairDetails.volumeUSD))}
                  </div>
                  <div className="flex gap-2.5 text-shark-100">
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src={`/static/images/tokens/${row.pairDetails.token0Symbol}.svg`}
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">
                        {' '}
                        {formatCurrency(Number(row.pairDetails.volumeToken0))} {row.pairDetails.token0Symbol}
                      </span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src={`/static/images/tokens/${row.pairDetails.token1Symbol}.svg`}
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">
                        {formatCurrency(Number(row.pairDetails.volumeToken1))} {row.pairDetails.token1Symbol}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between border border-shark-300 p-4 rounded-lg">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium leading-normal">
                    {titleHeader2 === '' ? 'Fees' : titleHeader2}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="ml-auto text-xs leading-normal">
                    $ {formatCurrency(Number(row.pairDetails.volumeUSD) * (Number(row.pairDetails.fee) / 1000000))}{' '}
                  </div>
                  <div className="flex gap-2.5 text-shark-100">
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src={`/static/images/tokens/${row.pairDetails.token0Symbol}.svg`}
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">
                        {formatCurrency(Number(row.pairDetails.volumeToken0) * (Number(row.pairDetails.fee) / 1000000))}{' '}
                        {row.pairDetails.token0Symbol}
                      </span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src={`/static/images/tokens/${row.pairDetails.token1Symbol}.svg`}
                        alt="token"
                        className="w-2.5 h-2.5 rounded-full"
                        width={10}
                        height={10}
                      />
                      <span className="text-xs leading-normal">
                        {' '}
                        {formatCurrency(
                          Number(row.pairDetails.volumeToken1) * (Number(row.pairDetails.fee) / 1000000)
                        )}{' '}
                        {row.pairDetails.token1Symbol}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-2.5 pb-[3px] flex gap-2">
              {/* {titleButton === '' ? (
                <Button variant="tertiary" className="flex items-center gap-2 w-full">
                  <span className="icon-info"></span>
                  Info
                </Button>
              ) : (
                <Button variant="tertiary" className="flex items-center gap-2 w-full">
                  <span className="icon-coin"></span>
                  Claim
                </Button>
              )} */}

              {/* {titleButton2 === '' ? (
                <Button
                  variant="tertiary"
                  className="flex items-center gap-2 w-full"
                  href={`/liquidity/deposit#${!row.pairDetails.pairInformationV2?.stable ? 'volatile' : 'stable'}-${row.pairDetails.pairInformationV2?.token0}-${row.pairDetails.pairInformationV2?.token1}`}
                >
                  <span className="icon-circles"></span>
                  Deposit
                </Button>
              ) : (
                <Button variant="tertiary" className="flex items-center gap-2 w-full" href="/liquidity/deposit">
                  <span className="icon-logout"></span>
                  Manage
                </Button>
              )} */}
            </div>
          </>
        )}
      </div>
    </>
  )
}
