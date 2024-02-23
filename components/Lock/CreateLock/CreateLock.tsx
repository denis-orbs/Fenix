'use client'
import MainBox from '@/components/Common/Boxes/MainBox'
import InfoBox from '@/components/Common/InfoBox'
import CREATE_LOCK_LIST from './data'
import Image from 'next/image'
import InputRange from '@/components/UI/SliderRange/InputRange'
import { Button , ProgressBar } from '@/components/UI'
import { useState } from 'react'

const CreateLock = () => {
  const [changeValue, setChangeValue] = useState(0)
  const OPTIONS = ['7D', '3M', '6M', '1Y', '2Y']

  return (
    <MainBox className='xl:min-w-[1300px]'>
      <div className="flex flex-col w-full xl:flex-row relative z-10 pb-60 xl:pb-0 xl:py-8">
        <div className="w-full mb-5 xl:w-[45%]">
          <div className="flex justify-between">
            <h4 className="text-xl text-white">Create new Lock</h4>
            <span className="icon-reflesh text-shark-100 text-xl cursor-pointer"></span>
          </div>
          <div className="flex flex-col xl:flex-row items-center gap-3 justify-center mt-10 exchange-box-x1 p-5">
            <div className="xl:w-2/5 w-full flex flex-col gap-2">
              <p className="text-xs  text-white">Amount to lock</p>
              <div className="flex text-white gap-3 items-center bg-shark-400  justify-between p-3 border border-shark-300 rounded-xl bg-opacity-40 ">
                <div className="flex gap-2 items-center">
                  <Image src={'/static/images/vote/fenix-logo.svg'} alt="fenix-logo" height={30} width={30} />
                  <p>FNX</p>
                </div>
                <span className="icon-chevron"></span>
              </div>
            </div>

            <div className="xl:w-3/5 w-full flex flex-col gap-2">
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
                  className="absolute right-16 button-tertiary w-[41px] border border-shark-300 rounded-full text-white text-xs p-1 mt-3 me-4"
                  value={'Half'}
                  placeholder="Half"
                />
                <input
                  type="button"
                  className="absolute right-5 button-tertiary w-[41px] border border-shark-300 rounded-full text-white text-xs p-1 mt-3 me-4"
                  value={'Max'}
                  placeholder="max"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3  mt-5 exchange-box-x1 p-5">
            <div className="text-sm flex justify-between">
              <p className="text-white text-sm text-left">Expires in</p>
              <div className="text-shark-100 flex gap-2">
                <p>0Y</p>
                <p>0M</p>
                <p>7D</p>
              </div>
            </div>
            <div>
              <InputRange
                step={1}
                max={100}
                min={0}
                height={7}
                value={changeValue}
                onChange={setChangeValue}
                thumbSize={18}
                disabled={true}
              />
              <div className="text-shark-100 flex  text-sm justify-between ">
                {OPTIONS.map((option, index) => {
                  return <div key={index}>{option}</div>
                })}
              </div>
            </div>
          </div>
          <div className="exchange-box-x1 p-5 mt-5 flex justify-between items-center text-white text-sm">
            <div>
              <p>Voting Power</p>
            </div>
            <div>
              <p className="p-2  border flex items-center bg-shark-400 border-shark-300 rounded-lg bg-opacity-40">
                0.00 veFNX
              </p>
            </div>
          </div>
          <div className="exchange-box-x1 p-5 mt-5 flex gap-2 items-center text-white text-sm">
            <Image src={'/static/images/lock/fenix-byLocking.svg'} alt="fenix" height={48} width={48} />
            <p className="text-shark-100 text-sm">
              By locking your FNX you create a veFNX NFT that contains your locked amount.
            </p>
          </div>
          <div className="mt-4">
            <Button className="w-full" variant="tertiary">
              Create Lock
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center w-[10%] relative ">
          <div className="bg-shark-400 h-4/5 w-[1px]"></div>
        </div>
        <div className="relative flex flex-col w-full xl:w-[45%] max-h-[390px]  overflow-x-none">
          <div>
            <h1 className="text-white text-xl mb-20">How it works</h1>
          </div>

          {CREATE_LOCK_LIST.map((exchange, index) => (
            <InfoBox bgBox='exchange-box-info' key={index} data={exchange} textColor={'text-shark-100'} />
          ))}
          
          <div className='mt-16 '>
            <p className='flex gap-2 justify-center text-shark-100'><span className='icon-discord'></span>Need some help?</p>
          </div>
          <div className="absolute top-0 z-10 w-28 right-0">
            <ProgressBar progress={50} />
          </div>
        </div>
      </div>
    </MainBox>
  )
}

export default CreateLock
