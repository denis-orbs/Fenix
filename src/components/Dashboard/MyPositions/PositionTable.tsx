/* eslint-disable react/no-multi-comp */
import Image from 'next/image'
import { Button, Pagination, PaginationMobile, TableBody, TableCell, TableHead, TableRow, Tooltip } from '../../UI'
import { positions } from '../MyStrategies/Strategy'
import NoPositionFound from './NoPositionFound'
import { useEffect, useMemo, useState } from 'react'
import { formatAmount, formatCurrency, formatDollarAmount, toBN } from '@/src/library/utils/numbers'
import { Token } from '@/src/library/common/getAvailableTokens'
import { IchiVault, useIchiVaultsData } from '@/src/library/hooks/web3/useIchi'
import { NotificationDuration, NotificationType } from '@/src/state/notifications/types'
import { Address, encodeFunctionData } from 'viem'
import { useAccount, useWriteContract } from 'wagmi'
import { publicClient } from '@/src/library/constants/viemClient'
import { CL_MANAGER_ABI } from '@/src/library/constants/abi'
import { contractAddressList } from '@/src/library/constants/contactAddresses'
import { useNotificationAdderCallback } from '@/src/state/notifications/hooks'
import { MAX_INT } from '@/src/library/constants/misc'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setApr } from '@/src/state/apr/reducer'
import { getAlgebraPoolPrice } from '@/src/library/hooks/liquidity/useCL'
import Loader from '../../UI/Icons/Loader'
import { useQuery } from '@tanstack/react-query'
import AprBox from '../../UI/Pools/AprBox'

import { RingCampaignData } from '@/src/app/api/rings/campaign/route'

interface MyPositionssProps {
  activePagination?: boolean
  data: positions[]
  tokens: Token[]
  ringsCampaign: RingCampaignData
}

