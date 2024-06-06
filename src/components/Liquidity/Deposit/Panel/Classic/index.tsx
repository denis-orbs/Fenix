import Image from 'next/image'
import { Button } from '@/src/components/UI'
import { useCallback, useEffect, useState } from 'react'
import TokensSelector from '@/src/components/Liquidity/Common/TokensSelector'
import ExchangeBox from '@/src/components/Liquidity/Common/ExchangeBox'
import SelectToken from '@/src/components/Modals/SelectToken'
import {
  getLiquidityRemoveQuote,
  getPair,
  getTokenAllowance,
  getTokenReserve,
} from '@/src/library/hooks/liquidity/useClassic'
import { Address, formatUnits, isAddress, parseUnits } from 'viem'
import { IToken } from '@/src/library/types'
import Separator from '@/src/components/Trade/Common/Separator'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { ERC20_ABI, ROUTERV2_ABI } from '@/src/library/constants/abi'
import { contractAddressList } from '@/src/library/constants/contactAddresses'
import { ethers } from 'ethers'
import { publicClient } from '@/src/library/constants/viemClient'
import { Toaster, toast } from 'react-hot-toast'
import { getTokensBalance } from '@/src/library/hooks/web3/useTokenBalance'
import { LiquidityTableElement } from '@/src/state/liquidity/types'
import { AppThunkDispatch, useAppSelector } from '@/src/state'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { formatDollarAmount, formatNumber, toBN } from '@/src/library/utils/numbers'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'
import { NumericalInput } from '@/src/components/UI/Input'
import ApproveButtons from '../../../Common/ApproveButtons'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import ApproveButtonClassic from '../../../Common/ApproveButtonsClassic'
import { BigDecimal } from '@/src/library/common/BigDecimal'
import { getLiquidityTableElements } from '@/src/state/liquidity/thunks'
import { useDispatch } from 'react-redux'
import { fetchTokens } from '@/src/library/common/getAvailableTokens'
import Loader from '@/src/components/UI/Icons/Loader'

const Classic = ({
  depositType,
  defaultPairs,
}: {
  depositType: 'VOLATILE' | 'STABLE' | 'CONCENTRATED_AUTOMATIC' | 'CONCENTRATED_MANUAL'
  defaultPairs: IToken[]
}) => {
  const maxUint256 = '115792089237316195423570985008687907853269984665640564039457584007913129639934'

  const [firstToken, setFirstToken] = useState({
    name: 'USDB',
    symbol: 'USDB',
    id: 0,
    decimals: 18,
    address: '0x4300000000000000000000000000000000000003' as Address,
    img: '/static/images/tokens/USDB.png',
  } as IToken)
  const [firstValue, setFirstValue] = useState('')
  const [secondToken, setSecondToken] = useState({
    name: 'Wrapped Ether',
    symbol: 'WETH',
    id: 1,
    decimals: 18,
    address: '0x4300000000000000000000000000000000000004' as Address,
    img: '/static/images/tokens/WETH.png',
  } as IToken)
  const [secondValue, setSecondValue] = useState('')
  const [firstReserve, setFirstReserve] = useState(0)
  const [secondReserve, setSecondReserve] = useState(0)
  const [optionActive, setOptionActive] = useState<'ADD' | 'WITHDRAW' | 'STAKE' | 'UNSTAKE'>('ADD')
  const [openSelectToken, setOpenSelectToken] = useState<boolean>(false)
  const [lpValue, setLpValue] = useState('')
  const [shouldApproveFirst, setShouldApproveFirst] = useState(true)
  const [shouldApproveSecond, setShouldApproveSecond] = useState(true)
  const [allowanceFirst, setallowanceFirst] = useState('')
  const [allowanceSecond, setallowanceSecond] = useState('')
  const [allowanceLp, setallowanceLp] = useState('')
  const [lpBalance, setlpBalance] = useState(0n)
  const [pairAddress, setPairAddress] = useState('0x0000000000000000000000000000000000000000')
  const [shouldApprovePair, setShouldApprovePair] = useState(true)
  const [buttonText, setButtonText] = useState('Add Liquidity')
  const [isLoading, setIsLoading] = useState(false)

  const [timeout, setTimeoutID] = useState<NodeJS.Timeout | undefined>(undefined)

  const dispatch = useDispatch<AppThunkDispatch>()
  const account = useAccount()
  const { address, chainId } = useAccount()
  const pairs = useAppSelector((state) => state.liquidity.v2Pairs.tableData)
  const { writeContractAsync } = useWriteContract()
  const addNotification = useNotificationAdderCallback()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { isConnected } = useActiveConnectionDetails()
  const token1Balance = useReadContract({
    abi: ERC20_ABI,
    address: firstToken.address,
    functionName: 'balanceOf',
    args: [useAccount().address],
  })
  const token2Balance = useReadContract({
    abi: ERC20_ABI,
    address: secondToken.address,
    functionName: 'balanceOf',
    args: [useAccount().address],
  })
  const lpTokenBalance = useReadContract({
    abi: ERC20_ABI,
    address: pairAddress as Address,
    functionName: 'balanceOf',
    args: [useAccount().address],
  })
  const updateTokenPrice = useCallback((data: any[], symbol: string) => {
    const foundToken = data.find((token) => token.basetoken.symbol === symbol)
    return foundToken ? foundToken.priceUSD : null
  }, [])
  useEffect(() => {
    const fetchTokenPrices = async () => {
      console.log(chainId, 'inn3')
      try {
        console.log(chainId, 'inn2')
        if (chainId) {
          const data = await fetchTokens(chainId)
          console.log('inn1')
          const token0price = updateTokenPrice(data, 'USDB')
          if (token0price !== null && firstToken?.symbol === 'USDB')
            setFirstToken((prev) => ({ ...prev, price: token0price }))

          const token1price = updateTokenPrice(data, 'WETH')
          if (token1price !== null && secondToken?.symbol === 'WETH')
            setSecondToken((prev) => ({ ...prev, price: token1price }))
        }
      } catch (error) {
        console.error('Failed to fetch token prices:', error)
      }
    }

    fetchTokenPrices()
  }, [updateTokenPrice, chainId])
  useEffect(() => {
    if (chainId && address) dispatch(getLiquidityTableElements({ address, chainId }))
    const params = new URLSearchParams(searchParams.toString())
    params.set('token0', firstToken.address as string)
    params.set('token1', secondToken.address as string)
    router.push(pathname + '?' + params.toString(), { scroll: false })
  }, [firstToken.address, secondToken.address])

  const handlerOption = (option: 'ADD' | 'WITHDRAW' | 'STAKE' | 'UNSTAKE') => {
    setOptionActive(option)
    setFirstValue('')
    setSecondValue('')
  }

  useEffect(() => {
    if (defaultPairs?.length == 2) {
      setFirstToken(defaultPairs[0])
      setSecondToken(defaultPairs[1])
      setIsLoading(false)
    }
    console.log(lpTokenBalance?.data as bigint, 'lpTokenBalance')
    setlpBalance((lpTokenBalance?.data as bigint) || 0n)
    if (
      account &&
      isConnected &&
      (Number(firstValue) > Number(formatUnits((token1Balance?.data as bigint) || 0n, firstToken?.decimals)) ||
        Number(secondValue) > Number(formatUnits((token2Balance?.data as bigint) || 0n, secondToken?.decimals)))
    ) {
      setButtonText('Insufficient balance')
    } else {
      setButtonText('Create Position')
    }
  }, [firstValue, secondValue, defaultPairs])

  useEffect(() => {
    const asyncGetReserve = async () => {
      const reserve: any = await getTokenReserve(
        firstToken.address as Address,
        secondToken.address as Address,
        depositType === 'STABLE'
      )

      if (reserve[0] == 0 || reserve[1] == 0) {
        setFirstReserve(1)
        setSecondReserve(1)
      } else {
        setFirstReserve(reserve[0])
        setSecondReserve(reserve[1])
      }
    }

    const asyncGetPair = async () => {
      const pair: any = await getPair(
        firstToken.address as Address,
        secondToken.address as Address,
        depositType === 'STABLE'
      )
      console.log(
        firstToken.address as Address,
        secondToken.address as Address,
        depositType === 'STABLE',
        pair,
        'depositType'
      )
      if (pair != '0x0') setPairAddress(pair)
      else setPairAddress('0x0000000000000000000000000000000000000000')
    }

    asyncGetReserve()
    asyncGetPair()
  }, [firstToken, secondToken, depositType])

  useEffect(() => {
    const asyncGetAllowance = async () => {
      const allowanceFirst: any = await getTokenAllowance(
        firstToken.address as Address,
        account.address as Address,
        contractAddressList.v2router as Address
      )
      const allowanceSecond: any = await getTokenAllowance(
        secondToken.address as Address,
        account.address as Address,
        contractAddressList.v2router as Address
      )
      const allowanceLp: any =
        pairAddress != '0x0000000000000000000000000000000000000000'
          ? await getTokenAllowance(
              pairAddress as Address,
              account.address as Address,
              contractAddressList.v2router as Address
            )
          : '0'
      console.log(allowanceFirst, allowanceSecond, allowanceLp, 'allowance')
      setallowanceFirst(allowanceFirst.toString())
      setallowanceSecond(allowanceSecond.toString())
      setallowanceLp(allowanceLp.toString())
      setShouldApproveFirst(allowanceFirst == '0')
      setShouldApproveSecond(allowanceSecond == '0')
      setShouldApprovePair(allowanceLp == '0')
    }

    asyncGetAllowance()
  }, [firstToken, secondToken, account.address, pairAddress])

  const handleOnTokenValueChange = (input: any, token: IToken) => {
    console.log('inn1', optionActive)
    if (optionActive == 'ADD') {
      // TODO: handle if pair is not created
      if (firstToken.address === token.address) {
        if (parseFloat(input) != 0) {
          setSecondValue(
            (
              (parseFloat(input) * Number(secondReserve === 0 ? 1 : secondReserve)) /
              Number(firstReserve === 0 ? 1 : firstReserve)
            ).toString()
          )
        }
        if (parseFloat(input) == 0) setSecondValue('')
        setFirstValue(input == '' ? 0 : input)

        if (timeout != undefined) clearTimeout(timeout)
        setTimeoutID(
          setTimeout(() => {
            setFirstValue(formatNumber(parseFloat(input), firstToken.decimals))
          }, 500)
        )
      } else {
        if (parseFloat(input) != 0)
          setFirstValue(
            (
              (parseFloat(input) * Number(firstReserve === 0 ? 1 : firstReserve)) /
              Number(secondReserve === 0 ? 1 : secondReserve)
            ).toString()
          )
        if (parseFloat(input) == 0) setFirstValue('')
        setSecondValue(input == '' ? 0 : input)

        if (timeout != undefined) clearTimeout(timeout)
        setTimeoutID(
          setTimeout(() => {
            setSecondValue(parseFloat(input) != 0 ? parseFloat(input).toString() : input)
          }, 500)
        )
      }
    }
  }

  const handleOnLPTokenValueChange = (input: any, token: IToken) => {
    // console.log('inn2', input, parseFloat(input) != 0 ? parseFloat(input).toString() : input, parseUnits(input, 18))
    setLpValue(input)

    if (optionActive == 'WITHDRAW') {
      const asyncGetWithdrawTokens = async () => {
        const tokens: any = await getLiquidityRemoveQuote(
          input,
          firstToken.address as Address,
          secondToken.address as Address,
          depositType === 'STABLE'
        )
        setFirstValue((Number(tokens[0]) / 1e18).toFixed(18).toString())
        setSecondValue((Number(tokens[1]) / 1e18).toString())
      }

      asyncGetWithdrawTokens()
    }
  }

  const handleAddLiquidity = async () => {
    setIsLoading(true)
    await writeContractAsync(
      {
        abi: ROUTERV2_ABI,
        address: contractAddressList.v2router as Address,
        functionName: 'addLiquidity',
        // TODO: handle deadline and slippage
        args: [
          firstToken.address as Address,
          secondToken.address as Address,
          depositType === 'STABLE',
          parseUnits(firstValue, firstToken?.decimals),
          parseUnits(firstValue, firstToken?.decimals),
          0,
          0,
          account.address as Address,
          parseInt((+new Date() / 1000).toString()) + 60 * 60,
        ],
      },

      {
        onSuccess: async (x) => {
          setIsLoading(true)
          const transaction = await publicClient.waitForTransactionReceipt({ hash: x })

          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Added LP successfully.`,
            notificationType: NotificationType.SUCCESS,
            txHash: transaction.transactionHash,
            notificationDuration: NotificationDuration.DURATION_5000,
          })

          setIsLoading(false)
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

  const handleRemoveLiquidity = async () => {
    setIsLoading(true)

    writeContractAsync(
      {
        abi: ROUTERV2_ABI,
        address: contractAddressList.v2router as Address,
        functionName: 'removeLiquidity',
        args: [
          firstToken.address as Address,
          secondToken.address as Address,
          depositType === 'STABLE',
          parseUnits(lpValue.toString(), 18),
          0,
          0,
          account.address as Address,
          parseInt((+new Date() / 1000).toString()) + 60 * 60,
        ],
      },

      {
        onSuccess: async (x) => {
          setIsLoading(true)
          const transaction = await publicClient.waitForTransactionReceipt({ hash: x })

          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Added successfully.`,
            notificationType: NotificationType.SUCCESS,
            txHash: transaction.transactionHash,
            notificationDuration: NotificationDuration.DURATION_5000,
          })
          setIsLoading(false)
        },
        onError: (e) => {
          setIsLoading(false)
          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Add LP failed. ${e}`,
            notificationType: NotificationType.ERROR,
            txHash: '',
            notificationDuration: NotificationDuration.DURATION_5000,
          })
        },
      }
    )
  }

  const handleApprove = async (token: Address, amount: string) => {
    setIsLoading(true)
    writeContractAsync(
      {
        abi: ERC20_ABI,
        address: token,
        functionName: 'approve',
        args: [contractAddressList.v2router, amount],
      },
      {
        onSuccess: async (x) => {
          setIsLoading(true)
          const transaction = await publicClient.waitForTransactionReceipt({ hash: x })
          if (transaction.status == 'success') {
            // toast(`Approved successfully`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Approved successfully`,
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
            contractAddressList.v2router as Address
          )
          const allowanceSecond: any = await getTokenAllowance(
            secondToken.address as Address,
            account.address as Address,
            contractAddressList.v2router as Address
          )
          const allowanceLp: any =
            pairAddress != '0x0000000000000000000000000000000000000000'
              ? await getTokenAllowance(
                  pairAddress as Address,
                  account.address as Address,
                  contractAddressList.v2router as Address
                )
              : {}
          setallowanceFirst(allowanceFirst.toString())
          setallowanceSecond(allowanceSecond.toString())
          setallowanceLp(allowanceLp.toString())
          setShouldApproveFirst(allowanceFirst == '0')
          setShouldApproveSecond(allowanceSecond == '0')
          setShouldApprovePair(allowanceLp == '0')
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
      <div className="bg-shark-400 bg-opacity-40 py-[11px] px-[10px] sm:px-[19px] flex items-center justify-between gap-1.5 sm:gap-2.5 border border-shark-950 rounded-[10px] mb-2.5 max-md:items-start">
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
              <div className="flex items-center gap-[5px] max-md:flex-wrap">
                {'VOLATILE' === depositType ? (
                  <Button variant="tertiary" className="!py-1 !px-1 h-[28px] max-md:!text-xs flex-shrink-0">
                    Volatile Pool
                  </Button>
                ) : 'CONCENTRATED_AUTOMATIC' === depositType || 'CONCENTRATED_MANUAL' === depositType ? (
                  <Button
                    variant="tertiary"
                    className="!py-1  hover:!border-none !bg-green-500 !border !border-solid !border-1 !border-green-400 !bg-opacity-40 h-[28px] max-md:!text-xs flex-shrink-0"
                  >
                    Concentrated
                  </Button>
                ) : 'STABLE' === depositType ? (
                  <Button variant="tertiary" className="!px-5 !py-0 h-[28px] max-md:!text-xs flex-shrink-0">
                    Stable Pool
                  </Button>
                ) : null}

                <Button
                  variant="tertiary"
                  className="!px-5 !py-0 h-[28px] !border-opacity-100 [&:not(:hover)]:border-shark-200 !bg-shark-300 !bg-opacity-40 max-md:!text-xs flex-shrink-0"
                >
                  {
                    pairs?.find(
                      (pair: LiquidityTableElement) => pair?.pairAddress?.toLowerCase() === pairAddress.toLowerCase()
                    )?.fee
                  }{' '}
                  %
                </Button>
                {/* <Button
                  variant="tertiary"
                  className="!p-0 h-[28px] w-[33px] !border-opacity-100 [&:not(:hover)]:border-shark-200 !bg-shark-300 !bg-opacity-40 max-md:!text-xs flex-shrink-0"
                >
                  <span className="icon-info"></span>
                </Button> */}
              </div>
            </div>
          </div>
          <div className="flex items-center text-xs leading-normal gap-[5px]">
            {/* <div className="flex items-center text-xs leading-normal max-md:flex-wrap gap-[5px]"> */}
            <div className="text-white">Liquidity</div>
            <div className="flex items-center gap-2.5">
              <p className="flex gap-[5px] items-center text-shark-100 flex-shrink-0">
                <Image src={firstToken.img} alt="token" className="w-5 h-5 rounded-full" width={20} height={20} />
                <span>{formatNumber(Number(firstReserve) / 1e18, 8)}</span>
              </p>
              <p className="flex gap-[5px] items-center text-shark-100 flex-shrink-0">
                <Image src={secondToken.img} alt="token" className="w-5 h-5 rounded-full" width={20} height={20} />
                <span>{formatNumber(Number(secondReserve) / 1e18, 8)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs leading-normal text-white">
          <div className="md:mb-[5px] text-right">APR</div>

          <p className="py-[5px] px-5 border border-solid bg-shark-400 rounded-[10px] bg-opacity-40 border-1 border-shark-300">
            {
              pairs?.find(
                (pair: LiquidityTableElement) => pair?.pairAddress?.toLowerCase() === pairAddress.toLowerCase()
              )?.apr
            }{' '}
            %
          </p>
        </div>
      </div>
      <div className="flex flex-wrap bg-shark-400 bg-opacity-40 p-[13px] md:py-[11px] md:px-[19px] gap-1.5 md:gap-2.5 border border-shark-950 rounded-[10px] mb-2.5">
        <Button
          onClick={() => handlerOption('ADD')}
          className="flex-1 h-[38px] mx-auto !text-xs"
          variant={optionActive === 'ADD' ? 'primary' : 'secondary'}
        >
          Add
        </Button>
        <Button
          onClick={() => handlerOption('WITHDRAW')}
          className="flex-1 h-[38px] mx-auto !text-xs"
          variant={optionActive === 'WITHDRAW' ? 'primary' : 'secondary'}
        >
          Withdraw
        </Button>
        {/* <Button
          onClick={() => handlerOption('STAKE')}
          className="flex-1 h-[38px] mx-auto !text-xs"
          variant={optionActive === 'STAKE' ? 'primary' : 'secondary'}
        >
          STAKE
        </Button>
        <Button
          onClick={() => handlerOption('UNSTAKE')}
          className="flex-1 h-[38px] mx-auto !text-xs"
          variant={optionActive === 'UNSTAKE' ? 'primary' : 'secondary'}
        >
          UNSTAKE
        </Button> */}
      </div>
      <div className="flex flex-col gap-1 relative">
        {optionActive === 'WITHDRAW' && (
          <>
            <div className="mb-3">
              {
                // TODO: handle LP tokens list
              }

              <ExchangeBox
                value={lpValue}
                token={
                  {
                    name: 'Fenix/Ether LP',
                    symbol: `${firstToken.symbol}/${secondToken.symbol} LP`,
                    id: 0,
                    decimals: 18,
                    address: pairAddress as Address,
                    img: '/static/images/tokens/FNX.svg',
                  } as IToken
                }
                onOpenModal={() => setOpenSelectToken(true)}
                variant="primary"
                onTokenValueChange={handleOnLPTokenValueChange}
                setValue={() => {}}
                option={optionActive}
              />

              {/* <SelectToken openModal={openSelectToken} setOpenModal={setOpenSelectToken} setToken={setFirstToken} /> */}
            </div>
            <Separator single />
          </>
        )}
        {optionActive === 'STAKE' && (
          <>
            <div className="mb-3">
              <div className="exchange-box-x1">
                <div className="flex items-center mb-3 justify-between">
                  <p className="text-white font-medium">Stake LP</p>
                  <p className="text-shark-100 flex text-sm justify-end gap-6 xl:gap-0 w-full xl:w-3/5 items-cente xl:justify-between">
                    <span className=" ml-3">
                      {firstToken?.price && formatDollarAmount(toBN(lpValue).multipliedBy(firstToken?.price))}
                    </span>
                    <div>
                      <span className="icon-wallet text-xs mr-2"></span>
                      <span>
                        {/* Available: {`${formatNumber(Number(balance) / 10 ** token.decimals, 8)}`} {token.symbol} */}
                        Available: 0 {firstToken.symbol}/{secondToken.symbol}
                      </span>
                    </div>
                  </p>
                </div>
                <div className="flex flex-col xl:flex-row items-center gap-3">
                  <div className="relative w-full xl:w-2/5">
                    <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Image
                            src={`/static/images/tokens/FNX.png`}
                            alt="token"
                            className="rounded-full w-7 h-7"
                            width={20}
                            height={20}
                          />
                          <Image
                            src={`/static/images/tokens/WETH.png`}
                            alt="token"
                            className="-ml-4 rounded-full w-7 h-7"
                            width={20}
                            height={20}
                          />
                        </div>
                        <span className="text-base">
                          {firstToken.symbol}/{secondToken.symbol}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full xl:w-3/5">
                    <input
                      value={0}
                      className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
                      placeholder="0.0"
                      onChange={(input) => console.log(input)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {optionActive === 'UNSTAKE' && (
          <>
            <div className="mb-3">
              <div className="exchange-box-x1">
                <div className="flex items-center mb-3 justify-between">
                  <p className="text-white font-medium">Unstake LP</p>
                  <p className="text-shark-100 flex text-sm justify-end gap-6 xl:gap-0 w-full xl:w-3/5 items-cente xl:justify-between">
                    <span className=" ml-3">
                      {firstToken?.price && formatDollarAmount(toBN(lpValue).multipliedBy(firstToken?.price))}
                    </span>
                    <div>
                      <span className="icon-wallet text-xs mr-2"></span>
                      <span>
                        {/* Available: {`${formatNumber(Number(balance) / 10 ** token.decimals, 8)}`} {token.symbol} */}
                        Available: 0 {firstToken.symbol}/{secondToken.symbol}
                      </span>
                    </div>
                  </p>
                </div>
                <div className="flex flex-col xl:flex-row items-center gap-3">
                  <div className="relative w-full xl:w-2/5">
                    <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Image
                            src={`/static/images/tokens/FNX.png`}
                            alt="token"
                            className="rounded-full w-7 h-7"
                            width={20}
                            height={20}
                          />
                          <Image
                            src={`/static/images/tokens/WETH.png`}
                            alt="token"
                            className="-ml-4 rounded-full w-7 h-7"
                            width={20}
                            height={20}
                          />
                        </div>
                        <span className="text-base">
                          {firstToken.symbol}/{secondToken.symbol}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full xl:w-3/5">
                    <input
                      value={0}
                      className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
                      placeholder="0.0"
                      onChange={(input) => console.log(input)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {optionActive == 'ADD' ? (
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
            option={'ADD'}
          />
        ) : optionActive == 'WITHDRAW' ? (
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
            option={'WITHDRAWINN'}
          />
        ) : null}
      </div>

      {optionActive == 'ADD' ? (
        <>
          {' '}
          {pairAddress != '0x0000000000000000000000000000000000000000' ? (
            <ApproveButtonClassic
              shouldApproveFirst={shouldApproveFirst}
              shouldApproveSecond={shouldApproveSecond}
              allowanceFirst={allowanceFirst}
              allowanceSecond={allowanceSecond}
              token0={firstToken}
              token1={secondToken}
              firstValue={firstValue}
              secondValue={secondValue}
              handleApprove={handleApprove}
              mainFn={handleAddLiquidity}
              mainText={buttonText}
              isLoading={isLoading}
            />
          ) : (
            <Button
              className="w-full mx-auto !text-xs !h-[49px]"
              variant="tertiary"
              disabled={pairAddress == '0x0000000000000000000000000000000000000000'}
            >
              Pair not created yet
            </Button>
          )}
        </>
      ) : null}
      {optionActive == 'WITHDRAW' ? (
        <>
          {' '}
          <Button
            className="w-full mx-auto !text-xs !h-[49px]"
            variant="tertiary"
            disabled={
              pairAddress == '0x0000000000000000000000000000000000000000' ||
              Number(lpBalance) / 10 ** 18 < Number(lpValue)
            }
            onClick={() => {
              Number(formatUnits(BigInt(allowanceLp), 18)) < Number(lpValue.toString())
                ? handleApprove(pairAddress as Address, parseUnits(lpValue.toString(), 18).toString())
                : handleRemoveLiquidity()
            }}
          >
            {pairAddress == '0x0000000000000000000000000000000000000000' ? (
              'Pair not created yet'
            ) : isLoading ? (
              <Loader color="white" size={20} />
            ) : Number(lpBalance) / 10 ** 18 < Number(lpValue) ? (
              'Insufficient LP'
            ) : Number(formatUnits(BigInt(allowanceLp), 18)) < Number(lpValue.toString()) ? (
              'Approve LP'
            ) : (
              'Remove Liquidity'
            )}
          </Button>
        </>
      ) : null}
      {/* <Button
        className="w-full mx-auto !text-xs !h-[49px]"
        variant="tertiary"
        onClick={() => {
          optionActive == 'ADD'
            ? shouldApproveFirst
              ? handleApprove(firstToken.address as Address)
              : shouldApproveSecond
                ? handleApprove(secondToken.address as Address)
                : handleAddLiquidity()
            : shouldApprovePair
              ? handleApprove(pairAddress as Address)
              : handleRemoveLiquidity()
        }}
      >
        {optionActive == 'STAKE'
          ? 'STAKE'
          : optionActive == 'UNSTAKE'
            ? 'UNSTAKE'
            : optionActive == 'ADD'
              ? shouldApproveFirst
                ? `Approve ${firstToken.symbol}`
                : shouldApproveSecond
                  ? `Approve ${secondToken.symbol}`
                  : `Add Liquidity`
              : shouldApprovePair
                ? `Approve LP`
                : `Remove Liquidity`}
      </Button> */}
    </>
  )
}

export default Classic
