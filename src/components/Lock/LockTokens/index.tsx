'use client'

import Link from 'next/link'
import { Button } from '@/src/components/UI'
import MainBox from '@/src/components/Common/Boxes/MainBox'
import InfoBox from '@/src/components/Common/InfoBox'
import { LOCK_LIST } from '../data'
import { useAppSelector } from '@/src/state'

interface LockTokensProps {
  changeState: boolean
  setChangeState: (parameter: boolean) => void
}

const LockTokens = ({ changeState, setChangeState }: LockTokensProps) => {
  const handlerChangeState = () => (changeState ? setChangeState(false) : setChangeState(true))
  const lock = useAppSelector((state) => state.lock)
  const now = new Date().getTime() / 1000
  let activeamount = 0
  let inactiveamount = 0
  for (let i = 0; i < lock.positions.length; i++) {
    if (BigInt(now.toFixed(0).toString()) < lock.positions[i].veNFTInfo.lockEnd) {
      activeamount += Number(lock.positions[i].veNFTInfo.amount) / 10 ** 18
    } else {
      inactiveamount += Number(lock.positions[i].veNFTInfo.amount) / 10 ** 18
    }
  }
  LOCK_LIST[0].amount = lock.positions.length.toString()
  LOCK_LIST[1].amount = activeamount.toString() + ' veFNX'
  LOCK_LIST[2].amount = inactiveamount.toString() + ' veFNX'
  return (
    <MainBox>
      <div className="flex flex-col items-center justify-between w-full xl:flex-row z-10 relative xl:min-h-[350px]">
        <div className="w-full xl:w-1/2">
          <h4 className="mb-3 text-xl text-white">Lock your Tokens</h4>
          <p className="mb-4 text-sm text-shark-100">
            Gain greater voting power and higher rewards, by locking more tokens for longer.
          </p>
          <div className="flex flex-col gap-2 md:flex-row">
            <Button onClick={handlerChangeState}>
              <div className="flex gap-2">
                <span className="icon-lock"></span>
                Create a Lock
              </div>
            </Button>
            <Button variant="default" href="/vote">
              Vote
            </Button>
          </div>
          <Link target="_blank" href="https://discord.com/invite/fenixfi" className="flex text-sm gap-2 p-2 xl:mt-8 text-[#53606A]">
            <span className="icon-discord"></span>
            Need some help?
          </Link>
        </div>
        <div className="relative flex flex-col w-full xl:w-[40%] max-h-[390px]  overflow-x-none">
          {LOCK_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} />
          ))}
        </div>
      </div>
    </MainBox>
  )
}

export default LockTokens
