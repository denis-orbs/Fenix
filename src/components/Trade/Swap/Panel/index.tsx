'use client'
import { useCallback, useEffect, useState } from 'react'

import Swap from '@/src/components/Trade/Swap/Panel/Swap'
import For from '@/src/components/Trade/Swap/Panel/For'
import Separator from '@/src/components/Trade/Common/Separator'
import { erc20Abi, formatUnits, parseUnits, zeroAddress } from 'viem'
import { useSimulateContract } from 'wagmi'
import { type WriteContractErrorType } from '@wagmi/core'
import Chart from '@/src/components/Liquidity/Deposit/Chart'
import { useShowChart, useSetChart } from '@/src/state/user/hooks'

import { IToken } from '@/src/library/types'
import { useReadContract, useWriteContract } from 'wagmi'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import { algebraQuoterV2ABI } from '@/src/library/web3/abis'
import { Button, Switch } from '@/src/components/UI'
import { algebraSwapABI } from '@/src/library/web3/abis/algebraSwap'
import useStore from '@/src/state/zustand'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import toast from 'react-hot-toast'
import Loader from '@/src/components/UI/Icons/Loader'
import { ReloadIcon } from '@/src/components/UI/Icons/Reload'
import SettingsIcon from '@/src/components/UI/Icons/Settings'
import { useSlippageTolerance } from '@/src/state/user/hooks'
import { formatNumber, toBN } from '@/src/library/utils/numbers'

import { contractAddressList } from '@/src/library/constants/contactAddresses'
import useAlgebraPoolByPair from '@/src/library/hooks/web3/useAlgebraPoolByPair'
import useAlgebraSafelyStateOfAMM from '@/src/library/hooks/web3/useAlgebraSafelyStateOfAMM'
import cn from '@/src/library/utils/cn'
import { useAlgebraMultiRouting } from './useAlgebraMultiRouting'
import { approveToken, isNativeToken, switchTokensValues } from './utilsChange'
import { getWeb3Provider } from '@/src/library/utils/web3'
import { NATIVE_ETH, NATIVE_ETH_LOWERCASE, WETH_ADDRESS } from '@/src/library/Constants'
import { wethAbi } from '@/src/library/web3/abis/wethAbi'

