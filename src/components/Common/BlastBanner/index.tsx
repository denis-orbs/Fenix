'use client'
import { useState } from 'react'

import { Button } from '@/src/components/UI'
import Image from 'next/image'
import { useCloseBanner, useShowBanner } from '@/src/state/user/hooks'


const BlastBanner = () => {
  const showBanner = useShowBanner()
  const setCloseBanner = useCloseBanner()
  const [close, setClose] = useState<boolean>(showBanner)

  if (close) return null

  const handlerClose = () => {
    setCloseBanner(true)
    setClose((prevState) => !prevState)
  }

  return (
    <div className="blast-banner max-lg:flex-col overflow-hidden">
      <Image
        src={'/static/images/blast-point-banner/fenix-orbit.svg'}
        alt="fenix orbit"
        className="max-lg:hidden w-[68px] h-[68px] absolute top-0 xl:left-[600px] left-auto max-xl:right-[520px] z-[5]"
        width={10}
        height={10}
      />
      <Image
        src={'/static/images/blast-point-banner/fenix-orbit.svg'}
        alt="fenix orbit"
        className="lg:hidden w-[53px] h-[53px] absolute top-0 right-[30px] z-[5]"
        width={10}
        height={10}
      />
      <Image
        src={'/static/images/blast-point-banner/coins-line.svg'}
        alt="Coins"
        className="max-lg:hidden w-[270px] h-[99px] absolute top-0 xxl:left-[850px] left-auto max-xxl:right-[280px] z-[5]"
        width={10}
        height={10}
      />
      <Image
        src={'/static/images/blast-point-banner/coins-line-mobile.svg'}
        alt="Coins"
        className="lg:hidden w-[87px] h-[70px] absolute bottom-[10px] right-[10px] z-[5]"
        width={10}
        height={10}
      />
      <Image
        src={'/static/images/blast-point-banner/lingots.svg'}
        alt="Lingots"
        className="max-lg:hidden w-[156px] h-[120px] absolute top-0 right-[180px] z-[5]"
        width={10}
        height={10}
      />
      <div className="text-white absolute text-sm right-3 top-2 z-20 cursor-pointer" onClick={handlerClose}>
        <span className="icon-x"></span>
      </div>
      <div className="relative z-10 max-lg:max-w-[80%]">
        <p className="text-white text-xs">Deposit liquidty to earn your share of</p>
        <h4 className="text-gradient text-sm xs:text-base md:text-xl lg:text-2xl">
          Blast Gold, Blast Points and Fenix Rings
        </h4>
      </div>
      <Button variant="primary" className="relative z-10 max-lg:!px-2 max-lg:!py-1" href="/liquidity">
        <span>Deposit Now</span>
      </Button>
    </div>
  )
}

export default BlastBanner
