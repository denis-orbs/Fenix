'use client'
import { useEffect, useState } from 'react'

import Swap from '@/src/components/Trade/Swap/Panel/Swap'
import For from '@/src/components/Trade/Swap/Panel/For'
import Separator from '@/src/components/Trade/Common/Separator'
import { erc20Abi, formatUnits, http, parseUnits, zeroAddress } from 'viem'
import { useSimulateContract } from 'wagmi'

import { IToken } from '@/src/library/types'
import { createConfig, useReadContract, useWriteContract } from 'wagmi'
import { holesky, mainnet, polygon, sepolia } from 'viem/chains'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import { algebraQuoterABI, algebraRouterABI } from '@/src/library/web3/abis'
import { Button } from '@/src/components/UI'
import { approveTokenUsage } from '@/src/library/web3/common/TokenManagement'
import { ethers, providers } from 'ethers'
import { algebraSwapABI } from '@/src/library/web3/abis/algebraSwap'
import useStore from '@/src/state/zustand'
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit'
import Slippage from '@/src/components/Modals/Slippage'
import useDebounce from '@/src/library/hooks/useDebounce'
import { LoaderIcon } from 'react-hot-toast'
import Loader from '@/src/components/UI/Icons/Loader'
import { ReloadIcon } from '@/src/components/UI/Icons/Reload'
import SettingsIcon from '@/src/components/UI/Icons/Settings'
enum ButtonState {
  CONNECT_WALLET = 'Connect Wallet',
  ENTER_AMOUNT = 'Enter Amount',
  APPROVAL_REQUIRED = 'Approval Required',
  WAITING_APPROVAL = 'Waiting Approval',
  INSUFFICIENT_BALANCE = 'Insufficient Balance',
  WAITING_CONFIRMATION = 'Waiting Confirmation',
  SWAP = 'Swap',
}
const Panel = () => {
  const [tokenSell, setTokenSell] = useState<IToken>({
    name: 'USDT',
    symbol: 'USDT',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    decimals: 6,
    img: 'usdt.png',
    price: 1,
  })
  const [tokenGet, setTokenGet] = useState<IToken>({
    name: 'WETH',
    symbol: 'WETH',
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    decimals: 18,
    img: 'WETH.png',
    price: 3000,
  })
  const [swapValue, setSwapValue] = useState<string>('')
  const [forValue, setForValue] = useState<string>('')

  const { data, error, isPending, isError, writeContract } = useWriteContract()

  // approve
  // quote
  // swap
  // si cantidad mayor al balance
  // si el user no ha puesto nada o ha puesto 0 que no le deje swappear
  const { openConnectModal } = useConnectModal()
  const { account, isConnected } = useActiveConnectionDetails()
  const MATIC_QUOTER_ADDRESS = '0xa15F0D7377B2A0C0c10db057f641beD21028FC89'
  const MATIC_SWAP_ADDRESS = '0xf5b509bB0909a69B1c207E495f687a596C168E12'
  // function to make the swap
  const callAlgebraRouter = async () => {
    if (!isConnected) {
      openConnectModal && openConnectModal()
      return
    }

    try {
      await writeContract({
        address: MATIC_SWAP_ADDRESS,
        abi: algebraSwapABI,
        functionName: 'exactInputSingle',
        args: [
          {
            tokenIn: tokenSell.address as `0x${string}`,
            tokenOut: tokenGet.address as `0x${string}`,
            recipient: account as `0x${string}`,
            deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 20),
            amountIn: parseUnits(swapValue, tokenSell.decimals),
            amountOutMinimum: 0n,
            limitSqrtPrice: 0n,
          },
        ],
      })
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
          args: [MATIC_SWAP_ADDRESS, BigInt(ethers.constants.MaxUint256.toString())],
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
  const result = useSimulateContract({
    address: MATIC_QUOTER_ADDRESS,
    abi: algebraQuoterABI,
    functionName: 'quoteExactInputSingle',
    chainId: polygon.id,
    args: [
      tokenSell.address as `0x${string}`,
      tokenGet.address as `0x${string}`,
      parseUnits(swapValue, tokenSell.decimals),
      0n,
    ],
  })
  // simulate swap
  const outputResult = useSimulateContract({
    address: MATIC_QUOTER_ADDRESS,
    abi: algebraQuoterABI,
    functionName: 'quoteExactOutputSingle',
    chainId: polygon.id,
    args: [
      tokenSell.address as `0x${string}`,
      tokenGet.address as `0x${string}`,
      parseUnits(forValue, tokenGet.decimals),
      0n,
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
    const outputTokenValue = result?.data?.result[0] || -1n
    const fees = result?.data?.result[1].toString()
    if (outputTokenValue !== -1n) setForValue(formatUnits(outputTokenValue, tokenGet.decimals))
    if (fees && fees == swapFee) return
    setSwapFee(fees || '')
  }, [result?.data?.result, tokenGet.decimals])

  const { setSlippageModal } = useStore()

  // get current button state
  const [currentButtonState, setCurrentButtonState] = useState(ButtonState.SWAP)
  // check if the user has approved the token
  const approvalData = useReadContract({
    address: tokenSell.address as `0x${string}`,
    functionName: 'allowance',
    args: [account as `0x${string}`, MATIC_SWAP_ADDRESS],
    abi: erc20Abi,
  })
  // this is the user balance of the token that the user wants to sell. We pass the setTokenSellUserBalance to the Swap component to update the balance when the user changes the token.
  // We use this balance to check if the user has enough balance to swap
  const [tokenSellUserBalance, setTokenSellUserBalance] = useState<string>('')

  // manage button state
  useEffect(() => {
    if (!isConnected) {
      setCurrentButtonState(ButtonState.CONNECT_WALLET)
    } else if (!swapValue || !forValue) {
      setCurrentButtonState(ButtonState.ENTER_AMOUNT)
    } else if (Number(formatUnits(approvalData?.data || 0n, tokenSell.decimals)) < Number(swapValue)) {
      setCurrentButtonState(ButtonState.APPROVAL_REQUIRED)
    } else if (Number(swapValue) > Number(tokenSellUserBalance || 0)) {
      setCurrentButtonState(ButtonState.INSUFFICIENT_BALANCE)
    } else {
      setCurrentButtonState(ButtonState.SWAP)
    }
  }, [isConnected, swapValue, forValue, approvalData?.data, tokenSell.decimals, tokenSellUserBalance])

  // manage button click
  const handleSwapClick = () => {
    if (currentButtonState === ButtonState.SWAP) {
      callAlgebraRouter()
    } else if (currentButtonState === ButtonState.APPROVAL_REQUIRED) {
      approveToken()
    }
  }
  return (
    <section className="box-panel-trade">
      <div className="w-full flex flex-col xl:flex-row justify-between gap-12 items-center relative z-10">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-x-4 ">
              <h4 className="text-lg text-white font-medium">Swap</h4>
            </div>

            <div className="flex gap-x-3 items-center">
              <span className="text-shark-100 text-sm">{swapFee && `${formatUnits(BigInt(swapFee), 3)}% fee`}</span>
              <ReloadIcon
                className="text-shark-100"
                onClick={() => {
                  setSwapValue('')
                  setForValue('')
                }}
              />
              <SettingsIcon onClick={() => setSlippageModal(true)} className="text-shark-100 " />
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
            <Button variant="primary" className="w-full " onClick={handleSwapClick}>
              {currentButtonState}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Panel
