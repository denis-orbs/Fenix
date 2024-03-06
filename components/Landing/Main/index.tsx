'use client'
/* eslint-disable react/no-multi-comp */
import { Button } from '@/components/UI'
import { Michroma } from 'next/font/google'
import Image from 'next/image'
import Decorator from '@/components/Common/Layout/BackgroundLanding'
import useStore from '@/store'
import Blast from '@/components/UI/Icons/Blast'
import { useState } from 'react'

const michroma = Michroma({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const Box = ({ text }: { text: string }) => {
  return (
    <div className="w-[369px] h-[123px] flex flex-col items-center justify-center main-header-box">
      <div className="text-transparent bg-button-primary-hover bg-clip-text text-lg leading-normal tracking-[4.86px] font-semibold mb-[5px]">
        COMING SOON
      </div>
      <div className="text-base font-light text-white">{text}</div>
    </div>
  )
}

const Main = () => {
  const isConnected = useStore((state) => state.isConnected)
  const { setWalletSelectionModal } = useStore()
  const [isHover, setIsHover] = useState(false)

  const handleIsHoverActive = () => setIsHover(true)
  const handleIsHoverInactive = () => setIsHover(false)

  const handlerConnectWallet = () => setWalletSelectionModal(true)

  return (
    <div className="">
      <Decorator />
      <div className="relative overflow-hidden top-[-170px] pt-[170px]">
        <div className="container">
          <div className="flex max-xl:flex-col">
            <div className="xl:pl-[50px] pt-[14px] max-w-[345px] md:max-w-[670px] max-xl:mx-auto mr-auto mb-[20px] xl:mb-[400px] mt-5 md:mt-20 xl:my-[150px] 2xl:mt-[250px] 2xl:mb-[491px] max-xl:text-center shrink-0">
              <div className="text-base md:text-lg text-shark-100 leading-normal mb-2">Welcome to Fenix Finance</div>
              <div className={`text-white text-base md:text-[32px] leading-[139%] mb-[21px] ${michroma.className}`}>
                THE UNIFIED TRADING AND <span className="text-gradient">LIQUIDITY MARKETPLACE </span>
                <span className="flex items-center justify-center xl:justify-start xl:items-end gap-3">
                  FOR
                  <span className="svgcontainer pt-2 " onMouseOut={handleIsHoverInactive} onMouseOver={handleIsHoverActive}>
                    <Blast isHover={isHover} />
                  </span>
                </span>
              </div>

              {!isConnected && (
                <Button className="w-[112px] h-[44px] md:w-[123px] md:h-[41px] !text-sm !py-2.5 !px-0 max-xl:mx-auto">
                  <span>
                    Launch App
                  </span>
                </Button>
              )}
            </div>

            <div className="relative w-full">
              <Image
                src="/static/images/landing/main/bg.png"
                width={2292}
                height={1359}
                alt="main-bg"
                className="relative xl:absolute -z-10 top-0 left-1/2 max-xl:-translate-x-1/2 xl:top-[-100px] 2xl:top-[-32px] xl:left-[-123px] min-w-[1480px] object-contain max-md:min-w-[556.986px] max-2xl:min-w-[1000px] max-xl:object-contain"
              />
              <div className="absolute max-xl:left-0 max-xl:top-0 max-xl:right-0 max-xl:bottom-0  xl:w-[1000px] xl:h-[701.41px]  xl:top-[-100px] xl:left-[-123px] 2xl:w-[1480px] 2xl:h-[1037.8px] 2xl:top-[-32px] pointer-events-none select-none">
                <video width={733} height={560} loop playsInline autoPlay muted className="absolute z-10 mix-blend-lighten left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full">
                  <source src="/static/videos/fenix.mp4" type="video/mp4"></source>
                </video>
              </div>
            </div>
          </div>

          <div className="flex gap-6 justify-center flex-wrap px-5">
            <Box text="Total Value Locked" />
            <Box text="Annualized Volume" />
            <Box text="Annualized Fees" />
            <Box text="Active Users" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
