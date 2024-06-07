'use client'
import Image from 'next/image'
import { TableCell, TableRow, Button } from '@/src/components/UI'
import { useState } from 'react'
import MobileRowReward from './MobileRowReward'
import { BigDecimal } from '@/src/library/common/BigDecimal'
import { formatDollarAmount, fromWei } from '@/src/library/utils/numbers'
import { useAccount, useWriteContract } from 'wagmi'
import { writeContract, readContract } from '@wagmi/core'
import { wagmiConfig } from '@/src/app/layout'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { publicClient } from '@/src/library/constants/viemClient'
import rewardAbi from '../ABI/abi'

interface RowRewardProps {
  index: number
  row: any
  activeSlider?: boolean
}

const RowReward = ({ index, row, activeSlider }: RowRewardProps) => {
  const { writeContractAsync } = useWriteContract()
  const addNotification = useNotificationAdderCallback()
  const [changeValue, setChangeValue] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)

  const handleClaim = async () => {
    if (index == 0) {
      // try {
      //   const data = await writeContract(wagmiConfig, {
      //     address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
      //     abi: rewardAbi,
      //     functionName: 'claimWithCHR',
      //     args: [],
      //   })
      //   console.log('onclick0', data)
      // } catch (error) {
      //   console.log('error', error)
      //   addNotification({
      //     id: crypto.randomUUID(),
      //     createTime: new Date().toISOString(),
      //     message: `${error}`,
      //     notificationType: NotificationType.ERROR,
      //   })
      // }
      await writeContractAsync(
        {
          address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
          abi: rewardAbi,
          functionName: 'claimWithCHR',
          args: [],
        },
        {
          onSuccess: async (x) => {
            const transaction = await publicClient?.waitForTransactionReceipt({ hash: x })
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Claimed reward successfully.`,
              notificationType: NotificationType.SUCCESS,
              txHash: transaction?.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          },
          onError: (error) => {
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `${error}`,
              notificationType: NotificationType.ERROR,
              txHash: '',
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          },
        }
      )
    } else if (index == 1) {
      // try {
      //   const data = await writeContract(wagmiConfig, {
      //     address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
      //     abi: rewardAbi,
      //     functionName: 'claimWithSPCHR',
      //     args: [],
      //   })
      //   console.log('onclick1', data)
      // } catch (error) {
      //   console.log('error', error)
      //   addNotification({
      //     id: crypto.randomUUID(),
      //     createTime: new Date().toISOString(),
      //     message: `${error}`,
      //     notificationType: NotificationType.ERROR,
      //   })
      // }
      await writeContractAsync(
        {
          address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
          abi: rewardAbi,
          functionName: 'claimWithSPCHR',
          args: [],
        },
        {
          onSuccess: async (x) => {
            const transaction = await publicClient?.waitForTransactionReceipt({ hash: x })
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Claimed reward successfully.`,
              notificationType: NotificationType.SUCCESS,
              txHash: transaction?.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          },
          onError: (error) => {
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `${error}`,
              notificationType: NotificationType.ERROR,
              txHash: '',
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          },
        }
      )
    } else if (index == 2) {
      // try {
      //   const data = await writeContract(wagmiConfig, {
      //     address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
      //     abi: rewardAbi,
      //     functionName: 'claimWithELCHR',
      //     args: [],
      //   })
      //   console.log('onclick2', data)
      // } catch (error) {
      //   console.log('error', error)
      //   addNotification({
      //     id: crypto.randomUUID(),
      //     createTime: new Date().toISOString(),
      //     message: `${error}`,
      //     notificationType: NotificationType.ERROR,
      //   })
      // }
      await writeContractAsync(
        {
          address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
          abi: rewardAbi,
          functionName: 'claimWithELCHR',
          args: [],
        },
        {
          onSuccess: async (x) => {
            const transaction = await publicClient?.waitForTransactionReceipt({ hash: x })
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Claimed reward successfully.`,
              notificationType: NotificationType.SUCCESS,
              txHash: transaction?.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          },
          onError: (error) => {
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `${error}`,
              notificationType: NotificationType.ERROR,
              txHash: '',
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          },
        }
      )
    } else if (index == 3) {
      // try {
      //   const data = await writeContract(wagmiConfig, {
      //     address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
      //     abi: rewardAbi,
      //     functionName: 'claimWithVECHR',
      //     args: [],
      //   })
      //   console.log('onclick3', data)
      // } catch (error) {
      //   console.log('error', error)
      //   addNotification({
      //     id: crypto.randomUUID(),
      //     createTime: new Date().toISOString(),
      //     message: `${error}`,
      //     notificationType: NotificationType.ERROR,
      //   })
      // }
      await writeContractAsync(
        {
          address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
          abi: rewardAbi,
          functionName: 'claimWithVECHR',
          args: [],
        },
        {
          onSuccess: async (x) => {
            const transaction = await publicClient?.waitForTransactionReceipt({ hash: x })
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Claimed reward successfully.`,
              notificationType: NotificationType.SUCCESS,
              txHash: transaction?.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          },
          onError: (error) => {
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `${error}`,
              notificationType: NotificationType.ERROR,
              txHash: '',
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          },
        }
      )
    } else if (index == 4) {
      // try {
      //   const data = await writeContract(wagmiConfig, {
      //     address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
      //     abi: rewardAbi,
      //     functionName: 'claimWithCHRNFT',
      //     args: [],
      //   })
      //   console.log('onclick4', data)
      // } catch (error) {
      //   console.log('error', error)
      //   addNotification({
      //     id: crypto.randomUUID(),
      //     createTime: new Date().toISOString(),
      //     message: `${error}`,
      //     notificationType: NotificationType.ERROR,
      //   })
      // }
      await writeContractAsync(
        {
          address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
          abi: rewardAbi,
          functionName: 'claimWithCHRNFT',
          args: [],
        },
        {
          onSuccess: async (x) => {
            const transaction = await publicClient?.waitForTransactionReceipt({ hash: x })
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Claimed reward successfully.`,
              notificationType: NotificationType.SUCCESS,
              txHash: transaction?.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          },
          onError: (error) => {
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `${error}`,
              notificationType: NotificationType.ERROR,
              txHash: '',
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          },
        }
      )
    }
  }

  const rewardTitle =
    index == 0
      ? 'chrClaim'
      : index == 1
        ? 'spchrClaim'
        : index == 2
          ? 'elchrClaim'
          : index == 3
            ? 'vechrClaim'
            : index == 4
              ? 'chrnftClaim'
              : 'No Claim'

  const amount = new BigDecimal(row?.result, 18)
  if (Number(amount.toString()) <= 0) {
    return null
  }

  return (
    <>
      <TableRow className="hidden xl:flex">
        <TableCell className="w-[40%]">
          <div className="flex items-center gap-5">
            <div className="flex items-center">
              <Image
                src="/static/images/tokens/FNX.svg"
                alt="token"
                className="rounded-full w-7 h-7"
                width={20}
                height={20}
              />
              {/* <Image
                src="/static/images/tokens/ETH.svg"
                alt="token"
                className="-ml-4 rounded-full w-7 h-7"
                width={20}
                height={20}
              /> */}
            </div>
            <div className="flex flex-col">
              <h5 className="text-sm text-white px-2">{rewardTitle}</h5>
              {/* <div className="flex items-center gap-2">
                <span className="flex items-center bg-opacity-20 w-[105px] text-xs justify-center px-5 py-2 text-white border border-solid border-green-400 bg-green-500 rounded-xl">
                  Volatile
                </span>
              </div> */}
            </div>
          </div>
        </TableCell>

        <TableCell className="w-[15%] flex justify-center">
          <div className="relative flex items-center">
            {openInfo && (
              <>
                <div className="absolute z-10 bg-shark-950 rounded-lg border border-shark-300 w-auto lg:w-[230px] top-9 px-5 py-3 gap-y-1">
                  <div className="flex justify-between items-center gap-2">
                    <div className="w-fit flex flex-col justify-center items-start">
                      <p className="text-white text-xs">{amount.toString()} FNX</p>
                      {/* <p className="text-white text-xs">Bribe</p> */}
                      {/* <p className="flex items-center gap-2 text-xs text-shark-100">
                        {new BigDecimal(row.result, 18) + ' veFnx'}
                      </p> */}
                    </div>
                  </div>
                </div>
              </>
            )}
            <p className="py-2 px-3  text-xs text-shark-100">{formatDollarAmount(fromWei(amount.toString()))}</p>
            <span
              className="icon-info"
              onMouseEnter={() => setOpenInfo(true)}
              onMouseLeave={() => setOpenInfo(false)}
            ></span>
          </div>
        </TableCell>

        <TableCell className="w-[15%] flex justify-center">
          <div className="flex justify-center items-center">
            <p>$123.23</p>
          </div>
        </TableCell>

        <TableCell className="flex items-center justify-end w-[30%]">
          <div>
            <Button variant="primary" className="flex gap-2 items-center !text-xs" onClick={handleClaim}>
              Claim Rewards
            </Button>
          </div>
        </TableCell>
      </TableRow>
      <MobileRowReward
        index={index}
        changeValue={changeValue}
        activeSlider={activeSlider}
        setChangeValue={setChangeValue}
        row={row}
      />
    </>
  )
}

export default RowReward
