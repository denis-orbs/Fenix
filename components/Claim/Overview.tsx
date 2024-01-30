'use client'

import AddressCheck from './AddressCheck'
import MigratedAmount from './MigratedAmount'

const Overview = () => {
  return (
    <div className="relative">
      <h5 className="mb-4 text-lg text-white">Migration Overview</h5>
      <div className="flex items-center justify-between gap-5">
        <AddressCheck />
        <MigratedAmount />
      </div>
    </div>
  )
}

export default Overview
