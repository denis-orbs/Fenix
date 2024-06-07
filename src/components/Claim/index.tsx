'use client'

import ClaimBox from './ClaimBox'
import { useEffect, useState } from 'react'
import Search from '@/src/components/Common/Search'
import HeaderRowReward from './Tables/HeaderRowReward'
import { useAccount } from 'wagmi'
import { multicall, createConfig, http } from '@wagmi/core'
import rewardAbi from './ABI/abi'
import { blastSepolia } from 'viem/chains'
import { wagmiConfig } from '@/src/app/layout'
import { Address } from 'viem'

const Claim = () => {
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState<string>('')
  const [rewardData, setRewardData] = useState<any>([])

  const { address } = useAccount()

  const getRewardsData = async (address: Address) => {
    try {
      const res = await multicall(wagmiConfig, {
        contracts: [
          {
            abi: rewardAbi,
            address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
            functionName: 'chrClaimAmount',
            args: [address],
          },
          {
            abi: rewardAbi,
            address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
            functionName: 'spchrClaimAmount',
            args: [address],
          },
          {
            abi: rewardAbi,
            address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
            functionName: 'elchrClaimAmount',
            args: [address],
          },
          {
            abi: rewardAbi,
            address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
            functionName: 'vechrClaimAmount',
            args: [address],
          },
          {
            abi: rewardAbi,
            address: '0x71f6e2e4c404Df800fCf4611592b0d3a276bdaEe',
            functionName: 'chrnftClaimAmount',
            args: [address],
          },
        ],
      })
      if (res.length > 0) {
        setRewardData(res)
      } else {
        setRewardData([])
      }
      console.log('data', res)
    } catch (error) {
      console.log('err', error)
      setRewardData([])
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (address) getRewardsData(address)
  }, [address])

  return (
    <section className="relative">
      <div className="flex flex-col items-center gap-5 py-5 xl:flex-row">
        <div className="w-full flex justify-center">
          <ClaimBox />
        </div>
      </div>
      <h1 className="text-xl font-medium text-white">Claim overview</h1>
      <div className="flex flex-col items-center justify-between gap-5 mt-5 mb-10 xl:flex xl:flex-row">
        <div className="w-full ">
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 mx-2 mt-2 mb-4">
        <div className="w-full">
          <h1 className="text-xl font-medium text-white mb-6">Claim</h1>
          <div className="p-2">
            <HeaderRowReward filterData={rewardData} loading={loading} activePagination={false} search={searchValue} />
          </div>
        </div>
      </div>
    </section>
    // <section className="px-3 py-6 md:py-0 md:px-0">
    //   <div className="flex flex-col items-center gap-6 mb-10 xl:flex-row">
    //     <MainBox>
    //       <Migration />
    //     </MainBox>
    //     <Steps steps={STEPS} />
    //   </div>
    //   <Overview />
    // </section>
  )
}

export default Claim
