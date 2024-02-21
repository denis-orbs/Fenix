'use client'
import MainBox from '@/components/Common/Boxes/MainBox'
import InfoBox from '@/components/Common/InfoBox'
import CREATE_LOCK_LIST from './data'
import Image from 'next/image'

const CreateLock = () => {

  return (
    <MainBox>
      <div className="flex flex-col justify-between w-full px-10 py-8 xl:flex-row bg-shark-400 bg-opacity-40 rounded-2xl xl:rounded-none xl:py-0">
        <div className="w-full xl:w-1/2 mb-5">
          <div className="flex justify-between">
            <h4 className="text-xl text-white">Create new Lock</h4>
            <span className="icon-reflesh text-shark-100 text-xl cursor-pointer"></span>
          </div>
          <div className="flex items-center gap-3 justify-center mt-10 box p-5">
            <div className="w-1/2 flex flex-col gap-2">
              <p className="text-xs  text-white">Amount to lock</p>
              <div className="flex text-white gap-3 items-center bg-shark-400  justify-between p-3 border border-shark-300 rounded-xl bg-opacity-40 ">
                <div className="flex gap-2 items-center">
                  <Image src={'/static/images/vote/fenix-logo.svg'} alt="fenix-logo" height={30} width={30} />
                  <p>FNX</p>
                </div>
                <span className="icon-chevron"></span>
              </div>
            </div>

            <div className="w-1/2 flex flex-col gap-2">
              <p className="text-xs text-shark-100 text-right">
                <span className="icon-wallet"></span> Avaible: 0.00FNX
              </p>
              <div>
                <input
                  type="number"
                  className="w-full bg-shark-400 p-3 rounded-lg outline-none bg-opacity-40 text-shark-100 border border-shark-300"
                  placeholder="0"
                />
                <input
                  type="button"
                  className="absolute right-5 bg-shark-400 w-[41px] border border-shark-300 rounded-full text-white text-xs p-1 mt-3 me-4"
                  value={'Max'}
                  placeholder="max"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3  mt-10 box p-5">
            <p className="text-white text-sm text-left">Locking for 6 months for 0.0 veFNX voting power</p>

            <div className="relative mb-6 w-full">
              <label htmlFor="labels-range-input" className="sr-only  ">
                Labels range
              </label>
              <input
                id="labels-range-input"
                type="range"
                className="w-full h-2 bg-shark-400 rounded-lg appearance-none cursor-pointer "
              />
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">7 days</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                1 Month
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                3 Month
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">6 Month</span>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col w-full xl:w-[40%] max-h-[390px]  overflow-x-none">
          {CREATE_LOCK_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} textColor={'text-shark-100'} />
          ))}
        </div>
      </div>
    </MainBox>
  )
}

export default CreateLock
