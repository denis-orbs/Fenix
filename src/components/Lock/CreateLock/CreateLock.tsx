'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import MainBox from '@/src/components/Common/Boxes/MainBox'
import InfoBox from '@/src/components/Common/InfoBox'
import CREATE_LOCK_LIST from './data'
import Image from 'next/image'
import InputRange from '@/src/components/UI/SliderRange/InputRange'
import { Button, ProgressBar } from '@/src/components/UI'
import { fetchTokenBalance, getTokenBalance } from '@/src/library/hooks/web3/useTokenBalance'
import { useAccount, useWriteContract } from 'wagmi'
import { FENIX_ADDRESS, VOTING_ESCROW_ADDRESS } from '@/src/library/constants/addresses'
import { Address } from 'viem'
import { formatNumber, formatPrice, fromWei, toBN, toWei } from '@/src/library/utils/numbers'
import { formatUnits } from 'viem'
import { NumericalInput } from '../../UI/Input'
import { createLock } from '@/src/library/web3/LockManagment'
import { FALLBACK_CHAIN_ID } from '@/src/library/constants/chains'
import { waitForTransactionReceipt } from '@wagmi/core'
import { wagmiConfig } from '@/src/app/layout'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { getTokenAllowance } from '@/src/library/web3/common/TokenManagement'
import { approveToken } from '../../Trade/Swap/Panel/utilsChange'
import { ERC20_ABI } from '@/src/library/constants/abi'
import Loader from '../../UI/Icons/Loader'
import { getPublicClient } from '@wagmi/core'
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

