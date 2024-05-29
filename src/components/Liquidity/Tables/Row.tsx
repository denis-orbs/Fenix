'use client'

import Image from 'next/image'
import { TableCell, TableRow, Button } from '@/src/components/UI'
import MobileRow from './MobileRow'
import { PoolData } from '@/src/state/liquidity/types'
import { formatAmount, formatCurrency, fromWei } from '@/src/library/utils/numbers'

interface RowDataProps {
  row: PoolData
  titleHeader?: string
  titleHeader2?: string
  titleButton?: string
  titleButton2?: string
  activeRange?: boolean
}

const RowData = ({ row, titleButton2, titleButton, titleHeader, titleHeader2, activeRange }: RowDataProps) => {
  return (
    <>
      <TableRow className="hidden 2xl:flex">
        <TableCell className={`${activeRange ? 'w-[20%]' : 'w-[30%]'}`}>
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
                {row.pairDetails.pairInformationV2?.token0_symbol} / {row.pairDetails.pairInformationV2?.token1_symbol}
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
                    bg-outrageous-orange-500 border border-solid border-1 border-outrageous-orange-400 text-white bg-opacity-40 "
                  >
                    Concentrated
                  </span>
                )}
                <span className="!py-1 px-3  text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                  {row.pairDetails.fee} %
                </span>
                <Button variant="tertiary" className="!py-1">
                  <span className="icon-info"></span>
                </Button>
              </div>
            </div>
          </div>
        </TableCell>
        {activeRange && (
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
        )}
        <TableCell className={`${activeRange ? 'w-[8%]' : 'w-[10%]'} flex justify-center items-center`}>
          <div className="flex items-center  ">
            <p className="p-2 text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              {row.pairDetails.apr} %
            </p>
          </div>
        </TableCell>

        <TableCell className="w-[15%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <p className="mb-1 text-xs text-white">$ {formatCurrency(Number(row.pairDetails.tvl))}</p>
            <div className="flex items-center gap-4">
              {/* <p className="flex items-center gap-2 text-xs text-shark-100">
                <Image
                  src="/static/images/tokens/FNX.svg"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                2,313,873.46
              </p>
              <p className="flex items-center gap-2 text-xs text-shark-100">
                <Image
                  src="/static/images/tokens/ETH.svg"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                225.38
              </p> */}
            </div>
          </div>
        </TableCell>

        <TableCell className="w-[15%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <p className="mb-1 text-xs text-white">
              ${' '}
              {formatCurrency(
                (
                  Number(
                    fromWei(
                      row.pairDetails.pairInformationV2?.account_token0_balance.toString(),
                      row.pairDetails.pairInformationV2?.token0_decimals
                    )
                  ) *
                    row.pairDetails.priceA +
                  Number(
                    fromWei(
                      row.pairDetails.pairInformationV2?.account_token1_balance.toString(),
                      row.pairDetails.pairInformationV2?.token1_decimals
                    )
                  ) *
                    row.pairDetails.priceB
                ).toFixed(2)
              )}
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
                {Number(
                  fromWei(
                    row.pairDetails.pairInformationV2?.account_token0_balance.toString(),
                    row.pairDetails.pairInformationV2?.token0_decimals
                  )
                ).toFixed(2)}
              </p>
              <p className="flex items-center gap-2 text-xs text-shark-100">
                <Image
                  src={`/static/images/tokens/${row.pairDetails.token1Symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                {Number(
                  fromWei(
                    row.pairDetails.pairInformationV2?.account_token1_balance.toString(),
                    row.pairDetails.pairInformationV2?.token1_decimals
                  )
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="w-[15%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <p className="mb-1 text-xs text-white">
              $ {Number(row.pairDetails.myPoolAmountValue.toString()).toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 text-xs text-shark-100">
                {/* <Image
                  src={`/static/images/tokens/${row.pairDetails.token0Symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                /> */}
                {Number(fromWei(row.pairDetails.pairInformationV2?.account_lp_balance.toString(), 18)).toFixed(5)} LP
              </p>
              {/* <p className="flex items-center gap-2 text-xs text-shark-100">
                <Image
                  src={`/static/images/tokens/${row.pairDetails.token1Symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                132.49
              </p> */}
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
              <Button variant="tertiary" className="flex items-center gap-2  w-24 h-9 !text-xs" href="/liquidity">
                <span className="icon-circles"></span>
                Deposit
              </Button>
            ) : (
              <Button
                variant="tertiary"
                className="flex items-center gap-2 w-24 h-9 !text-xs "
                // eslint-disable-next-line max-len
                href={`/liquidity/deposit#${!row.pairDetails.pairInformationV2?.stable && row.pairDetails.pairSymbol !== 'Concentrated pool' ? 'volatile' : row.pairDetails.pairInformationV2?.stable && row.pairDetails.pairSymbol !== 'Concentrated pool' ? 'stable' : 'manual'}-${row.pairDetails.pairInformationV2?.token0}-${row.pairDetails.pairInformationV2?.token1}`}
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
