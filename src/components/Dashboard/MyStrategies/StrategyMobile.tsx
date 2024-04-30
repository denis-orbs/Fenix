'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/src/components/UI'
import ComponentVisible from '@/src/library/hooks/useVisible'
import Graph from './Graph'
import { positions } from './Strategy'
import { Token, fetchTokens } from '@/src/library/common/getAvailableTokens'
import { IchiVault, useIchiVaultsData } from '@/src/library/hooks/web3/useIchi'
import { formatDollarAmount, fromWei } from '@/src/library/utils/numbers'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { publicClient } from '@/src/library/constants/viemClient'
import { CL_MANAGER_ABI } from '@/src/library/constants/abi'
import { contractAddressList } from '@/src/library/constants/contactAddresses'
import { Address, encodeFunctionData } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'
import { MAX_INT } from '@/src/library/constants/misc'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'

type options = {
  value: string
  label: string
}

interface StrategyMobileProps {
  row: positions
  tokens: Token[]
  options: options[]
  setModalSelected: (modal: string) => void
  setOpenModal: (modal: boolean) => void
}

const StrategyMobile = ({ row, tokens, options, setModalSelected, setOpenModal }: StrategyMobileProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { writeContractAsync } = useWriteContract()
  const { address } = useAccount()

  const addNotification = useNotificationAdderCallback()

  let ichitokens: IchiVault
  if (row.liquidity === 'ichi') {
    ichitokens = useIchiVaultsData(row?.id)
  }
  const { ref, isVisible, setIsVisible } = ComponentVisible(false)
  const handlerOpenModal = (option: string) => {
    setOpenModal(true)
    setModalSelected(option)
  }

  const handlerOpen = () => (isOpen ? setIsOpen(false) : setIsOpen(true))

  const handleClaim = (id: string) => {
    const multi = [
      encodeFunctionData({
        abi: CL_MANAGER_ABI,
        functionName: 'collect',
        args: [[id, address, MAX_INT, MAX_INT]],
      }),
    ]

    writeContractAsync(
      {
        abi: CL_MANAGER_ABI,
        address: contractAddressList.cl_manager as Address,
        functionName: 'multicall',
        args: [multi],
      },

      {
        onSuccess: async (x) => {
          const transaction = await publicClient.waitForTransactionReceipt({ hash: x })
          if (transaction.status == 'success') {
            // toast(`Fees Claimed successfully.`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Fees Claimed successfully.`,
              notificationType: NotificationType.SUCCESS,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          } else {
            // toast(`Fees Claimed Tx failed`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Fees Claimed Tx failed`,
              notificationType: NotificationType.ERROR,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          }
        },
        onError: (e) => {
          // toast(`Fees Claimed Tx failed.`)
          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Fees Claimed Tx failed`,
            notificationType: NotificationType.ERROR,
            txHash: '',
            notificationDuration: NotificationDuration.DURATION_5000,
          })
        },
      }
    )
  }

  return (
    <div className="w-full bg-shark-400 bg-opacity-40 p-4">
      <div className="relative z-50">
        <div className="relative text-white flex flex-col">
          <div className="flex justify-between items-center box-strategies">
            <div className="flex gap-4 items-center">
              <div className="flex items-center">
                <Image
                  src={
                    row.liquidity === 'ichi'
                      ? `/static/images/tokens/${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenA.toLowerCase())?.basetoken.symbol}.svg`
                      : `/static/images/tokens/${row?.token0?.symbol}.svg`
                  }
                  alt="token"
                  className="rounded-full "
                  width={32}
                  height={32}
                />
                <Image
                  src={
                    row.liquidity === 'ichi'
                      ? `/static/images/tokens/${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenB.toLowerCase())?.basetoken.symbol}.svg`
                      : `/static/images/tokens/${row?.token1?.symbol}.svg`
                  }
                  alt="token"
                  className="-ml-4 rounded-full"
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex flex-col">
                <p>
                  {' '}
                  {row.liquidity === 'ichi'
                    ? `${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenA.toLowerCase())?.basetoken.symbol} / ${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenB.toLowerCase())?.basetoken.symbol}`
                    : `${row?.token0?.symbol} / ${row?.token1?.symbol}`}
                </p>
                <p className="text-xs">ID: {row.liquidity === 'ichi' ? 'Ichi Position' : row?.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* <div
                ref={ref}
                className="flex items-center z-20 justify-center cursor-pointer flex-shrink-0 w-12 h-12 px-4 transition-colors border rounded-lg border-shark-300 bg-shark-400 bg-opacity-40 hover:bg-outrageous-orange-400"
                onClick={() => setIsVisible(!isVisible)}
              > */}
              {/* <span className="text-lg icon-cog text-white "></span>
                {isVisible && (
                  <div
                    className="w-[300px] p-2 flex flex-col gap-1 rounded-[10px]  bg-shark-400 absolute top-14  left--1 translate-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {options.map((option, index) => {
                      return (
                        <Button
                          onClick={() => handlerOpenModal(option.value)}
                          variant="default"
                          key={index}
                          className="!py-1 !h-[33px]  !text-xs"
                        >
                          {option.label}
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div> */}
              <span
                onClick={handlerOpen}
                className={`icon-chevron cursor-pointer ${isOpen && 'rotate-180 transition-all'}`}
              ></span>
            </div>
          </div>
        </div>

        {isOpen && (
          <div>
            <div className="flex gap-2 my-2">
              <div className="flex flex-col gap-2 w-1/2 items-center bg-shark-400 bg-opacity-40 p-4  rounded-lg">
                <p className="text-white text-xs lg:text-sm">
                  APR <span className="icon-info"></span>
                </p>
                <h1 className="text-green-400 text-2xl">{row?.apr}</h1>
              </div>
              <div className="bg-shark-400 bg-opacity-40 flex flex-col gap-2 w-1/2 items-center p-4  rounded-lg">
                <p className="text-white text-xs lg:text-sm">
                  Liquidity <span className="icon-info"></span>
                </p>
                <h1 className="text-white text-2xl">
                  {row.liquidity === 'ichi' ? 'ICHI' : Number(fromWei(row?.liquidity)).toFixed(5)} LP
                </h1>
              </div>
            </div>
            <div className="bg-shark-400 bg-opacity-40 rounded-lg">
              <div className="relative text-white flex items-center justify-center border-b border-shark-400">
                <div className="flex items-start flex-col p-4 w-1/2">
                  <h4 className="text-sm text-white-400">
                    {row.liquidity === 'ichi'
                      ? `${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenA.toLowerCase())?.basetoken.symbol}`
                      : `${row?.token0?.symbol}`}
                  </h4>
                  <h4 className="text-sm text-white">
                    {Number(row?.depositedToken0).toFixed(5)}{' '}
                    {row.liquidity === 'ichi'
                      ? `${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenA.toLowerCase())?.basetoken.symbol}`
                      : `${row?.token0?.symbol}`}
                  </h4>
                  <p className="text-xs text-white">
                    {Number(row?.depositedToken0).toFixed(5)}{' '}
                    {formatDollarAmount(
                      Number(row?.depositedToken0) *
                        Number(
                          tokens.find(
                            (e) =>
                              e.tokenAddress.toLowerCase() ===
                              (row.liquidity === 'ichi'
                                ? ichitokens?.tokenA.toLowerCase()
                                : row?.token0?.id.toLowerCase())
                          )?.priceUSD
                        )
                    )}
                  </p>
                </div>
                <div className="flex items-start flex-col p-4 w-1/2 border-l border-shark-400">
                  <h4 className="text-sm text-white-500">
                    {row.liquidity === 'ichi'
                      ? `${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenB.toLowerCase())?.basetoken.symbol}`
                      : `${row?.token1?.symbol}`}
                  </h4>
                  <h4 className="text-sm text-white">
                    {' '}
                    {Number(row?.depositedToken1).toFixed(5)}{' '}
                    {row.liquidity === 'ichi'
                      ? `${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenB.toLowerCase())?.basetoken.symbol}`
                      : `${row?.token1?.symbol}`}
                  </h4>
                  <p className="text-xs text-white">
                    ${' '}
                    {formatDollarAmount(
                      Number(row?.depositedToken1) *
                        Number(
                          tokens.find(
                            (e) =>
                              e.tokenAddress.toLowerCase() ===
                              (row.liquidity === 'ichi'
                                ? ichitokens?.tokenB.toLowerCase()
                                : row?.token1?.id.toLowerCase())
                          )?.priceUSD
                        )
                    )}
                  </p>
                </div>
              </div>
              <Graph
                row={row}
                tickLower={row.tickLower}
                tickUpper={row.tickUpper}
                token0Symbol={row.token0.symbol}
                token1Symbol={row.token1.symbol}
              />
              <div className="flex flex-row gap-5 items-center justify-center p-3">
                {/* <Button variant="tertiary" className="h-[38px] w-[90px] bg-opacity-40 items-center justify-center">
                  <span className="text-l">Deposits</span>
                </Button>
                <Button variant="tertiary" className="h-[38px] w-[90px] bg-opacity-40 items-center justify-center">
                  <span className="text-l">Stake</span>
                </Button> */}
                <Button
                  variant="tertiary"
                  className="h-[38px] w-[90px] bg-opacity-40 items-center justify-center"
                  onClick={() => {
                    if (row.liquidity !== 'ichi') {
                      router.push(`/liquidity/manage?id=${row?.id}`)
                      router.refresh()
                    } else {
                      router.push(
                        `liquidity/deposit?type=CONCENTRATED_AUTOMATIC&token0=${row?.token0}&token1=${row?.token1}`
                      )
                      // router.refresh()
                    }
                  }}
                >
                  <span className="text-l">Manage</span>
                </Button>
                {row.liquidity !== 'ichi' ? (
                  <>
                    <Button
                      variant="tertiary"
                      className="h-[38px] w-[90px] bg-opacity-40 items-center justify-center"
                      onClick={() => {
                        if (row.liquidity !== 'ichi') {
                          handleClaim(row?.id)
                        }
                      }}
                    >
                      <span className="text-l">Claim</span>
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StrategyMobile
