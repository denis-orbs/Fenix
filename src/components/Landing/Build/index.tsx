import React from 'react'
import CardsBuild from './CardsBuild'
import { FOUNDATION, LAUNCH, GROWTH } from './data'
import Image from 'next/image'

const BuildInfo = () => {
  return (
    <div className="relative flex items-center flex-col justify-center mb-[100px] xl:mb-[200px] w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center mx-auto z-50 mb-10">
        <div className="text-shark-100 text-xl max-lg:text-lg font-normal text-center">Roadmap</div>
        <div className="text-gradient3 text-[40px] font-normal leading-relaxed max-lg:text-2xl text-center">
          Build with FENIX
        </div>
      </div>
      <div className="flex flex-wrap w-full gap-10 xl:gap-20 justify-center relative">
        <div className="flex flex-col xl:gap-14 gap-5 ">
          <div>
            <h1 className="text-white text-center text-xl xl:text-4xl font-light">April 2024</h1>
            <p className="text-gradient3 text-sm font-normal leading-relaxed xl:text-2xl text-center">Stage 01</p>
          </div>
          <CardsBuild title="Foundation" info={FOUNDATION} checked={true} spinner={false} />
        </div>
        <div className="flex flex-col  xl:gap-14 gap-5">
          <div>
            <h1 className="text-white text-center xl:text-4xl text-xl font-light">APRIL/MAY 2024</h1>
            <p className="text-gradient3 text-sm font-normal leading-relaxed xl:text-2xl text-center">Stage 02</p>
          </div>
          <CardsBuild title="Launch" info={LAUNCH} checked={true} spinner={false} />
        </div>
        <div className="flex flex-col  xl:gap-14 gap-5">
          <div>
            <h1 className="text-white text-center xl:text-4xl text-xl font-light">Q2-Q4 2024</h1>
            <p className="text-gradient3 text-sm font-normal leading-relaxed xl:text-2xl text-center">Stage 03</p>
          </div>
          <CardsBuild title="Growth" info={GROWTH} checked={false} spinner={false} />
        </div>
        <div
          className="hidden absolute max-w-[1600px] w-full h-[10px] 
          2xl:flex justify-center after:content-[''] 
          after:w-[10%] after:bg-opacity-5  
          before:bg-shark-400
          before:rounded-full
          after:rounded-full
          before:w-[10%]
          before:opacity-5
        after:bg-shark-400  
          rounded-full top-20 z-10"
        >
          <div className="bg-shark-400 bg-opacity-20 rounded-full max-w-[1500px] items-center flex justify-center w-full h-[10px] -z-10"></div>
          <div className="bg-chilean-fire-600 left-[calc(49%)] -top-1 w-[18px] h-[18px] rounded-full absolute"></div>
          <div className="bg-chilean-fire-600 left-[calc(78%)] -top-1 w-[18px] h-[18px] rounded-full absolute"></div>
          <div className="bg-chilean-fire-600 left-[calc(20%)] -top-1 w-[18px] h-[18px] rounded-full absolute"></div>
        </div>
      </div>

      {/* <Image
        className="absolute right-0 mix-blend-soft-light -top-44  -z-10"
        src={'/static/images/landing/superCharged/meteor.svg'}
        height={550}
        width={745}
        alt="meteor"
      /> */}
      <Image
        src={'/static/images/landing/superCharged/decorator.svg'}
        className="absolute -left-80 -z-50"
        height={550}
        width={745}
        alt="meteor"
      />
      <Image
        src={'/static/images/landing/build/decoratorright.svg'}
        className="absolute -right-72 -z-50"
        height={550}
        width={745}
        alt="meteor"
      />
    </div>
  )
}

export default BuildInfo
