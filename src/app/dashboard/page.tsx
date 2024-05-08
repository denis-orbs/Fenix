/* eslint-disable max-len */
import Decorator from '@/src/components/Common/Layout/Background'
import Dashboard from '@/src/components/Dashboard'

export const metadata = {
  title: 'Dashboard - Fenix Finance',
  description: 'Monitor your liquidity positions',
}

const DashboardPage = () => {
  return (
    <main>
      <div className="container">
        <Dashboard />
        <Decorator />
      </div>
    </main>
  )
}

export default DashboardPage
