'use client'
import { useRef, useState } from 'react'
import Strategy from '@/components/Dashboard/MyStrategies/Strategy'
import StrategyMobile from './StrategyMobile'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperCore } from 'swiper'
import 'swiper/css'
import WithdrawFunds from '@/components/Modals/WithdrawFunds'
import DuplicateStrategy from '@/components/Modals/DuplicateStrategy'
import PauseStrategy from '@/components/Modals/PauseStrategy'
import ManageNotifications from '@/components/Modals/ManageNotifications'
import DeleteStrategy from '@/components/Modals/DeleteStrategy'
import OPTIONS_STRATEGIES from './data'
import INFO_API from '../data'

const MyStrategies = () => {
  const swiperRef = useRef<SwiperCore | null>(null)
  const [modalSelected, setModalSelected] = useState('delete')
  const [openModal, setOpenModal] = useState(false)
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
      {INFO_API.length !== 0 ? (
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
              <span className="icon-arrow rotate-180 text-shark-400 text-2xl cursor-pointer" onClick={slideToLeft}></span>
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
        <div className="flex flex-col  gap-3 w-full lg:w-4/5 mt-10 mx-auto">
          <div className="text-white flex justify-between items-center">
            <p className="flex gap-3 text-lg ms-2">
              My Strategies 
            </p>
          </div>
          <div className="box-dashboard p-6 flex gap-8 items-center ">
            <p className="text-white text-sm">You have not created strategies.</p>
          </div>
        </div>
      )}
    </>
  )
}

export default MyStrategies
