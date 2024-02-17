'use client'
import MainBox from '@/components/Common/Boxes/MainBox'
import { EXCHANGE_LIST } from '../data'
import InfoBox from '@/components/Common/InfoBox'
import { Button } from '@/components/UI'

interface MigrationsProps {
  isConnected: boolean
}

const Migration = ({ isConnected }: MigrationsProps) => {
  // const [show, setShow] = useState<boolean>(false) ???

  return (
    <MainBox>
      <div className="flex flex-col items-center justify-between w-full xl:flex-row bg-shark-400 bg-opacity-40 rounded-2xl xl:rounded-none py-8 xl:py-0 lg:px-10 px-5">
        <div className="lg:ms-5 w-full xl:w-1/2">
          <h4 className="mb-3 text-[18px] lg:text-[25px] md:[text-25px]  text-white">Migration Claim</h4>
          <p className="mb-4 text-[12px] text-shark-100 ">Deposit your CHR ecosystem tokens to migrate.</p>
          <div className="flex lg:gap-5 gap-3 box bg-shark-400 bg-opacity-20  w-[280px] h-[67px] lg:h-auto lg:w-96 rounded-lg lg:mb-5  mb-2 items-center justify-center lg:justify-normal">
            <div>
              <p className="text-shark-100 font-bold text-[12px]">Migration</p>
              <p className="text-green-400 text-[12px]">Open</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white text-[8px] lg:text-[12px] bg-shark-300 flex items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                30
              </span>
              <p className="text-shark-100 text-[11px] lg:text-[12px]">Days</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white bg-shark-300 text-[8px] lg:text-[12px] flex items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                30
              </span>
              <p className="text-shark-100 text-[11px] lg:text-[12px]">Hours</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white bg-shark-300 text-[8px] lg:text-[12px] flex items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                30
              </span>
              <p className="text-shark-100 text-[11px] lg:text-[12px]">Minutes</p>
            </div>
            <div className="flex items-center flex-col">
              <span className="text-white bg-shark-300 flex text-[8px] lg:text-[12px]  items-center p-2 h-[27px] bg-opacity-30  rounded-md">
                30
              </span>
              <p className="text-shark-100 text-[11px] lg:text-[12px]">Seconds</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-8 md:flex-row">
            <Button className="lg:w-[200px] h-[38px] w-full flex-shrink-0">
              {/* <div className="flex gap-3"> */}
              {isConnected ? (
                <>
                  <div className="flex gap-2 items-center">
                    <span className="icon-coin-received text-lg"></span>
                    <span className="text-[12px]">Check Tokens</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-3 items-center">
                    <span className="icon-wallet"></span>
                    <span className="lg:text-[12px] text-[10px] xl:text-[12px]">Connect Your Wallet</span>
                  </div>
                </>
              )}
              {/* <span className="text-[12px]">{isConnected ? `Check Tokens` :  `Connect your Wallet`}</span> */}
              {/* </div> */}
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <p className="flex items-center text-[12px] gap-3 mb-8 lg:text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
              <span className="lg:text-lg icon-link"></span>
              About Migration
            </p>
          </div>
        </div>
        <div className="relative h-72 overflow-y-auto overflow-x-hidden flex flex-col w-full xl:w-[40%]">
          {EXCHANGE_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} hasTooltip />
          ))}
           <div className='flex gap-2 text-shark-100  justify-center'>
          <span className="icon-discord"></span>
          <p>Need some help?</p>
          </div>
        </div>
        
      </div>
    
    </MainBox>
  )
}

export default Migration
