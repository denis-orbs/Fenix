/* eslint-disable react/no-multi-comp */
/* eslint-disable max-len */
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { TableCell, TableRow, Button } from '@/components/UI'

export enum RowDataType {
  CONCENTRATED = 'CONCENTRATED',
  STABLE = 'STABLE',
  VOLATILE = 'VOLATILE',
}

const DesplegableRow = ({ className = '', type }: { className?: string; type: RowDataType }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`border border-shark-950 px-3 py-2 rounded-[10px] bg-shark-400 ${
        isOpen ? 'bg-opacity-60' : 'bg-opacity-20'
      } ${className}`}
    >
      <div className="flex gap-[9px] items-center">
        <div className="flex items-center relative">
          <Image
            src="/static/images/tokens/FNX.png"
            alt="token"
            className="rounded-full w-8 h-8"
            width={32}
            height={32}
          />
          <Image
            src="/static/images/tokens/ETH.png"
            alt="token"
            className="-ml-5 rounded-full w-8 h-8"
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-col">
          <h5 className="text-sm font-semibold leading-normal mb-1.5">FNX/ETH</h5>
          <div className="flex items-center gap-2">
            {type === RowDataType.VOLATILE ? (
              <Button
                variant="tertiary"
                className="!py-1 !text-xs border !border-oxford-blue-900 !rounded-[10px] !bg-limed-spruce-900 !bg-opacity-40 !h-[30px] !px-[7px]"
              >
                Volatile Pool{' '}
              </Button>
            ) : type === RowDataType.CONCENTRATED ? (
              <Button
                variant="tertiary"
                className="!py-1 hover:!border-none !bg-green-500 !border !border-solid !border-1 !border-green-400 !bg-opacity-40 !text-xs !h-[30px] !px-[7px]"
              >
                Concentrated
              </Button>
            ) : type === RowDataType.STABLE ? (
              <Button
                variant="tertiary"
                className="!py-1 !text-xs border !border-oxford-blue-900 !rounded-[10px] !bg-limed-spruce-900 !bg-opacity-40 !h-[30px] !px-[7px]"
              >
                Stable Pool
              </Button>
            ) : null}

            <Button
              variant="tertiary"
              className="!py-1 !text-xs border !border-oxford-blue-900 !rounded-[10px] !bg-limed-spruce-900 !bg-opacity-40 !h-[30px] !px-[7px]"
            >
              0.3%
            </Button>
            <Button
              variant="tertiary"
              className="!py-1 !text-xs border !border-oxford-blue-900 !rounded-[10px] !bg-limed-spruce-900 !bg-opacity-40 !h-[30px] !px-[7px]"
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
              <div className="flex gap-1 items-center">
                <span className="text-xs leading-normal font-medium">APR</span>
                <span className="icon-info text-[13px]"></span>
              </div>
              <div className="flex gap-[7px]">
                <div className="text-xs leading-normal ml-auto">34.58%</div>
                <div className="flex items-center gap-[5px] cursor-pointer text-shark-100 hover:text-transparent hover:bg-gradient-to-r hover:from-outrageous-orange-500 hover:to-festival-500 hover:bg-clip-text">
                  <span className="text-xl leading-[0] icon-link"></span>
                  <span className="text-xs leading-normal">Add Incentives</span>
                </div>
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex gap-1 items-center">
                <span className="text-xs leading-normal font-medium">TVL</span>
                <span className="icon-info text-[13px]"></span>
              </div>
              <div className="flex flex-col">
                <div className="text-xs leading-normal ml-auto">34.58%</div>
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
              <div className="flex gap-1 items-center">
                <span className="text-xs leading-normal font-medium">Volume</span>
                <span className="icon-info text-[13px]"></span>
              </div>
              <div className="flex flex-col">
                <div className="text-xs leading-normal ml-auto">34.58%</div>
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
              <div className="flex gap-1 items-center">
                <span className="text-xs leading-normal font-medium">Fees</span>
                <span className="icon-info text-[13px]"></span>
              </div>
              <div className="flex flex-col">
                <div className="text-xs leading-normal ml-auto">34.58%</div>
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
              <div className="flex gap-1 items-center">
                <span className="text-xs leading-normal font-medium">Pool Balance</span>
                <span className="icon-info text-[13px]"></span>
              </div>
              <div className="flex flex-col">
                <div className="text-xs leading-normal ml-auto">34.58%</div>
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
          <div className='px-2.5 pb-[3px]'>
            <Button
                variant="tertiary"
                className="!py-1 !text-xs border !border-oxford-blue-900 !rounded-[10px] !bg-limed-spruce-900 !bg-opacity-40 !h-[36px] !px-[7px] !w-full"
            >
                <span className="icon-circles text-lg mr-2.5"></span>
                <span>Deposit Liquidity</span>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

