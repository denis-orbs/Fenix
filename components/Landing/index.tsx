'use client'

import Image from 'next/image'
import Articles from './Articles'
import HowItWorks from './HowItWorks'
import Lottie from 'lottie-react'
import animation from '@/lottie/space.json'

const Landing = () => {
  return (
    <main>
      <div className="w-full relative">
        <div className="relative z-20">
          <Lottie animationData={animation} />
        </div>
        <div className="mx-auto flex justify-center absolute bottom-[338px] left-[38%] w-[23%] mix-blend-color-dodge z-10">
          <Image
            src="/static/images/landing/support/sun-wrapper.png"
            alt="img"
            width={733}
            height={560}
            className="w-[1300px]"
          />
        </div>
        <div className="mx-auto flex justify-center absolute bottom-[40px] w-full mix-blend-color-dodge">
          <Image
            src="/static/images/landing/support/sun.png"
            alt="img"
            width={733}
            height={560}
            className="w-[1300px]"
          />
        </div>
      </div>
      <HowItWorks />
      <Articles />
    </main>
  )
}

export default Landing
