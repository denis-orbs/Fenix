/* eslint-disable max-len */
'use client'
import { useState, useRef, useEffect } from 'react'

import { Button } from '@/src/components/UI'
import Image from 'next/image'
import { useCloseBanner, useShowBanner } from '@/src/state/user/hooks'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


const GoldRushBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    
    appendDots: dots => (
      <div
        className='w-[300px]'
      >
        <ul className='w-[25px] mx-auto flex items-center justify-center'> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        className={`w-[25px] mx-[10px] rounded-xl h-2 bg-shark-200 mt-4 ${sliderRef.current}`}
      >
      </div>
    )
    // appendDots: (dots:any) => (
    //   <div className='w-full z-50 bg-[red]'></div>
    // ),
    // customPaging: i => (
    //   <div
    //     className='w-1/2 rounded-xl h-1 bg-shark-200 z-50'
    //   >
    //     {i}
    //   </div>
    // )

  }
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.current.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  console.log('sliderRef :>> ', sliderRef);
  const showBanner = useShowBanner()
  const setCloseBanner = useCloseBanner()
  const [close, setClose] = useState<boolean>(false)
  useEffect(() => {
    console.log('sliderRef.current :>> ', sliderRef.current);
  }, [sliderRef])

  if (close) return null

  const handlerClose = () => {
    // setCloseBanner(true)
    // setClose((prevState) => !prevState)
  }

  return (
    <div className="blast-banner max-lg:flex-col overflow-hidden rounded-tl-[1.625rem] rounded-br-[1.625rem] rounded-tr-xl rounded-bl-xl">
      {/* <Image src={'/static/images/blast-point-banner/noise-texture.svg'} alt='Noise Texture' className='max-lg:hidden w-[100%] h-[100%] absolute top-0 left-0 bottom-0 right-0 z-[5] rounded-tl-[1.625rem] rounded-br-[1.625rem] rounded-tr-xl rounded-bl-xl' width={10} height={10}/>
      <Image src={'/static/images/blast-point-banner/noise-texture-mobile.svg'} alt='Noise Texture Mobile' className='lg:hidden w-[100%] h-[100%] absolute top-0 left-0 bottom-0 right-0 z-[5] rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl' width={10} height={10}/>
      <Image src={'/static/images/blast-point-banner/cell.svg'} alt='Cell' className='max-lg:hidden w-[100%] h-[100%] absolute top-0 left-0 bottom-0 right-0 z-[5] rounded-tl-[1.625rem] rounded-br-[1.625rem] rounded-tr-xl rounded-bl-xl' width={10} height={10}/>
      <Image src={'/static/images/blast-point-banner/cell-mobile.svg'} alt='Cell Mobile' className='lg:hidden w-[100%] h-[100%] absolute top-0 left-0 bottom-0 right-0 z-[5] rounded-tl-[3.5rem] rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl' width={10} height={10}/>
    
      <Image src={'/static/images/gold-rush-banner/background-star.svg'} alt='Background Star' className='max-lg:hidden w-[573px] h-[423px] mix-blend-lighten absolute top-[-170px] left-[700px] z-[10]' width={10} height={10}/>
      <Image src={'/static/images/gold-rush-banner/background-star2.svg'} alt='Background Star' className='max-lg:hidden w-[573px] h-[423px] mix-blend-lighten absolute top-[-180px] left-[1120px] z-[10]' width={10} height={10}/>
      <Image src={'/static/images/gold-rush-banner/masive-star.svg'} alt='Masive Star' className='max-lg:hidden w-[1135px] h-[786px] mix-blend-lighten absolute top-[-350px] left-[440px] z-[10]' width={10} height={10}/>
      <Image src={'/static/images/gold-rush-banner/fenix-ring-low-opacity.svg'} alt='Fenix Ring Decorator' className='max-lg:hidden w-[23px] h-[23px] mix-blend-lighten absolute top-[0] left-[860px] z-[10]' width={10} height={10}/>
      <Image src={'/static/images/gold-rush-banner/fenix-ring.svg'} alt='Fenix Ring Decorator 2' className='max-lg:hidden w-[23px] h-[23px] mix-blend-lighten absolute bottom-[0] left-[1400px] z-[10]' width={10} height={10}/>
      <Image src={'/static/images/gold-rush-banner/ellipse.svg'} alt='Ellipse' className='max-lg:hidden w-[16px] h-[16px] absolute bottom-[20px]  left-[1070px] z-[10]' width={10} height={10}/>
      <Image src={'/static/images/gold-rush-banner/ellipse2.svg'} alt='Ellipse 2' className='max-lg:hidden w-[16px] h-[16px] absolute bottom-[30px]  left-[515px] z-[10]' width={10} height={10}/>
      
      <Image src={'/static/images/gold-rush-banner/background-star3.svg'} alt='Background Star3' className='lg:hidden w-[198px] h-[134px] mix-blend-lighten absolute top-[0px] right-[0px] z-[10]' width={10} height={10}/>
      <Image src={'/static/images/gold-rush-banner/masive-star2.svg'} alt='Masive Star2' className='lg:hidden w-[1035px] h-[786px] mix-blend-lighten absolute top-[-320px] left-1/2 -translate-x-1/2 z-[10]' width={10} height={10}/>
      <Image src={'/static/images/gold-rush-banner/fenix-ring2.svg'} alt='Fenix Ring Decorator 2' className='lg:hidden  w-[23px] h-[23px] mix-blend-lighten absolute top-[0] right-[50px] z-[10]' width={10} height={10}/> */}
      
      <div className="relative z-[12] flex items-center gap-8 max-lg:gap-1 max-lg:hidden">
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
      <div className="text-white z-[12] lg:hidden relative w-full h-[135px] my-auto">
        <div className='slider-container w-full flex flex-col justify-center h-full'>
          <Slider ref={sliderRef} {...settings}>
            <div className='!flex items-center justify-center gap-3 z-[8] w-full h-full'>
              <Image src={'/static/images/point-stack/blast-gold.svg'} alt='Blast Gold' className='w-[36px] h-[36px] z-[5]' width={10} height={10}/>
              <div className='h-[50px] border-l border-shark-100'></div>
              <div className='flex flex-col items-start gap-1'>
                <div className='text-white font-bold text-sm'>Join the Gold Rush</div>
                <div className='text-white font-medium text-xs'>Deposit liquidity to earn your share of <span className='text-[#FFEF76] font-semibold'>75,000 Blast Gold</span></div>
              </div>
            </div>
            <div className='!flex items-center justify-center gap-3 z-[8] w-full'>
                <Image src={'/static/images/blast-point-banner/fenix-ring-liquidity.svg'} alt='Fenix Orbit' className='w-[36px] h-[36px] z-[5]' width={10} height={10}/>
                <div className='h-[50px] border-l border-shark-100'></div>
                <div className='flex flex-col items-start gap-1'>
                  <div className='text-white font-bold text-sm'>Earn even more with Fenix Rings</div>
                  <div className='text-white font-medium text-xs'>That convert to 50% veFNX and 50% FNX at TGE</div>
                </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default GoldRushBanner
