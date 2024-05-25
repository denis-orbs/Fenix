import { useEffect, useState } from 'react'
import Image from 'next/image'
import TokensSelector from '@/src/components/Liquidity/Common/TokensSelector'
import SetRange from './SetRange'
import { Button } from '@/src/components/UI'
import { Address, formatUnits, maxUint256 } from 'viem'
import { IToken } from '@/src/library/types'
import { CL_MANAGER_ABI, ERC20_ABI } from '@/src/library/constants/abi'
import { contractAddressList } from '@/src/library/constants/contactAddresses'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { publicClient } from '@/src/library/constants/viemClient'
import toast, { Toaster } from 'react-hot-toast'
import { getTokenAllowance } from '@/src/library/hooks/liquidity/useClassic'
import { getAlgebraPoolPrice, getAmounts, getPriceAndTick, getRatio } from '@/src/library/hooks/liquidity/useCL'
import { ethers } from 'ethers'
import { formatNumber } from '@/src/library/utils/numbers'
import Loader from '@/src/components/UI/Icons/Loader'
import ApproveButtons from '@/src/components/Liquidity/Common/ApproveButtons'
import { NATIVE_ETH_LOWERCASE } from '@/src/library/Constants'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'
import { useSetToken0, useSetToken1 } from '@/src/state/liquidity/hooks'
import { isSupportedChain } from '@/src/library/constants/chains'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'

interface StateType {
  price: number
  currentTick: number
}

