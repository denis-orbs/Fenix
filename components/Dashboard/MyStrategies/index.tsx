'use client'

import { Button } from '@/components/UI'
import StepBox from '@/components/Common/Boxes/StepBox'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

// import './styles.css'

const MyStrategies = () => {
  return (
    <div className="dashboard-box mb-10">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        // modules={[Pagination]}
        className="flex gap-10"
      >
        <SwiperSlide>
          <div className="steps-box w-auto min-w-auto">
            <div className="min-h-[400px]">
              <div className="relative text-white">HERODES</div>
              <div className="border border-shark-400 rounded-lg">
                <div className="relative text-white flex items-center justify-center border-b border-shark-400">
                  <div className="flex items-start flex-col p-4 w-1/2">
                    <h4 className="text-sm text-green-400">Buy ETH</h4>
                    <h4 className="text-sm text-white">500.00 USDC</h4>
                    <p className="text-xs text-white">$501.10</p>
                  </div>
                  <div className="flex items-start flex-col p-4 w-1/2 border-l border-shark-400">
                    <h4 className="text-sm text-red-500">Buy ETH</h4>
                    <h4 className="text-sm text-white">0.00 USDC</h4>
                    <p className="text-xs text-white">$0.00</p>
                  </div>
                </div>
                <div className="h-[100px]">content</div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="steps-box w-auto min-w-auto">
            <div className="min-h-[400px]">
              <div className="relative text-white">HERODES</div>
              <div className="border border-shark-400 rounded-lg">
                <div className="relative text-white flex items-center justify-center border-b border-shark-400">
                  <div className="flex items-start flex-col p-4 w-1/2">
                    <h4 className="text-sm text-green-400">Buy ETH</h4>
                    <h4 className="text-sm text-white">500.00 USDC</h4>
                    <p className="text-xs text-white">$501.10</p>
                  </div>
                  <div className="flex items-start flex-col p-4 w-1/2 border-l border-shark-400">
                    <h4 className="text-sm text-red-500">Buy ETH</h4>
                    <h4 className="text-sm text-white">0.00 USDC</h4>
                    <p className="text-xs text-white">$0.00</p>
                  </div>
                </div>
                <div className="h-[100px]">content</div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="steps-box w-auto min-w-auto">
            <div className="min-h-[400px]">
              <div className="relative text-white">HERODES</div>
              <div className="border border-shark-400 rounded-lg">
                <div className="relative text-white flex items-center justify-center border-b border-shark-400">
                  <div className="flex items-start flex-col p-4 w-1/2">
                    <h4 className="text-sm text-green-400">Buy ETH</h4>
                    <h4 className="text-sm text-white">500.00 USDC</h4>
                    <p className="text-xs text-white">$501.10</p>
                  </div>
                  <div className="flex items-start flex-col p-4 w-1/2 border-l border-shark-400">
                    <h4 className="text-sm text-red-500">Buy ETH</h4>
                    <h4 className="text-sm text-white">0.00 USDC</h4>
                    <p className="text-xs text-white">$0.00</p>
                  </div>
                </div>
                <div className="h-[100px]">content</div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="steps-box w-auto min-w-auto">
            <div className="min-h-[400px]">
              <div className="relative text-white">HERODES</div>
              <div className="border border-shark-400 rounded-lg">
                <div className="relative text-white flex items-center justify-center border-b border-shark-400">
                  <div className="flex items-start flex-col p-4 w-1/2">
                    <h4 className="text-sm text-green-400">Buy ETH</h4>
                    <h4 className="text-sm text-white">500.00 USDC</h4>
                    <p className="text-xs text-white">$501.10</p>
                  </div>
                  <div className="flex items-start flex-col p-4 w-1/2 border-l border-shark-400">
                    <h4 className="text-sm text-red-500">Buy ETH</h4>
                    <h4 className="text-sm text-white">0.00 USDC</h4>
                    <p className="text-xs text-white">$0.00</p>
                  </div>
                </div>
                <div className="h-[100px]">content</div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default MyStrategies