const CreateLock = () => {
  const addNotification = useNotificationAdderCallback()
  const [changeValue, setChangeValue] = useState(7)
  const OPTIONS = ['7D', '3M', '6M']
  const { address, chainId } = useAccount()
  const [currentButtonState, setCurrentButtonState] = useState(ButtonState.APPROVAL_REQUIRED)
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)
  const [fnxBalance, setFnxBalance] = useState<string>('0')
  const [lockAmount, setlockAmount] = useState<string>('0')
  const [tokenAllowance, settokenAllowance] = useState<string>('0')
  const [isLoading, setIsLoading] = useState(false)
  const { writeContractAsync } = useWriteContract()

  const fetchBalanceFnx = async () => {
    if (address && chainId) {
      let bal = (await fetchTokenBalance(FENIX_ADDRESS[chainId] as Address, address)) as bigint
      setFnxBalance(fromWei(BigInt(bal).toString()))
      let tokenAllow = await getTokenAllowance(
        address,
        FENIX_ADDRESS[chainId] as Address,
        VOTING_ESCROW_ADDRESS[chainId] as Address
      )
      console.log(fromWei(BigInt(tokenAllow).toString()))
      settokenAllowance(fromWei(BigInt(tokenAllow).toString()))
    }
  }
  const handleHalf = () => {
    if (btnDisabled) {
      setlockAmount('')
    } else {
      if (fnxBalance) {
        return setlockAmount(toBN(formatPrice(fnxBalance, 18)).div(2).toString())
      } else {
        setlockAmount('')
      }
    }
  }
  const handleMax = () => {
    if (btnDisabled) {
      setlockAmount('')
    } else {
      if (fnxBalance) {
        return setlockAmount(formatPrice(fnxBalance, 18))
      } else {
        setlockAmount('')
      }
    }
  }
  const convertDaysToMonthsAndDays = (days: number) => {
    const daysInMonth = 30
    const months = Math.floor(days / daysInMonth)
    const remainingDays = days % daysInMonth

    return { month: months, day: remainingDays }
  }
  const calculateFutureDate = (daysFromNow: number) => {
    const currentDate = new Date()
    const futureDate = new Date(currentDate)
    futureDate.setDate(currentDate.getDate() + daysFromNow)

    const day = String(futureDate.getDate()).padStart(2, '0')
    const month = String(futureDate.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const year = futureDate.getFullYear()

    return `${day}/${month}/${year}`
  }
  const handleCreateLock = async (amount: bigint, duration: number, chainId: number) => {
    try {
      setCurrentButtonState(ButtonState.LOADING)
      const hash = await createLock(amount, duration, chainId)
      const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, { hash: hash, confirmations: 1 })
      // wait for 2 secs for transaction to get processed
      console.log('transactionReceipt', hash, transactionReceipt)
      await new Promise((resolve) => setTimeout(resolve, 10000))
      if (transactionReceipt.status === 'success') {
        addNotification({
          id: crypto.randomUUID(),
          createTime: new Date().toISOString(),
          message: `Created Lock Successfully`,
          notificationType: NotificationType.SUCCESS,
          txHash: transactionReceipt?.transactionHash,
          notificationDuration: NotificationDuration.DURATION_5000,
        })
      } else {
        addNotification({
          id: crypto.randomUUID(),
          createTime: new Date().toISOString(),
          message: `Transaction failed`,
          notificationType: NotificationType.ERROR,
          txHash: transactionReceipt?.transactionHash,
          notificationDuration: NotificationDuration.DURATION_5000,
        })
      }
      setCurrentButtonState(ButtonState.CREATE_LOCK)
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

  useEffect(() => {
    fetchBalanceFnx()
  }, [address, chainId, currentButtonState, lockAmount])

  useEffect(() => {
    toBN(Number(fnxBalance)).lte(0) ? setBtnDisabled(true) : setBtnDisabled(false)
  }, [fnxBalance])
  return (
    <MainBox className="xl:min-w-[1300px]">
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
                  <Image src={'/static/images/tokens/FNX.png'} alt="fenix-logo" height={30} width={30} />
                  <p>FNX</p>
                </div>
                <span className="icon-chevron"></span>
              </div>
            </div>

            <div className="xl:w-3/5 w-full flex flex-col gap-2">
              <p className="text-xs text-shark-100 text-right">
                <span className="icon-wallet"></span> Available: {formatNumber(Number(fnxBalance), 2)}
              </p>
              <div>
                <NumericalInput
                  type="number"
                  className="w-full bg-shark-400 p-3 rounded-lg outline-none bg-opacity-40 text-shark-100 border border-shark-300"
                  placeholder="0"
                  value={lockAmount ? formatPrice(lockAmount, 2) : '0'}
                  onUserInput={(input) => {
                    setlockAmount(input)
                    Number(lockAmount) > Number(tokenAllowance)
                      ? setCurrentButtonState(ButtonState.APPROVAL_REQUIRED)
                      : setCurrentButtonState(ButtonState.CREATE_LOCK)
                  }}
                />
                <input
                  type="button"
                  className="absolute right-16 button-tertiary w-[41px] border border-shark-300 rounded-full text-white text-xs p-1 mt-3 me-4"
                  value={'Half'}
                  placeholder="Half"
                  onClick={handleHalf}
                />
                <input
                  type="button"
                  className="absolute right-5 button-tertiary w-[41px] border border-shark-300 rounded-full text-white text-xs p-1 mt-3 me-4"
                  value={'Max'}
                  placeholder="max"
                  onClick={handleMax}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3  mt-5 exchange-box-x1 p-5">
            <div className="text-sm flex justify-between">
              <p className="text-white text-sm text-left">Expires in</p>
              <div className="text-shark-100 flex gap-2">
                {/* <p>0Y</p> */}
                <p>{`${convertDaysToMonthsAndDays(changeValue).month}M`}</p>
                <p>{`${convertDaysToMonthsAndDays(changeValue).day}D`}</p>
              </div>
            </div>
            <div>
              <InputRange
                step={7}
                max={182}
                min={7}
                height={7}
                value={changeValue}
                onChange={setChangeValue}
                thumbSize={18}
                disabled={false}
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
                {formatNumber((Number(lockAmount) * changeValue) / 182, 2)} veFNX
              </p>
            </div>
            <div>
              <p>Unlock Date</p>
            </div>
            <div>
              <p className="p-2  border flex items-center bg-shark-400 border-shark-300 rounded-lg bg-opacity-40">
                {`${calculateFutureDate(changeValue)}`}
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
            <Button
              className="w-full"
              variant="tertiary"
              onClick={() => {
                if (Number(tokenAllowance) < Number(lockAmount)) {
                  handleApprove(
                    chainId ? (FENIX_ADDRESS[chainId] as Address) : (FENIX_ADDRESS[FALLBACK_CHAIN_ID] as Address),
                    toWei(lockAmount).toString()
                  )
                } else {
                  handleCreateLock(
                    BigInt(toWei(lockAmount)),
                    Math.trunc(24 * 60 * 60 * changeValue),
                    chainId ? chainId : FALLBACK_CHAIN_ID
                  )
                }
              }}
            >
              {currentButtonState === ButtonState.LOADING ? (
                <Loader color="white" size={20} />
              ) : currentButtonState === ButtonState.APPROVING ? (
                <>
                  <Loader color="white" size={20} /> {currentButtonState}
                </>
              ) : (
                <>{currentButtonState}</>
              )}
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
            <InfoBox
              hasDecorator={CREATE_LOCK_LIST.length === index + 1 ? false : true}
              bgBox="exchange-box-info"
              key={index}
              data={exchange}
              textColor={'text-shark-100'}
            />
          ))}
          <div className="mt-16 cursor-pointer">
            <Link
              target="_blank"
              href="https://discord.com/invite/fenixfi"
              className="flex gap-2 justify-center text-shark-100"
            >
              <span className="icon-discord"></span>Need some help?
            </Link>
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
