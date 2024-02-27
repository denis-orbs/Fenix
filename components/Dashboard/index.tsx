'use client'
import ActiveDashboard from './ActiveDashboard'
import InactiveDashboard from './InactiveDashboard'
import StrategiesDCA from '@/components/Dashboard/StrategiesDCA'

const Dashboard = () => {
  return (
    <section className="relative my-10 mx-10">
      {/* <InactiveDashboard /> */}
      <ActiveDashboard/>
      {/* <StrategiesDCA /> */}
    </section>
  )
}

export default Dashboard
