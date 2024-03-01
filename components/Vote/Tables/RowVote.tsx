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
      <TableRow className="hidden xl:flex">
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
                  <span className="text-white py-1 px-3 text-xs rounded-lg border bg-shark-400 border-shark-400 ">
                    Volatile Pool{' '}
                  </span>
                )}

                {'CONCENTRATED' === row.type ? (
                  <span
                    className="py-1 px-2  text-xs rounded-lg 
                    bg-green-500 border border-solid border-1 border-green-400 bg-opacity-40 "
                  >
                    Concentrated
                  </span>
                ) : 'STABLE' === row.type ? (
                  <span
                   className="text-white py-1 px-3 text-xs rounded-lg border bg-shark-400 border-shark-400">
                    Stable Pool
                  </span>
                ) : null}

                <span className="py-1 px-3  text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                  0.3%
                </span>
                <Button variant="tertiary" className="!py-1">
                  <span className="icon-info"></span>
                </Button>
              </div>
            </div>
          </div>
        </TableCell>

        <TableCell className="w-[10%] flex justify-center">
          <div className="flex items-center">
            <p className="py-2 px-3  text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              {row.APR}%
            </p>
          </div>
        </TableCell>

        <TableCell className="w-[10%]">
          <div className="flex flex-col items-end justify-end w-full px-3">
            <p className="mb-1 text-xs text-white">0%</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-xs text-shark-100">
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

        <TableCell className="w-[30%]">
          <div className="flex items-center justify-end w-full gap-3">
            <div className="flex flex-col items-end gap-3">
              <p className="text-white text-xs">Reward</p>

              <p className="flex items-center gap-2 text-xs text-shark-100">
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

            <div className="flex flex-col items-end gap-2">
              <div className="flex">
                <p className="mb-1 text-xs text-white">Fees</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="flex items-center gap-2 text-xs text-shark-100">
                  <Image
                    src="/static/images/tokens/FNX.svg"
                    alt="token"
                    className="w-5 h-5 rounded-full"
                    width={20}
                    height={20}
                  />
                  744,621.46
                </p>
                <p className="flex items-center gap-2 text-xs text-shark-100">
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
              <Button variant="tertiary" className="flex gap-2 items-center !text-xs">
                <span className="icon-logout"></span>
                Claim Rewards
              </Button>
            </div>
          )}
        </TableCell>
      </TableRow>
      <MobileRowVote
        changeValue={changeValue}
        activeVote={activeVote}
        activeSlider={activeSlider}
        setChangeValue={setChangeValue}
        row={row}
      />
    </>
  )
}

export default RowDataVote
