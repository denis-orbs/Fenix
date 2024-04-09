/* eslint-disable max-len */
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { Button } from '@/src/components/UI'
import useStore from '@/src/state/zustand'
import { usePathname } from 'next/navigation'
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit'
import useActiveConnectionDetails from '@/src/library/hooks/web3/useActiveConnectionDetails'
import axios from 'axios'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { totalCampaigns } from '@/src/library/utils/campaigns'

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

  const handlerConnectWallet = () => {
    openConnectModal && openConnectModal()
  }

  const [availablePoints, setAvailablePoints] = useState<Number>(0)
  const [data, setData] = useState<Points>({} as Points)
  const { address } = useAccount()

  useEffect(() => {
    const fetchData = async (campaignId: string, pairAddress: string, address: Address) => {
      try {
        const response = await axios.get(`https://blast-points-merkle.vercel.app/query/${campaignId}/${pairAddress}`)

        console.log(response.data)
        const ob = response.data.data.find((element: any) => {
          return element.recipient.toLowerCase() === address.toLowerCase()
        })
        return (ob.percentage / 100) * response.data.pointsandgold.LIQUIDITY.available
      } catch (error) {
        console.error('Error fetching data:', error)
        return 0 // Return a default value in case of error
        // Handle errors as needed
      }
    }
    if (address) {
      // Create an array of Promises for fetching data
      const promises = totalCampaigns.map((campaign) => fetchData(campaign.campaignId, campaign.pairAddress, address))

      // Wait for all Promises to resolve
      Promise.all(promises)
        .then((results) => {
          console.log(results)
          const sum = results.reduce((total, currentValue) => total + currentValue, 0)
          // Set the setAvailablePoints state after all Promises have resolved
          setAvailablePoints(sum)
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

  return (
    <div className="flex items-center gap-2 xl:gap-3 w-full md:w-max-content xl:w-auto flex-row">
      {isConnected && (
        <div className="relative w-full">
          <div
            onMouseEnter={() => setOpenPoints(true)}
            onMouseLeave={() => setOpenPoints(false)}
            className="px-2 xl:px-5 py-1 rounded-lg items-center gap-2 transition hover:bg-shark-400 border border-transparent hover:border-shark-200 hidden xl:flex"
          >
            <p className="text-xs text-white">
              {data.userLiqPoints} <span className="hidden xl:inline">Points</span>
            </p>
            <Image src="/static/images/tokens/BLAST.svg" className="w-8 h-8" alt="logo" width={30} height={30} />
          </div>
          {openPoints && (
            <div className="absolute bg-shark-400 rounded-lg border border-shark-300 w-full xl:w-[250px] top-14 p-5 left-0 xl:-left-12">
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-shark-100 text-xs mb-2">PTS Received</p>
                  <p className="text-white text-sm">{availablePoints.toFixed(2).toString()}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className="text-shark-100 text-xs mb-2">PTS Pending</p>
                  <p className="text-white text-sm">{0}</p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col">
                <p className="text-xs text-shark-100 mb-2">Pending points will be sent in:</p>
                <span className="flex items-center gap-2">
                  <i className="icon-time text-white text-sm"></i>
                  <p className="text-white text-xs underline">8 Hour</p>
                </span>
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
                openConnectModal && openConnectModal()
                openAccountModal && openAccountModal()
              }}
              className="flex w-full xl:w-auto gap-2 md:gap-5 2xl:py-2 p-1 2xl:px-3.5 !pr-0 border rounded-[5px] 
            cursor-pointer bg-shark-900 border-shark-400 bg-opacity-40 hover:bg-opacity-10 group"
            >
              <div className="w-full flex items-center gap-2.5">
                <div className="relative flex items-center  justify-center w-8 2xl:w-12 h-8 2xl:h-12 rounded-[10px] bg-shark-400 bg-opacity-40">
                  <span className="text-[12px] 2xl:text-lg icon-wallet text-outrageous-orange-500"></span>

                  <Image
                    src="/static/images/wallets/metamask.png"
                    className="absolute bottom-0 right-0 w-3 h-3 2xl:w-6 2xl:h-6"
                    alt="logo"
                    width={24}
                    height={24}
                  />
                </div>
                <div className="">
                  <p className="hidden text-xs font-medium 2xl:block text-shark-100">Welcome</p>
                  <p className="flex items-center text-xs text-white">
                    <span className="block w-2 h-2 mr-1.5 bg-green-400 rounded-full"></span>
                    <span className="truncate max-w-[70px] 2xl:max-w-[150px]">{account?.slice(0, 10)}...</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-shrink-0 px-4 transition-colors border-l border-shark-300 group-hover:border-shark-300">
                <span className="text-base md:text-xl icon-cog text-shark-100 group-hover:text-outrageous-orange-500"></span>
              </div>
            </div>
          ) : (
            <Button
              onClick={handlerConnectWallet}
              className={`${pathname === '/' && !isMenuMobile ? 'w-fit whitespace-nowrap' : 'w-full xl:w-[300px]'} gap-3.5 h-[40px] xl:h-[49px] ${pathname === '/' && isMenuMobile ? '!justify-start' : ''}`}
            >
              <span className="icon-wallet text-md !ml-0"></span>
              <span className="text-xs md:text-sm">Connect your Wallet</span>
            </Button>
          )}
        </div>
        {isConnected && (
          <div className="p-2 cursor-pointer hidden 2xl:flex">
            <span className="text-[26px] transition-all icon-logout text-shark-100 hover:text-outrageous-orange-400"></span>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountHandler
