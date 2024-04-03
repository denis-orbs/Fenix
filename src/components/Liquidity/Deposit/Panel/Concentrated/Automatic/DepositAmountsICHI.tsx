import { config } from '@/src/app/layout'
import { Button } from '@/src/components/UI'
import { NumericalInput } from '@/src/components/UI/Input'
import { ichiVaultABI } from '@/src/library/constants/abi'
import { INPUT_PRECISION } from '@/src/library/constants/misc'
import { useERC20Balance } from '@/src/library/hooks/web3/erc20/useERC20Balance'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useBalance, useReadContracts, useWriteContract } from 'wagmi'
import { getPublicClient, getWalletClient, readContract, writeContract } from '@wagmi/core'
import { formatUnits, zeroAddress } from 'viem'

import {
  approveDepositToken,
  approveVaultToken,
  deposit,
  getMaxDepositAmount,
  getUserAmounts,
  getUserBalance,
  getVaultsByTokens,
  isDepositTokenApproved,
  isVaultTokenApproved,
  SupportedChainId,
  SupportedDex,
} from '@ichidao/ichi-vaults-sdk'
import { getEthersProvider } from './DemoRPC'
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import {
  useSetToken0TypedValue,
  useToken0,
  useToken0TypedValue,
  useToken1,
  useToken1TypedValue,
} from '@/src/state/liquidity/hooks'
import { useIchiVault } from '@/src/library/hooks/web3/useIchi'
import { blastSepolia } from 'viem/chains'
import { toBN } from '@/src/library/utils/numbers'
import { erc20Abi } from 'viem'
import useDebounce from '@/src/library/hooks/useDebounce'
import toast, { Toaster } from 'react-hot-toast'

