import Decorator from '@/src/components/Common/Layout/Background'
import Dashboard from '@/src/components/Dashboard'

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
