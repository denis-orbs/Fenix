'use client'

import Link from 'next/link'
import MainBox from '@/src/components/Common/Boxes/MainBox'
import Image from 'next/image'
import InputRange from '@/src/components/UI/SliderRange/InputRange'
import { Button, ProgressBar } from '@/src/components/UI'
import { FC, useCallback, useEffect, useState } from 'react'
import Filter from '@/src/components/Common/Filter'
import ActiveVote from '@/src/components/Vote/ActiveVote'
import SelectVote from '@/src/components/Modals/SelectVote'
import AboutFnx from '../AboutFnx'
import Merge from './Merge'
import Split from './Split'
import Transfer from './Transfer'
import ConfirmMerge from '@/src/components/Modals/ConfirmMerge'
import NotificationLock from '@/src/components/Lock/Notification'
import { LockElement } from '@/src/library/structures/lock/LockElement'
import { useAccount, useWriteContract } from 'wagmi'
import { createLock, getIdVeFNXLockPositions, increaseLock } from '@/src/library/web3/LockManagment'
import { fetchTokenBalance, getTokenBalance } from '@/src/library/hooks/web3/useTokenBalance'
import { FNX_ADDRESS } from '@/src/library/Constants'
import { FALLBACK_CHAIN_ID } from '@/src/library/constants/chains'
import { Address } from 'viem'
import { FENIX_ADDRESS, VOTING_ESCROW_ADDRESS } from '@/src/library/constants/addresses'
import { formatNumber, fromWei, toWei } from '@/src/library/utils/numbers'
import { waitForTransactionReceipt } from '@wagmi/core'
import { wagmiConfig } from '@/src/app/layout'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'
import { ERC20_ABI } from '@/src/library/constants/abi'
import { getPublicClient } from '@wagmi/core'
import { getTokenAllowance } from '@/src/library/web3/common/TokenManagement'

