'use client'

import StrategiesDCA from '@/components/Dashboard/StrategiesDCA'
import ActiveDashboard from './ActiveDashboard'
import InactiveDashboard from './InactiveDashboard'

const Dashboard = () => {
  return (
    <div className="py-5">
       {/* <InactiveDashboard /> */}
      <ActiveDashboard/>
      <StrategiesDCA />
    </div>
  )
}

export default Dashboard
