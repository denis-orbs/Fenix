'use client'
import Image from 'next/image'

import { useState } from 'react'
import SelectToken from '@/components/Modals/SelectToken'

import { IToken } from '@/types'

interface PairSelectorProps {
  firstToken: IToken
  setFirstToken: (token: IToken) => void
  secondToken: IToken
  setSecondToken: (token: IToken) => void
}

const PairSelector = ({ firstToken, setFirstToken, secondToken, setSecondToken }: PairSelectorProps) => {
  const [openSelectFirstToken, setOpenSelectFirstToken] = useState<boolean>(false)
  const [openSelectSecondToken, setOpenSelectSecondToken] = useState<boolean>(false)

  return (
    <div className="bg-shark-400 bg-opacity-40 py-[29px] px-[15px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
      <div className="mb-2 text-xs leading-normal text-white">Select a Pair</div>

      <div className="flex items-center gap-3">
        <div
          className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-2.5 md:px-4 flex cursor-pointer items-center justify-between h-[45px] md:h-[50px] w-full"
          onClick={() => setOpenSelectFirstToken(true)}
        >
          <div className="flex items-center gap-2.5 md:gap-2">
            <Image
              src={`/static/images/tokens/${firstToken.symbol}.png`}
              alt="token"
              className="w-5 h-5 rounded-full md:w-6 md:h-6"
              width={24}
              height={24}
            />
            <span className="text-xs md:text-base">{firstToken.symbol}</span>
          </div>
          <span className="inline-block ml-2 text-xs icon-chevron md:text-sm" />
        </div>
        <div className="flex-grow flex justify-center items-center w-[50px]">
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={() => {
              const temp = firstToken
              setFirstToken(secondToken)
              setSecondToken(temp)
            }}
          >
            <span className="text-2xl text-transparent icon-swap bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
          </button>
        </div>
        <div
          className="bg-shark-400 bg-opacity-40 rounded-lg cursor-pointer text-white px-2.5 md:px-4 flex items-center justify-between h-[45px] md:h-[50px] w-full"
          onClick={() => setOpenSelectSecondToken(true)}
        >
          <div className="flex items-center gap-2.5 md:gap-2">
            <Image
              src={`/static/images/tokens/${secondToken.symbol}.png`}
              alt="token"
              className="w-5 h-5 rounded-full md:w-6 md:h-6"
              width={24}
              height={24}
            />
            <span className="text-xs md:text-base">{secondToken.symbol}</span>
          </div>
          <span className="inline-block ml-2 text-xs icon-chevron md:text-sm" />
        </div>
      </div>

      <SelectToken openModal={openSelectFirstToken} setOpenModal={setOpenSelectFirstToken} setToken={setFirstToken} />
      <SelectToken
        openModal={openSelectSecondToken}
        setOpenModal={setOpenSelectSecondToken}
        setToken={setSecondToken}
      />
    </div>
  )
}

export default PairSelector
