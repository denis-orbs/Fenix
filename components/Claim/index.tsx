'use client'

import Migration from '@/components/Claim/Migration'
import Steps from '@/components/Common/Steps'
import Overview from '@/components/Claim/Overview'
import { STEPS } from './data'
import useStore from '@/store'
import OverviewMobile from './OverviewMobile/OverviewMobile'
import { useState } from 'react'

const Claim = () => {
  const isConnected = useStore((state) => state.isConnected)
  const [migrateStatus, setMigrateStatus] = useState<string | undefined>(undefined)

  return (
    <section className="my-5 xl:my-10">
      <div className="flex justify-between flex-col items-center gap-6 mb-10 xl:flex-row">
        <Migration isConnected={isConnected} />
        <Steps steps={STEPS} />
      </div>
      <div className="hidden lg:block">
      <Overview migrateStatus={migrateStatus} setMigrateStatus={setMigrateStatus}/>
      </div>
      <div className='block lg:hidden  xl:hidden'>
        <OverviewMobile migrateStatus={migrateStatus} setMigrateStatus={setMigrateStatus}/>
      </div>
    </section>
  )
}

export default Claim
