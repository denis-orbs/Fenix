'use client'

import Image from 'next/image'
import HowToEarn from './HowToEarn'
import PointSummary from './PointSummary'
import Leaderboard from './Leaderboard'
import { totalCampaigns } from '@/src/library/utils/campaigns'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAccount } from 'wagmi'

interface MerklReward {
  recipient: string
  reason: string
  amount: string
  rewardToken: string
  rank?: number
}

interface RewardAccumulator {
  [key: string]: MerklReward & { rank?: number }
}

const PointsProgram = () => {
  const [data, setData] = useState<MerklReward[]>([])
  const [userData, setUserData] = useState<MerklReward>()
  const { address } = useAccount()
  useEffect(() => {
    const fetchRewardsReport = async (campaignId: string) => {
      const url = `https://api.merkl.xyz/v3/rewardsReport?chainId=81457&campaignId=${campaignId}`

      try {
        const response = await axios.get<MerklReward[]>(url)

        // Step 1: Sort the array based on the 'amount' field in descending order
        return response.data.sort((a, b) => parseInt(b.amount) - parseInt(a.amount))

        // return response.data
      } catch (error) {
        console.error('Error fetching rewards report:', error)
        throw error
      }
    }

    const promises = totalCampaigns.map((campaign) => fetchRewardsReport(campaign.campaignId))

    // Wait for all Promises to resolve
    Promise.all(promises)
      .then((results) => {
        // Use the flat method with depth 1 to flatten the array
        const flattenedArray = results.flat(1)
        const rewardsObject = flattenedArray.reduce<RewardAccumulator>((acc, reward) => {
          const { recipient, amount } = reward

          if (acc[recipient]) {
            // If recipient exists, add points
            acc[recipient].amount = String(Number(acc[recipient].amount) + Number(amount))
          } else {
            // If recipient doesn't exist, add new entry
            acc[recipient] = { ...reward }
          }
          return acc
        }, {})

        // Step 2: Convert object back to array
        const unmergedRewardsArray = Object.values(rewardsObject)
        const mergedRewardsArray = unmergedRewardsArray.sort((a: MerklReward, b: MerklReward) => {
          return parseInt(b.amount) - parseInt(a.amount)
        })
        // CHANGE unmergedRewardsArray
        //  Step 3: Assign ranks to each object based on their position in the sorted array
        const rankedData = mergedRewardsArray.map((obj, index) => ({
          ...obj,
          rank: index + 1,
        }))

        setData(rankedData)

        if (address) {
          //     console.log(rankedData)
          const a = rankedData.find((element) => element.recipient.toLowerCase() === address.toLowerCase())
          setUserData(a)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        // Handle errors if needed
      })
    // Call the function to fetch the rewards report
    for (const campaignId of totalCampaigns) {
      fetchRewardsReport(campaignId.campaignId)
    }
  }, [address])
  return (
    <section className="relative max-w-7xl mx-auto">
      <div className="py-10">
        <div className="flex items-center justify-center flex-col mb-8">
          <Image src={'/static/images/points-program/orbit.svg'} alt="" height={51} width={52} />
          <h5 className="text-white text-2xl mb-3 font-medium">Fenix Rings</h5>
          <p className="text-white text-sm text-center max-w-[793px] font-normal">
            Fenix Rings are designed to quantify and recognise users for their contributions to Fenix. These Rings will
            be awarded after the program ends, within a maximum of 3 months. Start earning from your activity now.
          </p>
        </div>
        <HowToEarn />
        <PointSummary userData={userData} />
        <Leaderboard data={data} />
      </div>
    </section>
  )
}

export default PointsProgram