enum ButtonState {
  CONNECT_WALLET = 'Connect Wallet',
  POOL_NOT_AVAILABLE = 'Pool Not Available',
  ENTER_AMOUNT = 'Enter Amount',
  APPROVAL_REQUIRED = 'Approval Required',
  APPROVING = 'Approving...',
  WAITING_APPROVAL = 'Waiting Approval',
  INSUFFICIENT_BALANCE = 'Insufficient Balance',
  WAITING_CONFIRMATION = 'Waiting Confirmation',
  PRICE_IMPACT_ALERT = 'Price Impact Too High. Swap Anyway',
  SWAP = 'Swap',
  LOADING = 'Loading...',
}
const Panel = () => {
  const [swapValue, setSwapValue] = useState<string>('')
  const [forValue, setForValue] = useState<string>('')
  const { setSlippageModal } = useStore()
  const [currentButtonState, setCurrentButtonState] = useState(ButtonState.SWAP)
  const [tokenSellUserBalance, setTokenSellUserBalance] = useState<string>('')
  const { writeContract, failureReason, data: hash } = useWriteContract()
  const slippage = useSlippageTolerance()
  const { openConnectModal } = useConnectModal()
  const { account, isConnected } = useActiveConnectionDetails()

  const [tokenSell, setTokenSell] = useState<IToken>({
    name: 'USDB',
    symbol: 'USDB',
    address: '0x4300000000000000000000000000000000000003',
    decimals: 18,
    img: 'USDB.png',
    price: 0,
  })

  const [tokenGet, setTokenGet] = useState<IToken>({
    name: 'Wrapped Ether',
    symbol: 'WETH',
    address: '0x4300000000000000000000000000000000000004',
    decimals: 18,
    img: 'WETH.png',
    price: 0,
  })

  const updateTokenPrice = useCallback((data: any[], symbol: string) => {
    const foundToken = data.find((token) => token.basetoken.symbol === symbol)
    return foundToken ? foundToken.priceUSD : null
  }, [])
  const showChart = useShowChart()
  const setChart = useSetChart()

  // To have a 0s load, use static default tokens and fetch the prices as soon as the component mounts
  // Ideally, we should do this on a loader in redux and share the data across the app
  useEffect(() => {
    const fetchTokenPrices = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token-prices`)
        const data = await response.json()
        // USDB Because it's the default token sell
        const sellPrice = updateTokenPrice(data, 'USDB')
        if (sellPrice !== null && tokenSell?.symbol === 'USDB') setTokenSell((prev) => ({ ...prev, price: sellPrice }))
        // WETH Because it's the default token get
        const getPrice = updateTokenPrice(data, 'WETH')
        if (getPrice !== null && tokenGet?.symbol === 'WETH') setTokenGet((prev) => ({ ...prev, price: getPrice }))
      } catch (error) {
        console.error('Failed to fetch token prices:', error)
      }
    }

    fetchTokenPrices()
  }, [updateTokenPrice])

  // function to make the swap
  const slippageValue = slippage == 'auto' || !slippage ? 100 - 0.5 : 100 - slippage

  const amountOutMinimum = toBN(Number(parseUnits(forValue, tokenGet.decimals)))
    .multipliedBy(slippageValue)
    .dividedBy(100)
  const callAlgebraRouter = async () => {
    if (!isConnected) {
      openConnectModal && openConnectModal()
      return
    }

    try {
      if (nativeETH_WETH) {
        const txHash = writeContract(
          {
            address: WETH_ADDRESS,
            abi: wethAbi,
            functionName: 'deposit',
            value: parseUnits(swapValue, tokenSell.decimals),
          },
          {
            onSuccess: async (data) => {
              // txHash SEND
              toast.success('Transaction sent successfully!')
              setForValue('')
              setSwapValue('')
              console.log(txHash)
              console.log(hash)
              // HAGO UN WAIT Y REFRESCO COMPONENTES
            },
            onError: (e) => {
              console.log(e)
              toast.error(failureReason ? failureReason.message : 'There was an error')
            },
          }
        )
        return
      } else if (nativeWETH_ETH) {
        writeContract(
          {
            address: WETH_ADDRESS,
            abi: wethAbi,
            functionName: 'withdraw',
            args: [parseUnits(swapValue, tokenSell.decimals)],
          },
          {
            onSuccess: async (data) => {
              // txHash SEND
              toast.success('Transaction sent successfully!')
              setForValue('')
              setSwapValue('')
              console.log(hash)
              // HAGO UN WAIT Y REFRESCO COMPONENTES
            },
            onError: (e) => {
              console.log(e)
              toast.error(failureReason ? failureReason.message : 'There was an error')
            },
          }
        )
        return
      }

      // OJO VER LOS FUCKIGNS RETUSN
      else if (singleSwapAvailable) {
        const txHash = writeContract(
          {
            address: contractAddressList.cl_swap as `0x${string}`,
            abi: algebraSwapABI,
            functionName: 'exactInputSingle',
            value: isNativeToken(tokenSell?.address?.toString()) ? parseUnits(swapValue, tokenSell.decimals) : 0n,
            args: [
              {
                tokenIn: isNativeToken(tokenSell?.address?.toString())
                  ? WETH_ADDRESS
                  : (tokenSell.address as `0x${string}`),
                tokenOut: tokenGet.address as `0x${string}`,
                recipient: account as `0x${string}`,
                deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 20),
                amountIn: parseUnits(swapValue, tokenSell.decimals),
                amountOutMinimum: BigInt(Number(amountOutMinimum.toString().split('.')[0])),
                limitSqrtPrice: 0n,
              },
            ],
          },
          {
            onSuccess: async (data) => {
              // txHash SEND
              toast.success('Transaction sent successfully!')
              setForValue('')
              setSwapValue('')
              // HAGO UN WAIT Y REFRESCO COMPONENTES
            },
            onError: (e: WriteContractErrorType) => {
              console.log(e)
              toast.error(failureReason ? failureReason.message : 'There was an error')
            },
          }
        )
      } else if (multiHopAvailable) {
        writeContract(
          {
            address: contractAddressList.cl_swap as `0x${string}`,
            abi: algebraSwapABI,
            functionName: 'exactInput',
            args: [
              {
                path: ('0x' +
                  route?.swapRoute?.tokenPath
                    .map((token) => token.address.replace(/^0x/, ''))
                    .join('')) as `0x${string}`,
                recipient: account as `0x${string}`,
                amountIn: parseUnits(swapValue, tokenSell.decimals),
                amountOutMinimum: BigInt(Number(amountOutMinimum.toString().split('.')[0])),
                deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 20),
              },
            ],
          },
          {
            onSuccess: async (data) => {
              toast.success('Transaction sent successfully!')
              setForValue('')
              setSwapValue('')
            },
            onError: (e: WriteContractErrorType) => {
              console.log(e)
              toast.error(failureReason ? failureReason.message : 'There was an error')
            },
          }
        )
      } else {
        console.log('No swap available')
        toast.error('No swap available')
      }
    } catch (error) {
      // console.log(error)
    }
  }

  const handleApproveToken = async () => {
    if (!isConnected) {
      openConnectModal && openConnectModal()
      return
    }
    setCurrentButtonState(ButtonState.WAITING_APPROVAL)
    const provider = getWeb3Provider()
    const txApproveHash = await approveToken({
      tokenAddress: tokenSell.address as `0x${string}`,
      contractAddress: contractAddressList.cl_swap as `0x${string}`,
      abi: erc20Abi,
      onSuccess: () => setCurrentButtonState(ButtonState.APPROVING),
      onError: () => setCurrentButtonState(ButtonState.APPROVAL_REQUIRED),
    })
    if (txApproveHash) {
      await provider.waitForTransaction(txApproveHash)
      approvalData.refetch()

      // setCurrentButtonState(ButtonState.SWAP)
    }
    setCurrentButtonState(ButtonState.SWAP)
  }
  const tokenSellIsNative = isNativeToken(tokenSell?.address)
  const tokenGetIsNative = isNativeToken(tokenGet?.address)
  const { data: currentPool, loading: loadingCurrentPool } = useAlgebraPoolByPair(
    tokenGet.address as `0x${string}`,
    tokenSellIsNative ? WETH_ADDRESS : (tokenSell.address as `0x${string}`)
  )

  // when user changes the account, we reset the swap and for values
  useEffect(() => {
    if (!account) {
      setSwapValue('')
      setForValue('')
    }
  }, [account])

  // simulate swap
  console.log(tokenSellIsNative ? WETH_ADDRESS : (tokenSell.address as `0x${string}`))
  console.log(WETH_ADDRESS)
  console.log(tokenSell)
  const quoteExactInputSingleCall = useSimulateContract({
    address: contractAddressList.cl_quoterV2 as `0x${string}`,
    abi: algebraQuoterV2ABI,
    functionName: 'quoteExactInputSingle',
    args: [
      {
        tokenIn: tokenSellIsNative ? WETH_ADDRESS : (tokenSell.address as `0x${string}`),
        tokenOut: tokenGet.address as `0x${string}`,
        amountIn: parseUnits(swapValue, tokenSell.decimals),
        limitSqrtPrice: 0n,
      },
    ],
  })
  const route = useAlgebraMultiRouting(tokenGet, tokenSell)
  const multiHopAvailable = route !== null
  const singleSwapAvailable = currentPool != zeroAddress
  console.log(currentPool)
  console.log(singleSwapAvailable)
  const swapAvailable = singleSwapAvailable || multiHopAvailable

  const quoteExactInputCall = useSimulateContract({
    address: contractAddressList.cl_quoterV2 as `0x${string}`,
    abi: algebraQuoterV2ABI,
    functionName: 'quoteExactInput',
    args: [
      multiHopAvailable
        ? (('0x' +
            route?.swapRoute?.tokenPath?.map((token) => token.address.replace(/^0x/, '')).join('')) as `0x${string}`)
        : '0x000',
      parseUnits(swapValue, tokenSell.decimals),
    ],
  })
  console.log(quoteExactInputCall?.data?.result)
  // TODO: VER SI SE USA ESTO?
  const sqrtPriceX96After = swapAvailable
    ? singleSwapAvailable
      ? quoteExactInputSingleCall?.data?.result[2] || 0n
      : quoteExactInputCall?.data?.result[2] || 0n
    : 0n

  // const sqrtPriceX96After2 = swapAvailable
  //   ? singleSwapAvailable
  //     ? quoteExactInputSingleCall?.data?.result[2] || 0n
  //     : quoteExactInputCall?.data?.result[2] || 0n
  //   : 0n

  // simulate swap

  // Swap fee for the transaction
  const [swapFee, setSwapFee] = useState<string>('')
  // When the user changes the input token, we update the output token value

  // que las fees me vengan de otro lado, directamente, qué es esto?
  useEffect(() => {
    // const outputTokenValue = quoteExactInputSingleCall?.data?.result[0] || -1n
    const outputTokenValue = swapAvailable
      ? singleSwapAvailable
        ? quoteExactInputSingleCall?.data?.result[0] || -1n
        : quoteExactInputCall?.data?.result[0] || -1n
      : -1n
    // const fees = quoteExactInputSingleCall?.data?.result[5].toString()
    const fees = swapAvailable
      ? singleSwapAvailable
        ? quoteExactInputSingleCall?.data?.result[5]?.toString() || '0'
        : quoteExactInputCall?.data?.result[5]?.reduce((acc, fee) => acc + fee, 0).toString() || '0'
      : '0'
    if (outputTokenValue !== -1n) setForValue(formatUnits(outputTokenValue, tokenGet.decimals))
    if (fees && fees == swapFee) return
    setSwapFee(fees || '')
  }, [quoteExactInputSingleCall?.data?.result, tokenGet.decimals, quoteExactInputCall?.data?.result])

  // check if the user has approved the token
  const approvalData = useReadContract({
    address: tokenSell.address as `0x${string}`,
    functionName: 'allowance',
    args: [account as `0x${string}`, contractAddressList.cl_swap as `0x${string}`],
    abi: erc20Abi,
  })
  // this is the user balance of the token that the user wants to sell. We pass the setTokenSellUserBalance to the Swap component to update the balance when the user changes the token.
  // We use this balance to check if the user has enough balance to swap

  // manage button click
  const handleSwapClick = () => {
    if (!account) {
      openConnectModal && openConnectModal()
      return
    }
    if (currentButtonState === ButtonState.SWAP || currentButtonState === ButtonState.PRICE_IMPACT_ALERT) {
      callAlgebraRouter()
    } else if (currentButtonState === ButtonState.APPROVAL_REQUIRED) {
      setCurrentButtonState(ButtonState.WAITING_APPROVAL)
      handleApproveToken()
    }
  }

  const {
    data: stateOfAMM,
    loading: loadingStateOfAMM,
    refetch: refetchStateOfAMM,
  } = useAlgebraSafelyStateOfAMM(currentPool)

  const currentSqrtPriceX96 = stateOfAMM?.[0] || 1n
  const sqrtPriceX96AfterBN = toBN(sqrtPriceX96After.toString())
  const currentSqrtPriceX96BN = toBN(currentSqrtPriceX96.toString())
  const sqrtPriceDifference = sqrtPriceX96AfterBN.minus(currentSqrtPriceX96BN)
  const [multiHopPriceImpact, setMultiHopPriceImpact] = useState<string>('0')
  const [singleSwapPriceImpact, setSingleSwapPriceImpact] = useState<string>('0')
  useEffect(() => {
    if (!singleSwapAvailable) return

    if (currentSqrtPriceX96 && sqrtPriceX96After)
      setSingleSwapPriceImpact(
        sqrtPriceDifference.div(currentSqrtPriceX96BN).multipliedBy(100).abs().multipliedBy(-1).toString()
      )
  }, [
    sqrtPriceX96AfterBN,
    currentSqrtPriceX96BN,
    singleSwapAvailable,
    currentSqrtPriceX96,
    sqrtPriceX96After,
    sqrtPriceDifference,
  ])

  const priceImpact = swapAvailable ? (singleSwapAvailable ? singleSwapPriceImpact : multiHopPriceImpact) : '0'

  // const priceImpact =
  //   swapAvailable && singleSwapAvailable && currentSqrtPriceX96 && sqrtPriceX96After
  //     ? sqrtPriceDifference.div(currentSqrtPriceX96BN).multipliedBy(100).abs().multipliedBy(-1)
  //     : '0'

  useEffect(() => {
    console.log(currentButtonState)
  }, [currentButtonState])
  // manage button state
  // currentPool == zeroAddress
  // const [multiHopSwapAvailable, setMultiHopSwapAvailable] = useState<boolean>(false)

  useEffect(() => {
    if (!isConnected) {
      setCurrentButtonState(ButtonState.CONNECT_WALLET)
    } else if (
      !(!loadingCurrentPool && currentPool === zeroAddress) &&
      (loadingStateOfAMM ||
        (approvalData.isLoading && !tokenSellIsNative) ||
        (swapValue && (singleSwapAvailable ? quoteExactInputSingleCall.isLoading : quoteExactInputCall.isLoading)) ||
        (loadingCurrentPool && currentPool))
    ) {
      setCurrentButtonState(ButtonState.LOADING)
    } else if (!swapAvailable) {
      setCurrentButtonState(ButtonState.POOL_NOT_AVAILABLE)
    } else if (currentButtonState == ButtonState.WAITING_APPROVAL || currentButtonState == ButtonState.APPROVING) {
      return
    } else if (
      !tokenSellIsNative &&
      Number(formatUnits(approvalData?.data || 0n, tokenSell.decimals)) < Number(swapValue)
    ) {
      setCurrentButtonState(ButtonState.APPROVAL_REQUIRED)
    } else if (!swapValue || !forValue) {
      setCurrentButtonState(ButtonState.ENTER_AMOUNT)
    } else if (Number(swapValue) > Number(tokenSellUserBalance || 0)) {
      setCurrentButtonState(ButtonState.INSUFFICIENT_BALANCE)
    } else if (toBN(priceImpact).abs().gt(3)) {
      setCurrentButtonState(ButtonState.PRICE_IMPACT_ALERT)
    } else {
      setCurrentButtonState(ButtonState.SWAP)
    }
  }, [
    isConnected,
    swapValue,
    forValue,
    approvalData?.data,
    tokenSell.decimals,
    tokenSellUserBalance,
    currentPool,
    priceImpact,
    loadingStateOfAMM,
    swapAvailable,
    approvalData.isLoading,
    quoteExactInputSingleCall.isLoading,
    quoteExactInputCall.isLoading,
    loadingCurrentPool,
  ])
  useEffect(() => {
    const interval = setInterval(() => {
      if (nativeETH_WETH || nativeWETH_ETH) return
      approvalData.refetch()
      quoteExactInputSingleCall.refetch()
      quoteExactInputCall.refetch()
      refetchStateOfAMM()
    }, 15000)
    return () => clearInterval(interval)
  }, [
    swapValue,
    forValue,
    currentPool,
    account,
    approvalData,
    quoteExactInputSingleCall,
    stateOfAMM,
    quoteExactInputCall,
  ])
  useEffect(() => {
    const swapValuePrice = toBN(tokenSell.price).multipliedBy(swapValue)
    const forValuePrice = toBN(tokenGet.price).multipliedBy(forValue)
    const diff = swapValuePrice.minus(forValuePrice)
    console.log(forValue)
    console.log(tokenGet.price)
    setMultiHopPriceImpact(diff.div(swapValuePrice).times(100).abs().multipliedBy(-1).toString())
  }, [swapValue, forValue, tokenSell.price, tokenGet.price])
  const [expandTxDetails, setExpandTxDetails] = useState<boolean>(false)
  useEffect(() => {
    setForValue('')
  }, [tokenGet])
  useEffect(() => {
    if (swapValue == '') setForValue('')
  }, [swapValue])
  const [isChartVisible, setIsChartVisible] = useState(showChart)

  const handleSwitch = () => {
    setChart(!isChartVisible)
    setIsChartVisible((prevState) => !prevState)
  }
  const nativeWETH_ETH =
    tokenGet?.address?.toLowerCase() === NATIVE_ETH.toLowerCase() &&
    tokenSell?.address?.toLowerCase() == WETH_ADDRESS.toLowerCase()
  const nativeETH_WETH =
    tokenSell?.address?.toLowerCase() === NATIVE_ETH.toLowerCase() &&
    tokenGet?.address?.toLowerCase() == WETH_ADDRESS.toLowerCase()

  useEffect(() => {
    if (nativeETH_WETH) {
      setForValue(swapValue)
    }
  }, [swapValue, nativeETH_WETH])
  useEffect(() => {
    if (nativeWETH_ETH) {
      setForValue(swapValue)
    }
  }, [swapValue, nativeWETH_ETH])

  useEffect(() => {
    console.log(tokenGet?.address?.toLowerCase() === NATIVE_ETH_LOWERCASE)
    if (tokenGet?.address?.toLowerCase() === NATIVE_ETH_LOWERCASE && !(nativeETH_WETH || nativeWETH_ETH)) {
      const price = tokenGet?.price
      setTokenGet({
        name: 'Wrapped Ether',
        symbol: 'WETH',
        address: '0x4300000000000000000000000000000000000004',
        decimals: 18,
        img: 'WETH.png',
        price: price,
      })
    }
  }, [tokenSell?.address, tokenGet?.address])

  return (
    <>
      <section className={`box-panel-trade ${showChart ? 'max-xl:rounded-b-none' : ''}`}>
        <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center relative z-10">
          <div className="w-full relative">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-x-4 ">
                <h4 className="text-lg text-white font-medium">Swap</h4>
              </div>

              <div className="flex gap-x-3 items-center">
                <span className="text-shark-100 text-sm">
                  {swapFee && swapFee != '0' && `${formatUnits(BigInt(swapFee), 4)}% fee`}
                </span>
                <div className="flex items-center gap-3">
                  <Switch active={showChart} setActive={handleSwitch} />
                  <div className="text-xs text-shark-100 font-normal whitespace-nowrap">Chart</div>
                </div>
                <ReloadIcon
                  className="text-shark-100 !cursor-pointer"
                  onClick={() => {
                    setSwapValue('')
                    setForValue('')
                  }}
                />
                <SettingsIcon onClick={() => setSlippageModal(true)} className="text-shark-100 !cursor-pointer " />
              </div>
            </div>
            <div className="flex flex-col gap-1 mb-5 relative">
              <div className="mb-3">
                <Swap
                  token={tokenSell}
                  setToken={setTokenSell}
                  value={swapValue}
                  setValue={setSwapValue}
                  setTokenSellUserBalance={setTokenSellUserBalance}
                />
                <Separator
                  onClick={() => {
                    const prevForValue = forValue
                    switchTokensValues(tokenGet, tokenSell, setTokenGet, setTokenSell)
                    setSwapValue(prevForValue)
                  }}
                />
                <For token={tokenGet} setToken={setTokenGet} value={forValue} setValue={setForValue} />
              </div>
              <Button
                variant="primary"
                className="w-full flex items-center justify-center gap-x-2"
                onClick={handleSwapClick}
                disabled={
                  currentButtonState === ButtonState.LOADING ||
                  currentButtonState === ButtonState.APPROVING ||
                  currentButtonState === ButtonState.WAITING_APPROVAL
                }
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
        </div>
        <p
          className="text-white bg-shark-400 flex justify-between bg-opacity-40 w-full rounded-md px-8 py-1.5 text-sm cursor-pointer "
          onClick={() => {
            setExpandTxDetails(!expandTxDetails)
          }}
        >
          Tx details:
          <span className={cn('icon-chevron text-sm inline-block', expandTxDetails ? '' : 'rotate-180')} />
        </p>

        <div
          hidden={!expandTxDetails}
          className="bg-shark-400 bg-opacity-40 w-full mt-1 px-8 py-2 space-y-1 text-white text-sm
        [&>p]:justify-between [&>p]:flex rounded-md select-none transition-all duration-300 ease-in-out
      "
        >
          <p className="">
            Route:
            <span className="text-shark-100">
              {nativeWETH_ETH && 'WETH > ETH'}

              {nativeETH_WETH && 'ETH > WETH'}
              {multiHopAvailable &&
                currentPool == zeroAddress &&
                route?.swapRoute?.tokenPath.map((token) => token.symbol).join(' > ')}
              {currentPool !== zeroAddress && `${tokenSell.symbol} > ${tokenGet.symbol}`}
            </span>
          </p>
          <p className="">
            Slippage <span className="text-shark-100">{nativeETH_WETH || nativeWETH_ETH ? '0' : slippage}</span>
          </p>

          <p className="">
            Minimum Amount Recieved
            <span className="text-shark-100">
              {(nativeETH_WETH || nativeWETH_ETH) && formatNumber(Number(forValue || 0), 6).toString()}
              {amountOutMinimum &&
                !(nativeETH_WETH || nativeWETH_ETH) &&
                formatUnits(BigInt(Number(amountOutMinimum.toString().split('.')[0])), tokenGet.decimals).toString()}
              {!amountOutMinimum && !(nativeETH_WETH || nativeWETH_ETH) && '-'} {tokenGet.symbol}
            </span>
          </p>
          <p className="">
            Price Impact{' '}
            <span className="text-shark-100">
              {nativeETH_WETH || nativeWETH_ETH ? '0' : parseFloat(priceImpact.toString()).toFixed(2)}%
            </span>
          </p>
        </div>
      </section>
      {showChart && <Chart token0={tokenGet?.address} token1={tokenSell?.address} />}
    </>
  )
}

export default Panel