const PositionTable = ({ activePagination = true, data, tokens, ringsCampaign }: MyPositionssProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { writeContractAsync } = useWriteContract()
  const { address } = useAccount()
  const addNotification = useNotificationAdderCallback()
  const [itemsPerPage, setItemPerPage] = useState<any>(5)
  const [activePage, setActivePage] = useState<number>(1)

  function paginate(items: any, currentPage: number, itemsPerPage: number) {
    // Calculate total pages
    const totalPages = Math.ceil(items.length / itemsPerPage)

    // Ensure current page isn't out of range
    currentPage = Math.max(1, Math.min(currentPage, totalPages))

    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    const paginatedItems = items.slice(start, end)

    return paginatedItems
  }

  const pagination = paginate(data, activePage, itemsPerPage)

  type priceClacualtionProps = {
    token0: {
      decimals: string
      id: string
      symbol: string
      __typename?: string
    }
    token1: {
      decimals: string
      id: string
      symbol: string
      __typename?: string
    }
    tickLower: {
      price0: string
      price1: string
    }
    tickUpper: {
      price0: string
      price1: string
    }
    isMobile: boolean
  }
  const PriceCalculation = ({ token0, token1, tickLower, tickUpper, isMobile }: priceClacualtionProps) => {
    const minPrice = parseFloat(tickLower?.price0) * 10 ** (Number(token0?.decimals) - Number(token1?.decimals))
    const maxPrice = parseFloat(tickUpper?.price0) * 10 ** (Number(token0?.decimals) - Number(token1?.decimals))
    const minPriceIsZero = minPrice < 1e-5
    const maxPriceIsInfinity = maxPrice > 1e12
    return (
      <>
        {isMobile ? (
          <div className="flex gap-2 justify-between">
            <div className="px-2 py-2 text-xs whitespace-nowrap text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              Min: {minPriceIsZero ? 0 : formatAmount(minPrice, 6)} {token0.symbol} per {token1.symbol}
            </div>
            <div className="px-2 py-2 text-xs whitespace-nowrap text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              Max: {maxPriceIsInfinity ? '∞' : formatAmount(maxPrice, 6)} {token0.symbol} per {token1.symbol}
            </div>
          </div>
        ) : (
          <>
            <div className="px-2 py-2 text-xs whitespace-nowrap text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              Min: {minPriceIsZero ? 0 : formatAmount(minPrice, 6)} {token0.symbol} per {token1.symbol}
            </div>
            <div className="px-2 py-2 text-xs whitespace-nowrap text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              Max: {maxPriceIsInfinity ? '∞' : formatAmount(maxPrice, 6)} {token0.symbol} per {token1.symbol}
            </div>
          </>
        )}
      </>
    )
  }

  type setStatusprops = {
    token0: {
      decimals: string
      id: string
      symbol: string
      __typename?: string
    }
    token1: {
      decimals: string
      id: string
      symbol: string
      __typename?: string
    }
    tickLower: {
      price0: string
      price1: string
    }
    tickUpper: {
      price0: string
      price1: string
    }
    liquidity: string
  }
  const SetStatus = ({ token0, token1, tickLower, tickUpper, liquidity }: setStatusprops) => {
    const minPrice = useMemo(() => {
      return parseFloat(tickLower?.price0) * 10 ** (Number(token0?.decimals) - Number(token1?.decimals))
    }, [tickLower, token0?.decimals, token1?.decimals])
    const maxPrice = useMemo(() => {
      return parseFloat(tickUpper?.price0) * 10 ** (Number(token0?.decimals) - Number(token1?.decimals))
    }, [tickUpper, token0?.decimals, token1?.decimals])

    const { data: poolPriceData, isLoading: isPoolPriceDataLoading } = useQuery({
      queryKey: ['algebraPoolPrice', token0?.id, token1?.id],
      staleTime: 1000 * 60 * 30,
      queryFn: async () => {
        const state = await getAlgebraPoolPrice(token0?.id as `0x${string}`, token1?.id as `0x${string}`)
        return state
      },
      enabled: !!token0?.id && !!token1?.id,
    })
    const currentPoolPrice = poolPriceData
      ? Number(poolPriceData?.price / 10 ** Number(token1.decimals)).toFixed(6)
      : '0'

    const isInRange = useMemo(() => {
      return (minPrice < Number(currentPoolPrice) && maxPrice >= Number(currentPoolPrice)) || liquidity === 'ichi'
    }, [minPrice, maxPrice, currentPoolPrice, liquidity])
    if (isPoolPriceDataLoading) {
      return <Loader />
    }
    return (
      <>
        {isInRange ? (
          <div className="text-green-400 text-sm flex-col flex justify-center items-start gap-1">
            <div className="flex items-center gap-x-1">
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3" cy="3" r="3" fill="#2AED8F" />
              </svg>
              <span>In range</span>
            </div>
            <span className="text-white">Pool price: {Number(currentPoolPrice)}</span>
          </div>
        ) : (
          <div className="text-red-600 text-sm flex-col flex justify-center items-start gap-1">
            <div className="flex items-center gap-x-1">
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="3" cy="3" r="3" fill="#dc2626" />
              </svg>
              <span>Out of range</span>
            </div>
            <span className="text-white">Pool price: {Number(currentPoolPrice)}</span>
          </div>
        )}
      </>
    )
  }

  const TvlTotal = ({ data }: any) => {
    let ichitokens: IchiVault
    if (data.liquidity === 'ichi') {
      ichitokens = useIchiVaultsData(data?.id)
    }
    return (
      <>
        <p className="text-xs text-white mb-1">
          {formatDollarAmount(
            Number(data?.depositedToken0) *
              Number(
                tokens.find(
                  (e) =>
                    e.tokenAddress.toLowerCase() ===
                    (data.liquidity === 'ichi' ? ichitokens.tokenA.toLowerCase() : data?.token0?.id.toLowerCase())
                )?.priceUSD
              ) +
              Number(data?.depositedToken1) *
                Number(
                  tokens.find(
                    (e) =>
                      e.tokenAddress.toLowerCase() ===
                      (data.liquidity === 'ichi' ? ichitokens.tokenB.toLowerCase() : data?.token1?.id.toLowerCase())
                  )?.priceUSD
                )
          )}
        </p>
      </>
    )
  }

  const handleClaim = (id: string) => {
    const multi = [
      encodeFunctionData({
        abi: CL_MANAGER_ABI,
        functionName: 'collect',
        args: [[id, address, MAX_INT, MAX_INT]],
      }),
    ]

    writeContractAsync(
      {
        abi: CL_MANAGER_ABI,
        address: contractAddressList.cl_manager as Address,
        functionName: 'multicall',
        args: [multi],
      },

      {
        onSuccess: async (x) => {
          const transaction = await publicClient.waitForTransactionReceipt({ hash: x })
          if (transaction.status == 'success') {
            // toast(`Fees Claimed successfully.`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Fees Claimed successfully.`,
              notificationType: NotificationType.SUCCESS,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          } else {
            // toast(`Fees Claimed Tx failed`)
            addNotification({
              id: crypto.randomUUID(),
              createTime: new Date().toISOString(),
              message: `Fees Claimed Tx failed`,
              notificationType: NotificationType.ERROR,
              txHash: transaction.transactionHash,
              notificationDuration: NotificationDuration.DURATION_5000,
            })
          }
        },
        onError: (e) => {
          // toast(`Fees Claimed Tx failed.`)
          addNotification({
            id: crypto.randomUUID(),
            createTime: new Date().toISOString(),
            message: `Fees Claimed Tx failed`,
            notificationType: NotificationType.ERROR,
            txHash: '',
            notificationDuration: NotificationDuration.DURATION_5000,
          })
        },
      }
    )
  }

  return (
    <>
      <div className="relative hidden xl:block z-10 xl:mb-5 w-full">
        <div className="w-full">
          <TableHead
            items={[
              { text: 'Your Positions', className: 'text-left w-[40%]', sortable: false },
              { text: 'Status', className: 'text-left w-[15%]', sortable: false },
              { text: 'APR', className: 'text-right w-[10%]', sortable: false },
              { text: 'TVL', className: 'text-right w-[15%]', sortable: false },
              { text: 'Action', className: 'text-right w-[20%]', sortable: false },
            ]}
            setSort={() => {}}
            setSortIndex={() => {}}
            sort={null}
            sortIndex={1}
          />
          {data && data?.length > 0 ? (
            <>
              <TableBody>
                {pagination.map((position: positions) => {
                  const fenixRingApr =
                    ringsCampaign.boostedPools.find((pool) => {
                      return pool.id.toLowerCase() === position.pool.id.toLowerCase()
                    })?.apr || 0

                  return (
                    <>
                      <TableRow key={position.id}>
                        <TableCell className="w-[40%]">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              <Image
                                src={`/static/images/tokens/${position.token0.symbol}.svg`}
                                alt="token"
                                className="rounded-full w-10 h-10"
                                width={30}
                                height={30}
                              />
                              <Image
                                src={`/static/images/tokens/${position.token1.symbol}.svg`}
                                alt="token"
                                className="-ml-4 rounded-full w-10 h-10"
                                width={30}
                                height={30}
                              />
                            </div>
                            <div className="flex flex-col">
                              <h5 className="text-sm text-white">
                                {position.token0.symbol} / {position.token1.symbol}
                              </h5>
                              <div className="flex items-center gap-2">
                                {position.liquidity === 'ichi' ? (
                                  <div>
                                    <span className="text-gray-600 flex items-center">
                                      Managed By{' '}
                                      <Image
                                        src={`/static/images/providers/ichi.svg`}
                                        alt="token"
                                        className="mx-2 w-10 h-10"
                                        width={30}
                                        height={30}
                                      />
                                    </span>
                                  </div>
                                ) : (
                                  <PriceCalculation
                                    token0={position.token0}
                                    token1={position.token1}
                                    tickLower={position.tickLower}
                                    tickUpper={position.tickUpper}
                                    isMobile={false}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="w-[15%] flex justify-start">
                          <SetStatus
                            token0={position.token0}
                            token1={position.token1}
                            tickLower={position.tickLower}
                            tickUpper={position.tickUpper}
                            liquidity={position.liquidity}
                          />
                        </TableCell>
                        <TableCell className="w-[10%] flex justify-end">
                          <AprBox
                            apr={parseFloat(position?.apr) > 0 ? parseFloat(position?.apr) + fenixRingApr : 0}
                            tooltip={
                              <div>
                                <div className="flex justify-between items-center gap-3">
                                  <p className="text-sm pb-1">Fees APR</p>
                                  <p className="text-sm pb-1 text-chilean-fire-600">{position?.apr}</p>
                                </div>
                                {fenixRingApr > 0 && parseFloat(position?.apr) > 0 && (
                                  <div className="flex justify-between items-center gap-3">
                                    <p className="text-sm pb-1">Rings APR</p>
                                    <p className="text-sm pb-1 text-chilean-fire-600">
                                      {formatAmount(fenixRingApr, 2)}%
                                    </p>
                                  </div>
                                )}
                              </div>
                            }
                          />
                        </TableCell>
                        <TableCell className="w-[15%] flex justify-end">
                          <div className="flex flex-col justify-center items-end">
                            <TvlTotal data={position} />
                            <span className="flex justify-center items-center gap-2">
                              <p className="flex gap-2 items-center">
                                <Image
                                  src={`/static/images/tokens/${position.token0.symbol}.svg`}
                                  alt="token"
                                  className="rounded-full w-5 h-5"
                                  width={10}
                                  height={10}
                                />
                                <span className="text-xs">
                                  {formatCurrency(formatAmount(toBN(Number(position.depositedToken0)), 6))}{' '}
                                </span>
                              </p>
                              <p className="flex gap-2 items-center">
                                <Image
                                  src={`/static/images/tokens/${position.token1.symbol}.svg`}
                                  alt="token"
                                  className="rounded-full w-5 h-5"
                                  width={10}
                                  height={10}
                                />
                                <span className="text-xs">
                                  {formatCurrency(formatAmount(toBN(Number(position.depositedToken1)), 6))}{' '}
                                </span>
                              </p>
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="w-[20%] flex justify-end">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="tertiary"
                              className="h-[38px] w-[80px] bg-opacity-40 items-center justify-center"
                              onClick={() => {
                                if (position.liquidity !== 'ichi') {
                                  dispatch(setApr(position?.apr))
                                  router.push(`/liquidity/manage?id=${position?.id}`)
                                  router.refresh()
                                } else {
                                  router.push(
                                    `liquidity/deposit?type=CONCENTRATED_AUTOMATIC&token0=${position?.token0?.id}&token1=${position?.token1?.id}`
                                  )
                                  // router.refresh()
                                }
                              }}
                            >
                              <span className="text-l">Manage</span>
                            </Button>
                            {position.liquidity !== 'ichi' ? (
                              <>
                                <Button
                                  variant="tertiary"
                                  className="h-[38px] w-[80px] bg-opacity-40 items-center justify-center"
                                  onClick={() => {
                                    if (position.liquidity !== 'ichi') {
                                      handleClaim(position.id)
                                    }
                                  }}
                                >
                                  <span className="text-l">Claim</span>
                                </Button>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })}
              </TableBody>
              {activePagination && (
                <div className="items-center hidden xl:flex">
                  <Pagination
                    className="mx-auto"
                    numberPages={Math.ceil(data.length / itemsPerPage)}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                    setActivePage={setActivePage}
                    setItemPerPage={setItemPerPage}
                  />
                  <div className=" hidden">
                    <PaginationMobile
                      count={data.length}
                      itemsPerPage={itemsPerPage}
                      setItemPerPage={setItemPerPage}
                      activePage={activePage}
                      setActivePage={setActivePage}
                      className="mx-auto"
                      numberPages={Math.ceil(data.length / itemsPerPage)}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <NoPositionFound />
          )}
        </div>
      </div>
    </>
  )
}

export default PositionTable
