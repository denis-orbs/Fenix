import Decorator from '@/src/app/components/Common/Layout/Background'
import Dashboard from '@/src/app/components/Dashboard'

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
