'use client'
import { useEffect, useRef, useState } from 'react'
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

const MyStrategies = () => {
  const swiperRef = useRef<SwiperCore | null>(null)
  const [modalSelected, setModalSelected] = useState('delete')
  const [openModal, setOpenModal] = useState(false)
  const [position, setposition] = useState<positions[]>([])
  const [positionAmounts, setpositionAmounts] = useState<any>([])
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(false)

  const tokensprice = async () => {
    setTokens(await fetchTokens())
  }
  useEffect(() => {
    tokensprice()
  }, [])

  const slideToLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }
  const slideToRight = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }
  const { address } = useAccount()

  const fetchpositions = async (address: Address) => {
    const positions = await fetchV3Positions(address)
    const nativePrice = await fetchNativePrice()
    console.log(positions, 'amount')
    const positionsPoolAddresses = await positions.map((position: positions) => {
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
      console.log(Number(amounts[index][0]) / 10 ** Number(position.token0.decimals), 'hehehe')
      return {
        ...position,
        depositedToken0: Number(amounts[index][0]) / 10 ** Number(position.token0.decimals), // Assigning amount0 to depositedToken0
        depositedToken1: Number(amounts[index][1]) / 10 ** Number(position.token1.decimals), // Assigning amount1 to depositedToken1
        apr: isNaN(aprs[index]) ? '0.00 %' : aprs[index].toFixed(2) + ' %',
      }
    })
    console.log('multicall amounts', positions, amounts, final)
    setposition((prevPositions) => [...prevPositions, ...final])
    setpositionAmounts(amounts)
    setLoading(false)
  }

  useEffect(() => {
    if (address) fetchpositions(address)
    setLoading(true)
  }, [address])

  const ichipositions = useIchiPositions()

  useEffect(() => {
    setLoading(true)
    if (ichipositions.length > 0) {
      console.log('ichipos', ichipositions)
      setposition((prevPositions) => [...prevPositions, ...ichipositions])
      setLoading(false)
    }
  }, [ichipositions])

  return (
    <>
      {console.log('finalp', position)}
      {position.length !== 0 && loading === false && address ? (
        <div className="relative">
          <h4 className="text-lg text-white mb-4">My Positions</h4>
          <div className="dashboard-box mb-10 hidden xl:block">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              navigation={true}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
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
            <div className="flex gap-2 justify-center">
              <span
                className="icon-arrow rotate-180 text-shark-400 text-2xl cursor-pointer"
                onClick={slideToLeft}
              ></span>
              <span className="icon-arrow  text-white text-2xl cursor-pointer" onClick={slideToRight}></span>
            </div>
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
