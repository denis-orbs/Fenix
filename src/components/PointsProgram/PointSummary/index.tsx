'use client'

import Image from 'next/image'
import { Button, Tooltip } from '@/src/components/UI'
import { formatCurrency } from '@/src/library/utils/numbers'
import Countdown from 'react-countdown'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { log } from 'console'
import { useRingsPointsLeaderboard } from '@/src/library/hooks/rings/useRingsPoints'
import Loader from '../../UI/Icons/Loader'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import { getPointsDistributionTargetTimestamps } from '@/src/library/utils/campaigns'
import { useReadContract } from 'wagmi'
import { erc20Abi, zeroAddress } from 'viem'

const PointSummary = ({ userData }: any) => {
  //  console.log(userData, 'userData')

  const { data, isLoading } = useRingsPointsLeaderboard()
  const [nextTargetTime, setNextTargetTime] = useState<number>()

  // const targetHoursUTC = [17, 1, 9]
  const targetHoursUTC = getPointsDistributionTargetTimestamps()
  const calculateNextTargetTime = () => {
    const nowUTC = new Date(new Date().toISOString().substring(0, 19) + 'Z')

    const nextTimes = targetHoursUTC.map((hour) => {
      const nextTime = new Date(hour)
      nextTime.setUTCFullYear(nowUTC.getUTCFullYear(), nowUTC.getUTCMonth(), nowUTC.getUTCDate())

      if (nextTime <= nowUTC) {
        nextTime.setUTCDate(nextTime.getUTCDate() + 1)
      }

      return nextTime.getTime()
    })

    const nextTime = Math.min(...nextTimes)
    setNextTargetTime(nextTime)
  }

  useEffect(() => {
    calculateNextTargetTime()
    const interval = setInterval(calculateNextTargetTime, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const renderer = ({
    hours,
    minutes,
    seconds,
    completed,
  }: {
    hours: number
    minutes: number
    seconds: number
    completed: boolean
  }) => {
    if (completed) {
      calculateNextTargetTime()
    } else {
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
                {minutes}
              </span>
              <span className="text-shark-100 text-xs text-center">Minutes</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xs bg-shark-400 bg-opacity-40 px-2 py-1 rounded-lg text-center">
                {seconds}
              </span>
              <span className="text-shark-100 text-xs text-center">Seconds</span>
            </div>
          </div>
        </>
      )
    }
  }

  const { account } = useActiveConnectionDetails()
  const userPoints = useMemo(() => {
    if (!data || !account) {
      return 0
    }
    return data.find((entry) => entry.id.toLowerCase() === account.toLowerCase())?.accumulated_rings_points
  }, [data, account])
  const userRank = useMemo(() => {
    if (!data || !account) {
      return '-'
    }
    return data.findIndex((entry) => entry.id.toLowerCase() === account.toLowerCase()) + 1
  }, [data, account])
  const [showNTFBoostInfo, setShowNTFBoostInfo] = useState(false)
  const { data: nftBoost } = useReadContract({
    address: '0x1c4b87badfa5d512aaeb1dd3f348ef2aa98b869a', // nft address
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [account || zeroAddress],
  })
  const MAX_NFT_BOOST = 20
  return (
    <section className="your-point-box">
      <div className="flex flex-col xl:flex-row items-start w-full justify-between mb-8 xl:items-center relative z-10">
        <h2 className="text-white text-lg mb-3 font-medium">Your point summary</h2>
        <Button className="w-full xl:w-auto" href="/liquidity">
          Provide Liquidity
        </Button>
      </div>
      <div className="flex flex-col xl:flex-row items-center justify-between gap-5 xl:gap-20 relative z-20">
        <div className="point-summary-box">
          <p className="text-base mb-2 text-white w-full text-left relative">
            Rings{' '}
            <span
              onMouseEnter={() => setShowNTFBoostInfo(true)}
              onMouseLeave={() => setShowNTFBoostInfo(false)}
              className="ml-1 text-xs bg-orange-800 text-orange-100 px-1 py-px rounded-md"
            >
              {nftBoost && nftBoost > 0 ? '🔥' : '🥶'}{' '}
              {nftBoost ? Math.min(Number(nftBoost), MAX_NFT_BOOST).toString() : '0'}% NFT Boost
              <span className="icon-info ml-1"></span>
            </span>
            <Tooltip
              className="absolute z-10 bg-shark-950 rounded-lg border border-shark-300 right-12 top-8 px-4 py-2
               text-white text-xs w-[260px] opacity-90 backdrop-blur-[10px] max-xl:left-0"
              show={showNTFBoostInfo}
              setShow={setShowNTFBoostInfo}
            >
              <h3 className="text-lg mb-1">Fenix Goldies NFT</h3>
              <ul className="list-disc  pl-4 space-y-1">
                <li className="list-item">100% of Blast Gold will be distributed to holders.</li>
                <li className="list-item">Fully refundable after 21 days</li>
                <li className="list-item">Early Access to our District One Sprint Launch</li>
                <li className="list-item">
                  For every NFT you own, you get a 1% boost, up to a maximum of 20 NFTs (20%)
                </li>
              </ul>
            </Tooltip>
          </p>
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
                {isLoading ? <Loader size={'20px'} /> : userPoints ? formatCurrency(userPoints) : '-'}
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
              <h3 className="text-3xl font-medium text-white"> {isLoading ? <Loader size={'20px'} /> : userRank}</h3>
              <div className="">
                <p className="text-white text-xs">RANK</p>
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
            <Countdown
              key={nextTargetTime}
              date={nextTargetTime}
              daysInHours={true}
              autoStart={true}
              renderer={renderer}
            />
          </div>

          {/* --- */}
        </div>
      </div>
    </section>
  )
}

export default PointSummary
