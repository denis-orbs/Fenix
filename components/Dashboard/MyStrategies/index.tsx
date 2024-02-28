/* eslint-disable max-len */
'use client'
// import { Swiper, SwiperSlide } from 'swiper/react'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/UI'
import OPTIONS_STRATEGIES from './data'
import Strategy from '@/components/Dashboard/MyStrategies/Strategy'

// import 'swiper/css'
// import 'swiper/css/pagination'

const MyStrategies = () => {
  const [isOpenItemsPerPage, setIsOpenItemsPerPage] = useState(false)
  return (
    <div className="relative">
      <h4 className="text-lg text-white mb-4">My Strategies</h4>
      <div className="dashboard-box mb-10">
        <div className="grid grid-cols-3 gap-8">
          <Strategy />
          <Strategy />
          <Strategy />
        </div>
      </div>
    </div>
  )
}

export default MyStrategies
