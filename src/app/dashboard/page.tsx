import Decorator from '@/src/library/components/Common/Layout/Background'
import Dashboard from '@/src/library/components/Dashboard'

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
