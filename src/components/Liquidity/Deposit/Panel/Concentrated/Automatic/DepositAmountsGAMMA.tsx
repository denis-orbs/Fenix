import { wagmiConfig } from '@/src/app/layout'
import { Button } from '@/src/components/UI'
import { NumericalInput } from '@/src/components/UI/Input'
import { gammaUniProxyABI } from '@/src/library/constants/abi/gammaUniProxyABI'
import { INPUT_PRECISION } from '@/src/library/constants/misc'
import useDebounce from '@/src/library/hooks/useDebounce'
import { useERC20Balance } from '@/src/library/hooks/web3/erc20/useERC20Balance'
import { useERC20Decimals } from '@/src/library/hooks/web3/erc20/useERC20Decimals'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import Image from 'next/image'
import { IToken } from '@/src/library/types'
import {
  useSetToken0,
  useSetToken0TypedValue,
  useSetToken1TypedValue,
  useToken0,
  useToken0TypedValue,
  useToken1,
  useToken1TypedValue,
} from '@/src/state/liquidity/hooks'
import { readContract } from '@wagmi/core'
import { ethers } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { erc20Abi, formatUnits, zeroAddress } from 'viem'

import { useBalance, useReadContract, useReadContracts, useWriteContract } from 'wagmi'
import { formatAmount, formatCurrency, formatDollarAmount, formatPrice, toBN } from '@/src/library/utils/numbers'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'
import { getWeb3Provider } from '@/src/library/utils/web3'
import Loader from '@/src/components/UI/Icons/Loader'
import { contractAddressList } from '@/src/library/constants/contactAddresses'
import { gammaVaults } from './gammaVaults'
import Separator from '@/src/components/Trade/Common/Separator'
import { postEvent } from '@/src/library/utils/events'

