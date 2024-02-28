/* eslint-disable max-len */
'use client'
import 'swiper/css'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Strategy from '@/components/Dashboard/MyStrategies/Strategy'
import StrategyMobile from './StrategyMobile'
import type { Swiper as SwiperCore } from 'swiper'

const MyStrategies = () => {
  const swiperRef = useRef<SwiperCore | null>(null)
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
                <Strategy />
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
          <StrategyMobile />
          <StrategyMobile />
        </div>
      </div>
    </div>
  )
}

export default MyStrategies
