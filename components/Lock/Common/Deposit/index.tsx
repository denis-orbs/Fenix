'use client'
import MainBox from '@/components/Common/Boxes/MainBox'
import { Button, ProgressBar } from '@/components/UI'
import { useState } from 'react'
import InactiveVote from '@/components/Vote/InactiveVote'
import CheckBox from '@/components/UI/CheckBox'
import ActiveVote from '@/components/Vote/ActiveVote'
import SelectVote from '@/components/Modals/SelectVote'
import DepositBox from './DepositBox'

const DepositLock = () => {
  const [openModal, setOpenModal] = useState(false)
  const [activeVote, setActiveVote] = useState(false)
  const [checked, setChecked] = useState(false)
  const [loader, setLoader] = useState(false)
  const [changeState, setChangeState] = useState(false)

  const handlerCheck = () => (checked ? setChecked(false) : setChecked(true))
  const handlerChange = () => (
    openModal ? setOpenModal(false) : setOpenModal(true), setLoader(false), setChangeState(false)
  )
  const handlerLoader = () => (loader ? setLoader(false) : setLoader(true))
  return (
    <MainBox className="xl:min-w-[1300px]  ">
      <div className="flex flex-col w-full xl:flex-row relative z-10 pb-60  xl:pb-40 xl:py-8">
        <div className="w-full mb-5 xl:w-[45%]">
          <div className="flex flex-wrap xl:flex-nowrap items-center justify-between mb-5">
            <h4 className="text-xl text-white">Deposit Lock</h4>
            <div>
              <Button className=" flex gap-2 items-center !py-3" variant="primary">
                <span className="icon-lock"></span>
                Create New Lock
              </Button>
            </div>
          </div>
          {/* section Header */}
          <div>
            <p className="text-white text-sm mb-2">Select lock you want to deposit</p>

            {activeVote ? <ActiveVote handlerChange={handlerChange} /> : <InactiveVote handlerChange={handlerChange} />}

            <SelectVote
              openModal={openModal}
              setOpenModal={setOpenModal}
              activeVote={activeVote}
              setActiveVote={setActiveVote}
            />
          </div>
          {/* InactiveVote */}
          <p className="text-white text-sm mt-5 mb-2">Nest Strategy</p>
          <div className="flex flex-col  exchange-box-x1">
            <div className="flex items-center gap-2">
              <div className="flex relative items-center justify-center w-12 h-12 p-3 rounded-lg bg-shark-400 bg-opacity-60">
                <span className="icon-lucide inline-block text-2xl text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text "></span>
                <span className="bg-green-600 p-1 rounded-full absolute bottom-2 right-2"></span>
              </div>
              {/* //// */}
              <div>
                <div className="flex gap-2">
                  <p className="text-white">veFnx Maxi</p>{' '}
                  <p className="text-xs w-[71px] h-[21px] text-white bg-shark-400 flex items-center justify-center  rounded-lg  border-shark-300 border-solid border-2">
                    ID 1230
                  </p>
                </div>
                <div className="flex gap-2 xs:flex-row flex-col xl:flex-row ">
                  <p className="text-xs flex p-2 justify-center  items-center text-shark-100  w-full text-center  bg-shark-400  rounded-lg  border-shark-100 border-solid border-2">
                    Update 2 days ago
                  </p>
                  <p className="text-xs flex items-center justify-center text-shark-100 bg-shark-400 p-2 rounded-lg border border-shark-300 border-solid border-1">
                    0xc981...EF14f <span className="icon-document"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Nest Strategy */}
          <div className="flex gap-2 mt-5 items-center">
            <CheckBox
              checked={checked}
              size={20}
              onClick={handlerCheck}
              className="bg-shark-400 outline-none p-3 border-shark-300 border"
            />
            <p className="text-orange-500 text-xs text-justify">
              I understand that by depositing my Lock into a Nest strategy, the Lock unlock date will be extended to 4
              years.
            </p>
          </div>
        </div>
        {/*  line black */}
        <div className="flex justify-center items-center w-[10%] relative ">
          <div className="bg-shark-400 h-4/5 w-[1px]"></div>
        </div>
        {/* line black */}
        <div className="relative flex flex-col w-full xl:w-[45%] max-h-[390px]  overflow-x-none border-t-2 xl:border-none border-shark-400">
          <div className="mt-4">
            <h1 className="text-white text-xl mb-5">Nest Deposit</h1>
          </div>
          <div>
            <DepositBox
              changeState={changeState}
              setChangeState={setChangeState}
              loader={loader}
              activeVote={activeVote}
            />
          </div>

          {!loader && (
            <>
              {activeVote && (
                <div className="mt-5">
                  <Button className="w-full" onClick={handlerLoader}>
                    Deposit
                  </Button>
                </div>
              )}
            </>
          )}
          <div className="mt-16 ">
            <p className="flex gap-2 justify-center text-shark-100 cursor-pointer">
              <span className="icon-discord"></span>Need some help?
            </p>
          </div>
          <div className="absolute  top-7 xl:top-0 z-10 w-28 right-0">
            <ProgressBar progress={50} />
          </div>
        </div>
      </div>
    </MainBox>
  )
}

export default DepositLock
