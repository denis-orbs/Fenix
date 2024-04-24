'use client'
import { useEffect, useState } from 'react'

import Swap from '@/src/components/Trade/Swap/Panel/Swap'
import For from '@/src/components/Trade/Swap/Panel/For'
import Separator from '@/src/components/Trade/Common/Separator'
import { erc20Abi, formatUnits, parseUnits, zeroAddress } from 'viem'
import { useSimulateContract } from 'wagmi'
import { type WriteContractErrorType } from '@wagmi/core'

import { IToken } from '@/src/library/types'
import { useReadContract, useWriteContract } from 'wagmi'
import { blastSepolia } from 'viem/chains'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import { algebraQuoterV2ABI } from '@/src/library/web3/abis'
import { Button } from '@/src/components/UI'
import { ethers } from 'ethers'
import { algebraSwapABI } from '@/src/library/web3/abis/algebraSwap'
import useStore from '@/src/state/zustand'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import toast from 'react-hot-toast'
import Loader from '@/src/components/UI/Icons/Loader'
import { ReloadIcon } from '@/src/components/UI/Icons/Reload'
import SettingsIcon from '@/src/components/UI/Icons/Settings'
import { useSlippageTolerance } from '@/src/state/user/hooks'
import { toBN } from '@/src/library/utils/numbers'

import { contractAddressList } from '@/src/library/constants/contactAddresses'
import useAlgebraPoolByPair from '@/src/library/hooks/web3/useAlgebraPoolByPair'
import useAlgebraSafelyStateOfAMM from '@/src/library/hooks/web3/useAlgebraSafelyStateOfAMM'
import cn from '@/src/library/utils/cn'
import { useAlgebraMultiRouting } from './useAlgebraMultiRouting'

