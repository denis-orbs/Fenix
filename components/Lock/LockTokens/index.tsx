'use client'
import { Button } from '@/components/UI'
import MainBox from '@/components/Common/Boxes/MainBox'
import InfoBox from '@/components/Common/InfoBox'
import { LOCK_LIST } from '../data'

const LockTokens = () => {
  return (
    <MainBox>
      <div className="flex flex-col items-center justify-between w-full px-10 py-8 xl:flex-row bg-shark-400 bg-opacity-40 rounded-2xl xl:rounded-none xl:py-0">
        <div className="xl:w-1/2">
          <h4 className="mb-3 text-[25px] text-white">Lock your Tokens</h4>
          <p className="mb-4 text-sm text-shark-100">
            Gain greater voting power and higher rewards, by locking more tokens for longer.
          </p>
          <div className="flex flex-col gap-2 mb-8 md:flex-row">
            <Button>
              <div className="flex gap-2">
                <span className="icon-lock"></span>
                Create a Lock
              </div>
            </Button>
            <Button variant="default">Vote</Button>
            <Button variant="default">Rewards</Button>
          </div>
          <p className="flex gap-2 text-[#53606A]">
            <span className="icon-discord"></span>
            Need some help?
          </p>
        </div>
        <div className="relative flex flex-col w-full xl:w-[40%] max-h-[390px] overflow-y-auto overflow-x-none">
          {LOCK_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} />
          ))}
        </div>
      </div>
    </MainBox>
  )
}

export default LockTokens
