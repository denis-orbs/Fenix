/* eslint-disable max-len */
'use client'

import Image from 'next/image'
import Articles from './Articles'
import HowItWorks from './HowItWorks'
import Info from './Info'
import Lottie from 'lottie-react'
import animation from '@/lottie/space.json'

const Landing = () => {
  return (
    <main>
      <Info />
      <div className="w-full relative">
        {/* <div className="w-[163px] h-[163px] bg-black rounded-full border-[2px] border-white absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" /> */}

        {/* <Image
          src="/static/images/landing/support/center.png"
          alt="img"
          width={163}
          height={163}
          className="w-[163px] h-[163px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        /> */}
        <div className="z-20 w-full mx-auto [&>div]:max-w-[2360px] [&>div]:text-center overflow-hidden [&>div]:min-w-[660px] [&>div]:relative [&>div]:left-1/2 [&>div]:-translate-x-1/2 pointer-events-none select-none">
          <Lottie animationData={animation} />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 top-[-50px] md:top-[-7px] z-[999] backdrop-blur-[38px]">
          <Image
            src="/static/images/landing/support/partners.svg"
            alt="img"
            width={366}
            height={143}
            className="max-md:hidden"
          />
          <Image
            src="/static/images/landing/support/partners-mobile.svg"
            alt="img"
            width={300}
            height={111}
            className="md:hidden min-w-[300px] min-h-[111px]"
          />
        </div>

        {/* <div className="mx-auto flex justify-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[2244px] mix-blend-color-dodge">
          <Image
            src="/static/images/landing/support/sun.png"
            alt="img"
            width={2244}
            height={1864}
            className="w-[2244px]"
          />
        </div>

        <div className="w-[556px] h-[412px] absolute mix-blend-plus-lighter z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src="/static/images/landing/support/sun-wrapper.png" alt="img" width={556} height={412} />
        </div>

        <div className="z-20 w-full mx-auto [&>div]:max-w-[2360px] [&>div]:mx-auto ">
          <Lottie animationData={animation} />
        </div>

        */}
      </div>

      <HowItWorks />
      <Articles />
    </main>
  )
}

export default Landing
