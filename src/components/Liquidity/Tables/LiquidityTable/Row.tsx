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
import { useIchiVault } from '@/src/library/hooks/web3/useIchi'

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

  const [openInfo, setOpenInfo] = useState<boolean>(false)

  const aprIchi = useIchiVault(row.token0.id, row.token1.id)
  let aprdisplayIchi
  if (aprIchi && aprIchi.length > 0) {
    if (aprIchi[0].hasOwnProperty('apr')) aprdisplayIchi = aprIchi[0].apr[1].apr.toFixed(0)
  }

  return (
    <>
      <TableRow className="hidden lg:flex">
        <TableCell className={`${activeRange ? 'w-[20%]' : 'w-[20%]'}`}>
          <div className="flex items-center gap-2">
            <div className="flex items-center max-2xl:hidden">
              <Image
                src={`/static/images/tokens/${row.token0.symbol}.png`}
                alt="token"
                className="rounded-full w-7 h-7"
                width={20}
                height={20}
              />
              <Image
                src={`/static/images/tokens/${row.token1.symbol}.png`}
                alt="token"
                className="-ml-4 rounded-full w-7 h-7"
                width={20}
                height={20}
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm text-white">
                {row.token0.symbol} / {row.token1.symbol} {totalCampaigns.find(add=> add.pairAddress.toLowerCase() == row.id.toLowerCase())?.multiplier}
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
        <TableCell className={`${activeRange ? 'w-[8%]' : 'w-[10%]'} flex justify-end items-center`}>
          <div className="flex  justify-center items-center gap-2 ">
            <span ref={hoverRef} className="flex flex-row transition-transform transform group">
              {totalCampaigns.find(add=> add.pairAddress.toLowerCase() == row.id.toLowerCase()) && (
                <>
                  <Image
                    src={`/static/images/point-stack/fenix-ring.svg`}
                    alt="token"
                    className={`-mr-3 group-hover:mr-0 transition-all duration-300 rounded-full w-7 h-7`}
                    width={20}
                    height={20}
                  />
                  <Image
                    src={`/static/images/point-stack/blast.svg`}
                    alt="token"
                    className={`-mr-3 group-hover:mr-0 transition-all duration-300 rounded-full w-7 h-7`}
                    width={20}
                    height={20}
                  />
                  <Image
                    src={`/static/images/point-stack/blast-gold.svg`}
                    alt="token"
                    className={`ml-0 transition-all duration-300 rounded-full w-7 h-7`}
                    width={20}
                    height={20}
                  />
                </>
              )}

              {/* <Image
                src={`/static/images/tokens/${row.token0.symbol}.png`}
                alt="token"
                className={`-mr-4 group-hover:mr-0 transition-all duration-300 rounded-full w-7 h-7`}
                width={20}
                height={20}
              />
              <Image
                src={`/static/images/tokens/${row.token1.symbol}.png`}
                alt="token"
                className={`ml-0 transition-all duration-300 rounded-full w-7 h-7`}
                width={20}
                height={20}
              /> */}
            </span>
          </div>
        </TableCell>
        <TableCell className={`${activeRange ? 'w-[8%]' : 'w-[10%]'} flex justify-end items-center`}>
          <div className="relative flex justify-center items-center gap-2 ">
            <p className="px-2 py-2 text-xs whitespace-nowrap text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              {/* APR */}
              {aprdisplayIchi
                ? formatAmount(
                    toBN(row?.apr || 0)
                      .plus(aprdisplayIchi)
                      .div(2)
                      .toString(),
                    2
                  )
                : formatAmount(row?.apr, 2)}
              %{' '}
              <span
                className="icon-info"
                onMouseEnter={() => setOpenInfo(true)}
                onMouseLeave={() => setOpenInfo(false)}
              ></span>
            </p>
            {openInfo && (
              <div className="absolute z-10 bg-shark-950 rounded-lg border border-shark-300 w-auto xl:w-[200px] top-9 px-5 py-3 left-0 xl:-left-12">
                <div className="flex justify-between items-center gap-3">
                  <p className="text-sm pb-1">Average</p>
                  <p className="text-sm pb-1 text-chilean-fire-600">{formatAmount(row?.apr, 2)}%</p>
                </div>
                {/* <div className="flex justify-between items-center">
                  <p className="text-sm pb-1">Narrow</p>
                  <p className="text-sm pb-1 text-chilean-fire-600">55.956%</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm pb-1">Balanced</p>
                  <p className="text-sm pb-1 text-chilean-fire-600">19.139%</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm pb-1">Wide</p>
                  <p className="text-sm pb-1 text-chilean-fire-600">16.281%</p>
                </div> */}
                {aprIchi && aprIchi.length > 0 && (
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Ichi</p>
                    <p className="text-sm text-chilean-fire-600">
                      {aprdisplayIchi === null || aprdisplayIchi < 0 || aprdisplayIchi === undefined
                        ? '0'
                        : aprdisplayIchi}
                      %
                    </p>
                  </div>
                )}
              </div>
            )}
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
            <div className="flex items-center justify-end text-right gap-2">
              <p className="flex items-center justify-end text-right gap-2 font-normal text-xs text-shark-100 ">
                <Image
                  src={`/static/images/tokens/${row.token0.symbol}.png`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(Number(row.volumeToken0), 2)} {row.token0.symbol}
              </p>
              <p className="flex items-center justify-end text-right gap-2 text-xs text-shark-100 font-normal ">
                <Image
                  src={`/static/images/tokens/${row.token1.symbol}.png`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(Number(row.volumeToken1), 2)} {row.token1.symbol}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="w-[20%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            {/* FEES */}
            <p className="mb-1 text-xs text-white">{formatDollarAmount(row.feesUSD)}</p>
            <div className="flex items-center gap-2 justify-end text-right">
              <p className="flex items-center justify-end text-right gap-2 text-xs text-shark-100">
                <Image
                  src={`/static/images/tokens/${row.token0.symbol}.png`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(toBN(row.feesToken0), 2)} {row.token0.symbol}
              </p>
              <p className="flex items-center justify-end text-right gap-2 text-xs text-shark-100">
                <Image
                  src={`/static/images/tokens/${row.token1.symbol}.png`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {formatCurrency(toBN(row.feesToken1), 2)} {row.token1.symbol}
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
