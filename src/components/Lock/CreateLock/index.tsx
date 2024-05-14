'use client'

import Link from 'next/link'
import { useState } from 'react'
import MainBox from '@/src/components/Common/Boxes/MainBox'
import InfoBox from '@/src/components/Common/InfoBox'
import CREATE_LOCK_LIST from './data'
import Image from 'next/image'
import InputRange from '@/src/components/UI/SliderRange/InputRange'
import { Button, ProgressBar } from '@/src/components/UI'

const CreateLock = () => {
  const [changeValue, setChangeValue] = useState(0)
  const OPTIONS = ['7D', '3M', '6M', '1Y', '2Y']

  return (
    <div className="w-full  lock-box xl:mt-20 mt-28">
      <div className="absolute -top-24 xl:-top-16 w-full left-0 xl:left-8">
        <div className="box-notification ">
          <div className="relative z-10 flex py-4 justify-between px-4 ">
            <div className="flex items-center gap-2 w-2/3 ">
              <div className="flex items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
                <span className="inline-block text-2xl text-gradient icon-bell"></span>
              </div>
              <p className="text-shark-100 text-xs">
                Create a Lock for more than 2 years and enjoy the benefits of our APR Performance.
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-shark-100 text-xs">Current APR</p>
              <p className="p-2 text-xs text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
                0.00%
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full xl:flex-row relative z-10  ">
        <div className="w-full mb-5 xl:w-[45%]">
          <div className="flex justify-between">
            <h4 className="text-xl font-semibold text-white">Create new Lock</h4>
            <span className="icon-refresh text-shark-100 text-2xl cursor-pointer"></span>
          </div>
          <div className="flex flex-col xl:flex-row items-center gap-3 justify-center my-4 exchange-box-x1 p-5">
            <div className="xl:w-2/5 w-full flex flex-col gap-2">
              <p className="text-xs  text-white">Amount to lock</p>
              <div className="flex text-white gap-3 items-center bg-shark-400  justify-between p-3 border border-shark-300 rounded-xl bg-opacity-40 ">
                <div className="flex gap-2 items-center">
                  <Image src={'/static/images/lock/Fenix-Icon.svg'} alt="fenix-logo" height={30} width={30} />
                  <p>FNX</p>
                </div>
                {/* <span className="icon-chevron"></span> */}
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
          <div className="flex flex-col   mt-5 exchange-box-x1 xl:max-h-[100px] p-6">
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
          <div className="exchange-box-x1 xl:max-h-[51px] px-8 mt-5 flex justify-between items-center text-white text-xs">
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
        <div className="relative flex flex-col w-full xl:w-[45%]  overflow-x-none">
          <div className="flex justify-between">
            <h1 className="text-white font-normal text-xl mb-5 xl:mt-10">How it works</h1>
            <div className="xl:absolute max-xl:mt-3  max-w-[100px] xl:-top-[70px] z-10 w-28 xl:right-[30px]">
              <ProgressBar progress={50} />
            </div>
          </div>
          {CREATE_LOCK_LIST.map((exchange, index) => (
            <InfoBox
              hasDecorator={CREATE_LOCK_LIST.length === index + 1 ? false : true}
              bgBox="exchange-box-info"
              key={index}
              variant="secondary"
              data={exchange}
              textColor={'text-shark-100'}
            />
          ))}

          <Link
            target="_blank"
            href="https://discord.com/invite/fenixfi"
            className="xl:absolute -bottom-10 right-32  flex gap-2 justify-center text-shark-100"
          >
            <span className="icon-discord"></span>Need some help?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreateLock
