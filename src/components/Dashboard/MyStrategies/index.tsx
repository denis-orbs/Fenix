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
  const [positionAmounts, setpositionAmounts] = useState<any>([])
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<number>(0)

  const tokensprice = async () => {
    setTokens(await fetchTokens())
  }
  useEffect(() => {
    tokensprice()
  }, [])

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

  const ichipositions = useIchiPositions()
  useEffect(() => {
    setLoading(true)
    if (ichipositions.length > 0) {
      setposition(ichipositions)
      setLoading(false)
    }
  }, [ichipositions])

  useEffect(() => {
    // FIXME: STARK
    dispatch(setApr(position))
  }, [position, dispatch])

  return (
    <>
      {/* {console.log('finalp', position)} */}
      {position.length !== 0 && loading === false && address ? (
        <div className="relative">
          <div className="flex items-center w-[100%] mb-4 justify-between">
            <h2 id="strategies" className="text-lg text-white">
              My Strategies
            </h2>
            <Button variant="tertiary" className="!py-3 xl:me-5 !text-xs !lg:text-sm" href="/liquidity">
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
              {Array.from({ length: position.length }).map((_, index) => {
                return (
                  <>
                    <SwiperSlide key={index}>
                      <Strategy
                        row={position[index]}
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
            {position?.length >= 3 && (
              <div className="flex gap-2 justify-center">
                <span
                  className={`icon-arrow-left ${progress <= 0 ? 'text-shark-400 cursor-not-allowed' : 'text-white cursor-pointer'} text-2xl`}
                  onClick={slideToLeft}
                ></span>
                <span
                  className={`icon-arrow-right text-2xl ${progress >= 1 ? 'text-shark-400 cursor-not-allowed' : 'text-white cursor-pointer'}`}
                  onClick={slideToRight}
                ></span>
              </div>
            )}
          </div>
          <div className="dashboard-box mb-10 block xl:hidden">
            <div className="">
              {Array.from({ length: position.length }).map((_, index) => {
                return (
                  <>
                    <SwiperSlide key={index}>
                      <StrategyMobile
                        row={position[index]}
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
      ) : (position.length === 0 && loading === false) || address === undefined ? (
        <div className="flex flex-col  gap-3 w-full lg:w-4/5 mt-10 mx-auto">
          <div className="text-white flex justify-between items-center">
            <p className="flex gap-3 text-lg ms-2">My Positions</p>
          </div>
          <div className="box-dashboard p-6 flex gap-8 items-center ">
            <p className="text-white text-sm">You have no positions.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col  gap-3 w-full lg:w-4/5 mt-10 mx-auto">
          <div className="text-white flex justify-between items-center">
            <p className="flex gap-3 text-lg ms-2">My Positions</p>
          </div>
          <div className="box-dashboard p-6 flex gap-8 justify-center items-center ">
            <p className="text-white text-sm flex items-center gap-3">
              <Spinner /> Loading
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default MyStrategies