enum ButtonState {
  CONNECT_WALLET = 'Connect Wallet',
  POOL_NOT_AVAILABLE = 'Pool Not Available',
  ENTER_AMOUNT = 'Enter Amount',
  APPROVAL_REQUIRED = 'Approval Required',
  WAITING_APPROVAL = 'Waiting Approval',
  INSUFFICIENT_BALANCE = 'Insufficient Balance',
  WAITING_CONFIRMATION = 'Waiting Confirmation',
  PRICE_IMPACT_ALERT = 'Price Impact Too High. Swap Anyway',
  SWAP = 'Swap',
  LOADING = 'Loading...',
}
const Panel = () => {
  // FIXME
  const [tokenSell, setTokenSell] = useState<IToken>({
    name: 'USDB',
    symbol: 'USDB',
    address: '0x4300000000000000000000000000000000000003',
    decimals: 18,
    img: 'USDB.png',
    price: 0,
  })
  // Workaround to get the prices for the default tokens
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/token-prices')
      .then((res) => res.json())
      .then((data) => {
        const foundSellToken = data.find((token: any) => {
          return token.basetoken.symbol === 'USDB'
        })
        if (foundSellToken) setTokenSell((prev) => ({ ...prev, price: foundSellToken.priceUSD }))
        const foundGetToken = data.find((token: any) => {
          return token.basetoken.symbol === 'WETH'
        })
        if (foundGetToken) setTokenGet((prev) => ({ ...prev, price: foundGetToken.priceUSD }))
      })
  }, [])
  // FIXME
  const [tokenGet, setTokenGet] = useState<IToken>({
    name: 'Wrapped Ether',
    symbol: 'WETH',
    address: '0x4300000000000000000000000000000000000004',
    decimals: 18,
    img: 'WETH.png',
    price: 0,
  })
  const [swapValue, setSwapValue] = useState<string>('')
  const [forValue, setForValue] = useState<string>('')

  const { data, error, isPending, isError, writeContract } = useWriteContract()
  const slippage = useSlippageTolerance()

  const { openConnectModal } = useConnectModal()
  const { account, isConnected } = useActiveConnectionDetails()

  // function to make the swap
  const slippageValue = slippage == 'auto' || !slippage ? 100 - 0.5 : 100 - slippage
  const amountOutMinimum = toBN(Number(parseUnits(forValue, tokenSell.decimals)))
    .multipliedBy(slippageValue)
    .dividedBy(100)
  const callAlgebraRouter = async () => {
    if (!isConnected) {
      openConnectModal && openConnectModal()
      return
    }

    try {
      writeContract(
        {
          address: contractAddressList.cl_swap as `0x${string}`,
          abi: algebraSwapABI,
          functionName: 'exactInputSingle',
          args: [
            {
              tokenIn: tokenSell.address as `0x${string}`,
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
            toast.success('Transaction sent successfully!')
            setForValue('')
            setSwapValue('')
          },
          onError: (e: WriteContractErrorType) => {
            toast.error(e.message.split('\n')[0])
          },
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const approveToken = async () => {
    if (!isConnected) {
      openConnectModal && openConnectModal()
      return
    }
    setCurrentButtonState(ButtonState.WAITING_APPROVAL)
    try {
      await writeContract(
        {
          abi: erc20Abi,
          address: tokenSell.address as `0x${string}`,
          functionName: 'approve',
          args: [contractAddressList.cl_swap as `0x${string}`, BigInt(ethers.constants.MaxUint256.toString())],
        },
        {
          onSuccess: () => setCurrentButtonState(ButtonState.SWAP),
          onError: () => setCurrentButtonState(ButtonState.APPROVAL_REQUIRED),
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const swapTokens = () => {
    const temporalToken = tokenSell
    const temporalValue = swapValue
    setTokenSell(tokenGet)
    setTokenGet(temporalToken)
    setSwapValue(forValue)
    setForValue(temporalValue)
  }
  // reset values when account changes

  useEffect(() => {
    if (!account) {
      setSwapValue('')
      setForValue('')
    }
  }, [account])
  // simulate swap
  const quoteExactInputSingleCall = useSimulateContract({
    address: contractAddressList.cl_quoterV2 as `0x${string}`,
    abi: algebraQuoterV2ABI,
    functionName: 'quoteExactInputSingle',
    args: [
      {
        tokenIn: tokenSell.address as `0x${string}`,
        tokenOut: tokenGet.address as `0x${string}`,
        amountIn: parseUnits(swapValue, tokenSell.decimals),
        limitSqrtPrice: 0n,
      },
    ],
  })

  const sqrtPriceX96After = quoteExactInputSingleCall?.data?.result[2] || 0n
  // simulate swap
  const outputResult = useSimulateContract({
    address: contractAddressList.cl_quoterV2 as `0x${string}`,
    abi: algebraQuoterV2ABI,
    functionName: 'quoteExactOutputSingle',
    args: [
      {
        tokenIn: tokenSell.address as `0x${string}`,
        tokenOut: tokenGet.address as `0x${string}`,
        amount: parseUnits(forValue, tokenGet.decimals),
        limitSqrtPrice: 0n,
      },
    ],
  })
  // That state is used to know if the user is changing the output token, so we can update the input token value. This is used to avoid an infinite loop
  const [inputForActive, setInputForActive] = useState<boolean>(false)

  // When the user changes the input token, we update the output token value
  useEffect(() => {
    if (!inputForActive) return
    const outputSwapTokenValue = outputResult?.data?.result[0] || -1n
    if (outputSwapTokenValue !== -1n) setSwapValue(formatUnits(outputSwapTokenValue, tokenSell.decimals))
  }, [outputResult?.data?.result])

  // When the user changes the output token manually, we update the input token value. When inputForActive is true, we don't update the output token value when the input token changes
  useEffect(() => {
    if (inputForActive) {
      const timer = setTimeout(() => setInputForActive(false), 500)
      return () => clearTimeout(timer)
    }
  }, [inputForActive])
  // Swap fee for the transaction
  const [swapFee, setSwapFee] = useState<string>('')
  // When the user changes the input token, we update the output token value
  useEffect(() => {
    if (inputForActive) return
    const outputTokenValue = quoteExactInputSingleCall?.data?.result[0] || -1n
    const fees = quoteExactInputSingleCall?.data?.result[5].toString()
    if (outputTokenValue !== -1n) setForValue(formatUnits(outputTokenValue, tokenGet.decimals))
    if (fees && fees == swapFee) return
    setSwapFee(fees || '')
  }, [quoteExactInputSingleCall?.data?.result, tokenGet.decimals])

  const { setSlippageModal } = useStore()
  // get current button state
  const [currentButtonState, setCurrentButtonState] = useState(ButtonState.SWAP)
  // check if the user has approved the token
  const approvalData = useReadContract({
    address: tokenSell.address as `0x${string}`,
    functionName: 'allowance',
    args: [account as `0x${string}`, contractAddressList.cl_swap as `0x${string}`],
    abi: erc20Abi,
  })
  // this is the user balance of the token that the user wants to sell. We pass the setTokenSellUserBalance to the Swap component to update the balance when the user changes the token.
  // We use this balance to check if the user has enough balance to swap
  const [tokenSellUserBalance, setTokenSellUserBalance] = useState<string>('')

  // manage button click
  const handleSwapClick = () => {
    if (currentButtonState === ButtonState.SWAP || currentButtonState === ButtonState.PRICE_IMPACT_ALERT) {
      callAlgebraRouter()
    } else if (currentButtonState === ButtonState.APPROVAL_REQUIRED) {
      approveToken()
    }
  }

  const { data: currentPool, loading: loadingCurrentPool } = useAlgebraPoolByPair(
    tokenGet.address as `0x${string}`,
    tokenSell.address as `0x${string}`
  )
  console.log(tokenGet.address)

  const {
    data: stateOfAMM,
    loading: loadingStateOfAMM,
    refetch: refetchStateOfAMM,
  } = useAlgebraSafelyStateOfAMM(currentPool)
  const currentSqrtPriceX96 = stateOfAMM?.[0] || 1n
  const sqrtPriceX96AfterBN = toBN(sqrtPriceX96After.toString())
  const currentSqrtPriceX96BN = toBN(currentSqrtPriceX96.toString())

  const sqrtPriceDifference = sqrtPriceX96AfterBN.minus(currentSqrtPriceX96BN)
  const priceImpact =
    currentSqrtPriceX96 && sqrtPriceX96After
      ? sqrtPriceDifference.div(currentSqrtPriceX96BN).multipliedBy(100).abs().multipliedBy(-1)
      : '0'

  // manage button state
  useEffect(() => {
    if (!isConnected) {
      setCurrentButtonState(ButtonState.CONNECT_WALLET)
    } else if (
      !(!loadingCurrentPool && currentPool === zeroAddress) &&
      (loadingStateOfAMM ||
        approvalData.isLoading ||
        (forValue && outputResult.isLoading) ||
        (swapValue && quoteExactInputSingleCall.isLoading) ||
        (loadingCurrentPool && currentPool))
    ) {
      setCurrentButtonState(ButtonState.LOADING)
    } else if (currentPool == zeroAddress) {
      setCurrentButtonState(ButtonState.POOL_NOT_AVAILABLE)
    } else if (Number(formatUnits(approvalData?.data || 0n, tokenSell.decimals)) < Number(swapValue)) {
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
    approvalData.isLoading,
    outputResult.isLoading,
    quoteExactInputSingleCall.isLoading,
    loadingCurrentPool,
  ])
  useEffect(() => {
    const interval = setInterval(() => {
      approvalData.refetch()
      quoteExactInputSingleCall.refetch()
      refetchStateOfAMM()
      outputResult.refetch()
    }, 15000)
    return () => clearInterval(interval)
  }, [swapValue, forValue, currentPool, account, approvalData, quoteExactInputSingleCall, outputResult, stateOfAMM])
  const [expandTxDetails, setExpandTxDetails] = useState<boolean>(false)

  const multiRouting = useAlgebraMultiRouting()

  return (
    <section className="box-panel-trade">
      <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center relative z-10">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-x-4 ">
              <h4 className="text-lg text-white font-medium">Swap</h4>
            </div>

            <div className="flex gap-x-3 items-center">
              <span className="text-shark-100 text-sm">{swapFee && `${formatUnits(BigInt(swapFee), 4)}% fee`}</span>
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
              <Separator onClick={swapTokens} />
              <For
                token={tokenGet}
                setToken={setTokenGet}
                value={forValue}
                setValue={setForValue}
                setInputForActive={setInputForActive}
              />
            </div>
            <Button variant="primary" className="w-full" onClick={handleSwapClick}>
              {currentButtonState === ButtonState.LOADING ? <Loader color="white" size={20} /> : currentButtonState}
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
            {tokenSell.symbol} {'>'} {tokenGet.symbol}
          </span>
        </p>
        <p className="">
          Slippage <span className="text-shark-100">{slippage}</span>
        </p>

        <p className="">
          Minimum Amount Recieved
          <span className="text-shark-100">
            {amountOutMinimum
              ? formatUnits(BigInt(Number(amountOutMinimum.toString().split('.')[0])), tokenGet.decimals).toString()
              : '-'}{' '}
            {tokenGet.symbol}
          </span>
        </p>
        <p className="">
          Price Impact <span className="text-shark-100">{parseFloat(priceImpact.toString()).toFixed(2)}%</span>
        </p>
      </div>
    </section>
  )
}

export default Panel
