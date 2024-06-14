/* eslint-disable max-len */
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
import { Address, encodeFunctionData, zeroAddress } from 'viem'
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
// import cn from '@/src/library/utils/cn'

import { BoostedPool, RingCampaignData, extraPoints } from '@/src/app/api/rings/campaign/route'
import useFDAOEmissionsAPR from '@/src/library/hooks/web3/useFDAOEmisionsAPR'
import { useRingsCampaigns } from '@/src/state/liquidity/hooks'

interface MyPositionssProps {
  activePagination?: boolean
  data: positions[]
  tokens: Token[]
  ringsCampaign: RingCampaignData
  showDust?: boolean
}

const PositionTable = ({ activePagination = true, data, tokens, ringsCampaign, showDust }: MyPositionssProps) => {
  const router = useRouter()
  const [isInRange, setIsInRange] = useState(false)

  const dispatch = useDispatch()
  const { writeContractAsync } = useWriteContract()
  const { address } = useAccount()
  const addNotification = useNotificationAdderCallback()
  const [itemsPerPage, setItemPerPage] = useState<number>(10)
  const [activePage, setActivePage] = useState<number>(1)
  const [isMinHover, setIsMinHover] = useState<boolean>(false)
  const [isMaxHover, setIsMaxHover] = useState<boolean>(false)
  const [tvlPosition, setTvlPosition] = useState<any>([])
  const [nonZeroData, setNonZeroData] = useState<positions[]>([])

  const { data: ringsCampaignsData } = useRingsCampaigns()
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

  const TvlTotalValue = (data: any) => {
    const tvl = 
      Number(data?.depositedToken0) *
        Number(
          tokens.find(
            (e) =>
              e.tokenAddress.toLowerCase() ===
              (data?.token0?.id.toLowerCase())
          )?.priceUSD
        ) +
        Number(data?.depositedToken1) *
          Number(
            tokens.find(
              (e) =>
                e.tokenAddress.toLowerCase() ===
                (data?.token1?.id.toLowerCase())
            )?.priceUSD
          )
      
    tvlPosition[data.id] = tvl
    return formatDollarAmount(tvl)
  }

  useEffect(() => {
    setNonZeroData(showDust ? data : data.filter((i) => {
      return (Number(tvlPosition[i.id] ? tvlPosition[i.id] : TvlTotalValue(i)) > 0.1)
    }))
  }, [data, showDust, tvlPosition])
  const pagination = paginate(nonZeroData, activePage, itemsPerPage)

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
            <div
              className="relative px-2 py-2 text-xs whitespace-nowrap text-ellipsis overflow-hidden text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300"
              onMouseEnter={() => setIsMinHover(true)}
              onMouseLeave={() => setIsMinHover(false)}
            >
              Min: {minPriceIsZero ? 0 : formatAmount(minPrice, 6)} {token0.symbol} per {token1.symbol}
              {/* {isMinHover && (
                <Tooltip
                  className={cn(
                    'absolute z-10 bg-shark-950 rounded-lg border border-shark-300 w-auto top-1/2 -translate-y-1/2 px-5 py-3 xl:left-0',
                  )}
                  show={isMinHover}
                  setShow={() => {}}
                >
                  {<div className='text-xs text-white text-opacity-75'>
                    Min: {minPriceIsZero ? 0 : formatAmount(minPrice, 6)} {token0.symbol} per {token1.symbol}
                  </div>}
                </Tooltip>
              )} */}
            </div>
            <div
              className="relative px-2 py-2 text-xs whitespace-nowrap text-ellipsis overflow-hidden text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300"
              onMouseEnter={() => setIsMaxHover(true)}
              onMouseLeave={() => setIsMaxHover(false)}
            >
              Max: {maxPriceIsInfinity ? '∞' : formatAmount(maxPrice, 6)} {token0.symbol} per {token1.symbol}
              {/* {isMaxHover && (
                <Tooltip
                  className={cn(
                    'absolute z-10 bg-shark-950 rounded-lg border border-shark-300 w-auto top-1/2 -translate-y-1/2 px-5 py-3 xl:left-0',
                  )}
                  show={isMaxHover}
                  setShow={() => {}}
                >
                  {<div className='text-xs text-white text-opacity-75'>
                    Max: {maxPriceIsInfinity ? '∞' : formatAmount(maxPrice, 6)} {token0.symbol} per {token1.symbol}
                  </div>}
                </Tooltip>
              )} */}
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
    setIsInRange: (inRange: boolean) => void
    isInRange: boolean
  }
  const SetStatus = ({ token0, token1, tickLower, tickUpper, liquidity, setIsInRange, isInRange }: setStatusprops) => {
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

    const isInRangeAux = useMemo(() => {
      return (minPrice < Number(currentPoolPrice) && maxPrice >= Number(currentPoolPrice)) || liquidity === 'ichi'
    }, [minPrice, maxPrice, currentPoolPrice, liquidity])

    useEffect(() => {
      setIsInRange(isInRangeAux)
    }, [isInRangeAux, , setIsInRange])
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
    return (
      <>
        <p className="text-xs text-white mb-1">
          {tvlPosition[data.id] ? formatDollarAmount(tvlPosition[data.id]) : TvlTotalValue(data)}
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
            sort={"normal"}
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
                  const extraAprs =
                    ringsCampaignsData.find((pool: BoostedPool) => {
                      return pool.id.toLowerCase() === position.pool.id.toLowerCase()
                    })?.extraPoints || []
                  const extraAprNumber = extraAprs.reduce((acc: number, curr: extraPoints) => {
                    return acc + curr.apr
                  }, 0)
                  return (
                    <>
                      <TableRow key={position.id}>
                        <TableCell className="flex w-[40%]">
                          <div className="flex items-center w-full gap-2">
                            <div className="flex items-center w-[60px] max-2xl:w-[50px]">
                              <Image
                                src={`/static/images/tokens/${position.token0.symbol}.svg`}
                                alt="token"
                                className="rounded-full w-10 h-10 max-2xl:w-8 max-2xl:h-8"
                                width={30}
                                height={30}
                              />
                              <Image
                                src={`/static/images/tokens/${position.token1.symbol}.svg`}
                                alt="token"
                                className="-ml-4 rounded-full w-10 h-10 max-2xl:w-8 max-2xl:h-8"
                                width={30}
                                height={30}
                              />
                            </div>
                            <div className="flex flex-col max-2xl:max-w-[85%] 2xl:max-w-full">
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
                            setIsInRange={setIsInRange}
                            isInRange={isInRange}
                          />
                        </TableCell>
                        <TableCell className="w-[10%] flex justify-end">
                          <AprBox
                            apr={isInRange ? parseFloat(position?.apr) + fenixRingApr + extraAprNumber : 0}
                            tooltip={
                              <div>
                                <div className="flex justify-between items-center gap-3">
                                  <p className="text-sm pb-1">Fees APR</p>
                                  <p className="text-sm pb-1 text-chilean-fire-600">{position?.apr}</p>
                                </div>
                                {fenixRingApr > 0 && isInRange && (
                                  <div className="flex justify-between items-center gap-3">
                                    <p className="text-sm pb-1">Rings APR</p>
                                    <p className="text-sm pb-1 text-chilean-fire-600">
                                      {formatAmount(fenixRingApr, 2)}%
                                    </p>
                                  </div>
                                )}
                                {extraAprs &&
                                  extraAprs.length > 0 &&
                                  extraAprs.map((extraApr: extraPoints) => {
                                    return (
                                      <div key={extraApr.name} className="flex justify-between items-center gap-3">
                                        <p className="text-sm pb-1">{extraApr.name}</p>
                                        <p className="text-sm pb-1 text-chilean-fire-600">
                                          {formatAmount(extraApr.apr, 2)}%
                                        </p>
                                      </div>
                                    )
                                  })}
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
                    numberPages={Math.ceil(nonZeroData.length / itemsPerPage)}
                    activePage={activePage}
                    itemsPerPage={itemsPerPage}
                    setActivePage={setActivePage}
                    setItemPerPage={setItemPerPage}
                  />
                  <div className=" hidden">
                    <PaginationMobile
                      count={nonZeroData.length}
                      itemsPerPage={itemsPerPage}
                      setItemPerPage={setItemPerPage}
                      activePage={activePage}
                      setActivePage={setActivePage}
                      className="mx-auto"
                      numberPages={Math.ceil(nonZeroData.length / itemsPerPage)}
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
