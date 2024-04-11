'use client'
// import React, { useEffect } from 'react'
// import Lottie from 'react-lottie'
import Diagram from './diagram'
// import Animation from '../../../../public/static/images/animation/GalaxyPartnersSlow.json'



const Partners = () => {
  /* const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  } */
  return (
    <div className="relative container flex items-center flex-col justify-center mt-[120px] max-w-screen overflow-hidden ">
      <div className='lg:absolute lg:top-[100px] lg:transform lg:left-1/2 lg:-translate-x-1/2  flex flex-col items-center justify-center mx-auto z-50'>
        <div className='text-shark-100 text-xl max-lg:text-lg font-normal text-center'>Who Support Fenix</div>
        <div className='text-gradient3 text-[40px] font-normal leading-relaxed max-lg:text-2xl text-center'>Partners</div>
      </div>
      <Diagram/>
      {/* <Lottie options={defaultOptions} width={1400} height={1400} /> */}
      {/* <Image src={'/static/images/landing/partners/galaxy.png'} width={1400} height={1400} alt='galaxy'/> */}
    </div>
  )
}

export default Partners