const DepositAmountsICHI = ({ token }: { token: { name: string; symbol: string } }) => {
  const [token0DepositAmount, setToken0DepositAmount] = useState('')
  const { account, chain, chainId } = useActiveConnectionDetails()
  const { writeContract } = useWriteContract()

  // put it on redux

  const slippage = 1
  // CHANGE

  let web3Provider: any
  if (window.ethereum) {
    // Si window.ethereum está disponible, usa Web3Provider de ethers
    web3Provider = new ethers.providers.Web3Provider(window.ethereum)
  } else {
    // Fallback al RPC si window.ethereum no está disponible
    web3Provider = new ethers.providers.JsonRpcProvider('https://sepolia.blast.io')
  }
  const dex = SupportedDex.Fenix

  const token0 = useToken0()
  const token1 = useToken1()
  const [isToken0ApprovalRequired, setIsToken0ApprovalRequired] = useState(false)
  const [isToken1ApprovalRequired, setIsToken1ApprovalRequired] = useState(false)
  const [isVaultTokenApprovalRequired, setIsVaultTokenApprovalRequired] = useState(false)

  const vaults = useIchiVault(token0, token1)
  const [vaultAddress, setVaultAddress] = useState<string>(zeroAddress)
  useEffect(() => {
    setVaultAddress(vaults?.[0]?.id || zeroAddress)
  }, [vaults])
  console.log(vaultAddress)
  // const vaultAddress = vaults?.[0]?.id || zeroAddress
  const isVaultAvailable = !!vaults && vaults?.length > 0 && vaults[0].id !== zeroAddress
  const token0TypedValue = useToken0TypedValue()
  const setToken0TypedValue = useSetToken0TypedValue()

  useEffect(() => {
    setToken0TypedValue('')
    console.log(vaults)
  }, [token0, setToken0TypedValue])

  const { data: token0Data } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: token0,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [account || zeroAddress],
      },
      {
        address: token0,
        abi: erc20Abi,
        functionName: 'decimals',
      },
    ],
  })
  const token0Balance = token0Data?.[0]
  const token0Decimals = token0Data?.[1] || 18

  const createPosition = async () => {
    if (!account) {
      toast.error('Please connect your wallet')
      return
    }
    if (!isVaultAvailable) {
      toast.error('Vault not available')
      return
    }
    if (!token0TypedValue) {
      toast.error('Please enter a valid amount')
      return
    }
    if (isToken0ApprovalRequired) {
      try {
        const txApproveDepositDetails = await approveDepositToken(account, 0, vaultAddress, web3Provider, dex)
        await txApproveDepositDetails.wait()
        setIsToken0ApprovalRequired(false)
        console.log(txApproveDepositDetails)
      } catch (error) {
        return
      }
    }
    if (isToken1ApprovalRequired) {
      try {
        const txApproveDepositDetails = await approveDepositToken(account, 1, vaultAddress, web3Provider, dex)
        await txApproveDepositDetails.wait()
        console.log(txApproveDepositDetails)
        setIsToken1ApprovalRequired(false)
      } catch (error) {
        return
      }
    }
    // if (isVaultTokenApprovalRequired) {
    //   try {
    //     const txApproveDepositDetails = await approveVaultToken(account, vaultAddress, web3Provider, dex)
    //     await txApproveDepositDetails.wait()
    //     setIsVaultTokenApprovalRequired(false)
    //   } catch (error) {
    //     return
    //   }
    // }
    const depositToken0 = token0 >= token1 ? '0' : ethers.utils.parseUnits(token0TypedValue, token0Decimals)
    const depositToken1 = token0 < token1 ? '0' : ethers.utils.parseUnits(token0TypedValue, token0Decimals)
    console.log(depositToken0)
    console.log(depositToken1)
    try {
      const txDepositDetails = await deposit(
        account,
        depositToken0,
        depositToken1,
        vaultAddress,
        web3Provider,
        dex,
        slippage
      )
      await txDepositDetails.wait()
      toast.success('Deposited successfully')
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        if (error.code !== 'ACTION_REJECTED') {
        }
      } else {
        toast.error('An unknown error occurred')
      }
    }
  }
  // ethers.utils.parseUnits(token0TypedValue || '0', token0Decimals).toString() || '0'
  // el dex hacerla una constante
  console.log(isToken0ApprovalRequired)
  useEffect(() => {
    const checkApproval = async () => {
      if (!account) {
        console.log('Please connect your wallet')
        return
      }
      if (!isVaultAvailable) {
        console.log('Vault not available')
        return
      }
      const isToken0Approved = await isDepositTokenApproved(
        account,
        0,
        ethers.utils.parseUnits(token0TypedValue || '0', token0Decimals).toString(),
        vaultAddress,
        web3Provider,
        dex
      )
      console.log(isToken0Approved)
      const isToken1Approved = await isDepositTokenApproved(
        account,
        1,
        ethers.utils.parseUnits(token0TypedValue || '0', token0Decimals).toString(),
        vaultAddress,
        web3Provider,
        dex
      )
      // const vaultTokenApproved = await isVaultTokenApproved(account, 100, vaultAddress, web3Provider, dex)

      setIsToken0ApprovalRequired(!isToken0Approved)
      setIsToken1ApprovalRequired(!isToken1Approved)
      // setIsVaultTokenApprovalRequired(!vaultTokenApproved)
    }
    checkApproval()
  }, [token0TypedValue, token0, token0Decimals, dex, web3Provider, isVaultAvailable, vaultAddress, account])

  return (
    <div className="bg-shark-400 bg-opacity-40 px-[15px] py-[29px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
      <div className="text-xs leading-normal text-white mb-2">Deposit amounts</div>
      <div className="flex items-center gap-3">
        <div className="relative w-full xl:w-3/5">
          <Toaster />

          <NumericalInput
            value={token0TypedValue}
            onUserInput={(value) => {
              setToken0TypedValue(value)
            }}
            precision={token0Decimals || INPUT_PRECISION}
            placeholder="0.0"
            className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
          />
          <div className="absolute right-2 top-[10px] flex items-center gap-1 max-md:hidden">
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => {
                if (!token0Balance) return
                setToken0TypedValue(toBN(formatUnits(token0Balance, token0Decimals)).div(2).toString())
              }}
            >
              Half
            </Button>
            <Button
              variant="tertiary"
              className="!py-1 !px-3"
              onClick={() => {
                if (!token0Balance) return
                setToken0TypedValue(formatUnits(token0Balance, token0Decimals))
              }}
            >
              Max
            </Button>
          </div>
        </div>

        <div className="relative xl:w-2/5 flex-shrink-0">
          <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
            <div className="flex items-center gap-2">
              <Image
                src={`/static/images/tokens/${token.symbol}.svg`}
                alt="token"
                className="w-6 h-6 rounded-full"
                width={20}
                height={20}
              />
              <span className="text-base">{token.symbol}</span>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={createPosition}
        className="w-full mt-3 bg-shark-500 hover:bg-shark-600 text-white text-sm font-semibold"
      >
        Deposit.
      </Button>
    </div>
  )
}

export default DepositAmountsICHI
