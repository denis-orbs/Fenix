import Dashboard from '@/components/Dashboard'
import Decorator from '@/components/Common/Layout/Background'

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
