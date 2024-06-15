'use client'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/src/components/UI'
import Strategy from '@/src/components/Dashboard/MyStrategies/Strategy'
import StrategyMobile from './StrategyMobile'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperCore } from 'swiper'
import 'swiper/css'
import OPTIONS_STRATEGIES from './data'
import { useAccount } from 'wagmi'
import { fetchNativePrice, fetchV3Positions } from '@/src/state/liquidity/reducer'
import { Address } from 'viem'
import { positions } from '@/src/components/Dashboard/MyStrategies/Strategy'
import { useIchiPositions } from '@/src/library/hooks/web3/useIchi'
import { getPositionDataByPoolAddresses } from '@/src/library/hooks/liquidity/useCL'
import { Token, fetchTokens } from '@/src/library/common/getAvailableTokens'
import { getPositionAPR } from '@/src/library/hooks/algebra/getPositionsApr'
import Spinner from '../../Common/Spinner'
import { useDispatch } from 'react-redux'
import { setApr } from '@/src/state/apr/reducer'

const MyStrategies = () => {
  const dispatch = useDispatch()
  const slidesPerView = 3
  const swiperRef = useRef<SwiperCore | null>(null)
  const [modalSelected, setModalSelected] = useState('delete')
  const [openModal, setOpenModal] = useState(false)
  const [position, setposition] = useState<positions[]>([])
  const [nonZeroPosition, setNonZeroposition] = useState<positions[]>([])
  const [positionAmounts, setpositionAmounts] = useState<any>([])
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const { chainId } = useAccount()

  // console.log(position)
  const tokensprice = async () => {
    if (chainId) setTokens(await fetchTokens(chainId))
  }
  useEffect(() => {
    tokensprice()
  }, [chainId])

  const slideToLeft = () => {
    if (swiperRef.current && progress > 0) {
      swiperRef.current.slidePrev()
      setProgress(swiperRef?.current?.progress)
    }
  }
  const slideToRight = () => {
    if (swiperRef.current && progress < 1) {
      swiperRef.current.slideNext()
      setProgress(swiperRef?.current?.progress)
    }
  }
  const { address } = useAccount()

  const fetchpositions = async (address: Address) => {
    const positions = await fetchV3Positions(address)
    const nativePrice = await fetchNativePrice()
    const positionsPoolAddresses = positions.map((position: positions) => {
      return {
        id: position.pool.id,
        liq: position.liquidity,
        lower: position.tickLower.tickIdx,
        higher: position.tickUpper.tickIdx,
      }
    })
    const amounts: any = await getPositionDataByPoolAddresses(positionsPoolAddresses)
    // TODO: Fetch APR for each position
    const aprs = await Promise.all(
      positions.map((position: positions, index: number) => {
        return getPositionAPR(position.liquidity, position, position.pool, position.pool.poolDayData, nativePrice)
      })
    )
    const final = positions.map((position: positions, index: number) => {
      // console.log(Number(amounts[index][0]) / 10 ** Number(position.token0.decimals), 'hehehe')
      return {
        ...position,
        depositedToken0: Number(amounts[index][0]) / 10 ** Number(position.token0.decimals), // Assigning amount0 to depositedToken0
        depositedToken1: Number(amounts[index][1]) / 10 ** Number(position.token1.decimals), // Assigning amount1 to depositedToken1
        apr: isNaN(aprs[index]) ? '0.00%' : aprs[index].toFixed(2) + '%',
      }
    })
    const finalSorted = final.sort((a, b) => (Number(a.id) < Number(b.id) ? 1 : -1))
    setposition((prevPositions) => [...prevPositions, ...finalSorted])
    setpositionAmounts(amounts)
    setLoading(false)
  }

  useEffect(() => {
    // if (address) fetchpositions(address)
    setLoading(true)
     // TODO: Remove This
    setTimeout(()=>{
      setLoading(false)
    },2000)
  }, [address])

  const ichipositions = useIchiPositions()
   useEffect(() => {
     setLoading(true)
     if (ichipositions.length > 0) {
       setposition(ichipositions)
      //  setposition((prevPositions) => [...prevPositions, ...ichipositions])
       setLoading(false)
     } else if (ichipositions.length === 0) {
       setLoading(false)
     }
   }, [ichipositions])

  useEffect(() => {
    // FIXME: STARK
    dispatch(setApr(position))
  }, [position, dispatch])

  useEffect(() => {
    if(tokens.length < 1) return;
    setNonZeroposition(position.filter((i) => {
      const tvl = 
      Number(i?.depositedToken0) *
        Number(
          tokens.find(
            (e) =>
              e.tokenAddress.toLowerCase() ===
              (i?.token0?.id.toLowerCase())
          )?.priceUSD
        ) +
        Number(i?.depositedToken1) *
          Number(
            tokens.find(
              (e) =>
                e.tokenAddress.toLowerCase() ===
                (i?.token1?.id.toLowerCase())
            )?.priceUSD
          );

      return tvl > 0.1
    }))
  }, [position, tokens])

  return (
    <>
      {/* {console.log('finalp', position)} */}
      {position.length !== 0 && loading === false && address ? (
        <div className="relative">
          <div className="mb-4 flex w-[100%] items-center justify-between">
            <h2 id="strategies" className="text-lg text-white">
              My Strategies
            </h2>
            <Button variant="tertiary" className="!lg:text-sm !py-3 !text-xs xl:me-5" href="/liquidity">
              <span className="icon-logout"></span>New strategy
            </Button>
          </div>
          <div className="dashboard-box mb-10 hidden xl:block">
            <Swiper
              spaceBetween={50}
              breakpoints={{
                1560: { slidesPerView: 3 },
                1480: { slidesPerView: 3 },
                1380: { slidesPerView: 2 },
                1200: { slidesPerView: 2 },
              }}
              slidesPerView={slidesPerView}
              navigation={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
                swiper.on('slideChangeTransitionEnd', () => {
                  if (swiperRef.current) {
                    setProgress(swiper.progress)
                  }
                })
              }}
              allowTouchMove={false}
            >
              {Array.from({ length: nonZeroPosition.length }).map((_, index) => {
                return (
                  <>
                    <SwiperSlide key={index}>
                      <Strategy
                        row={nonZeroPosition[index]}
                        tokens={tokens}
                        options={OPTIONS_STRATEGIES}
                        setModalSelected={setModalSelected}
                        setOpenModal={setOpenModal}
                      />
                    </SwiperSlide>
                  </>
                )
              })}
            </Swiper>
            {nonZeroPosition?.length >= 3 && (
              <div className="flex justify-center gap-2">
                <span
                  className={`icon-arrow-left ${progress <= 0 ? 'cursor-not-allowed text-shark-400' : 'cursor-pointer text-white'} text-2xl`}
                  onClick={slideToLeft}
                ></span>
                <span
                  className={`icon-arrow-right text-2xl ${progress >= 1 ? 'cursor-not-allowed text-shark-400' : 'cursor-pointer text-white'}`}
                  onClick={slideToRight}
                ></span>
              </div>
            )}
          </div>
          <div className="dashboard-box mb-10 block xl:hidden">
            <div className="">
              {Array.from({ length: nonZeroPosition.length }).map((_, index) => {
                return (
                  <>
                    <SwiperSlide key={index}>
                      <StrategyMobile
                        row={nonZeroPosition[index]}
                        tokens={tokens}
                        options={OPTIONS_STRATEGIES}
                        setOpenModal={setOpenModal}
                        setModalSelected={setModalSelected}
                      />
                    </SwiperSlide>
                  </>
                )
              })}
            </div>
          </div>
          {/* {MODAL_LIST[modalSelected]} */}
        </div>
      ) : (nonZeroPosition.length === 0 && loading === false) || address === undefined ? (
        <div className="mx-auto mt-10 flex w-full flex-col gap-3 lg:w-4/5">
          <div className="flex items-center justify-between text-white">
            <p className="ms-2 flex gap-3 text-lg">My Strategies</p>
          </div>
          <div className="box-dashboard flex items-center gap-8 p-6">
            <p className="text-sm text-white">You have no strategies.</p>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-10 flex w-full flex-col gap-3 lg:w-4/5">
          <div className="flex items-center justify-between text-white">
            <p className="ms-2 flex gap-3 text-lg">My Strategies</p>
          </div>
          <div className="box-dashboard flex items-center justify-center gap-8 p-6">
            <p className="flex items-center gap-3 text-sm text-white">
              <Spinner /> Loading
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default MyStrategies
