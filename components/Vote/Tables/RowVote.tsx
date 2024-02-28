/* eslint-disable max-len */

'use client'
import Image from 'next/image'
import { TableCell, TableRow, Button } from '@/components/UI'
import InputRange from '../../UI/SliderRange/InputRange'
import { useState } from 'react'
import MobileRowVote from './MobileRowVote'

type IRow = {
  type: string
  APR: string
}

interface RowDataProps {
  row: IRow
  activeVote: boolean
  activeSlider?: boolean
}

const RowDataVote = ({ row, activeVote, activeSlider }: RowDataProps) => {
  const [changeValue, setChangeValue] = useState(0)
  return (
    <>
      <TableRow className="max-xl:hidden">
        <TableCell className="w-[30%]">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Image
                src="/static/images/tokens/FNX.svg"
                alt="token"
                className="rounded-full w-7 h-7"
                width={20}
                height={20}
              />
              <Image
                src="/static/images/tokens/ETH.svg"
                alt="token"
                className="-ml-4 rounded-full w-7 h-7"
                width={20}
                height={20}
              />
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm text-white">FNX / ETH</h5>
              <div className="flex items-center gap-2">
                {'VOLATILE' === row.type && (
                  <Button variant="tertiary" className="!py-1">
                    Volatile Pool{' '}
                  </Button>
                )}

                {'CONCENTRATED' === row.type ? (
                  <Button
                    variant="tertiary"
                    className="!py-1 hover:!border-none !bg-green-500 !border !border-solid !border-1 !border-green-400 !bg-opacity-40 "
                  >
                    Concentrated
                  </Button>
                ) : 'STABLE' === row.type ? (
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

        <TableCell className="w-[10%] flex justify-center">
          <div className="flex items-center">
            <p className="p-2 text-sm text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              {row.APR}%
            </p>
          </div>
        </TableCell>

        <TableCell className="w-[20%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <p className="mb-1 text-sm text-white">0%</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-sm text-shark-100">
                <Image
                  src="/static/images/tokens/ETH.svg"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                2,313,873.46
              </p>
            </div>
          </div>
        </TableCell>

        <TableCell className="w-[20%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <div className="flex gap-24 mb-2">
              <p className="text-white text-sm">Reward</p>
              <p className="mb-1 text-sm text-white">Fees</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex items-center gap-2 text-sm text-shark-100">
                <Image
                  src="/static/images/tokens/ETH.svg"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                2,313,873.46
              </p>
              <p className="flex items-center gap-2 text-sm text-shark-100">
                <Image
                  src="/static/images/tokens/FNX.svg"
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                744,621.46
              </p>
              <p className="flex items-center gap-2 text-sm text-shark-100">
                <Image
                  src="/static/images/tokens/ETH.svg"
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

        <TableCell className="flex items-center justify-end w-[20%]">
          {activeSlider ? (
            <div className="w-4/5">
              <div>
                <InputRange
                  step={1}
                  max={100}
                  min={0}
                  height={7}
                  value={changeValue}
                  onChange={setChangeValue}
                  thumbSize={18}
                  disabled={!activeVote}
                />
                <div className="flex justify-between text-sm text-shark-100">
                  <p>0%</p>
                  <p>100%</p>
                </div>
              </div>
            </div>
          ) : (
            <div>

              <Button variant='tertiary' className='flex gap-2 items-center'>
                <span className='icon-logout'></span>
                Claim Rewards</Button>
            </div>
          )}
        </TableCell>
      </TableRow>
      <MobileRowVote changeValue={changeValue} activeVote={activeVote}
      activeSlider={activeSlider}
      setChangeValue={setChangeValue} row={row} />
    </>
  )
}

export default RowDataVote