const ConcentratedDepositLiquidityManual = ({ defaultPairs }: { defaultPairs: IToken[] }) => {
  const [firstToken, setFirstToken] = useState({
    name: 'USDB',
    symbol: 'USDB',
    id: 0,
    decimals: 18,
    address: '0x4300000000000000000000000000000000000003' as Address,
    img: '/static/images/tokens/USDB.svg',
  } as IToken)
  const [firstValue, setFirstValue] = useState('')
  const [secondToken, setSecondToken] = useState({
    name: 'Wrapped Ether',
    symbol: 'ETH',
    id: 1,
    decimals: 18,
    address: '0x4200000000000000000000000000000000000023' as Address,
    img: '/static/images/tokens/WETH.svg',
  } as IToken)
  const [secondValue, setSecondValue] = useState('')
  const [shouldApproveFirst, setShouldApproveFirst] = useState(true)
  const [shouldApproveSecond, setShouldApproveSecond] = useState(true)
  const [poolState, setPoolState] = useState<StateType>({ price: 0, currentTick: 0 })
  const { isConnected, chainId } = useActiveConnectionDetails()

  const [currentPercentage, setCurrentPercentage] = useState([-5, 5])
  const [shownPercentage, setShownPercentage] = useState(['5', '5'])
  const [rangePrice1, setRangePrice1] = useState(0)
  const [rangePrice2, setRangePrice2] = useState(0)
  const [rangePrice1Text, setRangePrice1Text] = useState('0')
  const [rangePrice2Text, setRangePrice2Text] = useState('0')
  const [buttonText, setButtonText] = useState('Create Position')

  const [ratio, setRatio] = useState(1)
  const [lowerTick, setLowerTick] = useState(0)
  const [higherTick, setHigherTick] = useState(0)
  const token1Balance = useReadContract({
    abi: ERC20_ABI,
    address: firstToken.address,
    functionName: 'balanceOf',
    args: [useAccount().address],
  })
  const account = useAccount()

  const token2Balance = useReadContract({
    abi: ERC20_ABI,
    address: secondToken.address,
    functionName: 'balanceOf',
    args: [useAccount().address],
  })

  useEffect(() => {
    if (rangePrice2 != -1 && rangePrice1 > rangePrice2) {
      setButtonText("Min price can't be higher than max price")
    } else if (
      account &&
      isConnected &&
      (firstValue > formatUnits((token1Balance?.data as bigint) || 0n, firstToken?.decimals) ||
        secondValue > formatUnits((token2Balance?.data as bigint) || 0n, secondToken?.decimals))
    ) {
      setButtonText('Insufficient balance')
    } else {
      setButtonText('Create Position')
    }
  }, [
    rangePrice1,
    rangePrice2,
    account,
    isConnected,
    firstValue,
    secondValue,
    token1Balance,
    token2Balance,
    firstToken,
    secondToken,
  ])

  const [isInverse, setIsInverse] = useState(
    parseInt(firstToken.address as string) > parseInt(secondToken.address as string)
  )

  const [decMultiplier, setDecMultiplier] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [slippage, setSlippage] = useState(0.05)

  const [timeout, setTimeoutID] = useState<[NodeJS.Timeout | undefined, NodeJS.Timeout | undefined]>([
    undefined,
    undefined,
  ])

  const setToken0 = useSetToken0()
  const setToken1 = useSetToken1()

  // const account = useAccount()
  // const { isConnected, chainId } = useActiveConnectionDetails()


  const { writeContractAsync } = useWriteContract()

  function invertPercentage(percent: number) {
    const remaining = 1 + percent / 100
    return (1 / remaining - 1) * 100
  }

  useEffect(() => {
    setRangePrice1Text(rangePrice1.toString())
    setRangePrice2Text(rangePrice2.toString())
  }, [rangePrice1, rangePrice2])

  // useEffect(() => {
  //   if(BigInt(firstToken.address as string) > BigInt(secondToken.address as string)) {
  //     const temp = firstToken
  //     setFirstToken(secondToken)
  //     setSecondToken(temp)
  //   }
  // }, [firstToken, secondToken])

  const handleMinMaxInput = (value: any, isFirst: boolean, multiplier: any) => {
    if (timeout) clearTimeout(timeout[0])

    if (isFirst) {
      setRangePrice2Text(value.target.value)
    } else {
      setRangePrice1Text(value.target.value)
    }

    // console.log("123", value.target.value)

    value.target.value = value.target.value * multiplier
    const price = isInverse ? 1 / value.target.value : value.target.value

    if (isFirst) {
      setRangePrice2(price)

      const p = ((price / (poolState.price / 1e18) - 1) * 100).toFixed(1)
      setShownPercentage([shownPercentage[0], isInverse ? invertPercentage(Number(p)).toFixed(1) : p])
    } else {
      setRangePrice1(price)

      const p = ((1 - price / (poolState.price / 1e18)) * 100).toFixed(1)
      setShownPercentage([isInverse ? invertPercentage(Number(p)).toFixed(1) : p, shownPercentage[1]])
    }

    const newTimeout = setTimeout(() => {
      const currentPrice = poolState.price / 1e18

      const pricePercentage = ((price - currentPrice) / currentPrice) * 100

      if (isFirst) setCurrentPercentage([currentPercentage[0], pricePercentage])
      else setCurrentPercentage([pricePercentage, currentPercentage[1]])
    }, 500)

    setTimeoutID([newTimeout, timeout[1]])
  }
  const addNotification = useNotificationAdderCallback()

  useEffect(() => {
    setToken0(firstToken.address)
    setToken1(secondToken.address)
  }, [firstToken, secondToken])

  useEffect(() => {
    if (poolState.price == 0) {
      setRatio(1)
      return
    }

    const asyncFn = async () => {
      const realRatio: number = parseFloat(await getRatio(poolState.currentTick, higherTick, lowerTick))
      const decimalDifference = 10 ** Math.abs(firstToken.decimals - secondToken.decimals)
      const decimalMultiplier = firstToken.decimals > secondToken.decimals ? decimalDifference : 1 / decimalDifference

      setDecMultiplier(decimalMultiplier)
      setRatio(
        isInverse
          ? parseFloat(realRatio.toString()) / decimalMultiplier
          : 1 / parseFloat(realRatio.toString()) / decimalMultiplier
      )
    }

    asyncFn()
  }, [lowerTick, higherTick, poolState, isInverse])

  useEffect(() => {
    setSecondValue(formatNumber(Number(firstValue) * ratio))
  }, [ratio])

  useEffect(() => {
    if (defaultPairs.length == 2) {
      setFirstToken(defaultPairs[0])
      setSecondToken(defaultPairs[1])
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [defaultPairs])

  useEffect(() => {
    setIsInverse(BigInt(firstToken.address as string) > BigInt(secondToken.address as string))

    const asyncGetAllowance = async () => {
      const allowanceFirst: any = await getTokenAllowance(
        firstToken.address as Address,
        account.address as Address,
        contractAddressList.cl_manager as Address
      )
      const allowanceSecond: any = await getTokenAllowance(
        secondToken.address as Address,
        account.address as Address,
        contractAddressList.cl_manager as Address
      )

      setShouldApproveFirst(allowanceFirst == '0')
      setShouldApproveSecond(allowanceSecond == '0')
    }

    asyncGetAllowance()
  }, [firstToken, secondToken, account.address])

  useEffect(() => {
    const asyncFn = async () => {
      const state = await getAlgebraPoolPrice(firstToken.address as Address, secondToken.address as Address)
      setPoolState(state as StateType)
      if (currentPercentage[0] == -1 && currentPercentage[1] == -1) {
        setRangePrice1(0)
        setRangePrice2(-1)
      } else {
        setRangePrice1((Number(state.price) / 1e18) * (1 + currentPercentage[0] / 100))
        setRangePrice2((Number(state.price) / 1e18) * (1 + currentPercentage[1] / 100))
      }
    }

    asyncFn()
  }, [firstToken, secondToken])

  useEffect(() => {
    const asyncFn = async () => {
      if (currentPercentage[0] == -1 && currentPercentage[1] == -1) {
        setLowerTick(-887220)
        setHigherTick(887220)
        setRangePrice1(0)
        setRangePrice2(-1)
        setShownPercentage(['', ''])
      } else {
        const priceAndTick1: { price: number; tick: number } = await getPriceAndTick(
          (Number(poolState.price) / 1e18) * (1 + currentPercentage[0] / 100)
        )
        const priceAndTick2: { price: number; tick: number } = await getPriceAndTick(
          (Number(poolState.price) / 1e18) * (1 + currentPercentage[1] / 100)
        )

        setLowerTick(priceAndTick1.tick)
        setHigherTick(priceAndTick2.tick)
        setRangePrice1(priceAndTick1.price / 1e18)
        setRangePrice2(priceAndTick2.price / 1e18)
        setShownPercentage([
          ((1 - priceAndTick1.price / poolState.price) * 100).toFixed(1),
          ((priceAndTick2.price / poolState.price - 1) * 100).toFixed(1),
        ])
      }
    }

    asyncFn()
  }, [currentPercentage, poolState])

  const swapTokens = () => {
    const temp = firstToken
    setFirstToken(secondToken)
    setSecondToken(firstToken)
  }

  const handleCLAdd = async () => {
    setIsLoading(true)

    const _firstToken = isInverse ? secondToken : firstToken
    const _secondToken = isInverse ? firstToken : secondToken
    const _firstValue = isInverse ? secondValue : firstValue
    const _secondValue = isInverse ? firstValue : secondValue

    const _ethValue =
      _firstToken.address?.toLowerCase() == NATIVE_ETH_LOWERCASE
        ? BigInt(Math.floor(Number(formatNumber(Number(_firstValue))) * 1e18))
        : _secondToken.address?.toLowerCase() == NATIVE_ETH_LOWERCASE
          ? BigInt(Math.floor(Number(formatNumber(Number(_secondValue))) * 1e18))
          : BigInt(0)
    _firstToken.address =
      _firstToken.address?.toLowerCase() == NATIVE_ETH_LOWERCASE
        ? '0x4300000000000000000000000000000000000004'
        : _firstToken.address
    _secondToken.address =
      _secondToken.address?.toLocaleLowerCase() == NATIVE_ETH_LOWERCASE
        ? '0x4300000000000000000000000000000000000004'
        : _secondToken.address

    writeContractAsync(
      {
        abi: CL_MANAGER_ABI,
        address: contractAddressList.cl_manager as Address,
        functionName: 'mint',
        args: [
          [
            _firstToken.address as Address,
            _secondToken.address as Address,
            lowerTick,
            higherTick,
            Math.floor(Number(formatNumber(Number(_firstValue))) * 10 ** _firstToken.decimals),
            Math.floor(Number(formatNumber(Number(_secondValue))) * 10 ** _secondToken.decimals),
            Math.floor(Number(formatNumber(Number(_firstValue) * (1 - slippage))) * 10 ** _firstToken.decimals),
            Math.floor(Number(formatNumber(Number(_secondValue) * (1 - slippage))) * 10 ** _secondToken.decimals),
            account.address as Address,
            parseInt((+new Date() / 1000).toString()) + 60 * 60,
          ],
        ],
        value: _ethValue,
      },
      {
        onSuccess: async (x) => {
          const transaction = await publicClient.waitForTransactionReceipt({ hash: x })
          if (transaction.status == 'success') {
            // toast(`Added LP successfully.`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Added LP successfully.`,
              notificationType: NotificationType.SUCCESS,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          } else {
            toast(`Added LP TX failed, hash: ${transaction.transactionHash}`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Added LP TX failed, hash: ${transaction.transactionHash}`,
              notificationType: NotificationType.ERROR,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          }
          setIsLoading(false)
        },
        onError: (e) => {
          // console.log(e)
          // toast(`Added LP failed. `)
          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Added LP failed.`,
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

          const allowanceFirst: any = await getTokenAllowance(
            firstToken.address as Address,
            account.address as Address,
            contractAddressList.cl_manager as Address
          )
          const allowanceSecond: any = await getTokenAllowance(
            secondToken.address as Address,
            account.address as Address,
            contractAddressList.cl_manager as Address
          )

          setShouldApproveFirst(allowanceFirst == '0')
          setShouldApproveSecond(allowanceSecond == '0')
          setIsLoading(false)
        },
        onError: (e) => {
          // toast(`Approve failed.`)
          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Approve failed.`,
            notificationType: NotificationType.ERROR,
            txHash: '',
            notificationDuration: NotificationDuration.DURATION_5000,
          })
          setIsLoading(false)
        },
      }
    )
  }

  const handleOnTokenValueChange = async (input: any, token: IToken) => {
    // TODO: handle if pair is not created
    if (firstToken.address === token.address) {
      if (parseFloat(input) != 0) setSecondValue(formatNumber(parseFloat(input) * Number(ratio), secondToken.decimals))
      if (parseFloat(input) == 0) setSecondValue('')
      setFirstValue(input == '' ? 0 : input)

      if (timeout[1]) clearTimeout(timeout[1])
      setTimeoutID([
        timeout[0],
        setTimeout(() => {
          setFirstValue(formatNumber(parseFloat(input), firstToken.decimals))
        }, 500),
      ])
    } else {
      if (parseFloat(input) != 0)
        setFirstValue(formatNumber(parseFloat(input) / (Number(ratio) == 0 ? 1 : Number(ratio)), firstToken.decimals))
      if (parseFloat(input) == 0) setFirstValue('')
      setSecondValue(input == '' ? 0 : input)

      if (timeout[1]) clearTimeout(timeout[1])
      setTimeoutID([
        timeout[0],
        setTimeout(() => {
          setSecondValue(formatNumber(parseFloat(input), secondToken.decimals))
        }, 500),
      ])
    }
  }

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <SetRange
        shownPercentage={shownPercentage}
        currentPercentage={currentPercentage}
        setCurrentPercentage={setCurrentPercentage}
        price1={rangePrice1} //isInverse ? 1 / rangePrice1 : rangePrice1}
        price2={rangePrice2} //isInverse ? 1 / rangePrice2 : rangePrice2}
        token1={firstToken}
        token2={secondToken}
        multiplier={decMultiplier}
        handleMinMaxInput={handleMinMaxInput}
        isInverse={isInverse}
        swapTokens={swapTokens}
        price1text={rangePrice1Text}
        price2text={rangePrice2Text}
      />
      <div className="bg-shark-400 bg-opacity-40 py-[11px] px-[19px] flex items-center justify-between gap-2.5 border border-shark-950 rounded-[10px] mb-2.5 max-md:items-start">
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="flex items-center flex-shrink-0">
              <Image
                src={firstToken.img}
                alt="token"
                className="rounded-full max-md:w-5 max-md:h-5"
                width={30.5}
                height={30.5}
              />
              <Image
                src={secondToken.img}
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
            <div className="text-white">Current Pool Price: </div>
            <div className="flex items-center gap-2.5">
              <p className="flex gap-[5px] items-center text-shark-100 flex-shrink-0">
                {/* <Image src={firstToken.img} alt="token" className="w-5 h-5 rounded-full" width={20} height={20} /> */}
                <span>
                  {isInverse
                    ? Number(1 / (poolState.price / 10 ** firstToken.decimals)).toFixed(6)
                    : Number(poolState.price / 10 ** secondToken.decimals).toFixed(6)}{' '}
                  {`${secondToken.symbol} per ${firstToken.symbol} ≈ `}
                  {!isInverse
                    ? Number(1 / (poolState.price / 10 ** secondToken.decimals)).toFixed(6)
                    : Number(poolState.price / 10 ** secondToken.decimals).toFixed(6)}{' '}
                  {`${firstToken.symbol} per ${secondToken.symbol}`}
                </span>
              </p>
              <p className="flex gap-[5px] items-center text-shark-100 flex-shrink-0"></p>
            </div>
          </div>
        </div>
      </div>

      <TokensSelector
        firstToken={firstToken}
        secondToken={secondToken}
        firstValue={firstValue}
        secondValue={secondValue}
        setFirstToken={(token) => setFirstToken(token)}
        setSecondToken={(token) => setSecondToken(token)}
        setFirstValue={(value) => setFirstValue(value)}
        setSecondValue={(value) => setSecondValue(value)}
        onTokenValueChange={handleOnTokenValueChange}
      />
      {!isConnected || !isSupportedChain(chainId) ? (
        <Button
          walletConfig={{
            needSupportedChain: true,
            needWalletConnected: true,
          }}
          className="w-full"
        >
          Connect Wallet
        </Button>
      ) : (
        <ApproveButtons
          shouldApproveFirst={shouldApproveFirst}
          shouldApproveSecond={shouldApproveSecond}
          token0={firstToken}
          token1={secondToken}
          handleApprove={handleApprove}
          mainFn={handleCLAdd}
          mainText={buttonText}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default ConcentratedDepositLiquidityManual
