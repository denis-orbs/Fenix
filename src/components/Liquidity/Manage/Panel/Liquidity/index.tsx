import Image from 'next/image'
import { Button } from '@/src/components/UI'
import { useEffect, useState } from 'react'
import TokensSelector from '@/src/components/Liquidity/Common/TokensSelector'
import ExchangeBox from '@/src/components/Liquidity/Common/ExchangeBox'
import SelectToken from '@/src/components/Modals/SelectToken'
import {
  getLiquidityRemoveQuote,
  getPair,
  getTokenAllowance,
  getTokenReserve,
} from '@/src/library/hooks/liquidity/useClassic'
import { Address, encodeFunctionData, isAddress } from 'viem'
import { IToken } from '@/src/library/types'
import Separator from '@/src/components/Trade/Common/Separator'
import { useAccount, useWriteContract } from 'wagmi'
import { CL_MANAGER_ABI, ERC20_ABI, ROUTERV2_ABI } from '@/src/library/constants/abi'
import { contractAddressList } from '@/src/library/constants/contactAddresses'
import { ethers } from 'ethers'
import { publicClient } from '@/src/library/constants/viemClient'
import { Toaster, toast } from 'react-hot-toast'
import { getTokensBalance } from '@/src/library/hooks/web3/useTokenBalance'
import { LiquidityTableElement } from '@/src/state/liquidity/types'
import { useAppSelector } from '@/src/state'
import { getPositionData } from '@/src/library/hooks/liquidity/useCL'
import { useRouter, useSearchParams } from 'next/navigation'
import InputRange from '@/src/components/UI/SliderRange/InputRange'
import { formatNumber } from '@/src/library/utils/numbers'
import Loader from '@/src/components/UI/Icons/Loader'
import ApproveButtons from '../../../Common/ApproveButtons'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'
import { fetchTokens } from '@/src/library/common/getAvailableTokens'
import { useSelector } from 'react-redux'
import { positions } from '@/src/components/Dashboard/MyStrategies/Strategy'

interface PositionData {
  id: number
  token0: Address
  token1: Address
  liquidity: number
  amount0: number
  amount1: number
  ratio: number
  pool: Address
}

