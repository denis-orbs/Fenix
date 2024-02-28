'use client'

import ActiveDashboard from './ActiveDashboard'
import InactiveDashboard from './InactiveDashboard'

const Dashboard = () => {
  return (
    <div className="py-5">
      {/* <InactiveDashboard /> */}
      <ActiveDashboard />
    </div>
  )
}

export default Dashboard
