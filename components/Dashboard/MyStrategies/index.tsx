'use client'

import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Strategy from '@/components/Dashboard/MyStrategies/Strategy'
import StrategyMobile from './StrategyMobile'
import type { Swiper as SwiperCore } from 'swiper'
import 'swiper/css'
import WithdrawFunds from '@/components/Modals/WithdrawFunds'
import DuplicateStrategy from '@/components/Modals/DuplicateStrategy'
import PauseStrategy from '@/components/Modals/PauseStrategy'
import ManageNotifications from '@/components/Modals/ManageNotifications'
import DeleteStrategy from '@/components/Modals/DeleteStrategy'
import OPTIONS_STRATEGIES from './data'

const MyStrategies = () => {
  const swiperRef = useRef<SwiperCore | null>(null)
  const [modalSelected, setModalSelected] = useState('delete')
  const [openModal, setOpenModal] = useState(false)
  const MYSTRATEGIES_INFO_API = ["TEST"]
  type ModalList = {
    [key: string]: JSX.Element
  }

  const MODAL_LIST: ModalList = {
    notifications: <ManageNotifications openModal={openModal} setOpenModal={setOpenModal} />,
    withdraw: <WithdrawFunds openModal={openModal} setOpenModal={setOpenModal} />,
    duplicate: <DuplicateStrategy openModal={openModal} setOpenModal={setOpenModal} />,
    deposit: <DeleteStrategy openModal={openModal} setOpenModal={setOpenModal} />,
    pause: <PauseStrategy openModal={openModal} setOpenModal={setOpenModal} />,
    delete: <DeleteStrategy openModal={openModal} setOpenModal={setOpenModal} />,
  }

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
    <>
      {MYSTRATEGIES_INFO_API.length !== 0 ? (
        <div className="relative">
          <h4 className="text-lg text-white mb-4">My Strategies</h4>
          <div
            className="dashboard-box mb-10 hidden xl:block 
  "
          >
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              navigation={true}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {Array.from({ length: 5 }).map((_, index) => {
                return (
                  <>
                    <SwiperSlide key={index}>
                      <Strategy
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
              <span className="icon-arrow rotate-180 text-white text-2xl cursor-pointer" onClick={slideToLeft}></span>
              <span className="icon-arrow  text-white text-2xl cursor-pointer" onClick={slideToRight}></span>
            </div>
          </div>
          <div className="dashboard-box mb-10 block xl:hidden">
            <div className="">
              <StrategyMobile
                options={OPTIONS_STRATEGIES}
                setOpenModal={setOpenModal}
                setModalSelected={setModalSelected}
              />
            </div>
          </div>
          {MODAL_LIST[modalSelected]}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default MyStrategies
