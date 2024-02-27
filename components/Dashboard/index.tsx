'use client'
import ActiveDashboard from './ActiveDashboard'
import InactiveDashboard from './InactiveDashboard'
import StrategiesDCA from '@/components/Dashboard/StrategiesDCA'
import MyStrategies from '@/components/Dashboard/MyStrategies'

const Dashboard = () => {
  return (
    <div className="py-5">
      {/* <InactiveDashboard /> */}
      <ActiveDashboard />
      <MyStrategies />
      <StrategiesDCA />
    </div>
  )
}

export default Dashboard
