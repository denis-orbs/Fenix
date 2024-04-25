'use client'
import { useEffect, useRef, useState } from 'react'
import Strategy from '@/src/components/Dashboard/MyStrategies/Strategy'
import StrategyMobile from './StrategyMobile'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperCore } from 'swiper'
import 'swiper/css'
import WithdrawFunds from '@/src/components/Modals/WithdrawFunds'
import DuplicateStrategy from '@/src/components/Modals/DuplicateStrategy'
import PauseStrategy from '@/src/components/Modals/PauseStrategy'
import ManageNotifications from '@/src/components/Modals/ManageNotifications'
import DeleteStrategy from '@/src/components/Modals/DeleteStrategy'
import OPTIONS_STRATEGIES from './data'
import INFO_API from '../data'
import { useAccount } from 'wagmi'
import { fetchV3Positions } from '@/src/state/liquidity/reducer'
import { Address } from 'viem'
import { positions } from '@/src/components/Dashboard/MyStrategies/Strategy'
import { useIchiPositions } from '@/src/library/hooks/web3/useIchi'
import { SupportedChainId, SupportedDex, getIchiVaultInfo } from '@ichidao/ichi-vaults-sdk'
import { getPositionData, getPositionDataByPoolAddresses } from '@/src/library/hooks/liquidity/useCL'
import { Token, fetchTokens } from '@/src/library/common/getAvailableTokens'

const MyStrategies = () => {
  const swiperRef = useRef<SwiperCore | null>(null)
  const [modalSelected, setModalSelected] = useState('delete')
  const [openModal, setOpenModal] = useState(false)
  const [position, setposition] = useState<positions[]>([])
  const [positionAmounts, setpositionAmounts] = useState<any>([])
  const [tokens, setTokens] = useState<Token[]>([])

  const tokensprice = async () => {
    setTokens(await fetchTokens())
  }
  useEffect(() => {
    tokensprice()
  }, [])
  // type ModalList = {
  //   [key: string]: JSX.Element
  // }

  // const MODAL_LIST: ModalList = {
  //   notifications: <ManageNotifications openModal={openModal} setOpenModal={setOpenModal} />,
  //   withdraw: <WithdrawFunds openModal={openModal} setOpenModal={setOpenModal} />,
  //   duplicate: <DuplicateStrategy openModal={openModal} setOpenModal={setOpenModal} />,
  //   deposit: <DeleteStrategy openModal={openModal} setOpenModal={setOpenModal} />,
  //   pause: <PauseStrategy openModal={openModal} setOpenModal={setOpenModal} />,
  //   delete: <DeleteStrategy openModal={openModal} setOpenModal={setOpenModal} />,
  // }

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
    // console.log(positions, 'amount')
    const positionsPoolAddresses = await positions.map((position: any) => {
      return {
        id: position.pool.id,
        liq: position.liquidity,
        lower: position.tickLower.tickIdx,
        higher: position.tickUpper.tickIdx,
      }
    })
    const amounts: any = await getPositionDataByPoolAddresses(positionsPoolAddresses)

    const final = positions.map((position: positions, index: number) => {
      // console.log(Number(amounts[index][0]) / 10 ** Number(position.token0.decimals), 'hehehe')
      return {
        ...position,
        depositedToken0: Number(amounts[index][0]) / 10 ** Number(position.token0.decimals), // Assigning amount0 to depositedToken0
        depositedToken1: Number(amounts[index][1]) / 10 ** Number(position.token1.decimals), // Assigning amount1 to depositedToken1
      }
    })
    // console.log('multicall amounts', positions, amounts, final)
    setposition(final)
    setpositionAmounts(amounts)
  }

  useEffect(() => {
    if (address) fetchpositions(address)
  }, [address])

  const ichipositions = useIchiPositions()

  useEffect(() => {
    if (ichipositions.length > 0) {
      setposition((prevPositions) => [...prevPositions, ...ichipositions])
    }
  }, [ichipositions])

  return (
    <>
      {position.length !== 0 ? (
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
      ) : (
        <div className="flex flex-col  gap-3 w-full lg:w-4/5 mt-10 mx-auto">
          <div className="text-white flex justify-between items-center">
            <p className="flex gap-3 text-lg ms-2">My Positions</p>
          </div>
          <div className="box-dashboard p-6 flex gap-8 items-center ">
            <p className="text-white text-sm">You have no positions.</p>
          </div>
        </div>
      )}
    </>
  )
}

export default MyStrategies
