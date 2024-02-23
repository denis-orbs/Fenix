'use client'
import MainBox from '@/components/Common/Boxes/MainBox'
import Image from 'next/image'
import InputRange from '@/components/UI/SliderRange/InputRange'
import { Button, ProgressBar } from '@/components/UI'
import { useEffect, useState } from 'react'
import Filter from '@/components/Common/Filter'
import ActiveVote from '@/components/Vote/ActiveVote'
import SelectVote from '@/components/Modals/SelectVote'
import AboutFnx from '../AboutFnx'
import Merge from './Merge'
import Split from './Split'
import Transfer from './Transfer'
import ConfirmMerge from '@/components/Modals/ConfirmMerge'
import NotificationLock from '@/components/Lock/Notification'

const LockManage = () => {
  const [changeValue, setChangeValue] = useState(0)
  const [currentTab, setCurrentTab] = useState('ADD')
  const [openModal, setOpenModal] = useState(false)
  const [openModalMergeSplit, setOpenModalMergeSplit] = useState(false)

  const [activeVote, setActiveVote] = useState(false)

  const handlerChange = () => (openModal ? setOpenModal(false) : setOpenModal(true))
  const OPTIONS = ['7D', '3M', '6M', '1Y', '2Y']
  const OPTIONS_TAB = ['Add', 'Merge', 'Split', 'Transfer']

  useEffect(() => {
    if (currentTab === 'MERGE' || currentTab === 'SPLIT') setOpenModalMergeSplit(true)
  }, [currentTab])

  return (
    <div>
      {currentTab === 'SPLIT' && (
        <NotificationLock info="Merging/splitting will cause a loss of unclaimed and pending rewards, make sure to claim everything beforehand." />
      )}
      {currentTab === 'TRANSFER' && (
        <NotificationLock info="Be aware of the address direction before you complete your transfer, it is not reversible." />
      )}
      <MainBox className="xl:min-w-[1400px] relative w-full ">
        <div className="flex flex-col w-full xl:flex-row relative z-10  xl:pb-0 xl:py-8">
          <div className="w-full flex flex-col mb-5 xl:w-[40%]">
            <div className="flex mb-5 justify-between">
              <h4 className="text-xl text-white">Manage Lock</h4>
              <span className="icon-reflesh text-shark-100 text-xl cursor-pointer"></span>
            </div>
            {/* space between manage lock and reset */}
            <div>
              <Filter
                bgBox="filter-lock-box"
                options={OPTIONS_TAB}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                justifyCenter="justify-center"
              />
            </div>
            {/* tab options manage */}
            <div className="mt-5">
              {currentTab === 'MERGE' && (
                <>
                  <p className="text-xs ms-1 mb-1 text-white">Current Position</p>
                </>
              )}
              {currentTab === 'SPLIT' && (
                <>
                  <p className="text-xs ms-1 mb-1 text-white">Split Position</p>
                </>
              )}
              <ActiveVote handlerChange={handlerChange} />
              <SelectVote
                openModal={openModal}
                setOpenModal={setOpenModal}
                activeVote={activeVote}
                setActiveVote={setActiveVote}
              />
            </div>
            {/* active vote */}
            {currentTab === 'TRANSFER' && <Transfer />}
            {currentTab === 'MERGE' && (
              <div className="mx-auto rotate-90 bg-shark-400 bg-opacity-40 p-1 rounded-l-lg border border-shark-300">
                <span className="icon-swap mx-auto rotate-90 text-2xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text"></span>
              </div>
            )}
            {currentTab === 'SPLIT' && (
              <>
                <Split />
                <ConfirmMerge
                  option={currentTab}
                  openModal={openModalMergeSplit}
                  setOpenModal={setOpenModalMergeSplit}
                />
              </>
            )}
            {currentTab === 'MERGE' && (
              <div className="">
                <p className="text-white text-xs ms-1 mb-1">Merge With</p>
                <Merge activeVote={activeVote} handlerChange={handlerChange} />
                <ConfirmMerge
                  option={currentTab}
                  openModal={openModalMergeSplit}
                  setOpenModal={setOpenModalMergeSplit}
                />
                <SelectVote
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  activeVote={activeVote}
                  setActiveVote={setActiveVote}
                />
              </div>
            )}
            {currentTab === 'ADD' && (
              <>
                {' '}
                <div className="flex flex-col xl:flex-row items-center gap-3 justify-center mt-5 exchange-box-x1 p-5">
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
                {/* amount to lock fenix */}
              </>
            )}

            {/* input slider range */}
            {(currentTab === 'ADD' || currentTab === 'MERGE') && (
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
            )}

            {/* section by locking your fnx */}
            {currentTab === 'MERGE' && (
              <div className="exchange-box-x1 p-5 mt-5 flex justify-between items-center text-white text-sm">
                <p className="flex gap-2 items-center text-xs">
                  <span className="icon-info text-2xl inline-block text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text "></span>
                  Merging/splitting will cause a loss of unclaimed and pending rewards, make sure to claim everything
                  beforehand.
                </p>
              </div>
            )}
            {/* mergin/splitt info */}
            <div className="mt-4">
              <Button className="w-full" variant="tertiary">
                {(currentTab === 'ADD' || currentTab === 'MERGE') && <>Increment Position</>}
                {currentTab === 'SPLIT' && <>Split Position</>}
                {currentTab === 'TRANSFER' && <>Transfer Position</>}
              </Button>
            </div>
          </div>
          {/* Line black */}
          <div className="flex  justify-center items-center w-[10%] ">
            <div className="bg-shark-400 h-4/5 w-[1px]"></div>
          </div>
          {/* Line black */}
          <div className="relative flex flex-col w-full xl:w-[35%] mx-auto overflow-x-none border-t-2 border-shark-400 xl:border-none ">
            <div>
              <h1 className="text-white text-center text-xl mb-10 mt-5">About your veFNX</h1>
            </div>
            <AboutFnx />
            <div className="justify-center xl:flex hidden mt-2">
              <p className="flex gap-2 text-shark-100 mt-10">
                <span className="icon-discord"></span> Need some help?
              </p>
            </div>
            <div className="absolute top-2 xl:top-0 z-10 w-28 right-0">
              <ProgressBar progress={50} />
            </div>
          </div>
        </div>
      </MainBox>
    </div>
  )
}

export default LockManage
