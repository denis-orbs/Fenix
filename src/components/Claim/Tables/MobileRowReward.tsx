import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/src/components/UI'
import { formatDollarAmount, fromWei } from '@/src/library/utils/numbers'
import { BigDecimal } from '@/src/library/common/BigDecimal'
import { useWriteContract } from 'wagmi'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { publicClient } from '@/src/library/constants/viemClient'
import rewardAbi from '../ABI/abi'

interface RowDataProps {
  index: number
  row: any
  changeValue: number
  setChangeValue: (value: number) => void
  activeSlider?: boolean
}

const MobileRowReward = ({ index, row, changeValue, setChangeValue, activeSlider }: RowDataProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { writeContractAsync } = useWriteContract()
  const addNotification = useNotificationAdderCallback()

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

  return (
    <>
      <div
        className={`border border-shark-950 px-3 py-5 rounded-[10px] bg-shark-400 ${
          isOpen ? 'bg-opacity-60' : 'bg-opacity-20'
        } ${'xl:hidden'}`}
      >
        <div className="flex gap-[9px] items-center">
          <div className="flex items-center gap-1">
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
            <div className="flex items-center">
              <h5 className="text-sm text-white px-2">{rewardTitle}</h5>
              {/* <div className="flex items-center gap-2">
                <span className="flex items-center bg-opacity-20 px-4 text-xs justify-center py-2 text-white border border-solid border-green-400 bg-green-500 rounded-xl">
                  Volatile
                </span>
              </div> */}
            </div>
          </div>
          <button type="button" className="ml-auto" onClick={() => setIsOpen(!isOpen)}>
            <span className={`icon-chevron text-xs leading-[0] block ${isOpen ? 'rotate-180' : ''}`}></span>
          </button>
        </div>

        {isOpen && (
          <>
            <div className="flex  justify-between px-10 mt-[21px] mb-2.5">
              <div className="flex flex-col text-center text-sm">
                <p className="text-shark-100">Rewards</p>
                <p>{formatDollarAmount(fromWei(amount.toString()))}</p>
              </div>
              <div className="flex flex-col text-center text-sm">
                <p className="text-shark-100">Claimed</p>
                <p>$123.32</p>
              </div>
              <Button variant="primary" className="!text-xs !py-1" onClick={handleClaim}>
                Claim rewards
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default MobileRowReward
