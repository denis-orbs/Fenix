import { Button } from '@/src/components/UI'
import MainBox from '@/src/components/Common/Boxes/MainBox'
import InfoBox from '@/src/components/Common/InfoBox'
import { REWARD_LIST } from '../data'
const RewardBox = () => {
  return (
    <MainBox>
      <div className="flex flex-col items-center justify-between w-full xl:flex-row relative z-10">
        <div className="w-full xl:w-1/2">
          <h4 className="mb-3 text-2xl text-white">Rewards</h4>
          <p className="mb-4 text-sm text-shark-100">
            Select your veFNX and use 100% of your votes for one or more pools to earn bribes and trading fees.
          </p>
          <div>
            <Button variant="primary" className="flex gap-2 items-center !text-sm">
              <span className="icon-wallet"></span>
              Connect your Wallet
            </Button>
          </div>
          <div className="flex gap-2 items-center text-shark-100 text-sm py-2">
            <span className="icon-link"></span>
            <p>About Migration</p>
          </div>
        </div>
        <div className="relative flex flex-col w-full xl:w-[40%]">
          {REWARD_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} hasTooltip={false} />
          ))}
          <div className='mx-auto text-sm mt-5'>
            <p className="text-shark-100 gap-2 flex items-center">
              <span className="icon-discord"></span>
              Need some help?
            </p>
          </div>
        </div>
      </div>
    </MainBox>
  )
}

export default RewardBox
