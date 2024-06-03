'use client'

import Migration from '@/src/components/Claim/Migration'
import Steps from '@/src/components/Common/StepsClaim'
import Overview from '@/src/components/Claim/Overview'
import MainBox from '@/src/components/Common/Boxes/MainBox'
import { STEPS } from './data'
import ClaimBox from './ClaimBox'
import { useEffect, useState } from 'react'
import Search from '@/src/components/Common/Search'
import HeaderRowReward from './Tables/HeaderRowReward'

const Claim = () => {
  const [loading, setLoading] = useState(true)
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <section className="relative">
      <div className="flex flex-col items-center gap-5 py-5 xl:flex-row">
        <div className="w-full flex justify-center">
          <ClaimBox />
        </div>
      </div>
      <h1 className="text-xl font-medium text-white">Rewards overview</h1>
      <div className="flex flex-col items-center justify-between gap-5 mt-5 mb-10 xl:flex xl:flex-row">
        <div className="w-full ">
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 mx-2 mt-2 mb-4">
        <div className="w-full">
          <h1 className="text-xl font-medium text-white mb-6">Fees Rewards</h1>
          <div className="p-2">
            <HeaderRowReward
              filterData={[1, 2, 3, 4]}
              loading={loading}
              activePagination={false}
              search={searchValue}
            />
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
