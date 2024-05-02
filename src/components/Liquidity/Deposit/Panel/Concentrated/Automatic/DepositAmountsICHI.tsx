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
import { formatCurrency, formatDollarAmount, toBN } from '@/src/library/utils/numbers'
import { erc20Abi } from 'viem'
import toast, { Toaster } from 'react-hot-toast'
import { getWeb3Provider } from '@/src/library/utils/web3'
import { IToken } from '@/src/library/types'
import { connectorsForWallets, useConnectModal } from '@rainbow-me/rainbowkit'
import { tokenAddressToSymbol } from '@/src/library/constants/tokenAddressToSymbol'
import Spinner from '@/src/components/Common/Spinner'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'
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
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false)

  const { account } = useActiveConnectionDetails()

  const web3Provider = getWeb3Provider()
  const dex = SupportedDex.Fenix
  const { openConnectModal } = useConnectModal()

  const handlerConnectWallet = () => {
    openConnectModal && openConnectModal()
  }

  const token0 = useToken0()

  const token1 = useToken1()

  const addNotification = useNotificationAdderCallback()

  useEffect(() => {
    tokenList
  }, [token0, tokenList])
  const [isToken0ApprovalRequired, setIsToken0ApprovalRequired] = useState(false)

  const vaultAddress =
    allIchiVaultsByTokenPair?.find((vault) => {
      if (vault.tokenA.toLowerCase() === selected.toLowerCase() && vault.allowTokenA) {
        return true
      }
      if (vault.tokenB.toLowerCase() === selected.toLowerCase() && vault.allowTokenB) {
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
        address: selected,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [account || zeroAddress],
      },
      {
        address: selected,
        abi: erc20Abi,
        functionName: 'decimals',
      },
    ],
  })
  const token0Balance = token0Data?.[0]
  const token0Decimals = token0Data?.[1] || 18
  const [waitingApproval, setWaitingApproval] = useState(false)
  const [loading, setLoading] = useState(false)
  const createPosition = async () => {
    setLoading(true)
    if (!account) {
      handlerConnectWallet()
      return
    }
    if (!vaultAddress || allIchiVaultsByTokenPair?.length === 0) {
      // toast.error('Vault not available')
      addNotification({
        id: crypto.randomUUID(),
        createTime: new Date().toISOString(),
        message: `Vault not available.`,
        notificationType: NotificationType.ERROR,
        txHash: '',
        notificationDuration: NotificationDuration.DURATION_5000,
      })

      return
    }
    if (isToken0ApprovalRequired) {
      setWaitingApproval(true)
      try {
        // console.log('vault', vaultAddress)
        const txApproveDepositDetails = await approveDepositToken(
          account,
          vaultAddress.tokenA.toLowerCase() === selected.toLowerCase() && vaultAddress.allowTokenA ? 0 : 1,
          vaultAddress.id,
          web3Provider,
          dex
        )
        await txApproveDepositDetails.wait()
        setIsToken0ApprovalRequired(false)
        setWaitingApproval(false)
        setToken0TypedValue('')

        return
      } catch (error) {
        // console.log(error)
        setWaitingApproval(false)

        return
      }
    }
    if (!token0TypedValue) {
      // toast.error('Please enter a valid amount')
      addNotification({
        id: crypto.randomUUID(),
        createTime: new Date().toISOString(),
        message: `Please enter a valid amount.`,
        notificationType: NotificationType.ERROR,
        txHash: '',
        notificationDuration: NotificationDuration.DURATION_5000,
      })
      setLoading(false)
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
      // toast.success('Deposited successfully')
      addNotification({
        id: crypto.randomUUID(),
        createTime: new Date().toISOString(),
        message: `Deposited successfully.`,
        notificationType: NotificationType.SUCCESS,
        txHash: '',
        notificationDuration: NotificationDuration.DURATION_5000,
      })
      setLoading(false)
    } catch (error) {
      // console.log('gg', error.reason)
      // console.log('gg', error)
      if (error instanceof Error && 'code' in error) {
        if (error.code == 'ACTION_REJECTED') {
          console.log(error)
          // toast.error('Action rejected')
          // toast.error(error.message.split('(')[0].trim().toUpperCase())
          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `${error.message.split('(')[0].trim().toUpperCase()}`,
            notificationType: NotificationType.ERROR,
            txHash: '',
            notificationDuration: NotificationDuration.DURATION_5000,
          })
          setLoading(false)
        } else if (error.reason == 'IV.deposit: deposits too large') {
          // toast.error(`${tokenAddressToSymbol[selected]} deposits are unavailable due to pool volatility.`)
          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `${tokenAddressToSymbol[selected]} deposits are unavailable due to pool volatility.`,
            notificationType: NotificationType.ERROR,
            txHash: '',
            notificationDuration: NotificationDuration.DURATION_5000,
          })
          setLoading(false)
        }
      } else {
        // console.log(error.reason)
        // toast.error('Transaction failed')
        // toast.error(error.message.split('(')[0].trim().toUpperCase())
        addNotification({
          id: crypto.randomUUID(),
          createTime: new Date().toISOString(),
          message: `${e}`,
          notificationType: NotificationType.ERROR,
          txHash: '',
          notificationDuration: NotificationDuration.DURATION_5000,
        })
        setLoading(false)
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
        vaultAddress.tokenA.toLowerCase() === selected.toLowerCase() && vaultAddress.allowTokenA ? 0 : 1,
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
    selected,
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

  useEffect(() => {
    if (allIchiVaultsByTokenPair && allIchiVaultsByTokenPair?.length > 0) {
      const firstToken = allIchiVaultsByTokenPair[0]
      setIsSelected(
        firstToken.allowTokenA ? firstToken.tokenA.toLocaleLowerCase() : firstToken.tokenB.toLocaleLowerCase()
      )
    }
  }, [allIchiVaultsByTokenPair])

  const getButtonText = () => {
    if (!account) return 'Connect Wallet'
    if (!vaultAddress) return 'Vault not available'
    if (waitingApproval) return 'Waiting for approval'
    if (!token0TypedValue) return 'Enter an amount'
    if (isToken0ApprovalRequired) return `Approve ${tokenAddressToSymbol[selected]}`

    const typedValueBN = toBN(token0TypedValue)
    const balanceBN = toBN(formatUnits(token0Balance || 0n, token0Decimals))
    if (typedValueBN > balanceBN) return 'Insufficient balance'
    if (loading) return 'Depositing'
    return 'Deposit'
  }

  useEffect(() => {
    toBN(token0Balance).lte(0) ? setBtnDisabled(true) : setBtnDisabled(false)
  }, [token0Balance])

  const handleHalf = () => {
    if (btnDisabled) {
      setToken0TypedValue('')
    } else {
      if (token0Balance) {
        return setToken0TypedValue(toBN(formatUnits(token0Balance, token0Decimals)).div(2).toString())
      } else {
        setToken0TypedValue('')
      }
    }
  }

  const handleMax = () => {
    if (btnDisabled) {
      setToken0TypedValue('')
    } else {
      if (token0Balance) {
        return setToken0TypedValue(formatUnits(token0Balance, token0Decimals))
      } else {
        setToken0TypedValue('')
      }
    }
  }
  return (
    <>
      <div className="bg-shark-400 bg-opacity-40 px-[15px] py-[29px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
        <div className="flex w-full items-center mb-2">
          <div className="flex w-full xl:w-3/5 justify-between">
            <div className="text-xs leading-normal text-white ">Deposit amounts</div>

            <span className="text-xs leading-normal text-shark-100 mr-4 flex items-center gap-x-2">
              {token0TypedValue && tokenList?.find((t) => t?.address?.toLowerCase() === selected.toLowerCase())?.price
                ? formatDollarAmount(
                    toBN(token0TypedValue)
                      .multipliedBy(
                        tokenList?.find((t) => t?.address?.toLowerCase() === selected.toLowerCase())?.price || 0
                      )
                      .toString()
                  )
                : ''}
            </span>
          </div>
          <div className="xl:w-2/5 flex-shrink-0 flex justify-end">
            <span className="text-xs leading-normal text-shark-100 mr-4 flex items-center gap-x-2">
              <span className="icon-wallet text-xs"></span>
              Available: {token0Balance ? formatCurrency(formatUnits(token0Balance || 0n, token0Decimals)) : '-'}{' '}
              {tokenList?.find((t) => t?.address?.toLowerCase() === selected.toLowerCase())?.symbol}
            </span>
          </div>
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
              <Button variant="tertiary" className="!py-1 !px-3" onClick={handleHalf}>
                Half
              </Button>
              <Button variant="tertiary" className="!py-1 !px-3" onClick={handleMax}>
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
                        <div className="flex flex-col">
                          <span className="text-base">
                            {
                              tokenAddressToSymbol[
                                vault.allowTokenA ? vault.tokenA.toLocaleLowerCase() : vault.tokenB.toLocaleLowerCase()
                              ]
                            }
                          </span>
                          {vault?.apr ? (
                            <span className="text-sm">
                              APR :{' '}
                              {vault?.apr[0]?.apr === null || vault?.apr[0]?.apr < 0
                                ? '0'
                                : vault?.apr[0]?.apr?.toFixed(0)}
                              %
                            </span>
                          ) : (
                            <span className="text-sm">APR : 0%</span>
                          )}
                        </div>
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
      <Button
        onClick={createPosition}
        variant="tertiary"
        className="w-full mx-auto !text-xs !h-[49px]"
        walletConfig={{
          needWalletConnected: true,
          needSupportedChain: true,
        }}
      >
        {loading && (
          <span className="m-2 text-sm">
            <Spinner />
          </span>
        )}{' '}
        {getButtonText()}
      </Button>
    </>
  )
}

export default DepositAmountsICHI