const Manage = ({}: {}) => {
  const maxUint256 = '115792089237316195423570985008687907853269984665640564039457584007913129639934'

  const searchParams = useSearchParams()
  const router = useRouter()
  // FIXME: STARK
  //DEV FIX
  const { apr } = useSelector<any>((store) => store.apr as positions | '')

  const [aprId, setAprId] = useState(null)
  const pid = searchParams.get('id')
  useEffect(() => {
    if (aprId !== null) {
      const actualApr = apr.find((pos: positions) => pos.id == pid)
      if (actualApr) setAprId(actualApr?.apr)
    }
  }, [apr])
  // console.log('gg', apr)

  const [firstToken, setFirstToken] = useState({
    name: 'Fenix',
    symbol: 'FNX',
    id: 0,
    decimals: 18,
    address: '0xCF0A6C7cf979Ab031DF787e69dfB94816f6cB3c9' as Address,
    img: '/static/images/tokens/FNX.svg',
  } as IToken)
  const [firstValue, setFirstValue] = useState('')
  const [secondToken, setSecondToken] = useState({
    name: 'Ethereum',
    symbol: 'ETH',
    id: 1,
    decimals: 18,
    address: '0x4200000000000000000000000000000000000023' as Address,
    img: '/static/images/tokens/WETH.svg',
  } as IToken)
  const [secondValue, setSecondValue] = useState('')
  const [optionActive, setOptionActive] = useState<'ADD' | 'WITHDRAW'>('ADD')
  const [lpValue, setLpValue] = useState("0")
  const [firstAllowance, setFirstAllowance] = useState(0)
  const [secondAllowance, setSecondAllowance] = useState(0)
  const [pairAddress, setPairAddress] = useState('0x0000000000000000000000000000000000000000')

  const [withdrawPercent, setWithdrawPercent] = useState(50)

  const [positionData, setPositionData] = useState<PositionData>()
  const [isLoading, setIsLoading] = useState(true)
  const [slippage, setSlippage] = useState(0.1)

  const [timeout, setTimeoutID] = useState<NodeJS.Timeout | undefined>(undefined)

  const account = useAccount()
  const pairs = useAppSelector((state) => state.liquidity.v2Pairs.tableData)

  const { writeContractAsync } = useWriteContract()

  const addNotification = useNotificationAdderCallback()

  const handlerOption = (option: 'ADD' | 'WITHDRAW') => {
    setOptionActive(option)
    setFirstValue('')
    setSecondValue('')
  }

  const asyncGetAllowance = async (token1: Address, token2: Address) => {
    const _allowanceFirst: any = await getTokenAllowance(
      token1,
      account.address as Address,
      contractAddressList.cl_manager as Address
    )
    const _allowanceSecond: any = await getTokenAllowance(
      token2,
      account.address as Address,
      contractAddressList.cl_manager as Address
    )

    setFirstAllowance(_allowanceFirst)
    setSecondAllowance(_allowanceSecond)
  }
  const getList = async (token0: Address, token1: Address) => {
    try {
      const responseData = await fetchTokens()

      const parsedData = responseData.map((item: any) => {
        return {
          id: 0,
          name: item.basetoken.name,
          symbol: item.basetoken.symbol,
          address: item.basetoken.address,
          decimals: item.decimals,
          img: item.logourl,
          isCommon: item.common,
          price: parseFloat(item.priceUSD),
        }
      })

      parsedData.map((item: any) => {
        if (item.address.toLowerCase() == token0.toLowerCase()) setFirstToken(item)
        if (item.address.toLowerCase() == token1.toLowerCase()) setSecondToken(item)
      })
      setIsLoading(false)
    } catch (error) {}
  }
  const updatePositionData = async (positionId: any) => {
    const data: PositionData = (await getPositionData(positionId)) as PositionData

    setPositionData(data)
    asyncGetAllowance(data.token0, data.token1)
    getList(data.token0, data.token1)
    setLpValue((BigInt(data.liquidity) / BigInt(2)).toString())
    // console.log('LP Value', Number(BigInt(data.liquidity) / BigInt(2)))
  }

  useEffect(() => {
    if (!positionData) return

    const temp = positionData

    const decimalDifference = 10 ** Math.abs(firstToken.decimals - secondToken.decimals)
    const decimalMultiplier = firstToken.decimals > secondToken.decimals ? decimalDifference : 1 / decimalDifference
    temp.ratio = temp.ratio / decimalMultiplier

    setPositionData(temp)
  }, [positionData, firstToken, secondToken])

  useEffect(() => {
    const positionId = searchParams.get('id')
    if (!positionId) {
      router.push('/liquidity/deposit')
    } else {
      updatePositionData(positionId)
    }
  }, [])

  useEffect(() => {
    asyncGetAllowance(firstToken.address as Address, secondToken.address as Address)
  }, [firstToken, secondToken, account.address])

  useEffect(() => {
    if (!positionData) return
    if (optionActive != 'WITHDRAW') return

    setLpValue(
      withdrawPercent == 100 ?
          BigInt(positionData.liquidity).toString()
      : positionData.liquidity == 0
        ? "0"
        : (
            (BigInt(positionData.liquidity) * BigInt(10 ** 10)) /
              BigInt(((100 * 10 ** 10) / withdrawPercent).toFixed(0))
          ).toString()
    )
    setFirstValue(
      formatNumber(
        withdrawPercent == 100
          ? Number(BigInt(positionData.amount0)) / 10 ** firstToken.decimals
          : positionData.amount0 == 0
            ? 0
            : Number(
                (BigInt(positionData.amount0) * BigInt(10 ** 10)) /
                  BigInt(((100 * 10 ** 10) / withdrawPercent).toFixed(0))
              ) /
              10 ** firstToken.decimals
      )
    )
    setSecondValue(
      formatNumber(
        withdrawPercent == 100
          ? Number(BigInt(positionData.amount1)) / 10 ** secondToken.decimals
          : positionData.amount1 == 0
            ? 0
            : Number(
                (BigInt(positionData.amount1) * BigInt(10 ** 10)) /
                  BigInt(((100 * 10 ** 10) / withdrawPercent).toFixed(0))
              ) /
              10 ** secondToken.decimals
      )
    )
  }, [withdrawPercent, positionData, optionActive])

  const handleOnTokenValueChange = (input: any, token: IToken) => {
    if (optionActive == 'ADD') {
      if (firstToken.address === token.address) {
        if (parseFloat(input) != 0) setSecondValue(formatNumber(parseFloat(input) * Number(positionData?.ratio)))
        if (parseFloat(input) == 0) setSecondValue('')
        setFirstValue(input == '' ? 0 : input)

        if (timeout) clearTimeout(timeout)
        setTimeoutID(
          setTimeout(() => {
            setFirstValue(formatNumber(parseFloat(input), firstToken.decimals))
          }, 500)
        )
      } else {
        if (parseFloat(input) != 0)
          setFirstValue(
            formatNumber(parseFloat(input) / (Number(positionData?.ratio) == 0 ? 1 : Number(positionData?.ratio)))
          )
        if (parseFloat(input) == 0) setFirstValue('')
        setSecondValue(input == '' ? 0 : input)

        if (timeout) clearTimeout(timeout)
        setTimeoutID(
          setTimeout(() => {
            setSecondValue(formatNumber(parseFloat(input), secondToken.decimals))
          }, 500)
        )
      }
    }
  }

  const handleIncreaseLiquidity = async () => {
    if (!positionData) return
    setIsLoading(true)

    const multi = [
      encodeFunctionData({
        abi: CL_MANAGER_ABI,
        functionName: 'increaseLiquidity',
        args: [
          [
            positionData.id,
            Math.floor(Number(formatNumber(Number(firstValue))) * 10 ** firstToken.decimals),
            Math.floor(Number(formatNumber(Number(secondValue))) * 10 ** secondToken.decimals),
            Math.floor(Number(formatNumber(Number(firstValue) * (1 - slippage))) * 10 ** firstToken.decimals),
            Math.floor(Number(formatNumber(Number(secondValue) * (1 - slippage))) * 10 ** secondToken.decimals),
            parseInt((+new Date() / 1000).toString()) + 60 * 60,
          ],
        ],
      }),
      encodeFunctionData({
        abi: CL_MANAGER_ABI,
        functionName: 'refundNativeToken',
      }),
    ]

    await writeContractAsync(
      {
        abi: CL_MANAGER_ABI,
        address: contractAddressList.cl_manager as Address,
        functionName: 'multicall',
        args: [multi],
      },

      {
        onSuccess: async (x) => {
          // console.log('success', x, +new Date())
          const transaction = await publicClient.waitForTransactionReceipt({ hash: x })
          if (transaction.status == 'success') {
            // toast(`Added successfully.`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Added successfully.`,
              notificationType: NotificationType.SUCCESS,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          } else {
            // toast(`Add LP TX failed, hash: ${transaction.transactionHash}`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Add LP TX failed, tx: ${transaction.transactionHash}`,
              notificationType: NotificationType.ERROR,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          }
          updatePositionData(positionData.id)
        },
        onError: (e) => {
          // toast(`Add LP failed. ${e}`)
          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Add LP failed. ${e}`,
            notificationType: NotificationType.ERROR,
            txHash: '',
            notificationDuration: NotificationDuration.DURATION_5000,
          })
          setIsLoading(false)
        },
      }
    )
  }

  const handleDecreaseLiquidity = async () => {
    if (!positionData) return
    setIsLoading(true)

    const multi = [
      encodeFunctionData({
        abi: CL_MANAGER_ABI,
        functionName: 'decreaseLiquidity',
        args: [
          [
            positionData.id,
            lpValue,
            Math.floor(Number(formatNumber(Number(firstValue) * (1 - slippage))) * 10 ** firstToken.decimals),
            Math.floor(Number(formatNumber(Number(secondValue) * (1 - slippage))) * 10 ** secondToken.decimals),
            parseInt((+new Date() / 1000).toString()) + 60 * 60,
          ],
        ],
      }),
      encodeFunctionData({
        abi: CL_MANAGER_ABI,
        functionName: 'collect',
        args: [
          [
            positionData.id,
            '0x0000000000000000000000000000000000000000',
            ethers.utils.parseUnits(formatNumber(Number(firstValue) * 2), 'ether'),
            ethers.utils.parseUnits(formatNumber(Number(secondValue) * 2), 'ether'),
          ],
        ],
      }),
      encodeFunctionData({
        abi: CL_MANAGER_ABI,
        functionName: 'sweepToken',
        args: [
          firstToken.address,
          Math.floor(Number(formatNumber(Number(firstValue) * (1 - slippage))) * 10 ** firstToken.decimals),
          account.address,
        ],
      }),
      encodeFunctionData({
        abi: CL_MANAGER_ABI,
        functionName: 'sweepToken',
        args: [
          secondToken.address,
          Math.floor(Number(formatNumber(Number(secondValue) * (1 - slippage))) * 10 ** secondToken.decimals),
          account.address,
        ],
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
            // toast(`Removed successfully.`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Removed successfully.`,
              notificationType: NotificationType.SUCCESS,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          } else {
            // toast(`Remove LP TX failed, hash: ${transaction.transactionHash}`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Remove LP TX failed, hash: ${transaction.transactionHash}`,
              notificationType: NotificationType.ERROR,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          }

          updatePositionData(positionData.id)
        },
        onError: (e) => {
          // toast(`Remove LP failed. ${e}`)
          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Add LP failed. ${e}`,
            notificationType: NotificationType.ERROR,
            txHash: '',
            notificationDuration: NotificationDuration.DURATION_5000,
          })
          setIsLoading(false)
        },
      }
    )
  }

  const handleApprove = async (token: Address) => {
    setIsLoading(true)

    writeContractAsync(
      {
        abi: ERC20_ABI,
        address: token,
        functionName: 'approve',
        args: [contractAddressList.cl_manager, maxUint256],
      },
      {
        onSuccess: async (x) => {
          const transaction = await publicClient.waitForTransactionReceipt({ hash: x })
          if (transaction.status == 'success') {
            // toast(`Approved successfully`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Approved successfully.`,
              notificationType: NotificationType.SUCCESS,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          } else {
            // toast(`Approve TX failed, tx: ${transaction.transactionHash}`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Approve TX failed, tx: ${transaction.transactionHash}`,
              notificationType: NotificationType.ERROR,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          }

          asyncGetAllowance(firstToken.address as Address, secondToken.address as Address)
          setIsLoading(false)
        },
        onError: (e) => {
          // toast(`Approve failed. ${e}`)
          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Approve failed. ${e}`,
            notificationType: NotificationType.ERROR,
            txHash: '',
            notificationDuration: NotificationDuration.DURATION_5000,
          })
          setIsLoading(false)
        },
      }
    )
  }

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="bg-shark-400 bg-opacity-40 py-[11px] px-[19px] flex items-center justify-between gap-2.5 border border-shark-950 rounded-[10px] mb-2.5 max-md:items-start">
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="flex items-center flex-shrink-0">
              <Image
                src={`/static/images/tokens/${firstToken.symbol}.svg`}
                alt="token"
                className="rounded-full max-md:w-5 max-md:h-5"
                width={30.5}
                height={30.5}
              />
              <Image
                src={`/static/images/tokens/${secondToken.symbol}.svg`}
                alt="token"
                className="-ml-2.5 md:-ml-4 rounded-full max-md:w-5 max-md:h-5"
                width={30.5}
                height={30.5}
              />
            </div>
            <div className="flex flex-col gap-px">
              <h5 className="text-xs md:text-sm text-white leading-normal font-medium">
                {firstToken.symbol} / {secondToken.symbol}
              </h5>
            </div>
          </div>
          <div className="flex items-center text-xs leading-normal max-md:flex-wrap gap-[5px]">
            <div className="text-white">Position Liquidity</div>
            <div className="flex items-center gap-2.5">
              <p className="flex gap-[5px] items-center text-shark-100 flex-shrink-0">
                <Image
                  src={`/static/images/tokens/${firstToken.symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                <span>{formatNumber(Number(positionData?.amount0) / 10 ** firstToken.decimals, 8)}</span>
              </p>
              <p className="flex gap-[5px] items-center text-shark-100 flex-shrink-0">
                <Image
                  src={`/static/images/tokens/${secondToken.symbol}.svg`}
                  alt="token"
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                />
                <span>{formatNumber(Number(positionData?.amount1) / 10 ** secondToken.decimals, 8)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs leading-normal text-white">
          <div className="md:mb-[5px] text-right">APR</div>

          <p className="py-[5px] px-5 border border-solid bg-shark-400 rounded-[10px] bg-opacity-40 border-1 border-shark-300">
            {aprId ? aprId : '0%'}
          </p>
          {/* <p className="py-[5px] px-5 border border-solid bg-shark-400 rounded-[10px] bg-opacity-40 border-1 border-shark-300">
            {
              pairs.find(
                (pair: LiquidityTableElement) => pair?.pairAddress?.toLowerCase() === pairAddress.toLowerCase()
              )?.apr
            }{' '}
            %
          </p> */}
        </div>
      </div>

      <div className="bg-shark-400 bg-opacity-40 p-[13px] md:py-[11px] md:px-[19px] flex gap-1.5 md:gap-2.5 border border-shark-950 rounded-[10px] mb-2.5">
        <Button
          onClick={() => handlerOption('ADD')}
          className="w-full h-[38px] mx-auto !text-xs"
          variant={optionActive === 'ADD' ? 'primary' : 'secondary'}
        >
          Increase Liquidity
        </Button>
        <Button
          onClick={() => handlerOption('WITHDRAW')}
          className="w-full h-[38px] mx-auto !text-xs"
          variant={optionActive === 'WITHDRAW' ? 'primary' : 'secondary'}
        >
          Decrease Liquidity
        </Button>
      </div>

      <div className="flex flex-col gap-1 relative">
        {optionActive === 'WITHDRAW' && (
          <>
            <div className="bg-shark-400 bg-opacity-40 border border-shark-950 px-5 py-2 flex justify-between items-center gap-2.5 rounded-[10px] mb-4">
              <div className="flex items-center gap-2 text-white opacity-75">
                <span className="text-[30px] leading-normal font-light">{withdrawPercent}%</span>
              </div>
              <div className="max-w-[274px] flex-grow">
                <InputRange
                  height={8.412}
                  thumbSize={14.421}
                  value={withdrawPercent}
                  min={1}
                  max={100}
                  disabled={false}
                  onChange={(value) => {
                    setWithdrawPercent(value)
                  }}
                  onChangeShown={(value) => {
                    setWithdrawPercent(value)
                  }}
                />
              </div>
            </div>
            <Separator single />
          </>
        )}
        <TokensSelector
          firstToken={firstToken}
          setFirstToken={setFirstToken}
          firstValue={firstValue}
          setFirstValue={setFirstValue}
          secondToken={secondToken}
          setSecondToken={setSecondToken}
          secondValue={secondValue}
          setSecondValue={setSecondValue}
          onTokenValueChange={handleOnTokenValueChange}
          option={optionActive}
          hideTokenSwap={true}
        />
      </div>

      <ApproveButtons
        shouldApproveFirst={optionActive === 'WITHDRAW' ? false : Number(firstValue)*(10**firstToken.decimals) >= Number(firstAllowance)}
        shouldApproveSecond={optionActive === 'WITHDRAW' ? false : Number(secondValue)*(10**secondToken.decimals) >= Number(secondAllowance)}
        token0={firstToken}
        token1={secondToken}
        handleApprove={handleApprove}
        mainFn={optionActive === 'WITHDRAW' ? handleDecreaseLiquidity : handleIncreaseLiquidity}
        mainText={optionActive === 'WITHDRAW' ? 'Withdraw Liquidity' : 'Add Liquidity'}
        isLoading={isLoading}
      />
    </>
  )
}

export default Manage
