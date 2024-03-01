'use client'

import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Strategy from '@/components/Dashboard/MyStrategies/Strategy'
import StrategyMobile from './StrategyMobile'
import type { Swiper as SwiperCore } from 'swiper'
import 'swiper/css'
import WithdrawFunds from '@/components/Modals/WithdrawFunds'
import PauseStrategy from '@/components/Modals/PauseStrategy'
import ManageNotifications from '@/components/Modals/ManageNotifications'
import DeleteStrategy from '@/components/Modals/DeleteStrategy'
import OPTIONS_STRATEGIES from './data'

const MyStrategies = () => {
  const swiperRef = useRef<SwiperCore | null>(null)
  const [id, setID] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const MODALS = [
    {
      id: 2,
      modal: <ManageNotifications openModal={openModal} setOpenModal={setOpenModal} />,
    },
    {
      id: 4,
      modal: <WithdrawFunds openModal={openModal} setOpenModal={setOpenModal} />,
    },
  ]
  const MODALS_FILTER = MODALS.filter((modal) => modal.id === id)
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

  return (
    <div className="relative">
      <h4 className="text-lg text-white mb-4">My Strategies</h4>
      <div className="dashboard-box mb-10 hidden xl:block">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          navigation={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <SwiperSlide key={index}>
                <Strategy Options={OPTIONS_STRATEGIES} setID={setID} setOpenModal={setOpenModal} />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="flex gap-2 justify-center">
          <span className="icon-arrow rotate-180 text-white text-2xl cursor-pointer" onClick={slideToLeft}></span>
          <span className="icon-arrow  text-white text-2xl cursor-pointer" onClick={slideToRight}></span>
        </div>
      </div>
      <div className="dashboard-box mb-10 block xl:hidden">
        <div className="">
          <StrategyMobile />
        </div>
      </div>

      {MODALS_FILTER.map((modal) => {
        return <div key={modal.id}>{modal.modal}</div>
      })}
    </div>
  )
}

export default MyStrategies