interface pageProps {
  id: Number
}
const OPTIONS = [
  { label: '7D', value: 7 },
  { label: '3M', value: 90 },
  { label: '6M', value: 180 },
]
enum ButtonState {
  POOL_NOT_AVAILABLE = 'Pool Not Available',
  ENTER_AMOUNT = 'Enter Amount',
  APPROVAL_REQUIRED = 'Approve FNX',
  APPROVING = 'Approving...',
  WAITING_APPROVAL = 'Waiting Approval',
  INSUFFICIENT_BALANCE = 'Insufficient Balance',
  WAITING_CONFIRMATION = 'Waiting Confirmation',
  PRICE_IMPACT_ALERT = 'Price Impact Too High. Swap Anyway',
  CREATE_LOCK = 'Create Lock',
  LOADING = 'Loading...',
}
const LockManage: FC<pageProps> = ({ id }) => {
  const [changeValue, setChangeValue] = useState<number>(0)
  const [currentTab, setCurrentTab] = useState('ADD')
  const [openModal, setOpenModal] = useState(false)
  const [tokenBalance, settokenBalance] = useState<string>('0')
  const [inputAmount, setinputAmount] = useState<string>('0')
  const [openModalMergeSplit, setOpenModalMergeSplit] = useState(false)
  const [activeVote, setActiveVote] = useState(false)
  const [lock, setLock] = useState<LockElement>()
  const [selectedOption, setSelectedOption] = useState<number>(0)
  const [currentButtonState, setCurrentButtonState] = useState(ButtonState.APPROVAL_REQUIRED)
  const [tokenAllowance, settokenAllowance] = useState<string>('0')
  const addNotification = useNotificationAdderCallback()
  const { writeContractAsync } = useWriteContract()

  const handleOptionChange = (value: number) => {
    setSelectedOption(value)
  }
  const { address, chainId } = useAccount()

  const handlerChange = () => {
    openModal ? setOpenModal(false) : setOpenModal(true)
  }

  const OPTIONS_TAB = ['Add', 'Extend', 'Merge', 'Split', 'Transfer']
  const loadCurrentLocks = async () => {
    try {
      console.log('tokenbalance', '')
      if (chainId && address) {
        const resp = await getIdVeFNXLockPositions(id, chainId)
        console.log('tokenbalance', 'tokenbalance')
        const tokenbalance = (await fetchTokenBalance(
          chainId ? (FENIX_ADDRESS[chainId] as Address) : (FENIX_ADDRESS[FALLBACK_CHAIN_ID] as Address),
          address
        )) as bigint
        console.log(tokenbalance, 'tokenbalance')
        settokenBalance(fromWei(BigInt(tokenbalance).toString()))
        setLock(resp)
      }
    } catch {}
  }
  const handleNFTTX = async (currentTab: string, inputAmount: string, currentId: number, tokenAllowance: string) => {
    try {
      console.log(currentTab, 'inn')
      if (chainId) {
        if (currentTab === 'ADD') {
          setCurrentButtonState(ButtonState.LOADING)
          if (Number(tokenAllowance) < Number(inputAmount)) {
            handleApprove(
              chainId ? (FENIX_ADDRESS[chainId] as Address) : (FENIX_ADDRESS[FALLBACK_CHAIN_ID] as Address),
              toWei(inputAmount).toString()
            )
          } else {
            const hash = await increaseLock(currentId, BigInt(inputAmount), chainId)
            const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, { hash: hash, confirmations: 1 })
            console.log('inn')
          }
        }
      }

      // setCurrentButtonState(ButtonState.LOADING)
      // const hash = await increaseLock(amount, duration, chainId)
      // const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, { hash: hash, confirmations: 1 })
      // // wait for 2 secs for transaction to get processed
      // console.log('transactionReceipt', hash, transactionReceipt)
      // await new Promise((resolve) => setTimeout(resolve, 10000))
      // if (transactionReceipt.status === 'success') {
      //   addNotification({
      //     id: crypto.randomUUID(),
      //     createTime: new Date().toISOString(),
      //     message: `Created Lock Successfully`,
      //     notificationType: NotificationType.SUCCESS,
      //     txHash: transactionReceipt?.transactionHash,
      //     notificationDuration: NotificationDuration.DURATION_5000,
      //   })
      // } else {
      //   addNotification({
      //     id: crypto.randomUUID(),
      //     createTime: new Date().toISOString(),
      //     message: `Transaction failed`,
      //     notificationType: NotificationType.ERROR,
      //     txHash: transactionReceipt?.transactionHash,
      //     notificationDuration: NotificationDuration.DURATION_5000,
      //   })
      // }
      // setCurrentButtonState(ButtonState.CREATE_LOCK)
    } catch (error: any) {
      if (error?.message?.includes('ERC20: insufficient allowance'))
        addNotification({
          id: crypto.randomUUID(),
          createTime: new Date().toISOString(),
          message: `ERC20: insufficient allowance`,
          notificationType: NotificationType.ERROR,
          txHash: '',
          notificationDuration: NotificationDuration.DURATION_5000,
        })
      setCurrentButtonState(ButtonState.CREATE_LOCK)
    }
  }
  const asyncGetAllowance = async () => {
    console.log('inn1')
    const allowanceFirst: any = await getTokenAllowance(
      address as Address,
      chainId ? (FENIX_ADDRESS[chainId] as Address) : (FENIX_ADDRESS[FALLBACK_CHAIN_ID] as Address),
      chainId ? (VOTING_ESCROW_ADDRESS[chainId] as Address) : (VOTING_ESCROW_ADDRESS[FALLBACK_CHAIN_ID] as Address)
    )
    console.log(allowanceFirst, 'inn2')
    settokenAllowance(fromWei(allowanceFirst.toString()))
  }
  const handleApprove = async (token: Address, amount: string) => {
    setCurrentButtonState(ButtonState.WAITING_APPROVAL)

    writeContractAsync(
      {
        abi: ERC20_ABI,
        address: token,
        functionName: 'approve',
        args: [chainId ? VOTING_ESCROW_ADDRESS[chainId] : VOTING_ESCROW_ADDRESS[FALLBACK_CHAIN_ID], amount],
      },
      {
        onSuccess: async (x) => {
          setCurrentButtonState(ButtonState.APPROVING)
          const publicClient = getPublicClient(wagmiConfig)
          const transaction = await publicClient?.waitForTransactionReceipt({ hash: x })

          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Approved successfully.`,
            notificationType: NotificationType.SUCCESS,
            txHash: transaction?.transactionHash,
            notificationDuration: NotificationDuration.DURATION_5000,
          })
          setCurrentButtonState(ButtonState.CREATE_LOCK)

          asyncGetAllowance()
        },
        onError: (e) => {
          setCurrentButtonState(ButtonState.APPROVAL_REQUIRED)
          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Approve failed. ${e}`,
            notificationType: NotificationType.ERROR,
            txHash: '',
            notificationDuration: NotificationDuration.DURATION_5000,
          })
        },
      }
    )
  }
  useEffect(() => {
    loadCurrentLocks()
    if (currentTab === 'MERGE' || currentTab === 'SPLIT') setOpenModalMergeSplit(true)
  }, [currentTab, id])

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
              <ActiveVote handlerChange={handlerChange} lock={lock} />
              <SelectVote
                openModal={openModal}
                setOpenModal={setOpenModal}
                activeVote={activeVote}
                setActiveVote={setActiveVote}
                setlock={setLock}
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
                  setlock={setLock}
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
                    <p
                      className="text-xs text-shark-100 text-right"
                      onClick={() => setinputAmount(Number(tokenBalance).toFixed(2).toString())}
                    >
                      <span className="icon-wallet"></span> Available: {formatNumber(Number(tokenBalance), 2)} FNX
                    </p>
                    <div>
                      <input
                        type="number"
                        className="w-full bg-shark-400 p-3 rounded-lg outline-none bg-opacity-40 text-shark-100 border border-shark-300"
                        placeholder="0"
                        value={inputAmount}
                        onChange={(e) => setinputAmount(e.target.value)}
                      />
                      <input
                        type="button"
                        className="absolute right-16 button-tertiary w-[41px] border border-shark-300 rounded-full text-white text-xs p-1 mt-3 me-4"
                        value={'Half'}
                        placeholder="Half"
                        onClick={() => setinputAmount((Number(tokenBalance) / 2).toString())}
                      />
                      <input
                        type="button"
                        className="absolute right-5 button-tertiary w-[41px] border border-shark-300 rounded-full text-white text-xs p-1 mt-3 me-4"
                        value={'Max'}
                        placeholder="max"
                        onClick={() => setinputAmount(Number(tokenBalance).toString())}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col gap-3  mt-5 exchange-box-x1 p-5">
                  <div className="text-sm flex justify-between">
                    <p className="text-white text-sm text-left">Expires in</p>
                    <div className="text-shark-100 flex gap-2">{OPTIONS[selectedOption].label}</div>
                  </div>
                  <div>
                    <InputRange
                      step={1}
                      max={OPTIONS.length - 1}
                      min={0}
                      value={selectedOption}
                      onChange={(value) => handleOptionChange(value as number)}
                      disabled={false}
                    />
                    <div className="text-shark-100 flex  text-sm justify-between ">
                      {OPTIONS.map((option, index) => {
                        return <div key={index}>{option.label}</div>
                      })}
                    </div>
                  </div>
                </div> */}
                {/* amount to lock fenix */}
              </>
            )}
            {currentTab === 'EXTEND' && (
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
                    <p
                      className="text-xs text-shark-100 text-right"
                      onClick={() => setinputAmount(Number(tokenBalance).toFixed(2).toString())}
                    >
                      <span className="icon-wallet"></span> Available: {formatNumber(Number(tokenBalance), 2)} FNX
                    </p>
                    <div>
                      <input
                        type="number"
                        className="w-full bg-shark-400 p-3 rounded-lg outline-none bg-opacity-40 text-shark-100 border border-shark-300"
                        placeholder="0"
                        value={inputAmount}
                        onChange={(e) => setinputAmount(e.target.value)}
                      />
                      <input
                        type="button"
                        className="absolute right-16 button-tertiary w-[41px] border border-shark-300 rounded-full text-white text-xs p-1 mt-3 me-4"
                        value={'Half'}
                        placeholder="Half"
                        onClick={() => setinputAmount((Number(tokenBalance) / 2).toFixed(2).toString())}
                      />
                      <input
                        type="button"
                        className="absolute right-5 button-tertiary w-[41px] border border-shark-300 rounded-full text-white text-xs p-1 mt-3 me-4"
                        value={'Max'}
                        placeholder="max"
                        onClick={() => setinputAmount(Number(tokenBalance).toFixed(2).toString())}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3  mt-5 exchange-box-x1 p-5">
                  <div className="text-sm flex justify-between">
                    <p className="text-white text-sm text-left">Expires in</p>
                    <div className="text-shark-100 flex gap-2">{OPTIONS[selectedOption].label}</div>
                  </div>
                  <div>
                    <InputRange
                      step={1}
                      max={OPTIONS.length - 1}
                      min={0}
                      value={selectedOption}
                      onChange={(value) => handleOptionChange(value as number)}
                      disabled={false}
                    />
                    <div className="text-shark-100 flex  text-sm justify-between ">
                      {OPTIONS.map((option, index) => {
                        return <div key={index}>{option.label}</div>
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
              <Button
                className="w-full"
                variant="tertiary"
                onClick={() => handleNFTTX(currentTab, inputAmount, Number(lock?.veNFTInfo.id))}
              >
                {currentTab === 'EXTEND' && <>Increment Position</>}
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
            <AboutFnx lock={lock} />
            <div className="justify-center xl:flex hidden mt-2 cursor-pointer">
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
