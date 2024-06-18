/* eslint-disable max-len */
'use client'
import { useState } from 'react'

import { Button } from '@/src/components/UI'
import Image from 'next/image'
import { useCloseBanner, useShowBanner } from '@/src/state/user/hooks'

const GoldRushBanner = () => {
  const showBanner = useShowBanner()
  const setCloseBanner = useCloseBanner()
  const [close, setClose] = useState<boolean>(false)

  if (close) return null

  const handlerClose = () => {
    // setCloseBanner(true)
    // setClose((prevState) => !prevState)
  }

  return (
    <div className="blast-banner max-lg:flex-col rounded-tl-[1.625rem] rounded-br-[1.625rem] rounded-tr-xl rounded-bl-xl">
      <Image src={'/static/images/blast-point-banner/noise-texture.svg'} alt='Noise Texture' className='max-lg:hidden w-[100%] h-[100%] absolute top-0 left0rem bottom-0 right-0 z-[5] rounded-tl-[1.625rem] rounded-br-[1.625rem] rounded-tr-xl rounded-bl-xl' width={10} height={10}/>
      <Image src={'/static/images/blast-point-banner/noise-texture-mobile.svg'} alt='Noise Texture Mobile' className='lg:hidden w-[100%] h-[100%] absolute top-0 left0rem bottom-0 right-0 z-[5] rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl' width={10} height={10}/>
      <Image src={'/static/images/blast-point-banner/cell.svg'} alt='Cell' className='max-lg:hidden w-[100%] h-[100%] absolute top-0 left0rem bottom-0 right-0 z-[5] rounded-tl-[1.625rem] rounded-br-[1.625rem] rounded-tr-xl rounded-bl-xl' width={10} height={10}/>
      <Image src={'/static/images/blast-point-banner/cell-mobile.svg'} alt='Cell Mobile' className='lg:hidden w-[100%] h-[100%] absolute top-0 left0rem bottom-0 right-0 z-[5] rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl' width={10} height={10}/>
    
      <Image src={'/static/images/gold-rush-banner/background-star.svg'} alt='Background Star' className='max-lg:hidden w-[573px] h-[423px] mix-blend-lighten absolute top-[-170px] left-[700px] z-[80]' width={10} height={10}/>
      <Image src={'/static/images/gold-rush-banner/background-star2.svg'} alt='Background Star' className='max-lg:hidden w-[573px] h-[423px] mix-blend-lighten absolute top-[-190px] left-[1150px] z-[80]' width={10} height={10}/>
      <Image src={'/static/images/gold-rush-banner/masive-star.svg'} alt='Background Star' className='max-lg:hidden w-[1135px] h-[786px] mix-blend-lighten absolute top-[-180px] left-[300px] z-[80] transform rotate-[-46.195deg]' width={10} height={10}/>
      {/* <Image src={'/static/images/blast-point-banner/orange-star.svg'} alt='Orange Star' className='max-lg:hidden w-[19.375rem] h-[14.25rem] absolute -bottom-16 left-[62.5rem] z-[5] mix-blend-lighten opacity-60' width={10} height={10}/>
      <Image src={'/static/images/blast-point-banner/left-ellipse.svg'} alt='Left Ellipse' className='max-lg:hidden w-[31rem] h-[13.375rem] absolute top-0 left-0 z-[8]' width={10} height={10}/>
      <Image src={'/static/images/blast-point-banner/right-ellipse.svg'} alt='Right Ellipse' className='max-lg:hidden w-[31rem] h-[13.375rem] absolute top-0 right-0 z-[8]' width={10} height={10}/>
      <Image src={'/static/images/blast-point-banner/mobile-ellipse.svg'} alt='Mobile Ellipse' className='lg:hidden w-[23.4375rem] h-[10.125rem] absolute bottom-0 left-0 z-[8]' width={10} height={10}/> */}
      <div className="relative z-[8] flex items-center gap-8 max-lg:gap-1">
        <div className='flex items-center gap-3'>
            <Image src={'/static/images/point-stack/blast-gold.svg'} alt='Blast Gold' className='w-[36px] h-[36px] z-[5]' width={10} height={10}/>
            <div className='h-[50px] border-l border-shark-100'></div>
            <div className='flex flex-col items-start gap-1'>
              <div className='text-white font-bold text-sm'>Join the Gold Rush</div>
              <div className='text-white font-medium text-xs'>Deposit liquidity to earn your share of <span className='text-[#FFEF76] font-semibold'>75,000 Blast Gold</span></div>
            </div>
        </div>
        <div className='flex items-center gap-3'>
            <Image src={'/static/images/blast-point-banner/fenix-ring-liquidity.svg'} alt='Fenix Orbit' className='w-[36px] h-[36px] z-[5]' width={10} height={10}/>
            <div className='h-[50px] border-l border-shark-100'></div>
            <div className='flex flex-col items-start gap-1'>
              <div className='text-white font-bold text-sm'>Earn even more with Fenix Rings</div>
              <div className='text-white font-medium text-xs'>That convert to 50% veFNX and 50% FNX at TGE</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default GoldRushBanner
