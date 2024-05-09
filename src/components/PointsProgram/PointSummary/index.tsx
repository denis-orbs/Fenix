'use client'

import Image from 'next/image'
import { Button } from '@/src/components/UI'
import { formatCurrency } from '@/src/library/utils/numbers'
import Countdown from 'react-countdown'
import { ReactNode, useEffect, useState } from 'react'
import { log } from 'console'
import { useRingsPoints } from '@/src/library/hooks/rings/useRingsPoints'
import Loader from '../../UI/Icons/Loader'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'

const PointSummary = ({ userData }: any) => {
  //  console.log(userData, 'userData')
  const [time, setTime] = useState('')
  let count = 0

  function getCurrentEightHourTimestampArray() {
    const targetDate = new Date('2024-12-31T00:00:00Z')
    const currentDate = new Date()

    const timeDifference = targetDate.getTime() - currentDate.getTime()
    const remainingHours = Math.ceil(timeDifference / (8 * 60 * 60 * 1000))

    const eightHourTimestamps = []

    for (let i = 0; i <= remainingHours; i++) {
      const timestamp = targetDate.getTime() - i * 8 * 60 * 60 * 1000
      eightHourTimestamps.push(timestamp)
    }

    return eightHourTimestamps.reverse() // Reverse the array to have timestamps in ascending order
  }

  //  HERE
  const { points, isLoading } = useRingsPoints()
  // Example usage
  const timestampsArray = getCurrentEightHourTimestampArray()
  // console.log(timestampsArray.map((timestamp) => new Date(timestamp).toUTCString()))

  const timeSet = () => {
    if (time === '' && count === 0 && timestampsArray.length > 0) {
      // FIXME: STARK
      setTime(timestampsArray[0].toString())
      count++
    } else {
      // FIXME: STARK
      setTime(timestampsArray[count].toString())
      count++
    }
  }

  useEffect(() => timeSet(), [])
  // FIXME: STARK
  const renderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }: {
    hours: any
    minutes: any
    seconds: any
    completed: any
  }) => {
    if (completed) {
      // Render a completed state
      // return <span>You are good to go!</span>
      timeSet()
    } else {
      // Render a countdown
      return (
        <>
          <div className="flex items-center justify-between px-4">
            {/* <div className="flex flex-col">
              <span className="text-white text-xs bg-shark-400 bg-opacity-40 px-2 py-1 rounded-lg text-center">
                {hours}
              </span>
              <span className="text-shark-100 text-xs text-center">Hours</span>
            </div> */}
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
          <p className="text-base mb-2 text-white w-full text-left">Rings</p>
          <div className="flex items-center gap-4 w-full">
            <div className="flex flex-col items-center h-12 justify-center gap-y-1 mt-1">
              <Image
                src="/static/images/points-program/orbit.svg"
                alt="token"
                width={20}
                height={20}
                // className="w-8 h-8"
              />
              <p className="text-xs text-white">Fenix Rings</p>
            </div>
            <div className="h-12 flex flex-col justify-between">
              <h3 className="text-3xl font-medium text-white">
                {isLoading ? <Loader size={'20px'} /> : formatCurrency(points) ?? '-'}
              </h3>
              <p className="text-xs text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">
                Your Total points
              </p>
            </div>
          </div>
        </div>
        <div className="point-summary-box relative">
          <p className="text-base mb-2 text-white w-full">Leaderboard Position</p>
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center w-12 h-12 border border-solid rounded-lg bg-shark-400 border-shark-400">
              <span className="text-lg text-transparent icon-circles bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text"></span>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-3xl font-medium text-white">{userData?.rank ?? '-'}</h3>
              <div className="">
                <p className="text-white text-xs">RANK</p>
                <p className="text-xs text-transparent bg-gradient-to-r from-outrageous-orange-500 to-festival-500 bg-clip-text">
                  {formatCurrency(userData?.amount / 10 ** 6) ?? '-'} points
                </p>
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
          <p className="text-base text-white w-full mb-4">
            Next Points Drop
            {/* Next Points Drop <span className="text-xs mb-4 text-green-400 w-full ml-1">14 Feb, 2PM UTC</span> */}
          </p>
          <div className="w-full">
            <Countdown key={time} date={time} daysInHours={true} autoStart={true} renderer={renderer} />
          </div>

          {/* --- */}
        </div>
      </div>
    </section>
  )
}

export default PointSummary
