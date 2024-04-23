import { Button } from '@/src/components/UI'
import { NumericalInput } from '@/src/components/UI/Input'
import { INPUT_PRECISION } from '@/src/library/constants/misc'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useReadContracts } from 'wagmi'
import { formatUnits, zeroAddress } from 'viem'

import { approveDepositToken, deposit, IchiVault, isDepositTokenApproved, SupportedDex } from '@ichidao/ichi-vaults-sdk'
import { useSetToken0TypedValue, useToken0, useToken0TypedValue, useToken1 } from '@/src/state/liquidity/hooks'
import { formatCurrency, toBN } from '@/src/library/utils/numbers'
import { erc20Abi } from 'viem'
import toast, { Toaster } from 'react-hot-toast'
import { getWeb3Provider } from '@/src/library/utils/web3'
import { IToken } from '@/src/library/types'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { tokenAddressToSymbol } from '@/src/library/constants/tokenAddressToSymbol'
const DepositAmountsICHI = ({
  token,
  allIchiVaultsByTokenPair,
  tokenList,
}: {
  token: IToken | undefined
  allIchiVaultsByTokenPair: IchiVault[] | undefined | null
  tokenList: IToken[]
}) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [selected, setIsSelected] = useState<string>('Choose one')

  const { account } = useActiveConnectionDetails()

  const web3Provider = getWeb3Provider()
  const dex = SupportedDex.Fenix
  const { openConnectModal } = useConnectModal()

  const handlerConnectWallet = () => {
    openConnectModal && openConnectModal()
  }

  const token0 = useToken0()
  const [vaultToken, setVaultToken] = useState(token0)

  // console.log('heyyy', token0)
  const token1 = useToken1()
  const [token0InfoData, setToken0InfoData] = useState<IToken | null>(null)
  useEffect(() => {
    tokenList &&
      setToken0InfoData(tokenList.find((t) => t?.address?.toLowerCase() === vaultToken.toLowerCase()) || null)
  }, [token0, tokenList])
  const [isToken0ApprovalRequired, setIsToken0ApprovalRequired] = useState(false)

  const vaultAddress =
    allIchiVaultsByTokenPair?.find((vault) => {
      if (vault.tokenA.toLowerCase() === vaultToken.toLowerCase() && vault.allowTokenA) {
        return true
      }
      if (vault.tokenB.toLowerCase() === vaultToken.toLowerCase() && vault.allowTokenB) {
        return true
      }
      return false
    }) || null

  // allIchiVaultsByTokenPair
  const token0TypedValue = useToken0TypedValue()
  const setToken0TypedValue = useSetToken0TypedValue()
  useEffect(() => {
    setToken0TypedValue('')
  }, [token0, setToken0TypedValue])

  const { data: token0Data } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: vaultToken,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [account || zeroAddress],
      },
      {
        address: vaultToken,
        abi: erc20Abi,
        functionName: 'decimals',
      },
    ],
  })
  const token0Balance = token0Data?.[0]
  const token0Decimals = token0Data?.[1] || 18
  const [waitingApproval, setWaitingApproval] = useState(false)
  const createPosition = async () => {
    if (!account) {
      handlerConnectWallet()
      return
    }
    if (!vaultAddress || allIchiVaultsByTokenPair?.length === 0) {
      toast.error('Vault not available')
      return
    }
    if (isToken0ApprovalRequired) {
      setWaitingApproval(true)
      try {
        // console.log('vault', vaultAddress)
        const txApproveDepositDetails = await approveDepositToken(
          account,
          vaultAddress.tokenA.toLowerCase() === vaultToken.toLowerCase() && vaultAddress.allowTokenA ? 0 : 1,
          vaultAddress.id,
          web3Provider,
          dex
        )
        await txApproveDepositDetails.wait()
        setIsToken0ApprovalRequired(false)
        setWaitingApproval(false)

        return
      } catch (error) {
        console.log(error)
        setWaitingApproval(false)

        return
      }
    }
    if (!token0TypedValue) {
      toast.error('Please enter a valid amount')
      return
    }

    // const depositToken0 = token0 >= token1 ? '0' : ethers.utils.parseUnits(token0TypedValue, token0Decimals)
    // const depositToken1 = token0 < token1 ? '0' : ethers.utils.parseUnits(token0TypedValue, token0Decimals)
    const depositToken0 = vaultAddress.allowTokenA && !vaultAddress.allowTokenB ? token0TypedValue : 0
    const depositToken1 = vaultAddress.allowTokenB && !vaultAddress.allowTokenA ? token0TypedValue : 0

    try {
      const txDepositDetails = await deposit(
        account,
        depositToken0,
        depositToken1,
        vaultAddress.id,
        web3Provider,
        dex,
        1
      )
      await txDepositDetails.wait()
      toast.success('Deposited successfully')
    } catch (error) {
      console.log(error)
      if (error instanceof Error && 'code' in error) {
        if (error.code !== 'ACTION_REJECTED') {
          console.log(error)
          toast.error('Error: ', error?.reason)
        }
      } else {
        console.log(error)
        toast.error('Transaction failed')
      }
    }
  }

  useEffect(() => {
    const checkApproval = async () => {
      if (!account) {
        return
      }
      if (!vaultAddress || allIchiVaultsByTokenPair?.length === 0) {
        return
      }
      const isToken0Approved = await isDepositTokenApproved(
        account,
        // check if deposit token is tokenA or tokenB
        vaultAddress.tokenA.toLowerCase() === token0.toLowerCase() && vaultAddress.allowTokenA ? 0 : 1,
        token0TypedValue || '0',
        vaultAddress.id,
        web3Provider,
        dex
      )
      setIsToken0ApprovalRequired(!isToken0Approved)
      return
    }
    checkApproval()
  }, [
    token0TypedValue,
    token0,
    token0Decimals,
    dex,
    waitingApproval,
    web3Provider,
    vaultAddress,
    account,
    allIchiVaultsByTokenPair?.length,
  ])

  useEffect(() => {
    if (!vaultAddress) return
    setIsSelected(
      vaultAddress.allowTokenA ? vaultAddress.tokenA.toLocaleLowerCase() : vaultAddress.tokenB.toLocaleLowerCase()
    )
  }, [vaultAddress])

  const getButtonText = () => {
    if (!account) return 'Connect Wallet'
    if (!vaultAddress) return 'Vault not available'
    if (waitingApproval) return 'Waiting for approval'
    if (!token0TypedValue) return 'Enter an amount'
    if (isToken0ApprovalRequired) return `Approve ${tokenAddressToSymbol[token0]}`

    const typedValueBN = toBN(token0TypedValue)
    const balanceBN = toBN(formatUnits(token0Balance || 0n, token0Decimals))
    if (typedValueBN > balanceBN) return 'Insufficient balance'
    return 'Deposit'
  }
  const testinPosition = async () => {
    try {
      const a = await deposit(
        '0x7cc2E3Cce45bA98007D3884bB64917483Bd4A00C', // user address
        0, // token0
        10, // token1
        '0x61a51eA57C1b4Fb22b24F9871Df3bdB597d51d06', // vault WETH-USDB
        web3Provider,
        dex // fenix dex
      )
      console.log(a)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="bg-shark-400 bg-opacity-40 px-[15px] py-[29px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
        <div className="flex w-full xl:w-3/5 justify-between mb-2">
          <div className="text-xs leading-normal text-white ">Deposit amounts</div>

          <span className="text-xs leading-normal text-shark-100 mr-4 flex items-center gap-x-2">
            <span className="icon-wallet text-xs"></span>
            Availabe: {token0Balance ? formatCurrency(formatUnits(token0Balance || 0n, token0Decimals)) : '-'}{' '}
            {tokenList?.find((t) => t?.address?.toLowerCase() === vaultToken.toLowerCase())?.symbol}
          </span>
        </div>
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
              {allIchiVaultsByTokenPair && allIchiVaultsByTokenPair.length !== 0 && selected ? (
                <>
                  <div
                    className="w-full flex justify-between items-center gap-2"
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div className="flex justify-center items-center gap-3">
                      <>
                        <Image
                          src={`/static/images/tokens/${tokenAddressToSymbol[selected]}.svg`}
                          alt="token"
                          className="w-6 h-6 rounded-full"
                          width={20}
                          height={20}
                        />
                        <span className="text-base">{tokenAddressToSymbol[selected]}</span>
                      </>

                      {/* <span
                        className={`inline-block ml-2 text-xs icon-chevron md:text-sm ${isActive ? 'rotate-180' : ''}`}
                      /> */}
                    </div>
                    <span
                      className={`inline-block ml-2 text-xs icon-chevron md:text-sm ${isActive ? 'rotate-180' : ''}`}
                    />
                  </div>
                  <div
                    className={`rounded-lg absolute top-[calc(100%+10px)] w-[230px] left-1/2 max-md:-translate-x-1/2 md:w-full md:left-0 right-0 flex flex-col gap-[5px] overflow-auto scrollbar-hide z-20 p-3 
                    ${isActive ? 'visible bg-shark-500 !bg-opacity-80 border-shark-200' : 'hidden'}`}
                  >
                    {allIchiVaultsByTokenPair.map((vault) => (
                      <div
                        className="flex justify-start items-center gap-3 cursor-pointer m-1 p-2 bg-shark-300 border-shark-200 rounded-md hover:bg-shark-100"
                        key={vault.id}
                        onClick={() => {
                          setIsActive(false)
                          setIsSelected(
                            vault.allowTokenA ? vault.tokenA.toLocaleLowerCase() : vault.tokenB.toLocaleLowerCase()
                          )
                          setVaultToken(vault.allowTokenA ? vault.tokenA.toLowerCase() : vault.tokenB.toLowerCase())
                        }}
                      >
                        <Image
                          // src={`/static/images/tokens/${token?.symbol}.svg`}
                          src={`/static/images/tokens/${tokenAddressToSymbol[vault.allowTokenA ? vault.tokenA.toLocaleLowerCase() : vault.tokenB.toLocaleLowerCase()]}.svg`}
                          alt="token"
                          className="w-6 h-6 rounded-full"
                          width={20}
                          height={20}
                        />
                        <span className="text-base">
                          {
                            tokenAddressToSymbol[
                              vault.allowTokenA ? vault.tokenA.toLocaleLowerCase() : vault.tokenB.toLocaleLowerCase()
                            ]
                          }
                        </span>
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
      {/* <Button onClick={testinPosition}>Deposit testing</Button> */}
      <Button onClick={createPosition} variant="tertiary" className="w-full mx-auto !text-xs !h-[49px]">
        {getButtonText()}
      </Button>
    </>
  )
}

export default DepositAmountsICHI
