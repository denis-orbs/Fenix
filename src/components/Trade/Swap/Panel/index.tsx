'use client'
import { useEffect, useState } from 'react'

import Swap from '@/src/components/Trade/Swap/Panel/Swap'
import For from '@/src/components/Trade/Swap/Panel/For'
import Separator from '@/src/components/Trade/Common/Separator'
import { erc20Abi, formatUnits, http, parseUnits } from 'viem'
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
  const myAccount = '0x7cc2E3Cce45bA98007D3884bB64917483Bd4A00C'
  const { account, isConnected } = useActiveConnectionDetails()
  const MATIC_QUOTER_ADDRESS = '0xa15F0D7377B2A0C0c10db057f641beD21028FC89'
  const MATIC_SWAP_ADDRESS = '0xf5b509bB0909a69B1c207E495f687a596C168E12'
  const callAlgebraRouter = async () => {
    if (!isConnected) {
      openConnectModal && openConnectModal()
      return
    }

    try {
      await writeContract({
        abi: erc20Abi,
        address: tokenSell.address as `0x${string}`,
        functionName: 'approve',
        args: [MATIC_SWAP_ADDRESS, BigInt(ethers.constants.MaxUint256.toString())],
      })

      await writeContract({
        address: MATIC_SWAP_ADDRESS,
        abi: algebraSwapABI,
        functionName: 'exactInputSingle',
        args: [
          {
            tokenIn: tokenSell.address as `0x${string}`,
            tokenOut: tokenGet.address as `0x${string}`,
            recipient: myAccount,
            deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 20),
            amountIn: 10n,
            amountOutMinimum: 0n,
            limitSqrtPrice: 0n,
          },
        ],
      })
    } catch (error) {
      console.log(error)
    }

    // const quote = await quoterContract.callStatic.quoteExactInputSingle(token0, token1, 10, 0)

    // console.log(swap)
  }
  // approve, si no lo tengo
  // comprobar que hay pool
  // slippage (guardar en redux)
  // qutiar el hover texto invisible
  // más info de la tx (más adelante)
  const swapTokens = () => {
    const temporalToken = tokenSell
    const temporalValue = swapValue
    setTokenSell(tokenGet)
    setTokenGet(temporalToken)
    setSwapValue(forValue)
    setForValue(temporalValue)
  }
  useEffect(() => {
    if (!account) {
      setSwapValue('')
      setForValue('')
    }
  }, [account])
  // approve, get quote
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
  console.log(outputResult?.data)
  useEffect(() => {
    if (!inputForActive) return
    const outputSwapTokenValue = outputResult?.data?.result[0] || -1n
    console.log(outputResult?.data?.result[0])
    console.log(outputSwapTokenValue)
    console.log(tokenGet.decimals)
    console.log(formatUnits(outputSwapTokenValue, tokenSell.decimals))
    if (outputSwapTokenValue !== -1n) setSwapValue(formatUnits(outputSwapTokenValue, tokenSell.decimals))
  }, [outputResult?.data?.result])

  console.log('outputResult', outputResult?.data?.result[0])
  const [inputForActive, setInputForActive] = useState<boolean>(false)
  console.log(inputForActive)
  useEffect(() => {
    if (inputForActive) {
      const timer = setTimeout(() => setInputForActive(false), 500)
      return () => clearTimeout(timer)
    }
  }, [inputForActive])
  const [swapFee, setSwapFee] = useState<string>('')
  useEffect(() => {
    if (inputForActive) return
    const outputTokenValue = result?.data?.result[0] || -1n
    const fees = result?.data?.result[1].toString()
    if (outputTokenValue !== -1n) setForValue(formatUnits(outputTokenValue, tokenGet.decimals))
    if (fees && fees == swapFee) return
    setSwapFee(fees || '')
  }, [result?.data?.result, tokenGet.decimals])
  const { setSlippageModal } = useStore()

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

            {/* <span className="icon-reflesh text-shark-100 text-xl cursor-pointer"></span> */}
          </div>
          <div className="flex flex-col gap-1 mb-5 relative">
            <div className="mb-3">
              {/* {hash && <div>Transaction Hash: {hash}</div>} */}
              <Swap token={tokenSell} setToken={setTokenSell} value={swapValue} setValue={setSwapValue} />
              <Separator onClick={swapTokens} />
              <For
                token={tokenGet}
                setToken={setTokenGet}
                value={forValue}
                setValue={setForValue}
                setInputForActive={setInputForActive}
              />
            </div>
            <Button variant="primary" className="w-full" onClick={callAlgebraRouter}>
              {!isConnected ? 'Connect Wallet' : 'Swap'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Panel