const RowData = ({ type }: { type: RowDataType }) => {
  return (
    <>
      <TableRow className="max-xl:hidden">
        <TableCell className="w-[30%]">
          <div className="flex items-center gap-2">
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
              <div className="flex items-center gap-2">
                {type === RowDataType.VOLATILE ? (
                  <Button variant="tertiary" className="!py-1">
                    Volatile Pool{' '}
                  </Button>
                ) : type === RowDataType.CONCENTRATED ? (
                  <Button
                    variant="tertiary"
                    className="!py-1 hover:!border-none !bg-green-500 !border !border-solid !border-1 !border-green-400 !bg-opacity-40 "
                  >
                    Concentrated
                  </Button>
                ) : type === RowDataType.STABLE ? (
                  <Button variant="tertiary" className="!py-1">
                    Stable Pool
                  </Button>
                ) : null}

                <Button variant="tertiary" className="!py-1">
                  0.3%
                </Button>
                <Button variant="tertiary" className="!py-1">
                  <span className="icon-info"></span>
                </Button>
              </div>
            </div>
          </div>
        </TableCell>
        {/* firts */}
        <TableCell className="w-[10%]">
          <div className="flex items-center ">
            <p className="text-sm text-white bg-shark-400 p-2 rounded-xl bg-opacity-40 border border-solid border-1 border-shark-300">
              34.58%
            </p>
          </div>
        </TableCell>
        {/* second */}
        <TableCell className="w-[15%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <p className="mb-1 text-sm text-white">$1,289.863.54</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-sm text-shark-100">
                <Image
                  src="/static/images/tokens/FNX.png"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                2,313,873.46
              </p>
              <p className="flex items-center gap-2 text-sm text-shark-100">
                <Image
                  src="/static/images/tokens/ETH.png"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                225.38
              </p>
            </div>
          </div>
        </TableCell>
        {/* third */}
        <TableCell className="w-[15%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <p className="mb-1 text-sm text-white">$539.863.54</p>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 text-sm text-shark-100">
                <Image
                  src="/static/images/tokens/FNX.png"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                744,621.46
              </p>
              <p className="flex items-center gap-2 text-sm text-shark-100">
                <Image
                  src="/static/images/tokens/ETH.png"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                132.49
              </p>
            </div>
          </div>
        </TableCell>
        {/* fourth */}
        <TableCell className="w-[15%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <p className="mb-1 text-sm text-white">$98.751.23</p>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 text-sm text-shark-100">
                <Image
                  src="/static/images/tokens/FNX.png"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                82,334.52
              </p>
              <p className="flex items-center gap-2 text-sm text-shark-100">
                <Image
                  src="/static/images/tokens/ETH.png"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                132.49
              </p>
            </div>
          </div>
        </TableCell>
        {/* fifth */}
        <TableCell className="flex justify-end w-[15%]">
          <div className="flex gap-2">
            <Button variant="tertiary" className="flex items-center gap-2">
              <span className="icon-info"></span>
              Info
            </Button>
            <Button variant="tertiary" className="flex items-center gap-2">
              <span className="icon-circles"></span>
              Deposit
            </Button>
          </div>
        </TableCell>
        {/* sixth */}
      </TableRow>
      <DesplegableRow type={type} className="xl:hidden" />
    </>
  )
}

export default RowData