const DepositAmountsGAMMA = ({ tokenList }: { tokenList: IToken[] }) => {
  const token0 = useToken0()
  const token1 = useToken1()
  const addNotification = useNotificationAdderCallback()

  const token1TypedValue = useToken1TypedValue()
  const token0TypedValue = useToken0TypedValue()

  const setToken0TypedValue = useSetToken0TypedValue()
  const setToken1TypedValue = useSetToken1TypedValue()
  const token0IToken = useMemo(() => {
    return tokenList.find((token) => token?.address?.toLowerCase() === token0?.toLowerCase())
  }, [tokenList, token0])
  const token1IToken = useMemo(() => {
    return tokenList.find((token) => token?.address?.toLowerCase() === token1?.toLowerCase())
  }, [tokenList, token1])
  const [lastUserUpdate, setLastUserUpdate] = useState<'token0' | 'token1'>('token0')
  const { writeContractAsync, data } = useWriteContract()
  const token0Price = tokenList.find((token) => token?.address?.toLowerCase() === token0?.toLowerCase())?.price || 0
  const token1Price = tokenList.find((token) => token?.address?.toLowerCase() === token1?.toLowerCase())?.price || 0
  const vaultId = gammaVaults.find(
    (vault) =>
      (vault?.token0?.toLowerCase() === token0 && vault?.token1?.toLowerCase() === token1) ||
      (vault?.token1?.toLowerCase() === token0 && vault?.token0?.toLowerCase() === token1)
  )?.id
  const { account } = useActiveConnectionDetails()

  const { data: token0Data, refetch: refetchToken0Data } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: token0 as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [account || zeroAddress],
      },
      {
        address: token0 as `0x${string}`,
        abi: erc20Abi,
        functionName: 'decimals',
      },
      {
        address: token0 as `0x${string}`,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [account || zeroAddress, vaultId as `0x${string}`],
      },
    ],
  })
  const token0Decimals = token0Data?.[1] || 18
  const token0Balance = ethers.utils.formatUnits(token0Data?.[0].toString() || 0, token0Decimals) || '0'
  const token0Allowance = ethers.utils.formatUnits(token0Data?.[2].toString() || 0, token0Decimals) || '0'

  // poner la conversión a euros
  // hacer witdhraw
  // en el dashboard que salga posición
  // que salga en el dasbhoard

  const { data: token1Data, refetch: refetchToken1Data } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: token1 as `0x${string}`,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [account || zeroAddress],
      },
      {
        address: token1 as `0x${string}`,
        abi: erc20Abi,
        functionName: 'decimals',
      },
      {
        address: token1 as `0x${string}`,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [account || zeroAddress, vaultId as `0x${string}`],
      },
    ],
  })
  const token1Decimals = token1Data?.[1] || 18
  const token1Balance = ethers.utils.formatUnits(token1Data?.[0].toString() || 0, token1Decimals) || '0'
  const token1Allowance = ethers.utils.formatUnits(token1Data?.[2].toString() || 0, token1Decimals) || '0'
  useEffect(() => {
    const fetchToken1Equivalent = async () => {
      if (lastUserUpdate === 'token0' && token0TypedValue !== '0' && token0TypedValue !== '') {
        try {
          const res = await readContract(wagmiConfig, {
            address: contractAddressList.gamma_uniproxy as `0x${string}`,
            abi: gammaUniProxyABI,
            functionName: 'getDepositAmount',
            args: [vaultId as `0x${string}`, token0, BigInt(token0TypedValue * 10 ** token0Decimals)],
          })
          setToken1TypedValue(formatPrice(ethers.utils.formatUnits((res[0] + res[1]) / 2n, token1Decimals), 14))
        } catch (error) {}
      }
    }
    fetchToken1Equivalent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token0TypedValue, setToken1TypedValue])

  useEffect(() => {
    const fetchToken0Equivalent = async () => {
      if (lastUserUpdate === 'token1' && token1TypedValue !== '0' && token1TypedValue !== '') {
        try {
          const res = await readContract(wagmiConfig, {
            address: contractAddressList.gamma_uniproxy as `0x${string}`,
            abi: gammaUniProxyABI,
            functionName: 'getDepositAmount',
            args: [vaultId as `0x${string}`, token1, BigInt(token1TypedValue * 10 ** token1Decimals)],
          })
          setToken0TypedValue(formatPrice(ethers.utils.formatUnits((res[0] + res[1]) / 2n, token0Decimals), 14))
        } catch (error) {}
      }
    }
    fetchToken0Equivalent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token1TypedValue, setToken0TypedValue])
  const [loadingWaitingApproval, setLoadingWaitingApproval] = useState(false)
  const handleToken0InputChange = (value: string) => {
    if (value === '') {
      setToken0TypedValue('')
      setToken1TypedValue('')
      return
    }
    setLastUserUpdate('token0')
    setToken0TypedValue(value)
  }
  const isToken0ApprovalRequired = toBN(token0TypedValue).gt(token0Allowance)
  const isToken1ApprovalRequired = toBN(token1TypedValue).gt(token1Allowance)
  const handleToken1InputChange = (value: string) => {
    if (value === '') {
      setToken0TypedValue('')
      setToken1TypedValue('')
      return
    }
    setLastUserUpdate('token1')
    setToken1TypedValue(value)
  }
  const deposit = async () => {
    try {
      if (isToken0ApprovalRequired) {
        setLoadingWaitingApproval(true)
        await writeContractAsync(
          {
            address: token0 as `0x${string}`,
            abi: erc20Abi,
            functionName: 'approve',
            args: [vaultId as `0x${string}`, ethers.constants.MaxUint256.toBigInt() - 1n],
          },
          {
            onSuccess: async (txHash) => {
              //
              const provider = getWeb3Provider()
              await provider.waitForTransaction(txHash)
              setLoadingWaitingApproval(false)
              refetchToken0Data()
              setTimeout(() => {
                refetchToken0Data()
              }, 1000)
            },
          }
        )
      }
      if (isToken1ApprovalRequired) {
        setLoadingWaitingApproval(true)
        await writeContractAsync(
          {
            address: token1 as `0x${string}`,
            abi: erc20Abi,
            functionName: 'approve',
            args: [vaultId as `0x${string}`, ethers.constants.MaxUint256.toBigInt() - 1n],
          },
          {
            onSuccess: async (txHash) => {
              //
              const provider = getWeb3Provider()
              await provider.waitForTransaction(txHash)
              refetchToken1Data()
              setLoadingWaitingApproval(false)
              setTimeout(() => {
                refetchToken1Data()
              }, 1000)
            },
          }
        )
      }
    } catch (error) {
      setLoadingWaitingApproval(false)
    }

    await writeContractAsync(
      {
        address: contractAddressList.gamma_uniproxy as `0x${string}`,
        abi: gammaUniProxyABI,
        functionName: 'deposit',
        args: [
          BigInt(token0TypedValue * 10 ** token0Decimals),
          BigInt(token1TypedValue * 10 ** token0Decimals),
          account as `0x${string}`,
          vaultId as `0x${string}`,
          [0n, 0n, 0n, 0n],
        ],
      },
      {
        onSuccess: async (txHash) => {
          setToken0TypedValue('')
          setToken1TypedValue('')
          addNotification({
            id: crypto.randomUUID(),
            message: 'Deposit successful',
            notificationType: NotificationType.SUCCESS,
            notificationDuration: NotificationDuration.DURATION_5000,
            createTime: new Date().toISOString(),
            txHash,
          })
          const provider = getWeb3Provider()
          await provider.waitForTransaction(txHash)
          await postEvent({
            tx: txHash,
            user: account as `0x${string}`,
            event_type: 'ADD_LIQUIDITY',
            value:
              toBN(token0TypedValue).multipliedBy(token0Price).toNumber() +
              toBN(token1TypedValue).multipliedBy(token1Price).toNumber(),
          })
          refetchToken0Data()
          refetchToken1Data()

          setTimeout(() => {
            refetchToken0Data()
            refetchToken1Data()
          }, 1000)
        },
      }
    )
  }

  const getButtonText = () => {
    if (!vaultId) return 'Vault not available'
    if (!token0TypedValue || !token1TypedValue) return 'Enter an amount'
    if (toBN(token0TypedValue).eq(0) || toBN(token1TypedValue).eq(0)) return 'Enter an amount'
    if (isToken0ApprovalRequired) return `Approve ${token0IToken?.symbol}`
    if (isToken1ApprovalRequired) return `Approve ${token1IToken?.symbol}`
    if (toBN(token0TypedValue).gt(token0Balance)) return `Insufficient ${token0IToken?.symbol} balance`
    if (toBN(token1TypedValue).gt(token1Balance)) return `Insufficient ${token1IToken?.symbol} balance`
    //  if (!vaultAddress) return 'Vault not available'
    //  if (waitingApproval) return 'Waiting for approval'
    //  if (!token0TypedValue) return 'Enter an amount'
    //  if (isToken0ApprovalRequired) return `Approve ${tokenAddressToSymbol[selected]}`

    //  const typedValueBN = toBN(token0TypedValue)
    //  const balanceBN = toBN(formatUnits(token0Balance || 0n, token0Decimals))
    //  if (typedValueBN > balanceBN) return 'Insufficient balance'
    //  if (loading) return 'Depositing'
    return 'Deposit'
  }
  return (
    <div className="bg-shark-400 bg-opacity-40 px-[15px] py-[29px] md:px-[19px] border border-shark-950 rounded-[10px] mb-2.5">
      {vaultId && (
        <>
          <div className="text-xs leading-normal text-white">Deposit amounts</div>
          <div className="flex items-end gap-3 mb-[14px]">
            <div className="relative w-full xl:w-3/5">
              <div className={'text-right mr-2 text-xs leading-normal text-shark-100 mb-1'}>
                {token0TypedValue && !isNaN(token0TypedValue)
                  ? formatDollarAmount(toBN(token0TypedValue).multipliedBy(token0Price).toString())
                  : '-'}
              </div>
              <NumericalInput
                value={token0TypedValue}
                onUserInput={(value) => {
                  handleToken0InputChange(value)
                }}
                precision={INPUT_PRECISION}
                placeholder="0.0"
                className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-s"
              />
              <div className="absolute right-2 top-[33px] flex items-center gap-1 max-md:hidden">
                <Button
                  variant="tertiary"
                  className="!py-1 !px-3"
                  onClick={() => {
                    toBN(token0Balance).gt(0) &&
                      handleToken0InputChange(toBN(formatPrice(token0Balance, 14)).div(2).toString())
                  }}
                >
                  Half
                </Button>
                <Button
                  variant="tertiary"
                  className="!py-1 !px-3"
                  onClick={() => {
                    toBN(token0Balance).gt(0) &&
                      handleToken0InputChange(toBN(formatPrice(token0Balance, 14)).toString())
                  }}
                >
                  Max
                </Button>
              </div>
            </div>

            <div className="relative xl:w-2/5 flex-shrink-0">
              <TokenDisplay token={token0IToken} balance={token0Balance} />
            </div>
          </div>
          <div className="flex  items-end gap-3">
            <div className={'flex w-full items-end gap-3'}>
              <div className="relative w-full xl:w-3/5">
                <div className={'text-right mr-2 text-xs leading-normal text-shark-100 mb-1'}>
                  {token1TypedValue && !isNaN(token1TypedValue)
                    ? formatDollarAmount(toBN(token1TypedValue).multipliedBy(token1Price).toString())
                    : '-'}
                </div>

                <NumericalInput
                  value={token1TypedValue}
                  onUserInput={(value) => {
                    handleToken1InputChange(value)
                  }}
                  precision={INPUT_PRECISION}
                  placeholder="0.0"
                  className="bg-shark-400 bg-opacity-40 border border-shark-400 h-[50px] w-full rounded-lg outline-none px-3 text-white text-s"
                />
                <div className="absolute right-2 top-[33px] flex items-center gap-1 max-md:hidden">
                  <Button
                    variant="tertiary"
                    className="!py-1 !px-3"
                    onClick={() => {
                      toBN(token1Balance).gt(0) &&
                        handleToken1InputChange(toBN(formatPrice(token1Balance, 14)).div(2).toString())
                    }}
                  >
                    Half
                  </Button>
                  <Button
                    variant="tertiary"
                    className="!py-1 !px-3"
                    onClick={() => {
                      toBN(token1Balance).gt(0) &&
                        handleToken1InputChange(toBN(formatPrice(token1Balance, 14)).toString())
                    }}
                  >
                    Max
                  </Button>
                </div>
              </div>
              <div className="relative xl:w-2/5 flex-shrink-0">
                <TokenDisplay token={token1IToken} balance={token1Balance} />
              </div>
            </div>
          </div>
        </>
      )}

      <Button
        disabled={
          loadingWaitingApproval
          || !vaultId
          || !((+token0TypedValue && !isNaN(+token0TypedValue)) || (+token1TypedValue && !isNaN(+token1TypedValue)))}
        variant="tertiary"
        walletConfig={{
          needSupportedChain: true,
          needWalletConnected: true,
        }}
        className="w-full mx-auto !text-xs !h-[49px] mt-4"
        onClick={deposit}
      >
        {loadingWaitingApproval ? (
          <>
            <Loader color="white" size={20} />
            <span className="ml-2">Waiting approval...</span>
          </>
        ) : (
          getButtonText()
        )}
      </Button>
    </div>
  )
}

export default DepositAmountsGAMMA

const TokenDisplay = ({ token, balance }: { token: IToken | undefined; balance: string }) => {
  return (
    <>
      <span className="text-xs leading-normal text-shark-100 mr-4 flex items-center gap-x-2 mb-1">
        <span className="icon-wallet text-xs"></span>
        Available: {balance === '0' ? '-' : formatAmount(balance, 6)} {token?.symbol}
      </span>
      <div className="bg-shark-400 bg-opacity-40 rounded-lg text-white px-4 flex items-center justify-between h-[50px]">
        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center gap-x-2">
            <Image
              src={`/static/images/tokens/${token?.symbol}.svg`}
              alt="token"
              className="w-6 h-6 rounded-full"
              width={20}
              height={20}
            />
            <span className="text-base">{token?.symbol}</span>
          </div>
        </div>
      </div>
    </>
  )
}
