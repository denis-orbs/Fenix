import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/UI'
import InputRange from '@/components/UI/SliderRange/InputRange'

type IRow = {
  type: string
  APR: string
}

interface RowDataProps {
  row: IRow
  changeValue: number
  setChangeValue: (value: number) => void
  activeVote: boolean
  activeSlider?: boolean
}

const MobileRowVote = ({ row, changeValue, setChangeValue, activeVote, activeSlider }: RowDataProps) => {
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
              src="/static/images/tokens/FNX.svg"
              alt="token"
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />
            <Image
              src="/static/images/tokens/ETH.svg"
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
                <span className="text-white py-1 px-3 text-xs rounded-lg border bg-shark-400 border-shark-400 ">
                  Volatile Pool
                </span>
              )}
              {'CONCENTRATED' === row.type && (
                <span
                  className="py-1 px-2  text-xs rounded-lg 
                bg-green-500 border border-solid border-1 border-green-400 bg-opacity-40 "
                >
                  Concentrated
                </span>
              )}
              {'STABLE' === row.type && (
                <span className="text-white py-1 px-3 text-xs rounded-lg border bg-shark-400 border-shark-400">
                  Stable Pool
                </span>
              )}

              <span className="py-1 px-3  text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                0.3%
              </span>
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
              <div
                className="flex items-start justify-between border border-shark-300 p-4 rounded-lg

                  "
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium leading-normal">APR</span>
                </div>
                <div className="flex gap-[7px]">
                  <div className="ml-auto text-xs leading-normal">34.58%</div>
                  <div
                    className="flex items-center gap-[5px] cursor-pointer
                         text-shark-100 hover:text-transparent hover:bg-gradient-to-r hover:from-outrageous-orange-500 hover:to-festival-500 hover:bg-clip-text"
                  ></div>
                </div>
              </div>

              <div className="flex items-start justify-between border  border-shark-300 p-4 rounded-lg">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium leading-normal">Your Votes</span>
                </div>
                <div className="flex flex-col">
                  <div className="ml-auto text-xs leading-normal">0%</div>
                  <div className="flex gap-2.5 text-shark-100">
                    <div className="flex items-center gap-[5px]">
                      <Image
                        src="/static/images/tokens/ETH.svg"
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

              <div className="flex items-start justify-between border border-shark-300 p-4 rounded-lg">
                <div>
                  <span className="text-xs font-medium leading-normal">Total Rewards</span>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col items-end">
                    <p className="text-white text-xs">Reward</p>

                    <p className="flex gap-2 mt-2 text-xs text-shark-100">
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
                  <div className="flex flex-col items-end">
                    <p className="mb-1 text-xs text-white">Fees</p>
                    <div className="flex gap-2">
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
              </div>

              <div className="flex items-start justify-between border border-shark-300 p-4 rounded-lg">
                {activeSlider ? (
                  <div className="w-full">
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
                  <div className="w-full">
                    <Button variant="tertiary" className="flex gap-2 w-full items-center">
                      <span className="icon-logout"></span>
                      Claim Rewards
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default MobileRowVote
