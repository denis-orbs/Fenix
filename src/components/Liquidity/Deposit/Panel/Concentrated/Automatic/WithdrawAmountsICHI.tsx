import { Button } from '@/src/components/UI'
import { NumericalInput } from '@/src/components/UI/Input'
import { INPUT_PRECISION } from '@/src/library/constants/misc'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import {
  approveDepositToken,
  deposit,
  getUserBalance,
  IchiVault,
  isDepositTokenApproved,
  SupportedDex,
  withdraw,
} from '@ichidao/ichi-vaults-sdk'
import { useSetToken0TypedValue, useToken0, useToken0TypedValue, useToken1 } from '@/src/state/liquidity/hooks'
import { useIchiVaultInfo } from '@/src/library/hooks/web3/useIchi'
import { toBN } from '@/src/library/utils/numbers'
import toast, { Toaster } from 'react-hot-toast'
import { getWeb3Provider } from '@/src/library/utils/web3'
import { IToken } from '@/src/library/types'
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit'
import { useReadContracts } from 'wagmi'
import { erc20Abi, zeroAddress } from 'viem'
import { ethers } from 'ethers'

const WithdrawAmountsICHI = ({
  token,
  allIchiVaultsByTokenPair,
  tokenList,
}: {
  token: IToken | undefined
  allIchiVaultsByTokenPair: IchiVault[] | undefined | null
  tokenList: IToken[]
}) => {
  const [isActive, setIsActive] = useState<Boolean>(false)
  const [selected, setIsSelected] = useState<String>('Choose one')
  const { account } = useActiveConnectionDetails()

  const web3Provider = getWeb3Provider()
  const dex = SupportedDex.Fenix

  const token0 = useToken0()
  const token1 = useToken1()

  const [totalUserShares, setTotalUserShares] = useState<string>('0')
  const [amoutToWithdraw, setAmountToWithdraw] = useState<string>('')

  const { id: vaultAddress, isReverted } = useIchiVaultInfo(token0, token1)
  const token0TypedValue = useToken0TypedValue()
  const setToken0TypedValue = useSetToken0TypedValue()

  useEffect(() => {
    setToken0TypedValue('')
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
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()

  const handlerConnectWallet = () => {
    openConnectModal && openConnectModal()
  }
  const createPosition = async () => {
    if (!account) {
      handlerConnectWallet()
      return
    }
    if (!vaultAddress) {
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
      } catch (error) {
        return
      }
    }

    const depositToken0 = token0 >= token1 ? '0' : ethers.utils.parseUnits(token0TypedValue, token0Decimals)
    const depositToken1 = token0 < token1 ? '0' : ethers.utils.parseUnits(token0TypedValue, token0Decimals)

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
  useEffect(() => {
    const checkApproval = async () => {
      if (!account) {
        return
      }
      if (!vaultAddress) {
        return
      }
      const isToken0Approved = await isDepositTokenApproved(
        account,
        isReverted ? 1 : 0,
        ethers.utils.parseUnits(token0TypedValue || '0', token0Decimals).toString(),
        vaultAddress,
        web3Provider,
        dex
      )
      setIsToken0ApprovalRequired(!isToken0Approved)
    }
    checkApproval()
  }, [token0TypedValue, token0, token0Decimals, dex, web3Provider, vaultAddress, account, isReverted])
  const getButtonText = () => {
    if (!account) return 'Connect Wallet'
    if (!vaultAddress) return 'Vault not available'
    if (!amoutToWithdraw || 0 > parseFloat(amoutToWithdraw)) return 'Enter amount'
    if (amoutToWithdraw > totalUserShares) return 'Insufficient balance'
    return BUTTON_TEXT_WITHDRAW
  }

  // const NOT_USE_THIS_VAULT = '0x468e041af71b28be7c3b2ad9f91696a0206f0053' // BNB Vault in thena for testing

  // useEffect to get the total user shares (balance in the vault)
  useEffect(() => {
    if (!account || !vaultAddress) {
      setTotalUserShares('0')
      return
    }
    const getTotalUserShares = async () => {
      const data = await getUserBalance(account, vaultAddress, web3Provider, dex)
      setTotalUserShares(data)
    }
    getTotalUserShares()
  }, [account, vaultAddress, web3Provider])

  // withdraw function
  const withdrawFromVault = async () => {
    if (getButtonText() !== BUTTON_TEXT_WITHDRAW) return
    if (!account) return
    try {
      const txnDetails = await withdraw(account, amoutToWithdraw, vaultAddress, web3Provider, dex)
      toast.success('Withdrawal Transaction Sent')
      txnDetails.wait()
      toast.success('Withdrawal Successful')
    } catch (error: any) {
      if (error?.code == 401) return
      toast.error(error?.message)
    }
  }
  return (
    <>
      <div className="bg-shark-400 bg-opacity-40 px-[15px] py-[29px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
        <div className="flex items-center mb-2 text-xs leading-normal w-full xl:w-3/5 justify-between">
          <div className=" text-white">Withdraw amounts</div>
          <span className="text-xs leading-normal text-shark-100 mr-4 flex items-center gap-x-2">
            <span className="icon-wallet text-xs"></span>
            Withdrawable: {totalUserShares}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full xl:w-3/5">
            <Toaster />
            <NumericalInput
              value={amoutToWithdraw}
              onUserInput={(value) => {
                setAmountToWithdraw(value)
              }}
              precision={INPUT_PRECISION}
              placeholder="0.0"
              className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-sm"
            />
            <div className="absolute right-2 top-[10px] flex items-center gap-1 max-md:hidden">
              <Button
                variant="tertiary"
                className="!py-1 !px-3"
                onClick={() => {
                  if (!totalUserShares) return
                  setAmountToWithdraw(toBN(totalUserShares).div(2).toString())
                }}
              >
                Half
              </Button>
              <Button
                variant="tertiary"
                className="!py-1 !px-3"
                onClick={() => {
                  if (!totalUserShares) return
                  setAmountToWithdraw(toBN(totalUserShares).toString())
                }}
              >
                Max
              </Button>
            </div>
          </div>

          <div className="relative xl:w-2/5 flex-shrink-0">
            <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
              {allIchiVaultsByTokenPair && allIchiVaultsByTokenPair.length !== 0 ? (
                <>
                  <div
                    className="w-full flex justify-between items-center gap-2"
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div className="flex justify-center items-center gap-3">
                      {selected !== 'Choose one' ? (
                        <>
                          <Image
                            src={`/static/images/tokens/${tokenList?.find((t) => t?.address?.toLowerCase() === selected)?.symbol}.svg`}
                            alt="token"
                            className="w-6 h-6 rounded-full"
                            width={20}
                            height={20}
                          />
                          <span className="text-base">
                            {tokenList.find((t) => t?.address?.toLowerCase() === selected)?.symbol}
                          </span>
                        </>
                      ) : (
                        selected
                      )}
                    </div>
                    <span
                      className={`inline-block ml-2 text-xs icon-chevron md:text-sm ${isActive ? 'rotate-180' : ''}`}
                    />
                  </div>
                  <div
                    className={`rounded-lg absolute top-[calc(100%+10px)] w-[230px] left-1/2 max-md:-translate-x-1/2 md:w-full md:left-0 right-0 flex flex-col gap-[5px] overflow-auto scrollbar-hide z-20 p-3
                    ${isActive ? 'visible bg-shark-300 !bg-opacity-40 border-shark-200' : 'hidden'}`}
                  >
                    {allIchiVaultsByTokenPair.map((vault) => (
                      <div
                        className="flex justify-center items-center gap-3 cursor-pointer"
                        key={vault.id}
                        onClick={() => {
                          setIsActive(!isActive)
                          setIsSelected(
                            vault.allowTokenA ? vault.tokenA.toLocaleLowerCase() : vault.tokenB.toLocaleLowerCase()
                          )
                        }}
                      >
                        <Image
                          // src={`/static/images/tokens/${token?.symbol}.svg`}
                          src={`/static/images/tokens/${tokenList?.find((t) => t?.address?.toLowerCase() === (vault.allowTokenA ? vault.tokenA.toLocaleLowerCase() : vault.tokenB.toLocaleLowerCase()))?.symbol}.svg`}
                          alt="token"
                          className="w-6 h-6 rounded-full"
                          width={20}
                          height={20}
                        />
                        <span className="text-base">
                          {
                            tokenList.find(
                              (t) =>
                                t?.address?.toLowerCase() ===
                                (vault.allowTokenA
                                  ? vault.tokenA.toLocaleLowerCase()
                                  : vault.tokenB.toLocaleLowerCase())
                            )?.symbol
                          }
                        </span>
                        {/* <span className="text-base">{token?.symbol}</span> */}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-sm text-shark-100">No vaults available</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Button onClick={withdrawFromVault} variant="tertiary" className="w-full mx-auto !text-xs !h-[49px]">
        {getButtonText()}
      </Button>
    </>
  )
}

export default WithdrawAmountsICHI