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
import {
  Token,
  computePoolAddress,
  tickToPrice,
  priceToClosestTick,
  Price,
  getTickToPrice,
  Position,
  Pool,
  CurrencyAmount,
  encodeSqrtRatioX96,
  TickMath,
} from '@cryptoalgebra/integral-sdk'
import { usePool } from '@/src/components/Trade/Swap/Panel/usePool'
import { blast } from 'viem/chains'
import BigNumber from 'bignumber.js'

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
    address: '0x4300000000000000000000000000000000000004' as Address,
    img: '/static/images/tokens/WETH.png',
  } as IToken)
  const [secondValue, setSecondValue] = useState('')
  const [allowanceFirst, setAllowanceFirst] = useState(0)
  const [allowanceSecond, setAllowanceSecond] = useState(0)
  const { isConnected, chainId } = useActiveConnectionDetails()

  const [ncurrentPercentage, nsetCurrentPercentage] = useState([-5, 5])
  const [shownPercentage, setShownPercentage] = useState(['5', '5'])
  const [rangePrice1, setRangePrice1] = useState(0)
  const [rangePrice2, setRangePrice2] = useState(0)
  const [rangePrice1Text, setRangePrice1Text] = useState('0')
  const [rangePrice2Text, setRangePrice2Text] = useState('0')
  const [buttonText, setButtonText] = useState('Create Position')
  const [oneSide, setOneSide] = useState('BOTH')

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

  const poolAddress =
    firstToken.address == secondToken.address
      ? '0x0000000000000000000000000000000000000000'
      : (computePoolAddress({
          tokenA: new Token(blast.id, firstToken.address?.toLowerCase() == NATIVE_ETH_LOWERCASE ? "0x4300000000000000000000000000000000000004" : firstToken.address as string, 18),
          tokenB: new Token(blast.id, secondToken.address?.toLowerCase() == NATIVE_ETH_LOWERCASE ? "0x4300000000000000000000000000000000000004" : secondToken.address as string, 18),
          poolDeployer: '0x5aCCAc55f692Ae2F065CEdDF5924C8f6B53cDaa8',
          initCodeHashManualOverride: '0xf45e886a0794c1d80aeae5ab5befecd4f0f2b77c0cf627f7c46ec92dc1fa00e4',
        }) as Address)
  const pool = usePool(poolAddress)

  useEffect(() => {
    if(pool[0] == 'LOADING') {
      setButtonText('Loading')
    } else if(pool[0] == 'NOT_EXISTS') {
      setButtonText('Pool Doesn\'t Exist')
      setFirstValue("0")
      setSecondValue("0")
    } else if (rangePrice2 != -1 && rangePrice1 > rangePrice2) {
      setButtonText("Min price can't be higher than max price")
    } else if (
      account &&
      isConnected &&
      (Number(firstValue) > Number(formatUnits((token1Balance?.data as bigint) || 0n, firstToken?.decimals)) ||
        Number(secondValue) > Number(formatUnits((token2Balance?.data as bigint) || 0n, secondToken?.decimals)))
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
    pool
  ])

  const [isInverse, setIsInverse] = useState(
    parseInt(firstToken.address as string) > parseInt(secondToken.address as string)
  )

  const [isFirstLoading, setIsFirstLoading] = useState(false)
  const [isSecondLoading, setIsSecondLoading] = useState(false)
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
    if (pool[0] !== 'EXISTS') return
    if (timeout) clearTimeout(timeout[0])

    if (isFirst) {
      setRangePrice2Text(value.target.value)
    } else {
      setRangePrice1Text(value.target.value)
    }

    const price = value.target.value

    const newTimeout = setTimeout(() => {
      let currentPrice = Number(pool[1]?.token0Price.toFixed(10))
      if (isInverse) currentPrice = Number(pool[1]?.token1Price.toFixed(10))

      const pricePercentage = ((price - currentPrice) / currentPrice) * 100

      if (isFirst)
        if (!isInverse) {
          nsetCurrentPercentage([ncurrentPercentage[0], pricePercentage])
        } else {
          nsetCurrentPercentage([pricePercentage, ncurrentPercentage[1]])
        }
      else if (!isInverse) {
        nsetCurrentPercentage([pricePercentage, ncurrentPercentage[1]])
      } else {
        nsetCurrentPercentage([ncurrentPercentage[0], pricePercentage])
      }
    }, 500)

    setTimeoutID([newTimeout, timeout[1]])
  }
  const addNotification = useNotificationAdderCallback()

  useEffect(() => {
    setToken0(firstToken.address)
    setToken1(secondToken.address)
  }, [firstToken, secondToken])

  useEffect(() => {
    if (pool[0] != 'EXISTS' || !pool[1]) return
    if (firstValue == '') return

    if (lowerTick < pool[1]?.tickCurrent && higherTick < pool[1]?.tickCurrent) {
      setOneSide('SECOND')
      setFirstValue('0')
      setSecondValue('0')
    } else if (lowerTick > pool[1]?.tickCurrent && higherTick > pool[1]?.tickCurrent) {
      setOneSide('FIRST')
      setFirstValue('0')
      setSecondValue('0')
    } else {
      setOneSide('BOTH')
      setSecondValue(
        isInverse
          ? getFromAmount1(
              firstValue,
              isInverse ? firstToken.decimals : secondToken.decimals,
              isInverse ? secondToken.decimals : firstToken.decimals
            )
          : getFromAmount0(
              firstValue,
              isInverse ? firstToken.decimals : secondToken.decimals,
              isInverse ? secondToken.decimals : firstToken.decimals
            )
      )
    }
  }, [firstToken, secondToken, lowerTick, higherTick, pool[0]])

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
      const _allowanceFirst: any = await getTokenAllowance(
        firstToken.address as Address,
        account.address as Address,
        contractAddressList.cl_manager as Address
      )
      const _allowanceSecond: any = await getTokenAllowance(
        secondToken.address as Address,
        account.address as Address,
        contractAddressList.cl_manager as Address
      )

      setAllowanceFirst(_allowanceFirst)
      setAllowanceSecond(_allowanceSecond)
    }

    asyncGetAllowance()
  }, [firstToken, secondToken, account.address])

  useEffect(() => {
    const asyncFn = async () => {
      if (ncurrentPercentage[0] == -1 && ncurrentPercentage[1] == -1) {
        setRangePrice1(0)
        setRangePrice2(-1)
      } else {
        setRangePrice1(Number(pool[1]?.token0Price.toFixed(10)) * (1 + ncurrentPercentage[0] / 100))
        setRangePrice2(Number(pool[1]?.token0Price.toFixed(10)) * (1 + ncurrentPercentage[1] / 100))
      }
    }

    if (pool[0] == 'EXISTS') asyncFn()
  }, [pool])

  useEffect(() => {
    const asyncFn = async () => {
      if (!pool[1]) return
      if (ncurrentPercentage[0] == -1 && ncurrentPercentage[1] == -1) {
        setLowerTick(-887220)
        setHigherTick(887220)
        setRangePrice1(0)
        setRangePrice2(-1)
        setShownPercentage(['', ''])
      } else {
        {
          let lowerPrice0l, lowerPrice0h, lowerPrice1, newPriceL, newPriceH

          if (isInverse) {
            //20
            lowerPrice0l = BigInt(
              Number(
                (
                  Number(pool[1].token1Price.toFixed(10)) *
                  (1 + ncurrentPercentage[0] / 100) *
                  10 ** secondToken.decimals
                ).toFixed(0)
              )
            ).toString()
            lowerPrice0h = BigInt(
              Number(
                (
                  Number(pool[1].token1Price.toFixed(10)) *
                  (1 + ncurrentPercentage[1] / 100) *
                  10 ** secondToken.decimals
                ).toFixed(0)
              )
            ).toString()
            lowerPrice1 = 10 ** firstToken.decimals

            newPriceH = new Price(pool[1].token0, pool[1].token1, lowerPrice0l, lowerPrice1)

            newPriceL = new Price(pool[1].token0, pool[1].token1, lowerPrice0h, lowerPrice1)
          } else {
            lowerPrice0l = BigInt(
              Number(
                (
                  Number(pool[1].token0Price.toFixed(18)) *
                  (1 + ncurrentPercentage[0] / 100) *
                  10 ** secondToken.decimals
                ).toFixed(0)
              )
            ).toString()
            lowerPrice0h = BigInt(
              Number(
                (
                  Number(pool[1].token0Price.toFixed(18)) *
                  (1 + ncurrentPercentage[1] / 100) *
                  10 ** secondToken.decimals
                ).toFixed(0)
              )
            ).toString()
            lowerPrice1 = 10 ** firstToken.decimals

            newPriceL = new Price(pool[1].token1, pool[1].token0, lowerPrice0l, lowerPrice1)

            newPriceH = new Price(pool[1].token1, pool[1].token0, lowerPrice0h, lowerPrice1)

            newPriceL = newPriceL.invert()
            newPriceH = newPriceH.invert()
          }

          const lTick = Number(newPriceL.toFixed(18)) == 0 ? -887220 : priceToClosestTick(newPriceL)
          const lTickRounded = parseInt((lTick / 60).toString()) * 60

          const hTick = Number(newPriceL.toFixed(18)) == 0 ? -887220 : priceToClosestTick(newPriceH)
          const hTickRounded = parseInt((hTick / 60).toString()) * 60

          setLowerTick(lTickRounded)
          setHigherTick(hTickRounded)
          setRangePrice1(Number(newPriceL.toFixed(18)))
          setRangePrice2(Number(newPriceH.toFixed(18)))
        }
      }
    }

    if (pool[0] != 'EXISTS') return
    asyncFn()
  }, [ncurrentPercentage, pool[0]])

  const swapTokens = () => {
    const temp = firstToken
    setFirstToken(secondToken)
    setSecondToken(firstToken)
    setFirstValue("0")
    setSecondValue("0")
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

            setFirstValue("0")
            setSecondValue("0")
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
    if(token == firstToken.address) setIsFirstLoading(true)
    if(token == secondToken.address) setIsSecondLoading(true)

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
            // toast(`Approved Successfully`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Approved Successfully.`,
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

          const _allowanceFirst: any = await getTokenAllowance(
            firstToken.address as Address,
            account.address as Address,
            contractAddressList.cl_manager as Address
          )
          const _allowanceSecond: any = await getTokenAllowance(
            secondToken.address as Address,
            account.address as Address,
            contractAddressList.cl_manager as Address
          )

          setAllowanceFirst(_allowanceFirst)
          setAllowanceSecond(_allowanceSecond)
          setIsLoading(false)
          setIsFirstLoading(false)
          setIsSecondLoading(false)
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
          setIsFirstLoading(false)
          setIsSecondLoading(false)
        },
      }
    )
  }

  const getFromAmount0 = (value: any, dec1: any, dec2: any) => {
    let x = Position.fromAmount0({
      pool: pool[1] as unknown as Pool,
      tickLower: lowerTick,
      tickUpper: higherTick,
      amount0: BigInt(Number((parseFloat(value) * 10 ** dec1).toFixed(0))).toString(),
      useFullPrecision: false,
    }).amount1.toFixed(parseInt(dec2))
    return x
  }

  const getFromAmount1 = (value: any, dec1: any, dec2: any) => {
    let x = Position.fromAmount1({
      pool: pool[1] as unknown as Pool,
      tickLower: lowerTick,
      tickUpper: higherTick,
      amount1: BigInt(Number((parseFloat(value) * 10 ** dec1).toFixed(0))).toString(),
    })
    return x.amount0.toFixed(parseInt(dec2))
  }

  const handleOnTokenValueChange = async (input: any, token: IToken) => {
    if (pool[0] != 'EXISTS') return;
    if (firstToken.address === token.address) {
      if (parseFloat(input) != 0) {
        if (isInverse) {
          setSecondValue(getFromAmount1(input, firstToken.decimals, secondToken.decimals))
        } else {
          setSecondValue(getFromAmount0(input, firstToken.decimals, secondToken.decimals))
        }
      }
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
      if (parseFloat(input) != 0) {
        if (!isInverse) {
          setFirstValue(getFromAmount1(input, secondToken.decimals, firstToken.decimals))
        } else {
          setFirstValue(getFromAmount0(input, secondToken.decimals, firstToken.decimals))
        }
      }
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
        currentPercentage={ncurrentPercentage}
        setCurrentPercentage={nsetCurrentPercentage}
        price1={rangePrice1} //isInverse ? 1 / rangePrice1 : rangePrice1}
        price2={rangePrice2} //isInverse ? 1 / rangePrice2 : rangePrice2}
        token1={firstToken}
        token2={secondToken}
        multiplier={1}
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
            <div className="text-white">Current Pool Price: </div>
            <div className="flex items-center gap-2.5">
              <p className="flex gap-[5px] items-center text-shark-100 flex-shrink-0">
                {/* <Image src={firstToken.img} alt="token" className="w-5 h-5 rounded-full" width={20} height={20} /> */}
                <span>
                  {isInverse ? Number(pool[1]?.token1Price.toFixed(6)) : Number(pool[1]?.token0Price.toFixed(6))}{' '}
                  {`${secondToken.symbol} per ${firstToken.symbol} ≈ `}
                  {!isInverse ? Number(pool[1]?.token1Price.toFixed(6)) : Number(pool[1]?.token0Price.toFixed(6))}{' '}
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
          shouldApproveFirst={Number(allowanceFirst) / 10 ** firstToken.decimals < Number(firstValue)}
          shouldApproveSecond={Number(allowanceSecond) / 10 ** secondToken.decimals < Number(secondValue)}
          token0={firstToken}
          token1={secondToken}
          handleApprove={handleApprove}
          mainFn={buttonText == "Create Position" ? handleCLAdd : ()=>{}}
          mainText={buttonText}
          isLoading={buttonText == "Loading" || isLoading}
          isFirstLoading={isFirstLoading}
          isSecondLoading={isSecondLoading}
        />
      )}
    </>
  )
}

export default ConcentratedDepositLiquidityManual
