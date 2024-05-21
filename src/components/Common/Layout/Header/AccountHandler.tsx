/* eslint-disable max-len */
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { Button } from '@/src/components/UI'
import useStore from '@/src/state/zustand'
import { usePathname } from 'next/navigation'
import { ConnectButton, useAccountModal, useChainModal, useConnectModal } from '@rainbow-me/rainbowkit'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import axios from 'axios'
import { Address } from 'viem'
import { useAccount, useSwitchChain } from 'wagmi'
import { totalCampaigns } from '@/src/library/utils/campaigns'
import { wagmiConfig, configwallets } from '@/src/app/layout'
import cn from '@/src/library/utils/cn'
import { blast } from 'viem/chains'
import { isSupportedChain } from '@/src/library/constants/chains'
import Countdown from 'react-countdown'

interface Points {
  userLiqPoints: number[]
  pendingSent: number[]
}

type AccountHandlerProps = {
  isMenuMobile?: boolean
  isMoreOption?: boolean
}
const AccountHandler = ({ isMenuMobile, isMoreOption = true }: AccountHandlerProps) => {
  const [openPoints, setOpenPoints] = useState<boolean>(false)
  const { isConnected, account } = useActiveConnectionDetails()

  const { setWalletSelectionModal } = useStore()

  const pathname = usePathname()
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()

  const handlerConnectWallet = () => {
    openConnectModal && openConnectModal()
  }
  const { chains, switchChain } = useSwitchChain()

  const [availablePoints, setAvailablePoints] = useState<Number>(0)
  const [distributed, setDistributed] = useState<Number>(0)
  const [data, setData] = useState<Points>({} as Points)
  const { address, chainId } = useAccount()
  const { switchChainAsync } = useSwitchChain()
  const wrongChain = !isSupportedChain(chainId)
  useEffect(() => {
    const fetchData = async (campaignId: string, pairAddress: string, address: Address) => {
      try {
        const response = await axios.get(`https://blast-points-merkle.vercel.app/query/${campaignId}/${pairAddress}`)

        const ob = response.data.data.filter((element: any) => {
          return element.recipient.toLowerCase() === address.toLowerCase()
        })
        const totalPercentage = ob.reduce((total: any, data: any) => total + Number(data.percentage), 0).toFixed(2)

        return (totalPercentage / 100) * response.data.pointsandgold.LIQUIDITY.available
      } catch (error) {
        console.error('Error fetching data:', error)
        return 0 // Return a default value in case of error
        // Handle errors as needed
      }
    }
    const fetchDistributed = async (pairAddress: string, address: Address) => {
      try {
        const response = await axios.get(`https://blast-points-merkle.vercel.app/query/dist/distributed/${pairAddress}`)

        const ob = response.data.data.filter((element: any) => {
          return element.recipient.toLowerCase() === address.toLowerCase()
        })
        const totalPercentage = ob.reduce((total: any, data: any) => total + Number(data.percentage), 0).toFixed(2)

        return (totalPercentage / 100) * response.data.pointsandgold.LIQUIDITY.available
      } catch (error) {
        console.error('Error fetching data:', error)
        return 0 // Return a default value in case of error
        // Handle errors as needed
      }
    }
    if (address) {
      // Create an array of Promises for fetching data
      const promises = totalCampaigns.map((campaign) => fetchData(campaign.campaignId, campaign.pairAddress, address))
      const promisesDistributed = totalCampaigns.map((campaign) => fetchDistributed(campaign.pairAddress, address))

      // Wait for all Promises to resolve
      Promise.all(promises)
        .then((results) => {
          //  console.log(results)
          const sum = results.reduce((total, currentValue) => total + currentValue, 0)
          // Set the setAvailablePoints state after all Promises have resolved
          setAvailablePoints(sum)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
          // Handle errors if needed
        })

      Promise.all(promisesDistributed)
        .then((results) => {
          //   console.log(results)
          const sum = results.reduce((total, currentValue) => total + currentValue, 0)
          // Set the setDistributed state after all Promises have resolved

          setDistributed(sum)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
          // Handle errors if needed
        })
    }

    // Cleanup function if needed
    return () => {
      // Cleanup code here
    }
  }, [address])

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

  // Example usage
  const timestampsArray = getCurrentEightHourTimestampArray()
  // console.log(timestampsArray.map((timestamp) => new Date(timestamp).toUTCString()))

  const timeSet = () => {
    // FIXME: STARK
    if (time === '' && count === 0 && timestampsArray.length > 0) {
      setTime(timestampsArray[0].toString())
      count++
    } else {
      // FIXME: STARK
      setTime(timestampsArray[count].toString())
      count++
    }
  }

  useEffect(() => timeSet(), [])
  // FIXME: HAZ
  const renderer = ({ hours, completed }: { hours: any; completed: any }) => {
    if (completed) {
      // Render a completed state
      // return <span>You are good to go!</span>
      timeSet()
    } else {
      // Render a countdown
      return (
        <>
          <span className="flex items-center gap-2">
            <i className="icon-time text-white text-sm"></i>
            <p className="text-white text-xs underline">{hours} hours</p>
          </span>
        </>
      )
    }
  }

  return (
    <div
      className={`flex items-center  gap-2 xl:gap-3 w-full md:w-max-content xl:w-auto flex-row ${pathname !== '/' && 'xl:absolute  xl:right-[90px]'}`}
    >
      {isConnected && !wrongChain && (
        <div className="relative w-full">
          <div
            onMouseEnter={() => setOpenPoints(true)}
            onMouseLeave={() => setOpenPoints(false)}
            // className="px-2 xl:px-5 py-1 rounded-lg items-center gap-2 transition hover:bg-shark-400 border border-transparent hover:border-shark-200 hidden lg:flex"
            className="
            w-[40px]
            rounded-md gap-2 transition hover:bg-shark-400 border border-transparent hover:border-shark-200 "
          >
            <p className="text-xs text-white">
              {/* {data.userLiqPoints} <span className="hidden lg:inline">Points</span> */}
            </p>
            <Image
              src="/static/images/tokens/BLAST.svg"
              className="w-[30px] h-[30px] mx-auto "
              alt="logo"
              width={30}
              height={30}
            />
          </div>
          {openPoints && (
            <div className="absolute  bg-shark-400 rounded-lg border border-shark-300 w-auto xl:w-[250px] top-14 p-5 left-0 xl:-left-12">
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-shark-100 text-xs mb-2">PTS Received</p>
                  <p className="text-white text-sm">{availablePoints.toFixed(2).toString()}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-shark-100 text-xs mb-2">PTS Pending</p>
                  <p className="text-white text-sm">
                    {(Number(availablePoints) - Number(distributed)).toFixed(2).toString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="text-xs text-shark-100 mb-2">Pending points will be sent in:</p>
                <Countdown key={time} date={time} daysInHours={true} autoStart={true} renderer={renderer} />
                {/* <span className="flex items-center gap-2">
                  <i className="icon-time text-white text-sm"></i>
                  <p className="text-white text-xs underline">8 Hours</p>
                </span> */}
              </div>
            </div>
          )}
          {/* {isConnected && (
            <div className="items-center flex-shrink-0 hidden gap-2 2xl:flex">
              <Image src="/static/images/tokens/ETH-GRAY.svg" className="w-6 h-6 " alt="logo" width={24} height={24} />
              <p className="text-xs text-white">1.987 ETH</p>
            </div>
          )} */}
        </div>
      )}

      <div className="flex gap-2 items-center w-full 2xl:w-auto justify-end">
        <div className="flex w-full 2xl:w-auto">
          {isConnected ? (
            <div
              onClick={() => {
                if (wrongChain) {
                  switchChain({ chainId: Number(process.env.NEXT_PUBLIC_CHAINID) || blast.id })
                } else {
                  openConnectModal && openConnectModal()
                  openAccountModal && openAccountModal()
                }
              }}
              className="flex 
              w-full 
              gap-2 
              md:gap-5 
              p-1 
              border 
              rounded-[5px] 
              cursor-pointer bg-shark-900 border-shark-400 bg-opacity-40 hover:bg-opacity-10 group"
            >
              <div className="w-full flex items-center gap-2.5">
                <div className="relative flex items-center  justify-center w-8 xl:w-10 h-8 xl:h-10 rounded-[10px] bg-shark-400 bg-opacity-40">
                  {wrongChain ? (
                    <Image
                      src="/static/images/icons/warning.png"
                      className="bottom-0 right-0 w-6 h-6 xl:w-8 xl:h-8"
                      alt="logo"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <>
                      <span className="text-[12px] xl:text-sm icon-wallet text-outrageous-orange-500"></span>
                      <Image
                        src="/static/images/wallets/metamask.png"
                        className="absolute bottom-0 right-0 w-3 h-3 xl:w-4 xl:h-4"
                        alt="logo"
                        width={24}
                        height={24}
                      />
                    </>
                  )}
                </div>
                <div className="">
                  <p className="hidden text-xs font-medium xl:block text-shark-100">
                    {wrongChain ? 'Wrong Chain' : 'Welcome'}
                  </p>
                  <p className="flex items-center text-xs text-white">
                    <span
                      className={cn('block w-2 h-2 mr-1.5 rounded-full', wrongChain ? 'bg-red-400' : 'bg-green-400')}
                    ></span>
                    <span className="truncate max-w-[70px] xl:max-w-[150px]">{account?.slice(0, 6)}...</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-shrink-0 px-1  transition-colors border-l border-shark-300 group-hover:border-shark-300">
                <span className="text-base md:text-xl icon-cog text-shark-100 group-hover:text-outrageous-orange-500"></span>
              </div>
            </div>
          ) : (
            <Button
              onClick={handlerConnectWallet}
              className={`${pathname === '/' && !isMenuMobile ? 'w-fit whitespace-nowrap' : 'w-full xl:w-[290px]'} gap-3.5 h-[40px] xl:h-[49px] ${pathname === '/' && isMenuMobile ? '!justify-start' : ''}`}
            >
              <span className="icon-wallet text-md !ml-0"></span>
              <span className="text-xs ">Connect your Wallet</span>
            </Button>
          )}
        </div>
        {isConnected && (
          <div className="p-2 cursor-pointer hidden 2xl:flex">
            {/* <span className="text-[26px] transition-all icon-logout text-shark-100 hover:text-outrageous-orange-400"></span> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountHandler
