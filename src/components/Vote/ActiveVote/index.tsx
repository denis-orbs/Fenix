import { AppThunkDispatch, useAppSelector } from '@/src/state'
import { fetchNftsAsync } from '@/src/state/lock/reducer'
import { lockState } from '@/src/state/lock/types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAccount } from 'wagmi'

interface ActiveVoteProps {
  handlerChange?: () => void
}

const ActiveVote = ({ handlerChange }: ActiveVoteProps) => {
  const [nowTime, setnowTime] = useState<Number>(0)

  const locks = useAppSelector((state) => state.lock as lockState)
  const { address } = useAccount()

  useEffect(() => {
    const nowTime = new Date().getTime() / 1000
    setnowTime(nowTime)
  }, [address])

  return (
    <div
      className={`flex flex-wrap  xl:flex-nowrap items-center gap-8 p-5 text-white border-solid border-1
       border-shark-400 bg-shark-400 bg-opacity-40 rounded-xl`}
    >
      <div className="flex justify-between w-full items-center cursor-pointer " onClick={handlerChange}>
        <div className="flex items-center gap-2  ">
          <Image
            alt="logo-fenix"
            src={'/static/images/vote/fenix-logo.svg'}
            className="h-[32px] w-[32px]"
            width={61}
            height={61}
          />
          <div className="flex flex-col">
            <div className="flex gap-2 items-center ">
              <p className="text-shark-100 text-xs">Selected Position</p>
            </div>
            <div className="flex text-xs gap-2 ">
              <p>{locks?.veNFTInfo.account != '0x' ? locks?.veNFTInfo.id.toString() : null}</p>
              {BigInt(nowTime.toFixed(0).toString()) < Number(locks?.veNFTInfo.lockEnd) ? (
                <p className="text-green-400">
                  <span>•</span> Active
                </p>
              ) : (
                <p className=" text-red-400">
                  <span>•</span> Expired
                </p>
              )}
            </div>
          </div>
        </div>
        <span className="icon-chevron"></span>
      </div>
      <div className="flex xl:justify-end xl:gap-4 w-full  justify-center gap-5 items-center">
        <div className="text-xs text-center  xl:w-auto">
          <p className="text-shark-100">Position</p>
          <p>{(Number(locks?.veNFTInfo.amount) / 10 ** 18).toFixed(2)} FNX</p>
        </div>
        <div className="text-xs text-center xl:w-auto">
          <p className="text-shark-100">Voting Power</p>
          <p>{(Number(locks?.veNFTInfo.voting_amount) / 10 ** 18).toFixed(2)} veFNX</p>
        </div>
        <div className="text-xs text-center xl:w-auto">
          <p className="text-shark-100">Rewards</p>
          <p className="text-green-300">$0</p>
        </div>
      </div>
    </div>
  )
}

export default ActiveVote
