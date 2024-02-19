// @ts-nocheck
'use client'
import MainBox from '@/components/Common/Boxes/MainBox'
import { EXCHANGE_LIST } from '../data'
import { Button } from '@/components/UI'
import { useEffect, useState } from 'react'
import InfoBox from '@/components/Common/InfoBox'
import Countdown from 'react-countdown'
import { useAccount } from 'wagmi'
import chrmigrateabi from '../../../abi/chrmigrate.json'
import BigNumber from 'bignumber.js'
import { multicall } from '@wagmi/core'

const Migration = () => {
  const [show, setShow] = useState<boolean>(false)
  const [finalDate, setfinalDate] = useState<Number>()
  const account = useAccount()

  const Completionist = () => <span>Migration Period Over!</span>

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <>
          <div className="flex flex-col items-center justify-center">
            <h5 className="flex items-center justify-center mb-1 text-xs text-center text-white rounded-lg bg-shark-400 w-7 h-7">
              {days}
            </h5>
            <p className="text-xs text-shark-100">Days</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h5 className="flex items-center justify-center mb-1 text-xs text-center text-white rounded-lg bg-shark-400 w-7 h-7">
              {hours}
            </h5>
            <p className="text-xs text-shark-100">Hours</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h5 className="flex items-center justify-center mb-1 text-xs text-center text-white rounded-lg bg-shark-400 w-7 h-7">
              {minutes}
            </h5>
            <p className="text-xs text-shark-100">Minutes</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h5 className="flex items-center justify-center mb-1 text-xs text-center text-white rounded-lg bg-shark-400 w-7 h-7">
              {seconds}
            </h5>
            <p className="text-xs text-shark-100">Seconds</p>
          </div>
        </>
      )
    }
  }
  useEffect(() => {
    multicall({
      enabled: !!account?.address,
      contracts: [
        {
          abi: chrmigrateabi,
          address: '0xC138616F08BB95EB59bB00A4Fa4890084f230A9E',
          functionName: 'depositDuration',
        },
        {
          abi: chrmigrateabi,
          address: '0xC138616F08BB95EB59bB00A4Fa4890084f230A9E',
          functionName: 'deploymentTimestamp',
        },
      ],
    }).then((data) => {
      setfinalDate(parseInt(new BigNumber(data[0]?.result + data[1]?.result)))
    })
  }, [])

  return (
    <MainBox>
      <div className="flex flex-col justify-between w-full md:gap-10 md:flex-row md:items-center">
        <div className="w-full my-5 md:w-[50%] xl:w-[40%] md:m-0">
          <h4 className="mb-3 text-xl text-white">Migration Claim</h4>
          <p className="mb-4 text-sm text-shark-100">
            Deposit your CHR Tokens in order to migrate to our new Protocol!
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-between w-full gap-3 px-4 py-2 rounded-lg md:gap-5 2xl:gap-8 2xl:justify-start bg-shark-400 bg-opacity-40">
              <div>
                <h5 className="mb-1 text-xs text-shark-100">Migration</h5>
                <p className="text-xs text-green-500">Open</p>
              </div>
              <Countdown date={new Date(finalDate * 1000)} daysInHours={true} autoStart={true} renderer={renderer} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-3 text-sm cursor-pointer text-shark-100 hover:text-outrageous-orange-500">
              <span className="text-lg icon-link"></span>
              About Migration
            </p>
          </div>
        </div>
        <div className="relative flex flex-col w-full md:w-[40%] max-h-[390px] overflow-y-auto overflow-x-none pr-4">
          {EXCHANGE_LIST.map((exchange, index) => (
            <InfoBox key={index} data={exchange} setShowTooltip={setShow} hasTooltip />
          ))}
        </div>
      </div>
    </MainBox>
  )
}

export default Migration
