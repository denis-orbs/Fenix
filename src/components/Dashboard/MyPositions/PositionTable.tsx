/* eslint-disable max-len */
/* eslint-disable react/no-multi-comp */
import Image from 'next/image'
import { Button, Pagination, PaginationMobile, TableBody, TableCell, TableHead, TableRow, Tooltip } from '../../UI'
import { positions } from '../MyStrategies/Strategy'
import NoPositionFound from './NoPositionFound'
import { useEffect, useMemo, useState, useRef } from 'react'
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
import { totalCampaigns, Campaign } from '@/src/library/utils/campaigns'

interface MyPositionssProps {
  activePagination?: boolean
  data: positions[]
  tokens: Token[]
  ringsCampaign: RingCampaignData
}

const PositionTable = ({ activePagination = true, data, tokens, ringsCampaign }: MyPositionssProps) => {
  console.log('dd', data.length)
  const router = useRouter()

  const dispatch = useDispatch()
  const { writeContractAsync } = useWriteContract()
  const { address } = useAccount()
  const addNotification = useNotificationAdderCallback()
  const [itemsPerPage, setItemPerPage] = useState<number>(10)
  const [activePage, setActivePage] = useState<number>(1)
  const [isMinHover, setIsMinHover] = useState<boolean>(false)
  const [isMaxHover, setIsMaxHover] = useState<boolean>(false)
  const [isInRange, setIsInRange] = useState<boolean>(false)

  const hoverRef = useRef(null)

  const [openTooltipGold, setOpenTooltipGold] = useState<boolean>(false)
  const [openTooltipEigenLayer, setOpenTooltipEigenLayer] = useState<boolean>(false)
  const [openTooltipKelpMiles, setOpenTooltipKelpMiles] = useState<boolean>(false)
  const [openTooltipTurtleClub, setOpenTooltipTurtleClub] = useState<boolean>(false)
  const [id, setId] = useState<string>('')
  // const [campaign, setCampaign] = useState<Campaign>()

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
            <div className="px-2 py-1 text-[.625rem] leading-4  whitespace-nowrap text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              Min: {minPriceIsZero ? 0 : formatAmount(minPrice, 6)} Max:{' '}
              {maxPriceIsInfinity ? '∞' : formatAmount(maxPrice, 6)}
              {/* Min: {minPriceIsZero ? 0 : formatAmount(minPrice, 6)} {token0.symbol} per {token1.symbol} */}
            </div>
            {/* <div className="px-2 py-2 text-xs whitespace-nowrap text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              Max: {maxPriceIsInfinity ? '∞' : formatAmount(maxPrice, 6)} 
              Max: {maxPriceIsInfinity ? '∞' : formatAmount(maxPrice, 6)} {token0.symbol} per {token1.symbol}
            </div> */}
          </div>
        ) : (
          <>
            <div className="relative px-2 py-1 text-[.625rem] leading-4  whitespace-nowrap text-ellipsis overflow-hidden text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300">
              {/* Min: {minPriceIsZero ? 0 : formatAmount(minPrice, 6)} {token0.symbol} per {token1.symbol} */}
              Min: {minPriceIsZero ? 0 : formatAmount(minPrice, 6)} - Max:{' '}
              {maxPriceIsInfinity ? '∞' : formatAmount(maxPrice, 6)}
            </div>
            {/* <div
              className="relative px-2 py-2 text-xs whitespace-nowrap text-ellipsis overflow-hidden text-white border border-solid bg-shark-400 rounded-xl bg-opacity-40 border-1 border-shark-300"
              
            > */}
            {/* Max: {maxPriceIsInfinity ? '∞' : formatAmount(maxPrice, 6)} {token0.symbol} per {token1.symbol} */}
            {/* Max: {maxPriceIsInfinity ? '∞' : formatAmount(maxPrice, 6)}  */}
            {/* </div> */}
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
    const [isOverRange, setIsOverRange] = useState(false)
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
    }, [isInRangeAux, setIsInRange])
    if (isPoolPriceDataLoading) {
      return <Loader />
    }
    return (
      <div className="flex items-center gap-2 max-2xl:gap-1 justify-start">
        <div
          className={`relative cursor-default rounded-full w-2 h-2 ${isInRangeAux ? 'bg-fenix-green' : 'bg-fenix-red'} mr-1`}
          onMouseOver={() => setIsOverRange(true)}
          onMouseLeave={() => setIsOverRange(false)}
        >
          <div
            className={`absolute top-[-20px] ${isInRangeAux ? 'right-[-65px]' : 'right-[-90px]'} px-2 py-1 text-white text-xs whitespace-nowrap border bg-shark-400 rounded-lg border-shark-300 ${isOverRange ? 'block' : 'hidden'}`}
          >
            {' '}
            {isInRangeAux ? 'In range' : 'Out of range'}{' '}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-shark-100 text-xs font-normal">Min Price</div>
          <span className="!py-1 px-4 text-xs text-white whitespace-nowrap border border-solid bg-shark-400 hover:bg-button-primary cursor-default rounded-lg bg-opacity-40 border-shark-300">
            {formatCurrency(minPrice, 2)}$
          </span>
        </div>
        <div className="flex flex-col items-start">
          <div className="text-shark-100 text-xs font-normal">Max Price</div>
          <span className="!py-1 px-4 text-xs text-white whitespace-nowrap border border-solid bg-shark-400 hover:bg-button-primary cursor-default rounded-lg bg-opacity-40 border-shark-300">
            {formatCurrency(maxPrice, 2)}$
          </span>
        </div>
      </div>
    )
  }

  const TvlTotal = ({ data }: any) => {
    const ichitokens = useIchiVaultsData(data.liquidity === 'ichi' ? data?.id : zeroAddress)
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
  const InWalletTotal = ({ data }: any) => {
    const ichitokens = useIchiVaultsData(data.liquidity === 'ichi' ? data?.id : zeroAddress)
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
  const EmissionsTotal = ({ data }: any) => {
    const ichitokens = useIchiVaultsData(data.liquidity === 'ichi' ? data?.id : zeroAddress)
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
  console.log('pagination >> ', pagination)
  return (
    <>
      <div className="relative hidden xl:block z-10 xl:mb-5 w-full">
        <div className="w-full">
          <TableHead
            items={[
              { text: 'Your Positions', className: 'text-left w-[23%]', sortable: false },
              { text: 'Point Stack', className: 'text-left w-[10%]', sortable: false },
              // { text: 'Status', className: 'text-left w-[15%]', sortable: false },
              { text: 'Range', className: 'text-left w-[14%]', sortable: false },
              { text: 'APR', className: 'text-right w-[12%]', sortable: false },
              { text: 'TVL', className: 'text-right w-[8%]', sortable: false },
              { text: 'In Wallet', className: 'text-right w-[8%]', sortable: false },
              { text: 'Emissions', className: 'text-right w-[8%]', sortable: false },
              { text: 'Action', className: 'text-right w-[17%]', sortable: false },
            ]}
            setSort={() => {}}
            setSortIndex={() => {}}
            sort={'normal'}
            sortIndex={1}
          />

          {data && data?.length > 0 ? (
            <>
              <TableBody>
                {pagination.map((position: positions) => {
                  // console.log('each', isInRange, position)
                  // eslint-disable-next-line react-hooks/rules-of-hooks

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
                  const campaign = totalCampaigns.find(
                    (add) => add.pairAddress.toLowerCase() === position.pool.id.toLowerCase()
                  )
                  return (
                    <>
                      <TableRow key={position.id}>
                        <TableCell className="flex w-[23%]">
                          <div className="flex items-center w-full gap-2">
                            <div className="flex items-center min-w-[38px] max-2xl:w-[50px]">
                              <Image
                                src={`/static/images/tokens/${position.token0.symbol}.svg`}
                                alt="token"
                                className="rounded-full w-7 h-7 hover:z-20 z-10 transition-all hover:scale-[1.10]"
                                width={30}
                                height={30}
                              />
                              <Image
                                src={`/static/images/tokens/${position.token1.symbol}.svg`}
                                alt="token"
                                className="-ml-4 rounded-full w-7 h-7 hover:z-20 z-10 transition-all hover:scale-[1.10]"
                                width={30}
                                height={30}
                              />
                            </div>
                            <div className="flex flex-col gap-1 max-2xl:max-w-[85%] 2xl:max-w-full">
                              <h5 className="text-sm text-white font-semibold leading-none">
                                {position.token0.symbol} / {position.token1.symbol}
                              </h5>
                              <div className="flex items-center gap-1 h-[26px]">
                                <span className="py-1 px-2 h-[1.875rem] max-w-[95%] flex flex-col justify-center text-xs button-primary rounded-lg">
                                  <span className='truncate'>Concentrated</span>
                                </span>
                                <span className="!py-1 px-3  h-[1.875rem] flex flex-col justify-center text-xs text-white border border-solid bg-shark-400 hover:bg-button-primary cursor-default rounded-lg bg-opacity-40 border-shark-300">
                                  {formatAmount(toBN(position.pool.fee).div(10000), 3)}%
                                </span>
                                <span className="!py-0 px-3 h-[1.875rem] text-lg text-white border border-solid bg-shark-400 hover:bg-button-primary cursor-default rounded-lg bg-opacity-40 border-shark-300">
                                  <span className="icon-info"></span>
                                </span>
                              </div>
                              <span
                                className={`!py-1 px-3 h-[1.875rem] flex flex-col justify-center items-center text-xs text-white border border-solid bg-shark-400 hover:bg-button-primary cursor-default rounded-lg bg-opacity-40 border-shark-300 ${totalCampaigns.find((add) => add.pairAddress.toLowerCase() == position.pool.id.toLowerCase())?.multiplier ? 'block' : 'hidden'}`}
                              >
                                {
                                  totalCampaigns.find(
                                    (add) => add.pairAddress.toLowerCase() == position.pool.id.toLowerCase()
                                  )?.multiplier
                                }
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="flex w-[10%]">
                          {/* Point Stack */}
                          <div className="flex  justify-center items-center gap-2 ">
                            {
                              <span ref={hoverRef} className="flex gap-2">
                                <span
                                  ref={hoverRef}
                                  className={`flex items-center relative ${openTooltipGold ? 'z-[100]' : 'z-0'}`}
                                >
                                  {totalCampaigns.find(
                                    (add) => add.pairAddress.toLowerCase() == position.pool.id.toLowerCase()
                                  ) && (
                                    <div className="relative flex items-center">
                                      {campaign?.pointStack?.map((stack, index) => (
                                        <Image
                                          key={index}
                                          src={`/static/images/point-stack/${stack}.svg`}
                                          alt="token"
                                          className={`${stack === 'blast-gold' && 'rounded-full shadow-yellow-glow motion-safe:animate-notification'} ${openTooltipGold || openTooltipEigenLayer || openTooltipKelpMiles || openTooltipTurtleClub ? 'z-[100]' : 'z-0'}`}
                                          width={20}
                                          height={20}
                                          onMouseEnter={() => {
                                            if (stack === 'blast-gold') {
                                              setId(position.id)
                                              setOpenTooltipGold(true)
                                            }
                                            if (stack === 'eigen-layer') {
                                              setId(position.id)
                                              setOpenTooltipEigenLayer(true)
                                            }
                                            if (stack === 'kelp-miles') {
                                              setId(position.id)
                                              setOpenTooltipKelpMiles(true)
                                            }
                                            if (stack === 'turtle-club') {
                                              setId(position.id)
                                              setOpenTooltipTurtleClub(true)
                                            }
                                          }}
                                          onMouseLeave={() => {
                                            if (openTooltipGold) {
                                              setId('')
                                              setOpenTooltipGold(false)
                                            }
                                            if (openTooltipEigenLayer) {
                                              setId('')
                                              setOpenTooltipEigenLayer(false)
                                            }
                                            if (openTooltipKelpMiles) {
                                              setId('')
                                              setOpenTooltipKelpMiles(false)
                                            }
                                            if (openTooltipTurtleClub) {
                                              setId('')
                                              setOpenTooltipTurtleClub(false)
                                            }
                                          }}
                                        />
                                      ))}
                                      {openTooltipGold && position.id === id && (
                                        <div className="absolute left-[-25px] xl:left-auto max-xl:top-[5px] xl:top-0 z-50">
                                          <div className="relative z-[1000] bg-shark-950 rounded-lg border border-shark-300 w-[150px] xl:w-[200px] top-9 px-5 py-3 left-0 xl:-left-12 gap-y-1">
                                            <p className="text-xs">
                                              This pool will receive {campaign?.blastGoldAmount} of Blast Gold till the
                                              25th June
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                      {openTooltipEigenLayer && position.id === id && (
                                        <div className="absolute left-[-25px] xl:left-auto max-xl:top-[5px] xl:top-0 z-50">
                                          <div className="relative z-[1000] bg-shark-950 rounded-lg border border-shark-300 w-[150px] xl:w-[200px] top-9 px-5 py-3 left-0 xl:-left-12 gap-y-1">
                                            <p className="text-xs">
                                              Eigenlayer points will be distributed to liquidity providers in this pool
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                      {openTooltipKelpMiles && position.id === id && (
                                        <div className="absolute left-[-25px] xl:left-auto max-xl:top-[5px] xl:top-0 z-50">
                                          <div className="relative z-[1000] bg-shark-950 rounded-lg border border-shark-300 w-[150px] xl:w-[200px] top-9 px-5 py-3 left-0 xl:-left-12 gap-y-1">
                                            <p className="text-xs">
                                              wrsETH liquidity providers will earn 1x Kelp Miles from this pool
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                      {openTooltipTurtleClub && position.id === id && (
                                        <div className="absolute left-[-25px] xl:left-auto max-xl:top-[5px] xl:top-0 z-50">
                                          <div className="relative z-[1000] bg-shark-950 rounded-lg border border-shark-300 w-[150px] xl:w-[200px] top-9 px-5 py-3 left-0 xl:-left-12 gap-y-1">
                                            <p className="text-xs">
                                              Deposit liquidity to receive a 25% Turtle Points boost from Fenix Rings
                                              earned
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </span>
                              </span>
                            }
                          </div>
                        </TableCell>
                        <TableCell className="w-[14%]">
                          {/* Range */}
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
                        <TableCell className="w-[12%] flex justify-end">
                          {/* APR */}
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
                        <TableCell className="w-[8%] flex justify-end">
                          {/* TVL */}
                          <div className="flex flex-col justify-center items-end">
                            <TvlTotal data={position} />

                            <span className="flex items-center justify-end text-right gap-2 font-normal text-xs text-shark-100">
                              {formatCurrency(formatAmount(toBN(Number(position.depositedToken0)), 6))}{' '}
                              {position.token0.symbol}
                            </span>

                            <span className="flex items-center justify-end text-right gap-2 font-normal text-xs text-shark-100">
                              {formatCurrency(formatAmount(toBN(Number(position.depositedToken1)), 6))}{' '}
                              {position.token1.symbol}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="w-[8%] flex justify-end">
                          {/* In Wallet */}
                          <div className="flex flex-col justify-center items-end">
                            <InWalletTotal data={position} />

                            <span className="flex items-center justify-end text-right gap-2 font-normal text-xs text-shark-100">
                              {formatCurrency(formatAmount(toBN(Number(position.depositedToken0)), 6))}{' '}
                              {position.token0.symbol}
                            </span>

                            <span className="flex items-center justify-end text-right gap-2 font-normal text-xs text-shark-100">
                              {formatCurrency(formatAmount(toBN(Number(position.depositedToken1)), 6))}{' '}
                              {position.token1.symbol}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="w-[8%] flex justify-end">
                          {/* Emissions */}
                          <div className="flex flex-col justify-center items-end">
                            <EmissionsTotal data={position} />

                            <span className="flex items-center justify-end text-right gap-2 font-normal text-xs text-shark-100">
                              {formatCurrency(formatAmount(toBN(Number(position.depositedToken0)), 6))}{' '}
                              {position.token0.symbol}
                            </span>

                            <span className="flex items-center justify-end text-right gap-2 font-normal text-xs text-shark-100">
                              {formatCurrency(formatAmount(toBN(Number(position.depositedToken1)), 6))}{' '}
                              {position.token1.symbol}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="w-[17%] flex justify-end">
                          {/* Action */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="tertiary"
                              className="h-[38px] w-[80px] bg-opacity-40 flex items-center gap-1 justify-center"
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
                              <span className="icon-manage" />
                              <span className="text-xs">Manage</span>
                            </Button>
                            {position.liquidity !== 'ichi' ? (
                              <>
                                <Button
                                  variant="tertiary"
                                  className="h-[38px] w-[80px] bg-opacity-40 flex items-center gap-1 justify-center"
                                  onClick={() => {
                                    if (position.liquidity !== 'ichi') {
                                      handleClaim(position.id)
                                    }
                                  }}
                                >
                                  <span className="icon-coin" />
                                  <span className="text-xs">Claim</span>
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
