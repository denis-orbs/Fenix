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
        <div className="relative z-20 w-full mx-auto [&>div]:max-w-[1920px] [&>div]:mx-auto">
          <Lottie animationData={animation} />

          <Image
            src="/static/images/landing/support/sun-wrapper.png"
            alt="img"
            width={556}
            height={412}
            className=" absolute  mix-blend-color-dodge  z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="mx-auto flex justify-center absolute bottom-[40px] w-full mix-blend-color-dodge">
          <Image
            src="/static/images/landing/support/sun.png"
            alt="img"
            width={733}
            height={560}
            className="w-[1300px] "
          />
        </div>
      </div>
      <HowItWorks />
      <Articles />
    </main>
  )
}

export default Landing
