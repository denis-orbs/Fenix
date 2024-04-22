'use client'

import { Button, TableCell, TableRow } from '@/src/components/UI'
import { PoolData, v3PoolData } from '@/src/state/liquidity/types'
import Image from 'next/image'
import MobileRow from './MobileRow'
import { Token, fetchTokens } from '@/src/library/common/getAvailableTokens'
import { useEffect, useState, useRef } from 'react'
import { formatCurrency } from '@/src/library/utils/numbers'
import { totalCampaigns } from '@/src/library/utils/campaigns'
import { useWindowSize, useHover } from 'usehooks-ts'

interface RowDataProps {
  row: PoolData
  tokensData: Promise<Token[]>
  titleHeader?: string
  titleHeader2?: string
  titleButton?: string
  titleButton2?: string
  activeRange?: boolean
}

const RowData = ({
  row,
  tokensData,
  titleButton2,
  titleButton,
  titleHeader,
  titleHeader2,
  activeRange,
}: RowDataProps) => {
  const [tokens, setTokens] = useState<Token[]>()
  tokensData.then((data) => {
    setTokens(data)
  })

  const { width } = useWindowSize()

  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)

  return (
    <>
      <TableRow className="hidden lg:flex">
        <TableCell
          className={`${activeRange ? 'w-[20%]' : width >= 1300 ? 'w-[30%]' : width < 1300 || width >= 1280 ? 'w-[27%]' : 'w-[25%]'}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Image
                src={`/static/images/tokens/${row.pairDetails.token0Symbol}.svg`}
                alt="token"
                className="rounded-full w-7 h-7"
                width={20}
                height={20}
              />
              <Image
                src={`/static/images/tokens/${row.pairDetails.token1Symbol}.svg`}
                alt="token"
                className="-ml-4 rounded-full w-7 h-7"
                width={20}
                height={20}
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm text-white">
                {row.pairDetails.token0Symbol} / {row.pairDetails.token1Symbol}
              </h5>
              <div className="flex items-center gap-2">
                {!row.pairDetails.pairInformationV2?.stable && row.pairDetails.pairSymbol !== 'Concentrated pool' && (
                  <span className="text-white py-1 px-3 text-xs rounded-lg border bg-shark-400 border-shark-400 ">
                    Volatile Pool{' '}
                  </span>
                )}
                {row.pairDetails.pairInformationV2?.stable && row.pairDetails.pairSymbol !== 'Concentrated pool' && (
                  <span className="text-white py-1 px-3 text-xs rounded-lg border bg-shark-400 border-shark-400">
                    Stable Pool
                  </span>
                )}
                {row.pairDetails.pairSymbol === 'Concentrated pool' && (
                  <span
                    className="py-1 px-2  text-xs rounded-lg 
                    bg-gradient-to-r from-outrageous-orange-500 to-festival-500"
                    // bg-green-500 border border-solid border-1 border-green-400 bg-opacity-40 "
                  >
                    Concentrated
                  </span>
                )}
                <span className="!py-1 px-3  text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                  {row.pairDetails.fee} %
                </span>
                {/* <Button variant="tertiary" className="!py-1">
                  <span className="icon-info"></span>
                </Button> */}
              </div>
            </div>
          </div>
        </TableCell>
        {/* {activeRange && (
          <TableCell className={`w-[12%] flex items-center justify-center`}>
            <div className="flex gap-2 items-center">
              <span className="bg-green-600 w-4 h-4 rounded-full border-4 border-black"></span>
              <div className="text-xs flex flex-col">
                <p className="text-shark-100 text-center">Min Price</p>
                <span className="p-2 text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                  $0.00
                </span>
              </div>
              <div className="text-xs flex flex-col">
                <p className="text-shark-100 text-center">Max Price</p>
                <span className="p-2 text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                  $0.00
                </span>
              </div>
            </div>
          </TableCell>
        )} */}
        <TableCell className={`${activeRange ? 'w-[8%]' : 'w-[10%]'} flex justify-center items-center`}>
          <div className="flex items-center gap-3 ">
            {/* {totalCampaigns.map((campaign) => { })} */}
            <span
              ref={hoverRef}
              className="flex flex-row hover:flex-row-reverse transition-transform transform hover:scale-110"
              // className="flex flex-row hover:flex-row-reverse transition-transform transform hover:scale-110 hover:-translate-x-4"
            >
              <Image
                src={`/static/images/tokens/blastgold.png`}
                alt="token"
                // className={`${!isHover ? '-ml-4' : 'transition-all duration-300 scaleX(-1) hover:delay-200'} rounded-full w-7 h-7`}
                className={`${!isHover ? '-ml-4' : 'm-1 transition-all duration-300 hover:delay-200'} rounded-full w-7 h-7`}
                width={20}
                height={20}
              />
              <Image
                src={`/static/images/tokens/blastpoints.png`}
                alt="token"
                // className={`${!isHover ? '-ml-4' : 'transition-all duration-300 scaleX(-1) hover:delay-200'} rounded-full w-7 h-7`}
                className={`${!isHover ? '-ml-4' : 'm-1 transition-all duration-300 hover:delay-200'} rounded-full w-7 h-7`}
                width={20}
                height={20}
              />
              <Image
                src={`/static/images/tokens/${row.pairDetails.token0Symbol}.svg`}
                alt="token"
                // className={`${!isHover ? '-ml-4' : 'transition-all duration-300 scaleX(-1) hover:delay-200'} rounded-full w-7 h-7`}
                className={`${!isHover ? '-ml-4' : 'm-1 transition-all duration-300 hover:delay-200'} rounded-full w-7 h-7`}
                width={20}
                height={20}
              />
              <Image
                src={`/static/images/tokens/${row.pairDetails.token1Symbol}.svg`}
                alt="token"
                // className={`${!isHover ? '-ml-4' : 'transition-all duration-300 scaleX(-1) hover:delay-200'} rounded-full w-7 h-7`}
                className={`${!isHover ? '-ml-4' : 'm-1 transition-all duration-300 hover:delay-200'} rounded-full w-7 h-7`}
                width={20}
                height={20}
              />
            </span>
            <p className="p-2 text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              {row.pairDetails.apr.toFixed(2)} %{' '}
            </p>
          </div>
        </TableCell>

        <TableCell className="w-[15%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <p className="mb-1 text-xs text-white">$ {formatCurrency(Number(row.pairDetails.tvl))}</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-xs text-shark-100">
                {/* <Image
                  src="/static/images/tokens/FNX.svg"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                /> */}
              </p>
              <p className="flex items-center gap-2 text-xs text-shark-100">
                {/* <Image
                  src="/static/images/tokens/ETH.svg"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                225.38 */}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="w-[15%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <p className="mb-1 text-xs text-white">$ {formatCurrency(Number(row.pairDetails.volumeUSD))}</p>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 text-xs text-shark-100">
                <Image
                  src={`/static/images/tokens/${row.pairDetails.token0Symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(Number(row.pairDetails.volumeToken0))} {row.pairDetails.token0Symbol}
              </p>
              <p className="flex items-center gap-2 text-xs text-shark-100">
                <Image
                  src={`/static/images/tokens/${row.pairDetails.token1Symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(Number(row.pairDetails.volumeToken1))} {row.pairDetails.token1Symbol}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="w-[15%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <p className="mb-1 text-xs text-white">
              $ {formatCurrency(Number(row.pairDetails.volumeUSD) * (Number(row.pairDetails.fee) / 100))}{' '}
            </p>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 text-xs text-shark-100">
                <Image
                  src={`/static/images/tokens/${row.pairDetails.token0Symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(Number(row.pairDetails.volumeToken0) * (Number(row.pairDetails.fee) / 100))}{' '}
                {row.pairDetails.token0Symbol}
              </p>
              <p className="flex items-center gap-2 text-xs text-shark-100">
                <Image
                  src={`/static/images/tokens/${row.pairDetails.token1Symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(Number(row.pairDetails.volumeToken1) * (Number(row.pairDetails.fee) / 100))}{' '}
                {row.pairDetails.token1Symbol}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="flex justify-end items-center w-[15%]">
          <div className="flex gap-2 w-full">
            {titleButton === '' ? (
              <Button variant="tertiary" className="flex items-center gap-2 w-24 h-9 !text-xs ">
                <span className="icon-info"></span>
                Info
              </Button>
            ) : (
              <Button variant="tertiary" className="flex items-center gap-2 w-24 h-9 !text-xs">
                <span className="icon-coin"></span>
                Claim
              </Button>
            )}

            {titleButton2 === '' ? (
              <Button
                variant="tertiary"
                className="flex items-center gap-2  w-24 h-9 !text-xs"
                href={`/liquidity/deposit?type=${!row.pairDetails.pairInformationV2?.stable && row.pairDetails.pairSymbol !== 'Concentrated pool' ? 'VOLATILE' : row.pairDetails.pairInformationV2?.stable && row.pairDetails.pairSymbol !== 'Concentrated pool' ? 'STABLE' : 'CONCENTRATED_MANUAL'}&token0=${row.pairDetails.pairInformationV2?.token0}&token1=${row.pairDetails.pairInformationV2?.token1}`}
              >
                <span className="icon-circles"></span>
                Deposit
              </Button>
            ) : (
              <Button
                variant="tertiary"
                className="flex items-center gap-2 w-24 h-9 !text-xs "
                href="/liquidity/deposit"
              >
                <span className="icon-logout"></span>
                Manage
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
      <MobileRow
        row={row}
        titleHeader={titleHeader}
        titleButton={titleButton}
        titleButton2={titleButton2}
        titleHeader2={titleHeader2}
        activeRange={activeRange}
      />
    </>
  )
}

export default RowData
