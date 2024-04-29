/* eslint-disable max-len */
'use client'

import { Button, TableCell, TableRow } from '@/src/components/UI'
import { BasicPool, PoolData, v3PoolData } from '@/src/state/liquidity/types'
import Image from 'next/image'
import MobileRow from './MobileRowNew'
import { Token, fetchTokens } from '@/src/library/common/getAvailableTokens'
import { useEffect, useState, useRef } from 'react'
import { formatAmount, formatCurrency, formatDollarAmount, formatPrice, toBN } from '@/src/library/utils/numbers'
import { totalCampaigns } from '@/src/library/utils/campaigns'
import { useWindowSize, useHover } from 'usehooks-ts'

interface RowDataProps {
  row: BasicPool
  tokensData: Promise<Token[]> | null
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
  const { width } = useWindowSize()

  const hoverRef = useRef(null)
  const isHover = useHover(hoverRef)

  return (
    <>
      <TableRow className="hidden lg:flex">
        <TableCell
          className={`${activeRange ? 'w-[20%]' : 'w-[20%]'}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center max-xl:hidden">
              <Image
                src={`/static/images/tokens/${row.token0.symbol}.svg`}
                alt="token"
                className="rounded-full w-7 h-7"
                width={20}
                height={20}
              />
              <Image
                src={`/static/images/tokens/${row.token1.symbol}.svg`}
                alt="token"
                className="-ml-4 rounded-full w-7 h-7"
                width={20}
                height={20}
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm text-white">
                {row.token0.symbol} / {row.token1.symbol}
              </h5>
              <div className="flex items-center gap-2">
                <span
                  className="py-1 px-2  text-xs rounded-lg 
                    bg-gradient-to-r from-outrageous-orange-500 to-festival-500"
                >
                  Concentrated
                </span>
                <span className="!py-1 px-3  text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                  {/* FEES */}
                  {formatAmount(toBN(row.fee).div(10000), 3)}%
                </span>
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell
          className={`${activeRange ? 'w-[8%]' : 'w-[20%]'} flex justify-end items-center`}
        >
          <div className="flex  justify-center items-center gap-2 ">
            <span
              ref={hoverRef}
              className="flex flex-row transition-transform transform group"
            >
              <Image
                src={`/static/images/tokens/blastgold.png`}
                alt="token"
                className={`-mr-4 group-hover:mr-0 transition-all duration-300 rounded-full w-7 h-7`}
                width={20}
                height={20}
              />
              <Image
                src={`/static/images/tokens/blastpoints.png`}
                alt="token"
                className={`-mr-4 group-hover:mr-0 transition-all duration-300 rounded-full w-7 h-7`}
                width={20}
                height={20}
              />
              <Image
                src={`/static/images/tokens/${row.token0.symbol}.svg`}
                alt="token"
                className={`-mr-4 group-hover:mr-0 transition-all duration-300 rounded-full w-7 h-7`}
                width={20}
                height={20}
              />
              <Image
                src={`/static/images/tokens/${row.token1.symbol}.svg`}
                alt="token"
                className={`ml-0 transition-all duration-300 rounded-full w-7 h-7`}
                width={20}
                height={20}
              />
            </span>
            <p className="px-2 py-2 text-xs whitespace-nowrap text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              {/* APR */}
              {formatAmount(toBN(row.fee).div(10000).div(row.totalValueLockedUSD).multipliedBy(100), 4)}%
            </p>
          </div>
        </TableCell>

        <TableCell className={`w-[10%]`}>
          <div className="flex flex-col items-end justify-center w-full px-3">
            {/* TVL */}
            <p className="mb-1 text-xs text-white">{formatDollarAmount(Number(row.totalValueLockedUSD))}</p>
            {/* <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-xs text-shark-100">
              </p>
              <p className="flex items-center gap-2 text-xs text-shark-100">
              </p>
            </div> */}
          </div>
        </TableCell>

        <TableCell className="w-[20%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            {/* VOLUME */}
            <p className="mb-1 text-xs text-white">{formatDollarAmount(Number(row.volumeUSD))}</p>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 font-normal text-xs text-shark-100 ">
                <Image
                  src={`/static/images/tokens/${row.token0.symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(Number(row.volumeToken0), 2)}VOL0 {row.token0.symbol}
              </p>
              <p className="flex items-center gap-2 text-xs text-shark-100 font-normal ">
                <Image
                  src={`/static/images/tokens/${row.token1.symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(Number(row.volumeToken1), 2)}VOL1 {row.token1.symbol}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="w-[20%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            {/* FEES */}
            <p className="mb-1 text-xs text-white">{formatDollarAmount(row.feesUSD)}</p>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 text-xs text-shark-100">
                <Image
                  src={`/static/images/tokens/${row.token0.symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(toBN(row.feesToken0).multipliedBy(row.token0Price), 2)} {row.token0.symbol}
              </p>
              <p className="flex items-center gap-2 text-xs text-shark-100">
                <Image
                  src={`/static/images/tokens/${row.token1.symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(toBN(row.feesToken1).multipliedBy(row.token1Price), 2)} {row.token1.symbol}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="flex  items-center justify-end w-[10%]">
          <div className="flex gap-2 w-full justify-end">
            {titleButton === '' ? (
              <></>
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
                href={`/liquidity/deposit?type=CONCENTRATED_MANUAL&token0=${row.token0.id}&token1=${row.token1.id}`}
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
