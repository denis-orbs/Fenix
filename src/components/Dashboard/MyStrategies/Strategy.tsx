'use client'
import Image from 'next/image'
import { Button, Switch } from '@/src/components/UI'
import Graph from './Graph'
import ComponentVisible from '@/src/library/hooks/useVisible'
import { formatAmount, formatCurrency, formatDollarAmount, fromWei, toBN } from '@/src/library/utils/numbers'
import { Token, fetchTokens } from '@/src/library/common/getAvailableTokens'
import { useEffect, useState } from 'react'
import { useIchiVaultsData } from '@/src/library/hooks/web3/useIchi'
import { IchiVault } from '@ichidao/ichi-vaults-sdk'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { publicClient } from '@/src/library/constants/viemClient'
import { CL_MANAGER_ABI } from '@/src/library/constants/abi'
import { contractAddressList } from '@/src/library/constants/contactAddresses'
import { Address, encodeFunctionData } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'
import { MAX_INT } from '@/src/library/constants/misc'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'
import { useDispatch } from 'react-redux'
import { setApr } from '@/src/state/apr/reducer'


type options = {
  value: string
  label: string
}
export interface Pool {
  id: string
  fee: string
  sqrtPrice: string
  liquidity: string
  tick: string
  tickSpacing: string
  totalValueLockedUSD: string
  volumeUSD: string
  feesUSD: string
  untrackedFeesUSD: string
  token0Price: string
  token1Price: string
  token0: Tokenp
  token1: Tokenp
  poolDayData: PoolDayData
}

export interface Tokenp {
  id: string
  symbol: string
  name: string
  decimals: string
  derivedMatic: string
}

export interface PoolDayData {
  __typename?: 'PoolDayData'
  feesUSD: any
}

export interface Tick {
  price0: string
  price1: string
  tickIdx: string
}

export interface positions {
  id: string
  liquidity: string
  owner: string
  depositedToken0: Number
  depositedToken1: Number
  withdrawnToken0: string
  withdrawnToken1: string
  pool: Pool
  tickLower: Tick
  tickUpper: Tick
  token0: Tokenp
  token1: Tokenp
  apr: any
}

export type ichipositions = {
  userAmounts: string[]
  vaultAddress: string
  amount0: string
  amount1: string
}

interface StrategyProps {
  row: positions
  tokens: Token[]
  options: options[]
  setModalSelected: (modal: string) => void
  setOpenModal: (modal: boolean) => void
}

const Strategy = ({ row, tokens, options, setModalSelected, setOpenModal }: StrategyProps) => {
  const dispatch = useDispatch()
  const { ref, isVisible, setIsVisible } = ComponentVisible(false)
  const { writeContractAsync } = useWriteContract()
  const { address } = useAccount()
  const router = useRouter()

  const addNotification = useNotificationAdderCallback()

  const handlerOpenModal = (option: string) => {
    setOpenModal(true)
    setModalSelected(option)
  }

  const [showtoken0, setshowtoken0] = useState(true)

  const handlerSwitch = () => {
    setshowtoken0(!showtoken0)
  }
  let ichitokens: IchiVault
  if (row.liquidity === 'ichi') {
    ichitokens = useIchiVaultsData(row?.id)
  }

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
    <div className="steps-box-dashboard  py-8 w-auto xl:min-w-[360px] ">
      <div className="relative z-10">
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
                  {row.liquidity === 'ichi'
                    ? `${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenA.toLowerCase())?.basetoken.symbol} / ${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenB.toLowerCase())?.basetoken.symbol}`
                    : `${row?.token0?.symbol} / ${row?.token1?.symbol}`}
                </p>

                <p className="text-xs">{row.liquidity === 'ichi' ? 'Ichi Position' : 'ID: ' + row?.id}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 my-2">
            <div className="flex flex-col gap-2 w-1/2 h-full items-center bg-shark-400 bg-opacity-40 p-4  rounded-lg">
              <p className="text-white">
                APR
                {/* <span className="icon-info text-xs"></span> */}
              </p>
              <h2 className={`text-green-400 ${row?.apr.length > 10 ? 'text-base' : 'text-2xl'} flex justify-center`}>
                {row?.apr}
              </h2>
            </div>
            <div className="bg-shark-400 bg-opacity-40 flex flex-col gap-2 w-1/2 items-center p-4  rounded-lg">
              <p className="text-white">
                Liquidity
                {/* <span className="icon-info text-xs"></span> */}
              </p>
              <h2 className="text-white text-2xl">
                {row.liquidity === 'ichi' ? 'ICHI' : formatCurrency(fromWei(row?.liquidity))} LP
              </h2>
            </div>
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
                {formatCurrency(formatAmount(toBN(Number(row?.depositedToken0)), 6))}{' '}
                {row.liquidity === 'ichi'
                  ? `${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenA.toLowerCase())?.basetoken.symbol}`
                  : `${row?.token0?.symbol}`}
              </h4>
              <p className="text-xs text-white">
                {formatDollarAmount(
                  Number(row?.depositedToken0) *
                    Number(
                      tokens.find(
                        (e) =>
                          e.tokenAddress.toLowerCase() ===
                          (row.liquidity === 'ichi' ? ichitokens?.tokenA.toLowerCase() : row?.token0?.id.toLowerCase())
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
                {formatCurrency(formatAmount(toBN(Number(row?.depositedToken1)), 6))}{' '}
                {row.liquidity === 'ichi'
                  ? `${tokens.find((e) => e.tokenAddress.toLowerCase() === ichitokens?.tokenB.toLowerCase())?.basetoken.symbol}`
                  : `${row?.token1?.symbol}`}
              </h4>
              <p className="text-xs text-white">
                {formatDollarAmount(
                  Number(row?.depositedToken1) *
                    Number(
                      tokens.find(
                        (e) =>
                          e.tokenAddress.toLowerCase() ===
                          (row.liquidity === 'ichi' ? ichitokens?.tokenB.toLowerCase() : row?.token1?.id.toLowerCase())
                      )?.priceUSD
                    )
                )}
              </p>
            </div>
          </div>

          <Graph
            row={row}
            tickLower={row?.tickLower}
            tickUpper={row?.tickUpper}
            token0Symbol={row?.token0?.symbol}
            token1Symbol={row?.token1?.symbol}
          />
        </div>
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
                dispatch(setApr(row?.apr))
                router.push(`/liquidity/manage?id=${row?.id}`)
                router.refresh()
              } else {
                router.push(
                  `liquidity/deposit?type=CONCENTRATED_AUTOMATIC&token0=${row?.token0?.id}&token1=${row?.token1?.id}`
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
  )
}

export default Strategy
