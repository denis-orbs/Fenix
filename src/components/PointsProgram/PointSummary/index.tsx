'use client'

import Image from 'next/image'
import { Button } from '@/src/components/UI'
import { formatCurrency } from '@/src/library/utils/numbers'
import Countdown from 'react-countdown'
import { useEffect, useState } from 'react'
import { log } from 'console'

const PointSummary = ({ userData }: any) => {
  //  console.log(userData, 'userData')
  let [time, setTime] = useState(Date.now() + 8 * 60 * 60 * 1000)

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      // return <span>You are good to go!</span>
      setTime(Date.now() + 8 * 60 * 60 * 1000)
    } else {
      // Render a countdown
      return (
        <>
          <div className="flex items-center justify-between px-4">
            <div className="flex flex-col">
              <span className="text-white text-xs bg-shark-400 bg-opacity-40 px-2 py-1 rounded-lg text-center">
                {hours}
              </span>
              <span className="text-shark-100 text-xs text-center">Hours</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xs bg-shark-400 bg-opacity-40 px-2 py-1 rounded-lg text-center">
                {hours}
              </span>
              <span className="text-shark-100 text-xs text-center">Hours</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xs bg-shark-400 bg-opacity-40 px-2 py-1 rounded-lg text-center">
                {minutes}
              </span>
              <span className="text-shark-100 text-xs text-center">Minutes</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xs bg-shark-400 bg-opacity-40 px-2 py-1 rounded-lg">{seconds}</span>
              <span className="text-shark-100 text-xs text-center">Seconds</span>
            </div>
          </div>
        </>
      )
    }
  }

  useEffect(() => {
    console.log('new timer')
  }, [time])

  return (
    <section className="your-point-box">
      <div className="flex flex-col xl:flex-row items-start w-full justify-between mb-8 xl:items-center relative z-10">
        <h5 className="text-white text-lg mb-3 font-medium">Your point summary</h5>
        <Button className="w-full xl:w-auto" href="/liquidity">
          Provide Liquidity
        </Button>
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-between gap-5 xl:gap-20 relative z-20">
        <div className="point-summary-box">
          <p className="text-xs mb-2 text-white w-full text-left">Orbits</p>
          <div className="flex items-center gap-4 w-full">
            <Image src="/static/images/tokens/FNX.svg" alt="token" width={20} height={20} className="w-8 h-8" />
            <div className="">
              <h3 className="text-lg font-medium text-white"> {formatCurrency(userData?.amount) ?? '-'}</h3>
              <p className="text-xs text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">
                Your Total points
              </p>
            </div>
          </div>
        </div>
        <div className="point-summary-box relative">
          <p className="text-xs mb-2 text-white w-full">Leaderboard Position</p>
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center w-12 h-12 border border-solid rounded-lg bg-shark-400 border-shark-400">
              <span className="text-lg text-transparent icon-circles bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text"></span>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-medium text-white">{userData?.rank ?? '-'}</h3>
              <div className="">
                <p className="text-white text-xs">RANK</p>
                {/* <p className="text-xs text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">
                  {formatCurrency(userData?.amount) ?? '-'}
                </p> */}
              </div>
            </div>
          </div>
          <span className="absolute top-0 -left-[40px] z-0 rotate-90 hidden xl:block">
            <Image src="/static/images/components/line.svg" alt="line" className="w-1 h-20" width={1} height={35} />
          </span>
          <span className="absolute top-0 -right-[40px] z-0 rotate-90 hidden xl:block">
            <Image src="/static/images/components/line.svg" alt="line" className="w-1 h-20" width={1} height={35} />
          </span>
        </div>
        <div className="point-summary-box">
          <p className="text-xs mb-2 text-white w-full">Next Points Drop</p>
          <p className="text-xs mb-2 text-green-400 w-full">14 Feb, 2PM UTC</p>
          <div className="w-full">
            {/* <Countdown date={Date.now() + 8 * 60 * 60 * 1000} daysInHours={true} autoStart={true} renderer={renderer} /> */}
            <Countdown key={time} date={time} daysInHours={true} autoStart={true} renderer={renderer} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PointSummary
